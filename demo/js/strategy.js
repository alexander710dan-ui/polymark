/* Polymark strategy engine — pure functions, no DOM.
   Every number the UI shows is computed here and traceable to its inputs. */
(function (g) {
  "use strict";

  var DEFAULTS = {
    minScore: 65,        // minimum opportunity score to surface as a candidate
    minEdge: 4,          // minimum net edge (cents) after costs
    minAgreement: 2,     // reliable traders required for the independence bonus
    minLiquidity: 25000, // $ liquidity gate
    maxSpread: 6,        // cents, full spread gate
    maxDays: 180,        // horizon limit
    minConfidence: "medium", // low | medium | high
    sideBias: 0,         // -10 (favour NO) .. +10 (favour YES)
    traderWindow: "all", // all | recent
    maxPositionPct: 10,  // max single paper position, % of bankroll
    maxMarketPct: 15,    // max exposure per market, %
    maxCategoryPct: 30,  // max exposure per category, %
    maxOpenPositions: 8,
    dailyLossPct: 10,    // daily simulated-loss stop, %
    bankroll: 10000      // 1000 or 10000
  };

  var FEE = 1; // assumed round-trip fee/slippage, cents
  var CONF_RANK = { low: 0, medium: 1, high: 2 };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function r1(v) { return Math.round(v * 10) / 10; }

  /* ---------------- Trader reliability (0-99) ---------------- */

  function reliability(t, s) {
    s = s || DEFAULTS;
    var roiUsed = s.traderWindow === "recent" ? t.recentROI : t.roi;
    var parts = {
      roi: clamp(roiUsed * 130, -10, 30),
      consistency: t.consistency * 30,
      drawdown: Math.max(0, 20 - t.maxDD * 60),
      concentration: -Math.max(0, t.topWinShare - 0.25) * 60,
      recency: clamp((t.recentROI - t.longROI) * 25, -6, 6),
      base: 8
    };
    var raw = parts.roi + parts.consistency + parts.drawdown + parts.concentration + parts.recency + parts.base;
    var sample = Math.min(1, t.resolved / 100);
    var score = raw * (0.45 + 0.55 * sample);
    var gated = t.resolved < 30;
    if (gated) score = Math.min(score, 34); // unproven: tiny sample can't earn trust
    return { score: clamp(Math.round(score), 2, 99), parts: parts, sampleFactor: r1(sample), gated: gated };
  }

  /* ---------------- Fair probability ----------------
     Starts at the market price; applies transparent line-item adjustments.
     All adjustments are damped near price extremes (probabilities compress). */

  function traderConviction(m, s) {
    var net = 0, buyers = [];
    for (var i = 0; i < m.positions.length; i++) {
      var p = m.positions[i];
      var t = g.DEMO.traderById(p.t);
      if (!t) continue;
      var rel = reliability(t, s).score / 100;
      var w = Math.max(0, rel - 0.35); // unreliable traders contribute ~nothing
      var sizeF = Math.min(1, p.size / 5000);
      var dir = p.side === "yes" ? 1 : -1;
      var actionF = p.action === "reduce" ? -0.5 : p.action === "exit" ? -0.8 : 1;
      net += dir * w * sizeF * actionF;
      if (rel >= 0.55 && (p.action === "open" || p.action === "add")) {
        buyers.push({ id: p.t, side: p.side, rel: Math.round(rel * 100), daysAgo: p.daysAgo, entry: p.entry, size: p.size });
      }
    }
    return { net: net, buyers: buyers };
  }

  function evidenceSums(m) {
    var yes = 0, no = 0, n = 0;
    for (var i = 0; i < m.evidence.length; i++) {
      var e = m.evidence[i];
      var v = e.w * e.rel;
      if (e.side === "yes") yes += v; else no += v;
      n++;
    }
    return { yes: yes, no: no, total: yes + no, count: n };
  }

  function computeFair(m, s) {
    s = s || DEFAULTS;
    var conv = traderConviction(m, s);
    var ev = evidenceSums(m);
    var adj = [];

    var dSmart = clamp(conv.net * 9, -8, 8);
    if (Math.abs(dSmart) >= 0.3) adj.push({ key: "smart", label: "Smart-trader positioning", delta: dSmart, note: "Reliability-weighted net flow of proven traders" });

    var dEvid = clamp((ev.yes - ev.no) * 1.8, -7, 7);
    if (Math.abs(dEvid) >= 0.3) adj.push({ key: "evidence", label: "Evidence balance", delta: dEvid, note: "Source-weighted YES vs NO evidence" });

    var dBook = m.bookImb * 3;
    if (Math.abs(dBook) >= 0.3) adj.push({ key: "book", label: "Order-book imbalance", delta: dBook, note: "Resting bid depth, YES vs NO" });

    if (Math.abs(m.move7) >= 6 && (m.sentiment.spike || m.sentiment.unsupported > 0.6)) {
      var dMom = clamp(-m.move7 * 0.35, -4, 4);
      adj.push({ key: "momentum", label: "Momentum overshoot", delta: dMom, note: "Fast attention-driven move; partial reversion expected" });
    }

    var sn = m.sentiment;
    if ((sn.yesShare > 0.72 || sn.yesShare < 0.28) && sn.intensity > 0.5 && sn.unsupported > 0.5) {
      var dSent = clamp(-(sn.yesShare - 0.5) * 8, -3, 3);
      adj.push({ key: "sentiment", label: "Crowd froth fade", delta: dSent, note: "Extreme one-sided chatter with unsupported claims" });
    }

    /* Sportsbook divergence: sharp books are the best free probability
       estimate for sports. When Polymarket drifts from book consensus
       (usually fan flow on popular teams), lean toward the books. */
    if (m.bookImplied != null) {
      var dBook2 = clamp((m.bookImplied - m.yes) * 0.6, -6, 6);
      if (Math.abs(dBook2) >= 0.3) adj.push({ key: "bookdiv", label: "Sportsbook consensus divergence", delta: dBook2, note: "Books imply " + m.bookImplied + "¢ vs market " + m.yes + "¢" });
    }

    /* Favourite-longshot bias: crowds systematically overpay for cheap YES
       lottery tickets and underpay near-certainties (confirmed against live
       Polymarket top-earner flows, Jul 2026: top 25 earners were all
       NO-heavy sellers of longshots). Shade the fair estimate accordingly. */
    if (m.yes <= 15) {
      adj.push({ key: "lsbias", label: "Longshot-bias correction", delta: -clamp((16 - m.yes) * 0.15, 0, 2), note: "Cheap YES is systematically overpriced" });
    } else if (m.yes >= 85) {
      adj.push({ key: "lsbias", label: "Favourite-bias correction", delta: clamp((m.yes - 84) * 0.15, 0, 2), note: "Near-certain favourites are systematically underpriced" });
    }

    var damp = Math.max(0.15, 1 - Math.abs(m.yes - 50) / 60);
    var total = 0;
    for (var i = 0; i < adj.length; i++) { adj[i].delta = r1(adj[i].delta * damp); total += adj[i].delta; }

    return {
      fair: clamp(r1(m.yes + total), 2, 98),
      adjustments: adj,
      totalDelta: r1(total),
      damp: r1(damp),
      conviction: conv,
      evidence: ev
    };
  }

  /* ---------------- Opportunity score (0-100) ---------------- */

  function analyze(m, s) {
    s = s || DEFAULTS;
    var fv = computeFair(m, s);
    var costs = m.spread / 2 + FEE;
    var diff = fv.fair - m.yes;
    var edgeNet = r1(Math.abs(diff) - costs);
    var side = edgeNet > 1 ? (diff > 0 ? "yes" : "no") : null;
    var dirSign = diff >= 0 ? 1 : -1;

    /* --- component: probability gap (0-25) --- */
    var gap = side ? clamp(edgeNet * 1.8, 0, 25) : 0;

    /* --- component: smart-trader signal (0-20) --- */
    var aligned = clamp(fv.conviction.net * dirSign, 0, 1);
    var agreeSide = dirSign > 0 ? "yes" : "no";
    var agree = 0, opposed = 0, entryDays = {};
    for (var i = 0; i < fv.conviction.buyers.length; i++) {
      var b = fv.conviction.buyers[i];
      if (b.side === agreeSide) { agree++; entryDays[b.daysAgo] = 1; } else opposed++;
    }
    var independent = Object.keys(entryDays).length >= 2; // entries on different days ≈ independent
    var agreeBonus = agree >= s.minAgreement && independent ? Math.min(6, (agree - 1) * 3) : 0;
    var smart = clamp(aligned * 14 + agreeBonus, 0, 20);

    /* --- component: evidence quality (0-20) --- */
    var sup = dirSign > 0 ? fv.evidence.yes : fv.evidence.no;
    var con = dirSign > 0 ? fv.evidence.no : fv.evidence.yes;
    var evid = clamp((sup - con) * 2.2, 0, 14) + Math.min(6, fv.evidence.total * 0.75);
    evid = clamp(evid - m.missing.length * 1.5, 0, 20);
    var insufficientEvidence = fv.evidence.count < 2 || fv.evidence.total < 2;

    /* --- component: market quality (0-15) + hard gates --- */
    var gate = null;
    if (m.liq < s.minLiquidity) gate = "Liquidity below your $" + s.minLiquidity.toLocaleString() + " minimum";
    else if (m.spread > s.maxSpread) gate = "Spread (" + m.spread + "¢) exceeds your " + s.maxSpread + "¢ maximum";
    else if (m.resClarity < 0.5) gate = "Resolution rules too ambiguous to trade";
    else if (m.topWallet > 0.5) gate = "One wallet is " + Math.round(m.topWallet * 100) + "% of volume — price may be one actor's opinion";
    else if (m.days < 1) gate = "Resolves within hours — too close to enter";
    var quality = clamp(
      clamp(Math.log10(Math.max(1, m.liq / s.minLiquidity)) * 5, 0, 6) +
      clamp((s.maxSpread - m.spread) / s.maxSpread, 0, 1) * 4 +
      m.resClarity * 3 +
      clamp((0.4 - m.topWallet) / 0.4, 0, 1) * 2,
      0, 15);

    /* --- component: sentiment divergence (0-10) --- */
    var crowdForUs = side === "yes" ? m.sentiment.yesShare : side === "no" ? 1 - m.sentiment.yesShare : 0.5;
    var sent = side ? clamp((1 - crowdForUs) * 8 + (m.sentiment.unsupported > 0.6 && crowdForUs < 0.4 ? 2 : 0), 0, 10) : 0;

    /* --- component: timing & entry (0-10) --- */
    var epd = side ? edgeNet / Math.max(1, m.days) : 0;
    var movedTowardUs = side === "yes" ? m.move7 : -m.move7; // price already went our way = edge consumed
    var timing = side
      ? clamp(clamp(epd * 10, 0, 6) - clamp(Math.max(0, movedTowardUs) * 0.4, 0, 4) - (m.days < 3 && m.bookImplied == null ? 2 : 0) + 4, 0, 10)
      : 0;

    var score = Math.round(gap + smart + evid + quality + sent + timing);
    if (side && s.sideBias) score = clamp(score + (side === "yes" ? 1 : -1) * s.sideBias * 0.8, 0, 100);

    /* --- confidence --- */
    var confidence = "medium";
    if (fv.evidence.total >= 6 && agree >= 2 && m.missing.length === 0) confidence = "high";
    if (fv.evidence.total < 3 || m.missing.length >= 2) confidence = "low";

    /* --- classification --- */
    var classification, classLabel;
    var noSignalData = insufficientEvidence && fv.conviction.buyers.length === 0;
    if (noSignalData) { classification = "insufficient"; classLabel = "Insufficient information"; side = null; }
    else if (gate) { classification = "avoid"; classLabel = "Avoid"; }
    else if (!side) { classification = score >= 50 ? "watch" : "avoid"; classLabel = score >= 50 ? "Watch" : "No trade"; }
    else if (score >= 80) { classification = "strong"; classLabel = "Strong candidate"; }
    else if (score >= 65) { classification = "possible"; classLabel = "Possible opportunity"; }
    else if (score >= 50) { classification = "watch"; classLabel = "Watch"; }
    else { classification = "avoid"; classLabel = "No trade"; } // sided but weak: pass, don't demonize

    /* --- main reason & main risk (from the largest contributor) --- */
    var comps = { gap: gap, smart: smart, evidence: evid, quality: quality, sentiment: sent, timing: timing };
    var reason = mainReason(m, side, comps, fv, edgeNet, agree);
    var risk = gate || (m.risks && m.risks[0]) || "Fair-value estimate could simply be wrong.";

    return {
      market: m, side: side, score: score, classification: classification, classLabel: classLabel,
      fair: fv.fair, adjustments: fv.adjustments, damp: fv.damp,
      edgeNet: side ? edgeNet : 0, edgePerDay: side ? r1(epd * 10) / 10 : 0,
      costs: r1(costs), confidence: confidence, gate: gate,
      components: {
        gap: r1(gap), smart: r1(smart), evidence: r1(evid),
        quality: r1(quality), sentiment: r1(sent), timing: r1(timing)
      },
      maxPts: { gap: 25, smart: 20, evidence: 20, quality: 15, sentiment: 10, timing: 10 },
      agree: agree, opposed: opposed, independent: independent,
      buyers: fv.conviction.buyers, reason: reason, risk: risk,
      dominant: dominantComponent(comps)
    };
  }

  function dominantComponent(c) {
    var best = "gap", bestV = -1;
    for (var k in c) if (c[k] > bestV) { bestV = c[k]; best = k; }
    return best;
  }

  function mainReason(m, side, comps, fv, edgeNet, agree) {
    if (!side) {
      if (Math.abs(fv.fair - m.yes) <= m.spread / 2 + FEE + 1) return "Price sits within " + r1(Math.abs(fv.fair - m.yes)) + "¢ of the estimated fair value — no edge after costs.";
      return "Signals conflict; the estimate isn't far enough from the price to act on.";
    }
    var sideTxt = side.toUpperCase();
    var dom = dominantComponent(comps);
    if (dom === "gap") return "Estimated fair value (" + fv.fair + "¢) is " + edgeNet + "¢ from the " + sideTxt + " price after costs.";
    if (dom === "smart") return agree + " reliable traders independently hold " + sideTxt + "; the weighted flow points the same way.";
    if (dom === "evidence") return "Source-weighted evidence leans clearly " + sideTxt + " while the price hasn't followed.";
    if (dom === "sentiment") return "The crowd is loudly on the other side with weak support — contrarian " + sideTxt + " value.";
    if (dom === "timing") return "Edge of " + edgeNet + "¢ with a short runway makes this an efficient " + sideTxt + " hold.";
    return "Multiple signals modestly favour " + sideTxt + ".";
  }

  function analyzeAll(s) {
    s = s || DEFAULTS;
    var out = [];
    for (var i = 0; i < g.DEMO.MARKETS.length; i++) out.push(analyze(g.DEMO.MARKETS[i], s));
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  /* ---------------- Benchmark backtest over the resolved demo set ----------------
     Equal $100 stakes. YES buy pays 100/price·stake on YES outcome; NO buy pays
     100/(100-price)·stake on NO outcome; losers lose the stake. */

  function pnlFor(sideTaken, price, outcome) {
    if (!sideTaken) return null;
    if (sideTaken === "yes") return outcome === 1 ? r1(100 * (100 / price) - 100) : -100;
    return outcome === 0 ? r1(100 * (100 / (100 - price)) - 100) : -100;
  }

  function backtest(s) {
    s = s || DEFAULTS;
    var R = g.DEMO.RESOLVED;
    var rnd = g.DEMO.mulberry32(1984);
    var rows = [
      { key: "strategy", name: "This strategy (score ≥ " + s.minScore + ")", pick: function (r) { return r.side && r.score >= s.minScore ? r.side : null; } },
      { key: "alwaysYes", name: "Always buy YES", pick: function () { return "yes"; } },
      { key: "alwaysNo", name: "Always buy NO", pick: function () { return "no"; } },
      { key: "copyTop", name: "Copy the top-ranked trader", pick: function (r) { return r.topSide; } },
      { key: "random", name: "Random entries", pick: function () { return rnd() < 0.5 ? "yes" : "no"; } },
      { key: "followPrice", name: "Follow the market favourite", pick: function (r) { return r.price > 50 ? "yes" : r.price < 50 ? "no" : null; } },
      { key: "none", name: "Take no action", pick: function () { return null; } }
    ];
    var out = [];
    for (var i = 0; i < rows.length; i++) {
      var trades = 0, wins = 0, pnl = 0, staked = 0;
      for (var j = 0; j < R.length; j++) {
        var r = R[j];
        var side = rows[i].pick(r);
        var p = pnlFor(side, r.price, r.outcome);
        if (p === null) continue;
        trades++; staked += 100; pnl += p; if (p > 0) wins++;
      }
      out.push({
        key: rows[i].key, name: rows[i].name, trades: trades, wins: wins,
        winRate: trades ? Math.round(100 * wins / trades) : 0,
        pnl: r1(pnl), roi: staked ? r1(100 * pnl / staked) : 0
      });
    }
    return out;
  }

  g.Strategy = {
    DEFAULTS: DEFAULTS,
    FEE: FEE,
    CONF_RANK: CONF_RANK,
    reliability: reliability,
    computeFair: computeFair,
    analyze: analyze,
    analyzeAll: analyzeAll,
    backtest: backtest,
    clamp: clamp
  };
})(typeof window !== "undefined" ? window : globalThis);

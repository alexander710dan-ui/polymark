/* Polymark — single-market analysis page */
(function (g) {
  "use strict";

  var tradeSide = null;

  function render(root, marketId) {
    var m = g.DEMO.marketById(marketId);
    if (!m) { root.innerHTML = '<div class="empty-state"><div class="big">Market not found</div></div>'; return; }
    var s = g.State.settings();
    var a = g.Strategy.analyze(m, s);
    var U = g.UI;
    if (tradeSide === null) tradeSide = a.side || "yes";
    var hist = g.DEMO.genHistory(m);
    var watched = g.State.isWatched(m.id);

    root.innerHTML =
      '<div class="page-head">' +
      '<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">' +
      '<a href="#/dashboard" class="btn sm">← Back</a>' +
      '<span class="chip cat">' + U.esc(m.category) + "</span>" + U.sideBadge(a.side, true) + U.classChip(a) +
      '<button class="btn sm' + (watched ? " watch-on" : "") + '" id="ma-watch">' + (watched ? "★ Watching" : "☆ Watch") + "</button>" +
      "</div>" +
      '<h1 class="page-title">' + U.esc(m.q) + "</h1>" +
      '<p class="page-sub">' + U.esc(m.desc) + "</p></div>" +

      '<div class="stat-strip">' +
      cell("YES price", m.yes + "¢") + cell("NO price", (100 - m.yes) + "¢") +
      cell("Fair estimate", a.fair + "¢", "brass") +
      cell("Net edge", a.side ? "+" + a.edgeNet + "¢ " + a.side.toUpperCase() : "none", a.side ? "pos" : "") +
      cell("Score", a.score + " / 100") + cell("Confidence", a.confidence) +
      cell("Liquidity", U.moneyShort(m.liq)) + cell("Ends in", U.daysLabel(m.days)) +
      "</div>" +

      '<div class="split-38">' +
      "<div>" + // left column
      panel("60-day YES price",
        '<div class="chart-wrap">' + U.sparkline(hist, 700, 150) +
        '<div class="chart-labels"><span>-60d</span><span>24h: ' + U.signed(m.move24, "¢") + " · 7d: " + U.signed(m.move7, "¢") + "</span><span>now " + m.yes + "¢</span></div></div>" +
        '<div style="display:flex;gap:18px;margin-top:10px" class="mono">' +
        '<span class="micro-label" style="align-self:center">24h volume</span><span>' + U.moneyShort(m.vol24) + "</span>" +
        '<span class="micro-label" style="align-self:center">Spread</span><span>' + m.spread + "¢</span>" +
        '<span class="micro-label" style="align-self:center">Top wallet</span><span>' + Math.round(m.topWallet * 100) + "%</span></div>") +

      panel("Score breakdown — " + a.score + " / 100", scoreBreakdown(a) +
        '<div class="note-box">Nothing here is an AI confidence number. Each row is a formula over the inputs shown on this page — open <a href="#/settings" style="color:var(--brass)">Settings</a> to change the thresholds.</div>') +

      panel("Fair-probability estimate — " + a.fair + "¢", waterfall(m, a)) +

      panel("Smart-trader activity", traderTable(m, s)) +

      panel("Evidence",
        '<div class="two-col">' +
        '<div><div class="micro-label" style="color:var(--yes);margin-bottom:6px">Supports YES</div>' + evidenceList(m, "yes") + "</div>" +
        '<div><div class="micro-label" style="color:var(--no);margin-bottom:6px">Supports NO</div>' + evidenceList(m, "no") + "</div>" +
        "</div>" +
        (m.missing.length ? '<div style="margin-top:14px"><div class="micro-label" style="margin-bottom:6px">Missing information</div><ul class="plain-list">' + m.missing.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + "</ul></div>" : "")) +

      panel("Why this could be wrong", counterarguments(m, a)) +
      "</div>" +

      "<div>" + // right column
      panel("Suggested action", suggestedAction(a)) +
      panel("Paper trade", tradeBox(m, a, s)) +
      (m.events.length ? panel("Upcoming events", '<ul class="plain-list">' + m.events.map(function (e) {
        return "<li><span class='mono' style='color:var(--brass)'>+" + e.inDays + "d</span> — " + U.esc(e.label) + "</li>";
      }).join("") + "</ul>") : "") +
      panel("Crowd sentiment", sentimentPanel(m)) +
      panel("Resolution rules", '<p style="font-size:12.5px;color:var(--text-dim);line-height:1.55">' + U.esc(m.rules) + "</p>" +
        '<div style="margin-top:10px" class="mono micro-label">Clarity score: ' + Math.round(m.resClarity * 100) + "/100</div>") +
      "</div></div>";

    wire(root, m, a);
  }

  function cell(label, val, cls) {
    return '<div class="stat-cell"><span class="micro-label">' + label + '</span><span class="stat-value ' + (cls || "") + '" style="font-size:17px">' + val + "</span></div>";
  }
  function panel(title, body) { return '<div class="panel"><div class="panel-title">' + title + "</div>" + body + "</div>"; }

  function scoreBreakdown(a) {
    var U = g.UI;
    var defs = [
      ["gap", "Probability gap", "Distance between fair estimate and price, after spread + fees"],
      ["smart", "Smart-trader signal", a.agree + " reliable trader(s) aligned" + (a.opposed ? ", " + a.opposed + " opposed" : "") + (a.independent ? ", independent entries" : "")],
      ["evidence", "Evidence quality", "Source-weighted support minus conflicts and missing info"],
      ["quality", "Market quality", "Liquidity, spread, resolution clarity, wallet concentration"],
      ["sentiment", "Sentiment divergence", "Crowd positioning vs the suggested side"],
      ["timing", "Timing & entry", "Edge per day, move already taken, distance to resolution"]
    ];
    return defs.map(function (d) {
      var v = a.components[d[0]], max = a.maxPts[d[0]];
      var fill = Math.round(100 * v / max);
      var cls = fill >= 70 ? "hi" : fill <= 25 ? "lo" : "";
      return '<div class="break-row"><span class="break-label">' + d[1] + "</span>" +
        '<div class="break-track"><div class="break-fill ' + cls + '" style="width:' + fill + '%"></div></div>' +
        '<span class="break-pts">' + v + "/" + max + "</span>" +
        '<span class="break-note">' + U.esc(d[2]) + "</span></div>";
    }).join("");
  }

  function waterfall(m, a) {
    var U = g.UI;
    var rows = '<div class="wf-row"><span class="wf-label">Market price (start)</span><div class="wf-bar-zone"><span class="wf-axis"></span></div><span class="wf-val mono">' + m.yes + "¢</span></div>";
    for (var i = 0; i < a.adjustments.length; i++) {
      var ad = a.adjustments[i];
      var w = Math.min(50, Math.abs(ad.delta) * 6);
      var bar = ad.delta >= 0
        ? '<span class="wf-bar up" style="left:50%;width:' + w + '%"></span>'
        : '<span class="wf-bar down" style="right:50%;width:' + w + '%"></span>';
      rows += '<div class="wf-row"><span class="wf-label" title="' + U.esc(ad.note) + '">' + U.esc(ad.label) + '</span>' +
        '<div class="wf-bar-zone"><span class="wf-axis"></span>' + bar + "</div>" +
        '<span class="wf-val mono ' + (ad.delta >= 0 ? "pos" : "neg") + '">' + U.signed(ad.delta, "¢") + "</span></div>";
    }
    if (!a.adjustments.length) rows += '<div class="wf-row"><span class="wf-label" style="color:var(--text-faint)">No adjustments strong enough to apply</span><div class="wf-bar-zone"><span class="wf-axis"></span></div><span class="wf-val mono">±0¢</span></div>';
    rows += '<div class="wf-row wf-total"><span class="wf-label">Estimated fair YES probability</span><div class="wf-bar-zone"></div><span class="wf-val mono" style="color:var(--brass)">' + a.fair + "¢</span></div>";
    rows += '<p style="font-size:11.5px;color:var(--text-faint);margin-top:10px">Adjustments are damped ×' + a.damp + " near price extremes. This is an <em>estimate</em>, not a fact — see the counterarguments below.</p>";
    return rows;
  }

  function traderTable(m, s) {
    var U = g.UI;
    if (!m.positions.length) return '<p style="color:var(--text-faint);font-size:12.5px">No tracked trader has a position here — that absence is itself a signal.</p>';
    var rows = m.positions.map(function (p) {
      var t = g.DEMO.traderById(p.t);
      var rel = g.Strategy.reliability(t, s);
      var actionTxt = { open: "opened", add: "added", reduce: "reducing", exit: "exited" }[p.action];
      return '<tr class="clickable" data-trader="' + t.id + '">' +
        "<td><strong>" + U.esc(t.name) + "</strong><br><span class='mono' style='font-size:10px;color:var(--text-faint)'>" + U.esc(t.addr) + "</span></td>" +
        '<td class="num" style="color:' + (rel.score >= 55 ? "var(--yes)" : "var(--text-faint)") + '">' + rel.score + "</td>" +
        "<td>" + U.sideBadge(p.side) + "</td>" +
        '<td class="num">' + p.entry + "¢</td>" +
        '<td class="num">' + U.moneyShort(p.size) + "</td>" +
        "<td>" + actionTxt + " " + p.daysAgo + "d ago</td></tr>";
    }).join("");
    return '<table class="data"><thead><tr><th>Trader</th><th style="text-align:right">Reliability</th><th>Side</th><th style="text-align:right">Entry</th><th style="text-align:right">Size</th><th>Action</th></tr></thead><tbody>' + rows + "</tbody></table>";
  }

  function evidenceList(m, side) {
    var U = g.UI;
    var items = m.evidence.filter(function (e) { return e.side === side; });
    if (!items.length) return '<p style="color:var(--text-faint);font-size:12px">No evidence found for this side.</p>';
    return items.map(function (e) {
      var col = side === "yes" ? "var(--yes)" : "var(--no)";
      return '<div class="evi-item"><span class="evi-weight" style="color:' + col + '">' + "●".repeat(e.w) + "</span>" +
        '<span class="evi-body">' + U.esc(e.text) +
        '<span class="evi-src' + (e.rel < 0.6 ? " weak" : "") + '">' + U.esc(e.source) + " · reliability " + Math.round(e.rel * 100) + "%</span></span></div>";
    }).join("");
  }

  function counterarguments(m, a) {
    var U = g.UI;
    var items = [];
    if (a.side) {
      var oppSide = a.side === "yes" ? "no" : "yes";
      m.evidence.filter(function (e) { return e.side === oppSide; })
        .sort(function (x, y) { return y.w * y.rel - x.w * x.rel; })
        .slice(0, 3)
        .forEach(function (e) { items.push(e.text + " (" + e.source + ")"); });
      items.push("The fair-value estimate moved " + Math.abs(a.fair - m.yes).toFixed(1) + "¢ on " + a.adjustments.length + " adjustments — if the trader read or evidence weighting is wrong, the whole edge disappears.");
    } else {
      items.push("The system found no actionable edge here — but that itself may be wrong if key evidence is missing.");
    }
    (m.risks || []).forEach(function (r) { items.push(r); });
    return '<ul class="counter-list">' + items.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + "</ul>";
  }

  function suggestedAction(a) {
    var U = g.UI;
    var txt;
    if (a.classification === "insufficient") txt = "The system cannot form a view: too little evidence and no trader signal. Trading here is guessing.";
    else if (a.gate) txt = a.gate;
    else if (!a.side) txt = "No trade. " + a.reason;
    else txt = "Consider " + a.side.toUpperCase() + " — " + a.reason;
    return '<div style="display:flex;gap:14px;align-items:center;margin-bottom:10px">' + U.ring(a.score, a.classification, 64) +
      "<div>" + U.sideBadge(a.side, true) + '<div class="micro-label" style="margin-top:6px">' + U.esc(a.classLabel) + "</div></div></div>" +
      '<p style="font-size:12.5px;color:var(--text-dim);line-height:1.55">' + U.esc(txt) + "</p>" +
      (a.side ? '<p style="font-size:11.5px;color:var(--text-faint);margin-top:8px">Edge/day: <span class="mono">' + a.edgePerDay + "¢</span> · Costs: <span class='mono'>" + a.costs + "¢</span></p>" : "");
  }

  function tradeBox(m, a, s) {
    var U = g.UI;
    var st = g.State.get();
    var maxAmt = Math.floor(s.bankroll * s.maxPositionPct / 100);
    var block = g.State.tradeBlockReason(m, tradeSide, Math.min(100, maxAmt), a);
    return '<div class="trade-box">' +
      '<div class="trade-sides">' +
      '<button class="trade-side-btn yes' + (tradeSide === "yes" ? " sel" : "") + '" data-tside="yes"><span class="ts-label">BUY YES</span><span class="ts-price">' + m.yes + "¢</span></button>" +
      '<button class="trade-side-btn no' + (tradeSide === "no" ? " sel" : "") + '" data-tside="no"><span class="ts-label">BUY NO</span><span class="ts-price">' + (100 - m.yes) + "¢</span></button>" +
      "</div>" +
      '<input type="number" id="trade-amt" placeholder="Amount ($)" min="1" max="' + maxAmt + '" value="100">' +
      '<div class="trade-summary">' +
      "<span>Balance: <span class='mono'>" + U.money(st.balance) + "</span> · Max position: <span class='mono'>" + U.money(maxAmt) + "</span></span>" +
      '<span id="trade-calc"></span></div>' +
      (block ? '<div class="trade-block-msg">' + U.esc(block) + "</div>" : "") +
      (a.side && tradeSide !== a.side ? '<div class="trade-block-msg" style="color:var(--brass);background:var(--brass-dim);border-color:rgba(201,163,92,.3)">Heads up: you picked ' + tradeSide.toUpperCase() + " but the system suggests " + a.side.toUpperCase() + ".</div>" : "") +
      '<button class="btn primary" id="trade-place"' + (block ? " disabled" : "") + ">Place paper trade</button>" +
      '<p style="font-size:10.5px;color:var(--text-faint)">Simulated only. No wallet, no real orders, fake prices.</p>' +
      "</div>";
  }

  function sentimentPanel(m) {
    var U = g.UI;
    var sn = m.sentiment;
    var yesPct = Math.round(sn.yesShare * 100);
    return '<div style="display:flex;height:8px;border-radius:4px;overflow:hidden;margin-bottom:8px">' +
      '<span style="width:' + yesPct + '%;background:var(--yes)"></span>' +
      '<span style="width:' + (100 - yesPct) + '%;background:var(--no)"></span></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:11px" class="mono"><span style="color:var(--yes)">' + yesPct + "% YES</span><span style='color:var(--no)'>" + (100 - yesPct) + "% NO</span></div>" +
      '<ul class="plain-list" style="margin-top:10px;font-size:12px">' +
      "<li>Intensity: " + Math.round(sn.intensity * 100) + "/100</li>" +
      "<li>Unsupported claims: " + Math.round(sn.unsupported * 100) + "/100</li>" +
      (sn.spike ? "<li>Attention spike in the last week</li>" : "") +
      (sn.ledPrice ? "<li>Sentiment shifted <em>before</em> the price moved</li>" : "") +
      '</ul><p style="font-size:11px;color:var(--text-faint);margin-top:8px">Sentiment never creates a signal on its own — it only confirms or fades.</p>';
  }

  function wire(root, m, a) {
    var U = g.UI;
    var watchBtn = root.querySelector("#ma-watch");
    watchBtn.addEventListener("click", function () {
      var added = g.State.toggleWatch(m.id);
      U.toast(added ? "Added to watchlist" : "Removed from watchlist", added ? "ok" : "");
    });
    root.querySelectorAll("[data-tside]").forEach(function (el) {
      el.addEventListener("click", function () { tradeSide = el.getAttribute("data-tside"); g.App.rerender(); });
    });
    root.querySelectorAll("[data-trader]").forEach(function (el) {
      el.addEventListener("click", function () { location.hash = "#/traders"; });
    });
    var amt = root.querySelector("#trade-amt");
    var calc = root.querySelector("#trade-calc");
    function updateCalc() {
      var v = parseFloat(amt.value) || 0;
      var price = tradeSide === "yes" ? m.yes : 100 - m.yes;
      var shares = v > 0 ? (v / price) * 100 : 0;
      calc.innerHTML = v > 0
        ? "≈ <span class='mono'>" + shares.toFixed(1) + "</span> shares @ " + price + "¢ · pays <span class='mono'>" + U.money(shares) + "</span> if " + tradeSide.toUpperCase() + " resolves"
        : "";
    }
    if (amt) { amt.addEventListener("input", updateCalc); updateCalc(); }
    var place = root.querySelector("#trade-place");
    if (place) place.addEventListener("click", function () {
      var v = parseFloat(amt.value) || 0;
      var res = g.State.placeTrade(m, tradeSide, v, a);
      if (res.ok) U.toast("Paper trade placed: " + tradeSide.toUpperCase() + " " + U.money(v), "ok");
      else U.toast(res.reason, "err");
    });
  }

  g.Pages = g.Pages || {};
  g.Pages.market = { render: render, resetSide: function () { tradeSide = null; } };
})(typeof window !== "undefined" ? window : globalThis);

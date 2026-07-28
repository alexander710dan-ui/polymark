/* Polymark — Paper portfolio page */
(function (g) {
  "use strict";

  function render(root) {
    var U = g.UI;
    var st = g.State.get();
    var s = st.settings;
    var open = st.positions.filter(function (p) { return p.status === "open"; });
    var closed = st.positions.filter(function (p) { return p.status === "closed"; });

    var openValue = 0, openCost = 0, unrealised = 0;
    open.forEach(function (p) {
      var v = g.State.positionValue(p);
      openValue += v.value; openCost += p.cost; unrealised += v.pnl;
    });
    var realised = 0, wins = 0;
    closed.forEach(function (p) { realised += p.pnl; if (p.pnl > 0) wins++; });
    var equity = Math.round((st.balance + openValue) * 100) / 100;
    var totalReturn = Math.round((equity - s.bankroll) / s.bankroll * 1000) / 10;
    var winRate = closed.length ? Math.round(100 * wins / closed.length) : null;

    root.innerHTML =
      '<div class="page-head"><h1 class="page-title">Paper Portfolio</h1>' +
      '<p class="page-sub">Simulated money only. The benchmark table below runs the same $100-per-market rules over the 12 resolved demo markets, so you can see whether the strategy beats doing something dumber.</p></div>' +

      '<div class="stat-strip">' +
      cell("Equity", U.money(equity), totalReturn > 0 ? "pos" : totalReturn < 0 ? "neg" : "") +
      cell("Cash", U.money(st.balance)) +
      cell("Open positions", open.length + " / " + s.maxOpenPositions) +
      cell("Unrealised P&L", U.money(Math.round(unrealised * 100) / 100), unrealised > 0 ? "pos" : unrealised < 0 ? "neg" : "") +
      cell("Realised P&L", U.money(Math.round(realised * 100) / 100), realised > 0 ? "pos" : realised < 0 ? "neg" : "") +
      cell("Total return", U.pct(totalReturn), totalReturn > 0 ? "pos" : totalReturn < 0 ? "neg" : "") +
      cell("Win rate (closed)", winRate === null ? "—" : winRate + "%") +
      "</div>" +

      panel("Open positions", openTable(open)) +
      (closed.length ? panel("Closed positions", closedTable(closed)) : "") +
      (st.positions.length ? panel("Performance by category & signal type", byBuckets(st.positions)) : "") +
      panel("Strategy vs benchmarks — resolved demo set", benchmarks()) +
      panel("Short sleeve vs long sleeve — capital velocity", horizonSplit());

    root.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        var p = g.State.closePosition(el.getAttribute("data-close"));
        if (p) U.toast("Closed " + p.side.toUpperCase() + " · P&L " + U.money(p.pnl), p.pnl >= 0 ? "ok" : "err");
      });
    });
    root.querySelectorAll("[data-go]").forEach(function (el) {
      el.addEventListener("click", function () { location.hash = "#/market/" + el.getAttribute("data-go"); });
    });
  }

  function cell(label, val, cls) {
    return '<div class="stat-cell"><span class="micro-label">' + label + '</span><span class="stat-value ' + (cls || "") + '" style="font-size:17px">' + val + "</span></div>";
  }
  function panel(title, body) { return '<div class="panel"><div class="panel-title">' + title + "</div>" + body + "</div>"; }

  function openTable(open) {
    var U = g.UI;
    if (!open.length) return '<p style="color:var(--text-faint);font-size:12.5px">No open positions. Place paper trades from any market-analysis page.</p>';
    var rows = open.map(function (p) {
      var v = g.State.positionValue(p);
      return "<tr>" +
        '<td style="cursor:pointer" data-go="' + p.marketId + '"><strong>' + U.esc(p.q) + "</strong><br><span class='micro-label'>" + U.esc(p.category) + (p.scoreAtEntry ? " · score " + p.scoreAtEntry + " at entry" : "") + "</span></td>" +
        "<td>" + U.sideBadge(p.side) + "</td>" +
        '<td class="num">' + p.entry + "¢</td>" +
        '<td class="num">' + v.cur + "¢</td>" +
        '<td class="num">' + U.money(p.cost) + "</td>" +
        '<td class="num ' + (v.pnl > 0 ? "pos" : v.pnl < 0 ? "neg" : "") + '">' + U.money(v.pnl) + "</td>" +
        '<td><button class="btn sm" data-close="' + p.id + '">Close</button></td></tr>';
    }).join("");
    return '<table class="data"><thead><tr><th>Market</th><th>Side</th><th style="text-align:right">Entry</th><th style="text-align:right">Now</th><th style="text-align:right">Cost</th><th style="text-align:right">Unrealised</th><th></th></tr></thead><tbody>' + rows + "</tbody></table>";
  }

  function closedTable(closed) {
    var U = g.UI;
    var rows = closed.slice().reverse().map(function (p) {
      return "<tr>" +
        "<td><strong>" + U.esc(p.q) + "</strong><br><span class='micro-label'>" + U.esc(p.category) + "</span></td>" +
        "<td>" + U.sideBadge(p.side) + "</td>" +
        '<td class="num">' + p.entry + "¢ → " + p.exit + "¢</td>" +
        '<td class="num">' + U.money(p.cost) + "</td>" +
        '<td class="num ' + (p.pnl > 0 ? "pos" : p.pnl < 0 ? "neg" : "") + '">' + U.money(p.pnl) + "</td></tr>";
    }).join("");
    return '<table class="data"><thead><tr><th>Market</th><th>Side</th><th style="text-align:right">Entry → Exit</th><th style="text-align:right">Cost</th><th style="text-align:right">P&L</th></tr></thead><tbody>' + rows + "</tbody></table>";
  }

  function byBuckets(positions) {
    var U = g.UI;
    var byCat = {}, bySig = {};
    positions.forEach(function (p) {
      var v = p.status === "closed" ? { pnl: p.pnl } : g.State.positionValue(p);
      add(byCat, p.category, v.pnl, p.cost);
      add(bySig, p.signalType || "manual", v.pnl, p.cost);
    });
    function add(map, key, pnl, cost) {
      if (!map[key]) map[key] = { pnl: 0, cost: 0, n: 0 };
      map[key].pnl += pnl; map[key].cost += cost; map[key].n++;
    }
    function tbl(map, label) {
      var rows = Object.keys(map).map(function (k) {
        var b = map[k];
        var roi = b.cost ? Math.round(1000 * b.pnl / b.cost) / 10 : 0;
        return "<tr><td>" + U.esc(sigLabel(k)) + '</td><td class="num">' + b.n + '</td><td class="num ' + (b.pnl > 0 ? "pos" : b.pnl < 0 ? "neg" : "") + '">' + U.money(Math.round(b.pnl * 100) / 100) + '</td><td class="num">' + U.pct(roi) + "</td></tr>";
      }).join("");
      return "<div><div class='micro-label' style='margin-bottom:6px'>" + label + '</div><table class="data"><thead><tr><th></th><th style="text-align:right">Positions</th><th style="text-align:right">P&L</th><th style="text-align:right">ROI</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
    }
    return '<div class="two-col">' + tbl(byCat, "By category") + tbl(bySig, "By dominant signal at entry") + "</div>";
  }

  function sigLabel(k) {
    return { gap: "Probability gap", smart: "Smart traders", evidence: "Evidence", quality: "Market quality", sentiment: "Sentiment", timing: "Timing", manual: "Manual (no signal)" }[k] || k;
  }

  function benchmarks() {
    var U = g.UI;
    var rows = g.Strategy.backtest(g.State.settings());
    var best = Math.max.apply(null, rows.map(function (r) { return r.pnl; }));
    var html = rows.map(function (r) {
      var hl = r.key === "strategy" ? ' style="background:var(--brass-dim)"' : "";
      return "<tr" + hl + "><td>" + U.esc(r.name) + (r.pnl === best && r.trades ? ' <span class="flag-new">best</span>' : "") + "</td>" +
        '<td class="num">' + r.trades + "</td>" +
        '<td class="num">' + (r.trades ? r.winRate + "%" : "—") + "</td>" +
        '<td class="num ' + (r.pnl > 0 ? "pos" : r.pnl < 0 ? "neg" : "") + '">' + U.money(r.pnl) + "</td>" +
        '<td class="num ' + (r.roi > 0 ? "pos" : r.roi < 0 ? "neg" : "") + '">' + U.pct(r.roi) + "</td></tr>";
    }).join("");
    return '<table class="data"><thead><tr><th>Approach</th><th style="text-align:right">Trades</th><th style="text-align:right">Win rate</th><th style="text-align:right">P&L ($100 stakes)</th><th style="text-align:right">ROI</th></tr></thead><tbody>' + html + "</tbody></table>" +
      '<p style="font-size:11.5px;color:var(--text-faint);margin-top:10px">12 fictional resolved markets — enough to demonstrate the comparison, far too few to prove anything. Changing the minimum score in Settings changes which trades the strategy takes.</p>';
  }

  function horizonSplit() {
    var U = g.UI;
    var s = g.State.settings();
    var buckets = { short: { n: 0, w: 0, pnl: 0, days: 0 }, long: { n: 0, w: 0, pnl: 0, days: 0 } };
    g.DEMO.RESOLVED.forEach(function (r) {
      if (!r.side || r.score < s.minScore) return;
      var pnl = r.side === "yes"
        ? (r.outcome === 1 ? 100 * (100 / r.price) - 100 : -100)
        : (r.outcome === 0 ? 100 * (100 / (100 - r.price)) - 100 : -100);
      var b = buckets[r.days <= 7 ? "short" : "long"];
      b.n++; b.pnl += pnl; b.days += r.days; if (pnl > 0) b.w++;
    });
    function row(label, b) {
      if (!b.n) return "<tr><td>" + label + '</td><td class="num" colspan="5" style="color:var(--text-faint)">no trades at current settings</td></tr>';
      var roi = 100 * b.pnl / (b.n * 100);
      var avgD = b.days / b.n;
      var roiDay = roi / avgD;
      return "<tr><td><strong>" + label + "</strong></td>" +
        '<td class="num">' + b.n + "</td>" +
        '<td class="num">' + Math.round(100 * b.w / b.n) + "%</td>" +
        '<td class="num ' + (b.pnl >= 0 ? "pos" : "neg") + '">' + U.money(Math.round(b.pnl * 10) / 10) + "</td>" +
        '<td class="num">' + U.pct(Math.round(roi * 10) / 10) + "</td>" +
        '<td class="num" style="color:var(--brass)">' + U.pct(Math.round(roiDay * 10) / 10) + "/day</td></tr>";
    }
    return '<table class="data"><thead><tr><th>Sleeve</th><th style="text-align:right">Trades</th><th style="text-align:right">Win rate</th><th style="text-align:right">P&L</th><th style="text-align:right">ROI</th><th style="text-align:right">Capital velocity</th></tr></thead><tbody>' +
      row("Short (≤7 days, mostly sports)", buckets.short) +
      row("Long (>7 days)", buckets.long) +
      "</tbody></table>" +
      '<p style="font-size:11.5px;color:var(--text-faint);margin-top:10px">The long sleeve earns more per trade; the short sleeve recycles capital far faster. Running both — with the per-category exposure caps in Settings — is how they combine.</p>';
  }

  g.Pages = g.Pages || {};
  g.Pages.portfolio = { render: render };
})(typeof window !== "undefined" ? window : globalThis);

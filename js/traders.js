/* Polymark — Smart traders page */
(function (g) {
  "use strict";

  var filters = { category: "all", window: "all" };

  function render(root) {
    var s = {};
    for (var k in g.State.settings()) s[k] = g.State.settings()[k];
    s.traderWindow = filters.window;
    var U = g.UI;

    var traders = g.DEMO.TRADERS.map(function (t) {
      return { t: t, rel: g.Strategy.reliability(t, s) };
    }).filter(function (x) {
      if (filters.category === "all") return true;
      return x.t.catROI && (filters.category in x.t.catROI);
    }).sort(function (a, b) { return b.rel.score - a.rel.score; });

    var cats = ['<option value="all">All categories</option>'];
    g.DEMO.CATEGORIES.forEach(function (c) {
      cats.push('<option value="' + c + '"' + (filters.category === c ? " selected" : "") + ">" + c + "</option>");
    });

    root.innerHTML =
      '<div class="page-head"><h1 class="page-title">Smart Traders</h1>' +
      '<p class="page-sub">Reliability is not profit. It weights sample size, consistency, drawdown and category skill — and penalises accounts whose profit came from one lucky win. Traders below 30 resolved markets are capped as unproven.</p></div>' +
      '<div class="filter-bar">' +
      '<select data-f="category">' + cats.join("") + "</select>" +
      '<select data-f="window">' +
      '<option value="all"' + (filters.window === "all" ? " selected" : "") + ">Lifetime performance</option>" +
      '<option value="recent"' + (filters.window === "recent" ? " selected" : "") + ">Recent performance (90d)</option>" +
      "</select>" +
      '<span class="filter-count">' + traders.length + " tracked wallets (simulated)</span></div>" +
      '<div class="trader-grid">' + traders.map(function (x) { return card(x.t, x.rel, s); }).join("") + "</div>";

    root.querySelectorAll("[data-f]").forEach(function (el) {
      el.addEventListener("change", function () { filters[el.getAttribute("data-f")] = el.value; g.App.rerender(); });
    });
  }

  function positionsFor(traderId) {
    var out = [];
    g.DEMO.MARKETS.forEach(function (m) {
      m.positions.forEach(function (p) {
        if (p.t === traderId && p.action !== "exit") out.push({ m: m, p: p });
      });
    });
    return out;
  }

  function card(t, rel, s) {
    var U = g.UI;
    var roiShown = s.traderWindow === "recent" ? t.recentROI : t.roi;
    var col = rel.score >= 60 ? "var(--yes)" : rel.score >= 45 ? "var(--brass)" : "var(--text-faint)";
    var bestCats = Object.keys(t.catROI || {}).sort(function (a, b) { return t.catROI[b] - t.catROI[a]; }).slice(0, 2);
    var pos = positionsFor(t.id);
    var flags = [];
    if (rel.gated) flags.push('<span class="chip" style="color:var(--no)">unproven · ' + t.resolved + " resolved</span>");
    if (t.topWinShare > 0.4) flags.push('<span class="chip" style="color:var(--no)">' + Math.round(t.topWinShare * 100) + "% of profit from one win</span>");
    if (t.maxDD > 0.3) flags.push('<span class="chip" style="color:var(--no)">deep drawdowns</span>');
    if (t.recentROI < 0) flags.push('<span class="chip" style="color:var(--brass)">recent slump</span>');
    if (t.consistency >= 0.8) flags.push('<span class="chip" style="color:var(--yes)">high consistency</span>');

    var posHtml = pos.length
      ? pos.map(function (x) {
          return '<div style="display:flex;gap:8px;align-items:center;font-size:11.5px;padding:5px 0;border-top:1px solid var(--border-soft)">' +
            U.sideBadge(x.p.side) +
            '<span style="flex:1;color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer" onclick="location.hash=\'#/market/' + x.m.id + '\'">' + U.esc(x.m.q) + "</span>" +
            '<span class="mono" style="color:var(--text-faint)">' + x.p.entry + "¢ · " + U.moneyShort(x.p.size) + "</span></div>";
        }).join("")
      : '<div style="font-size:11.5px;color:var(--text-faint);padding-top:6px;border-top:1px solid var(--border-soft)">No current tracked positions</div>';

    return '<div class="tcard">' +
      '<div class="tcard-head">' +
      '<div class="tcard-ava">' + U.esc(t.name[0].toUpperCase()) + "</div>" +
      '<div><div class="tcard-name">' + U.esc(t.name) + '</div><div class="tcard-addr">' + U.esc(t.addr) + "</div></div>" +
      '<div class="tcard-rel"><span class="mono" style="color:' + col + '">' + rel.score + '</span><div class="micro-label">reliability</div></div>' +
      "</div>" +
      '<div class="tcard-stats">' +
      stat("Resolved", t.resolved) +
      stat("ROI " + (s.traderWindow === "recent" ? "(90d)" : ""), U.pct(Math.round(roiShown * 100)), roiShown >= 0 ? "pos" : "neg") +
      stat("Consistency", Math.round(t.consistency * 100) + "%") +
      stat("Max DD", "-" + Math.round(t.maxDD * 100) + "%", "neg") +
      stat("Long ROI", U.pct(Math.round(t.longROI * 100))) +
      stat("Avg liq", U.moneyShort(t.avgLiq)) +
      "</div>" +
      '<p style="font-size:11.5px;color:var(--text-faint);margin-bottom:8px">' + U.esc(t.style) +
      (bestCats.length ? " · Best: " + bestCats.join(", ") : "") + "</p>" +
      '<div class="tcard-flags">' + flags.join("") + "</div>" +
      '<div style="margin-top:10px"><div class="micro-label" style="margin-bottom:2px">Current positions</div>' + posHtml + "</div>" +
      "</div>";
  }

  function stat(label, val, cls) {
    return '<div class="mnum"><span class="micro-label">' + label + '</span><span class="mono ' + (cls || "") + '" style="font-size:12.5px">' + val + "</span></div>";
  }

  g.Pages = g.Pages || {};
  g.Pages.traders = { render: render };
})(typeof window !== "undefined" ? window : globalThis);

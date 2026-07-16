/* Polymark — Opportunities dashboard */
(function (g) {
  "use strict";

  var filters = { category: "all", side: "all", minScore: 0, minLiq: 0, maxDays: 0, confidence: "all", watchOnly: false, sort: "score" };

  function render(root) {
    var s = g.State.settings();
    var all = g.Strategy.analyzeAll(s);

    // horizon limit from settings
    all = all.filter(function (a) { return a.market.days <= s.maxDays; });

    var candidates = all.filter(function (a) { return a.side && a.score >= s.minScore; });
    var noTrade = all.length - all.filter(function (a) { return a.side; }).length;
    var avgEdge = 0;
    if (candidates.length) {
      for (var i = 0; i < candidates.length; i++) avgEdge += candidates[i].edgeNet;
      avgEdge = Math.round(avgEdge / candidates.length * 10) / 10;
    }

    var list = applyFilters(all);

    root.innerHTML =
      '<div class="page-head"><h1 class="page-title">Opportunities</h1>' +
      '<p class="page-sub">Every open market, scored 0–100 with the suggested side. Most markets are correctly <em>not</em> worth trading — "no trade" is a result, not a failure.</p></div>' +

      '<div class="stat-strip">' +
      statCell("Markets scanned", all.length, "") +
      statCell("Trade candidates", candidates.length, candidates.length ? "brass" : "") +
      statCell("Avg edge (candidates)", candidates.length ? avgEdge + "¢" : "—", candidates.length ? "pos" : "") +
      statCell("No-trade rate", Math.round(100 * noTrade / Math.max(1, all.length)) + "%", "") +
      statCell("Min score (settings)", s.minScore, "") +
      "</div>" +

      filterBar(list.length, all.length) +
      '<div class="card-grid">' + list.map(card).join("") + "</div>" +
      (list.length === 0 ? '<div class="empty-state"><div class="big">Nothing matches these filters</div>Loosen a filter or lower the score threshold in Settings.</div>' : "");

    wire(root);
  }

  function statCell(label, value, cls) {
    return '<div class="stat-cell"><span class="micro-label">' + label + '</span><span class="stat-value ' + (cls || "") + '">' + value + "</span></div>";
  }

  function applyFilters(all) {
    var f = filters;
    var out = all.filter(function (a) {
      var m = a.market;
      if (f.category !== "all" && m.category !== f.category) return false;
      if (f.side !== "all") {
        if (f.side === "none" && a.side) return false;
        if (f.side !== "none" && a.side !== f.side) return false;
      }
      if (a.score < f.minScore) return false;
      if (m.liq < f.minLiq) return false;
      if (f.maxDays && m.days > f.maxDays) return false;
      if (f.confidence !== "all" && g.Strategy.CONF_RANK[a.confidence] < g.Strategy.CONF_RANK[f.confidence]) return false;
      if (f.watchOnly && !g.State.isWatched(m.id)) return false;
      return true;
    });
    if (f.sort === "edgeDay") out.sort(function (a, b) { return b.edgePerDay - a.edgePerDay; });
    else if (f.sort === "liquidity") out.sort(function (a, b) { return b.market.liq - a.market.liq; });
    else if (f.sort === "ending") out.sort(function (a, b) { return a.market.days - b.market.days; });
    return out;
  }

  function filterBar(shown, total) {
    var cats = ['<option value="all">All categories</option>'];
    for (var i = 0; i < g.DEMO.CATEGORIES.length; i++) {
      var c = g.DEMO.CATEGORIES[i];
      cats.push('<option value="' + c + '"' + (filters.category === c ? " selected" : "") + ">" + c + "</option>");
    }
    return '<div class="filter-bar">' +
      '<select data-f="category">' + cats.join("") + "</select>" +
      '<select data-f="side">' +
      opt("all", "All sides", filters.side) + opt("yes", "YES only", filters.side) +
      opt("no", "NO only", filters.side) + opt("none", "No trade", filters.side) + "</select>" +
      '<select data-f="minScore">' +
      opt("0", "Any score", String(filters.minScore)) + opt("50", "Score ≥ 50", String(filters.minScore)) +
      opt("65", "Score ≥ 65", String(filters.minScore)) + opt("80", "Score ≥ 80", String(filters.minScore)) + "</select>" +
      '<select data-f="minLiq">' +
      opt("0", "Any liquidity", String(filters.minLiq)) + opt("25000", "Liq ≥ $25k", String(filters.minLiq)) +
      opt("50000", "Liq ≥ $50k", String(filters.minLiq)) + opt("100000", "Liq ≥ $100k", String(filters.minLiq)) + "</select>" +
      '<select data-f="maxDays">' +
      opt("0", "Any horizon", String(filters.maxDays)) + opt("14", "≤ 2 weeks", String(filters.maxDays)) +
      opt("60", "≤ 2 months", String(filters.maxDays)) + opt("180", "≤ 6 months", String(filters.maxDays)) + "</select>" +
      '<select data-f="confidence">' +
      opt("all", "Any confidence", filters.confidence) + opt("medium", "Confidence ≥ medium", filters.confidence) +
      opt("high", "High confidence", filters.confidence) + "</select>" +
      '<button class="filter-chip' + (filters.watchOnly ? " on" : "") + '" data-f="watchOnly">★ Watchlist</button>' +
      '<select data-f="sort">' +
      opt("score", "Sort: score", filters.sort) + opt("edgeDay", "Sort: edge/day", filters.sort) +
      opt("liquidity", "Sort: liquidity", filters.sort) + opt("ending", "Sort: ending soon", filters.sort) + "</select>" +
      '<span class="filter-count">' + shown + " of " + total + " markets</span>" +
      "</div>";
  }

  function opt(v, label, cur) { return '<option value="' + v + '"' + (cur === v ? " selected" : "") + ">" + label + "</option>"; }

  function card(a) {
    var m = a.market, U = g.UI;
    var watched = g.State.isWatched(m.id);
    return '<div class="mcard">' +
      '<div class="mcard-top">' +
      '<div style="flex:1">' +
      '<div class="mcard-meta" style="margin-bottom:7px">' +
      '<span class="chip cat">' + U.esc(m.category) + "</span>" +
      U.sideBadge(a.side) + U.classChip(a) +
      "</div>" +
      '<div class="mcard-q" data-go="' + m.id + '">' + U.esc(m.q) + "</div>" +
      "</div>" + U.ring(a.score, a.classification) +
      "</div>" +

      '<div class="mcard-nums">' +
      num("YES", m.yes + "¢") + num("NO", (100 - m.yes) + "¢") +
      num("Fair est.", a.fair + "¢") +
      num("Edge", a.side ? '<span class="pos">' + a.edgeNet + "¢</span>" : "—") +
      num("Liquidity", U.moneyShort(m.liq)) + num("Spread", m.spread + "¢") +
      num("Ends", U.daysLabel(m.days)) + num("Confidence", a.confidence) +
      "</div>" +

      '<div class="mcard-reason"><strong>Why:</strong> ' + U.esc(a.reason) + "</div>" +
      '<div class="mcard-risk">' + U.esc(a.risk) + "</div>" +

      '<div class="mcard-foot">' + U.agreeDots(a) +
      '<button class="btn sm' + (watched ? " watch-on" : "") + '" data-watch="' + m.id + '">' + (watched ? "★ Watching" : "☆ Watch") + "</button>" +
      '<button class="btn sm primary" data-go="' + m.id + '">Analyse</button>' +
      "</div></div>";
  }

  function num(label, val) {
    return '<div class="mnum"><span class="micro-label">' + label + '</span><span class="mono">' + val + "</span></div>";
  }

  function wire(root) {
    root.querySelectorAll("[data-f]").forEach(function (el) {
      var key = el.getAttribute("data-f");
      if (key === "watchOnly") {
        el.addEventListener("click", function () { filters.watchOnly = !filters.watchOnly; g.App.rerender(); });
      } else {
        el.addEventListener("change", function () {
          var v = el.value;
          filters[key] = (key === "minScore" || key === "minLiq" || key === "maxDays") ? parseInt(v, 10) : v;
          g.App.rerender();
        });
      }
    });
    root.querySelectorAll("[data-go]").forEach(function (el) {
      el.addEventListener("click", function () { location.hash = "#/market/" + el.getAttribute("data-go"); });
    });
    root.querySelectorAll("[data-watch]").forEach(function (el) {
      el.addEventListener("click", function () {
        var added = g.State.toggleWatch(el.getAttribute("data-watch"));
        g.UI.toast(added ? "Added to watchlist" : "Removed from watchlist", added ? "ok" : "");
      });
    });
  }

  g.Pages = g.Pages || {};
  g.Pages.dashboard = { render: render };
})(typeof window !== "undefined" ? window : globalThis);

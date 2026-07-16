/* Polymark — Strategy settings page. Every change re-scores everything live. */
(function (g) {
  "use strict";

  function render(root) {
    var s = g.State.settings();

    root.innerHTML =
      '<div class="page-head"><h1 class="page-title">Strategy Settings</h1>' +
      '<p class="page-sub">These thresholds feed directly into the scoring engine and risk controls. Change one and every score, classification and benchmark recomputes immediately.</p></div>' +

      panel("Signal thresholds",
        range("minScore", "Minimum opportunity score", "Below this, markets are never trade candidates", 40, 90, 1, s.minScore, s.minScore) +
        range("minEdge", "Minimum net edge", "Required distance from fair value after costs (¢)", 1, 15, 1, s.minEdge, s.minEdge + "¢") +
        range("minAgreement", "Minimum trader agreement", "Reliable traders needed for the independence bonus", 1, 5, 1, s.minAgreement, s.minAgreement) +
        select("minConfidence", "Evidence-confidence requirement", "Trades below this confidence are blocked", ["low", "medium", "high"], s.minConfidence) +
        range("sideBias", "YES/NO preference", "0 is neutral; positive nudges YES scores up, negative nudges NO", -10, 10, 1, s.sideBias, s.sideBias > 0 ? "+" + s.sideBias + " YES" : s.sideBias < 0 ? s.sideBias + " NO" : "neutral") +
        select("traderWindow", "Trader-performance window", "Which track record feeds reliability scores", ["all", "recent"], s.traderWindow)) +

      panel("Market quality gates",
        range("minLiquidity", "Minimum liquidity", "Markets below this are classified Avoid", 5000, 150000, 5000, s.minLiquidity, "$" + (s.minLiquidity / 1000) + "k") +
        range("maxSpread", "Maximum spread", "Wider spreads are rejected outright", 2, 12, 1, s.maxSpread, s.maxSpread + "¢") +
        range("maxDays", "Time-to-resolution limit", "Markets further out are hidden from the dashboard", 14, 365, 7, s.maxDays, s.maxDays + "d")) +

      panel("Paper-trading risk controls",
        select("bankroll", "Paper bankroll", "Changing this resets the portfolio", [1000, 10000], s.bankroll, function (v) { return "$" + Number(v).toLocaleString(); }) +
        range("maxPositionPct", "Max position size", "Per trade, % of bankroll", 1, 25, 1, s.maxPositionPct, s.maxPositionPct + "%") +
        range("maxMarketPct", "Max exposure per market", "", 5, 40, 1, s.maxMarketPct, s.maxMarketPct + "%") +
        range("maxCategoryPct", "Max exposure per category", "", 10, 60, 5, s.maxCategoryPct, s.maxCategoryPct + "%") +
        range("maxOpenPositions", "Max simultaneous positions", "", 1, 20, 1, s.maxOpenPositions, s.maxOpenPositions) +
        range("dailyLossPct", "Daily simulated-loss limit", "Trading pauses for the session after losing this much", 2, 25, 1, s.dailyLossPct, s.dailyLossPct + "%")) +

      '<div class="note-box">Also always on, not configurable: no doubling down on losing positions, no martingale, no trades in markets with unclear resolution rules, and a cooldown after ±8¢ daily moves.</div>';

    root.querySelectorAll("[data-set]").forEach(function (el) {
      var key = el.getAttribute("data-set");
      el.addEventListener("change", function () {
        var v = el.tagName === "SELECT" && isNaN(Number(el.value)) ? el.value : Number(el.value);
        if (key === "bankroll" && !confirm("Changing the bankroll resets the paper portfolio. Continue?")) {
          el.value = g.State.settings().bankroll;
          return;
        }
        g.State.setSetting(key, v);
        g.App.rerender();
      });
      if (el.type === "range") {
        el.addEventListener("input", function () {
          var out = el.closest(".setting-row").querySelector(".setting-val");
          if (out) out.textContent = liveLabel(key, el.value);
        });
      }
    });
  }

  function liveLabel(key, v) {
    if (key === "minEdge" || key === "maxSpread") return v + "¢";
    if (key === "minLiquidity") return "$" + (v / 1000) + "k";
    if (key === "maxDays") return v + "d";
    if (key.indexOf("Pct") !== -1) return v + "%";
    if (key === "sideBias") return v > 0 ? "+" + v + " YES" : v < 0 ? v + " NO" : "neutral";
    return v;
  }

  function panel(title, body) { return '<div class="panel"><div class="panel-title">' + title + "</div>" + body + "</div>"; }

  function range(key, name, desc, min, max, step, val, label) {
    return '<div class="setting-row"><div><div class="setting-name">' + name + '</div>' +
      (desc ? '<div class="setting-desc">' + desc + "</div>" : "") + "</div>" +
      '<input type="range" data-set="' + key + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '">' +
      '<span class="setting-val">' + label + "</span></div>";
  }

  function select(key, name, desc, options, cur, fmt) {
    var opts = options.map(function (o) {
      return '<option value="' + o + '"' + (String(cur) === String(o) ? " selected" : "") + ">" + (fmt ? fmt(o) : o) + "</option>";
    }).join("");
    return '<div class="setting-row"><div><div class="setting-name">' + name + '</div>' +
      (desc ? '<div class="setting-desc">' + desc + "</div>" : "") + "</div>" +
      '<select data-set="' + key + '">' + opts + "</select><span></span></div>";
  }

  g.Pages = g.Pages || {};
  g.Pages.settings = { render: render };
})(typeof window !== "undefined" ? window : globalThis);

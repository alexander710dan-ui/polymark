/* Polymark — Watchlist page: tracks what changed since you added each market */
(function (g) {
  "use strict";

  function render(root) {
    var U = g.UI;
    var s = g.State.settings();
    var wl = g.State.get().watchlist;
    var ids = Object.keys(wl);

    if (!ids.length) {
      root.innerHTML =
        '<div class="page-head"><h1 class="page-title">Watchlist</h1></div>' +
        '<div class="empty-state"><div class="big">Nothing watched yet</div>Add markets from the dashboard with the ☆ Watch button — this page then tracks price, score and signal changes since the moment you added them.</div>';
      return;
    }

    var rows = ids.map(function (id) {
      var m = g.DEMO.marketById(id);
      var snap = wl[id];
      if (!m) return "";
      var a = g.Strategy.analyze(m, s);
      var dPrice = Math.round((m.yes - snap.yes) * 10) / 10;
      var dScore = a.score - snap.score;
      var newActivity = m.positions.length > snap.positionsCount;
      var newEvidence = m.evidence.length > snap.evidenceCount;
      var sideChanged = (a.side || "none") !== (snap.side || "none");
      var nextEvent = m.events.length ? "+" + m.events[0].inDays + "d " + m.events[0].label : "—";

      return '<tr class="clickable" data-go="' + m.id + '">' +
        "<td><strong>" + U.esc(m.q) + "</strong><br><span class='micro-label'>" + U.esc(m.category) + " · ends " + U.daysLabel(m.days) + "</span></td>" +
        '<td class="num">' + m.yes + "¢ <span class='" + (dPrice > 0 ? "delta-up" : dPrice < 0 ? "delta-down" : "") + "'>" + (dPrice ? U.signed(dPrice, "¢") : "±0") + "</span></td>" +
        '<td class="num">' + a.score + " <span class='" + (dScore > 0 ? "delta-up" : dScore < 0 ? "delta-down" : "") + "'>" + (dScore ? U.signed(dScore) : "±0") + "</span></td>" +
        "<td>" + U.sideBadge(snap.side) + (sideChanged ? " → " + U.sideBadge(a.side) : "") + "</td>" +
        "<td>" +
        (newActivity ? '<span class="flag-new">new trader activity</span> ' : "") +
        (newEvidence ? '<span class="flag-new">new evidence</span> ' : "") +
        (!newActivity && !newEvidence ? '<span style="color:var(--text-faint)">—</span>' : "") + "</td>" +
        '<td style="font-size:11.5px;color:var(--text-dim)">' + U.esc(nextEvent) + "</td>" +
        '<td><button class="btn sm" data-unwatch="' + m.id + '">Remove</button></td></tr>';
    }).join("");

    root.innerHTML =
      '<div class="page-head"><h1 class="page-title">Watchlist</h1>' +
      '<p class="page-sub">Changes are measured against the snapshot taken when you added each market. In this prototype the fake data is static, so deltas mainly appear when your <a href="#/settings" style="color:var(--brass)">settings</a> change the scores.</p></div>' +
      '<div class="panel" style="padding:8px 12px"><table class="data"><thead><tr>' +
      "<th>Market</th><th style='text-align:right'>YES price · Δ</th><th style='text-align:right'>Score · Δ</th><th>Side then → now</th><th>New signals</th><th>Next event</th><th></th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";

    root.querySelectorAll("[data-go]").forEach(function (el) {
      el.addEventListener("click", function (ev) {
        if (ev.target.closest("[data-unwatch]")) return;
        location.hash = "#/market/" + el.getAttribute("data-go");
      });
    });
    root.querySelectorAll("[data-unwatch]").forEach(function (el) {
      el.addEventListener("click", function () {
        g.State.toggleWatch(el.getAttribute("data-unwatch"));
        g.UI.toast("Removed from watchlist");
      });
    });
  }

  g.Pages = g.Pages || {};
  g.Pages.watchlist = { render: render };
})(typeof window !== "undefined" ? window : globalThis);

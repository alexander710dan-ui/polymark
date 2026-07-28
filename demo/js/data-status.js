/* Polymark — Data status page */
(function (g) {
  "use strict";

  function render(root) {
    var U = g.UI;
    var st = g.State.get();

    var srcRows = g.DEMO.SOURCES.map(function (s) {
      var col = s.status === "simulated" ? "var(--brass)" : "var(--text-faint)";
      return "<tr><td><strong>" + U.esc(s.name) + "</strong></td>" +
        '<td><span class="chip" style="color:' + col + '">' + U.esc(s.status) + "</span></td>" +
        '<td style="color:var(--text-dim);font-size:12px">' + U.esc(s.note) + "</td></tr>";
    }).join("");

    root.innerHTML =
      '<div class="page-head"><h1 class="page-title">Data Status</h1>' +
      '<p class="page-sub">Everything in this prototype is fake and clearly labelled as such. No wallet, no keys, no live prices, no real trades — by design.</p></div>' +

      '<div class="panel" style="border-color:rgba(201,163,92,.4)"><div class="panel-title" style="color:var(--brass)">Simulated data mode</div>' +
      '<p style="font-size:13px;color:var(--text-dim);line-height:1.6">All ' + g.DEMO.MARKETS.length + " markets, " + g.DEMO.TRADERS.length +
      " traders, every price, position, evidence item and named source are hand-authored fiction. The <em>scoring engine and risk controls are real</em> — they are what this prototype exists to test. Connecting read-only Polymarket data is phase 6, only after the strategy and interface are approved.</p></div>" +

      panel("Data sources", '<table class="data"><thead><tr><th>Source</th><th>Status</th><th>Note</th></tr></thead><tbody>' + srcRows + "</tbody></table>") +

      panel("Missing before live use", '<ul class="plain-list">' +
        "<li>Wallet-level trade history for real trader scoring (requires on-chain indexing)</li>" +
        "<li>Real order books and spreads (Polymarket CLOB API)</li>" +
        "<li>Independent evidence feeds — without them the fair-value estimate mostly re-processes the price itself</li>" +
        "<li>A resolved-market archive large enough to validate the score against outcomes</li>" +
        "<li>Multi-outcome (nominee-style) market support — per-candidate edge, sum-of-book checks, stale-quote detection. The prototype models binary YES/NO markets only.</li></ul>") +

      panel("Local storage",
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">' +
        '<button class="btn" id="ds-export">Export state (JSON)</button>' +
        '<label class="btn" style="cursor:pointer">Import state<input type="file" id="ds-import" accept=".json" style="display:none"></label>' +
        '<button class="btn" id="ds-reset-pf">Reset paper portfolio</button>' +
        '<button class="btn" id="ds-reset" style="color:var(--no);border-color:rgba(201,111,99,.4)">Reset entire demo</button>' +
        "</div>" +
        '<p style="font-size:11.5px;color:var(--text-faint)">State lives in your browser\'s LocalStorage (key <span class="mono">polymark_state_v1</span>). Demo created ' + U.esc(new Date(st.createdAt).toLocaleString()) + ".</p>");

    root.querySelector("#ds-export").addEventListener("click", function () {
      var blob = new Blob([g.State.exportJson()], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "polymark-export.json";
      a.click();
      URL.revokeObjectURL(a.href);
      U.toast("State exported", "ok");
    });
    root.querySelector("#ds-import").addEventListener("change", function (ev) {
      var file = ev.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try { g.State.importJson(reader.result); U.toast("State imported", "ok"); g.App.rerender(); }
        catch (e) { U.toast("Import failed: " + e.message, "err"); }
      };
      reader.readAsText(file);
    });
    root.querySelector("#ds-reset-pf").addEventListener("click", function () {
      if (confirm("Reset the paper portfolio? Positions and balance are wiped.")) {
        g.State.resetPortfolio(); U.toast("Portfolio reset", "ok"); g.App.rerender();
      }
    });
    root.querySelector("#ds-reset").addEventListener("click", function () {
      if (confirm("Reset EVERYTHING — settings, watchlist, portfolio?")) {
        g.State.resetAll(); U.toast("Demo reset", "ok"); g.App.rerender();
      }
    });
  }

  function panel(title, body) { return '<div class="panel"><div class="panel-title">' + title + "</div>" + body + "</div>"; }

  g.Pages = g.Pages || {};
  g.Pages.data = { render: render };
})(typeof window !== "undefined" ? window : globalThis);

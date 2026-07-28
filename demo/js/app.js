/* Polymark — hash router and app boot */
(function (g) {
  "use strict";

  var current = { page: "dashboard", arg: null };

  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    if (!h) return { page: "dashboard", arg: null };
    var parts = h.split("/");
    if (parts[0] === "market" && parts[1]) return { page: "market", arg: parts[1] };
    if (g.Pages[parts[0]]) return { page: parts[0], arg: null };
    return { page: "dashboard", arg: null };
  }

  function render() {
    var main = document.getElementById("main");
    var route = current;
    if (route.page === "market") g.Pages.market.render(main, route.arg);
    else g.Pages[route.page].render(main);
    updateChrome();
  }

  function onHashChange() {
    var next = parseHash();
    var pageChanged = next.page !== current.page || next.arg !== current.arg;
    current = next;
    if (pageChanged && next.page === "market") g.Pages.market.resetSide();
    render();
    if (pageChanged) window.scrollTo(0, 0);
  }

  function updateChrome() {
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === (current.page === "market" ? "dashboard" : current.page));
    });
    var st = g.State.get();
    var open = st.positions.filter(function (p) { return p.status === "open"; });
    var openValue = 0;
    open.forEach(function (p) { openValue += g.State.positionValue(p).value; });
    var bal = document.getElementById("sidebar-balance");
    if (bal) bal.textContent = g.UI.money(Math.round((st.balance + openValue) * 100) / 100);
    var wc = document.getElementById("watch-count");
    var n = Object.keys(st.watchlist).length;
    if (wc) wc.textContent = n ? String(n) : "";
  }

  g.App = { rerender: render };

  g.State.subscribe(updateChrome);
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
})(typeof window !== "undefined" ? window : globalThis);

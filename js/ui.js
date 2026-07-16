/* Polymark shared UI helpers */
(function (g) {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function money(v) {
    var sign = v < 0 ? "-" : "";
    return sign + "$" + Math.abs(v).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  function moneyShort(v) {
    if (Math.abs(v) >= 1000) return "$" + (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k";
    return "$" + v;
  }
  function cents(v) { return v + "¢"; }
  function signed(v, unit) { return (v > 0 ? "+" : "") + v + (unit || ""); }
  function pct(v) { return (v > 0 ? "+" : "") + v + "%"; }

  function daysLabel(d) {
    if (d < 1) return "<1d";
    if (d < 30) return d + "d";
    if (d < 90) return Math.round(d / 7) + "w";
    return Math.round(d / 30) + "mo";
  }

  function classColor(classification) {
    return { strong: "var(--yes)", possible: "#a3c47e", watch: "var(--brass)", avoid: "var(--text-faint)", insufficient: "var(--blue)" }[classification] || "var(--text-faint)";
  }

  function ring(score, classification, size) {
    size = size || 54;
    var r = (size - 8) / 2, c = 2 * Math.PI * r;
    var fill = c * (score / 100);
    var col = classColor(classification);
    return '<div class="ring" style="width:' + size + 'px;height:' + size + 'px">' +
      '<svg width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--border)" stroke-width="3.5"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="' + fill.toFixed(1) + " " + c.toFixed(1) + '"/>' +
      "</svg>" +
      '<span class="ring-num" style="color:' + col + '">' + score + "</span></div>";
  }

  function sideBadge(side, big) {
    var cls = side === "yes" ? "yes" : side === "no" ? "no" : "none";
    var txt = side === "yes" ? "YES" : side === "no" ? "NO" : "NO TRADE";
    return '<span class="side-badge ' + cls + '"' + (big ? ' style="font-size:12px;padding:5px 12px"' : "") + ">" + txt + "</span>";
  }

  function classChip(a) {
    return '<span class="class-chip ' + a.classification + '">' + esc(a.classLabel) + "</span>";
  }

  /* Area sparkline from a numeric series (0-100 domain) */
  function sparkline(pts, w, h, color) {
    w = w || 600; h = h || 140; color = color || "var(--brass)";
    var min = Math.min.apply(null, pts), max = Math.max.apply(null, pts);
    var pad = Math.max(4, (max - min) * 0.15);
    var lo = Math.max(0, min - pad), hi = Math.min(100, max + pad);
    function x(i) { return (i / (pts.length - 1)) * w; }
    function y(v) { return h - ((v - lo) / (hi - lo)) * (h - 10) - 5; }
    var d = "M" + x(0).toFixed(1) + "," + y(pts[0]).toFixed(1);
    for (var i = 1; i < pts.length; i++) d += "L" + x(i).toFixed(1) + "," + y(pts[i]).toFixed(1);
    var area = d + "L" + w + "," + h + "L0," + h + "Z";
    var gid = "grad" + Math.abs(g.DEMO.hashStr(pts.join(","))) % 100000;
    return '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" height="' + h + '">' +
      "<defs><linearGradient id='" + gid + "' x1='0' y1='0' x2='0' y2='1'>" +
      "<stop offset='0%' stop-color='" + color + "' stop-opacity='0.25'/>" +
      "<stop offset='100%' stop-color='" + color + "' stop-opacity='0'/></linearGradient></defs>" +
      "<path d='" + area + "' fill='url(#" + gid + ")'/>" +
      "<path d='" + d + "' fill='none' stroke='" + color + "' stroke-width='1.8'/>" +
      "<circle cx='" + x(pts.length - 1).toFixed(1) + "' cy='" + y(pts[pts.length - 1]).toFixed(1) + "' r='3' fill='" + color + "'/>" +
      "</svg>";
  }

  function toast(msg, kind) {
    var stack = document.getElementById("toast-stack");
    var el = document.createElement("div");
    el.className = "toast" + (kind ? " " + kind : "");
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(function () {
      el.style.transition = "opacity .3s"; el.style.opacity = "0";
      setTimeout(function () { el.remove(); }, 320);
    }, 3400);
  }

  function agreeDots(a) {
    var html = '<span class="agree-dots">';
    var shown = Math.min(5, a.agree);
    for (var i = 0; i < shown; i++) html += '<span class="agree-dot on"></span>';
    var opp = Math.min(5 - shown, a.opposed);
    for (var j = 0; j < opp; j++) html += '<span class="agree-dot opp"></span>';
    if (a.agree + a.opposed === 0) html += '<span class="agree-dot"></span><span class="agree-dot"></span>';
    html += '<span class="agree-label">' + a.agree + " agree" + (a.opposed ? " · " + a.opposed + " opposed" : "") +
      (a.independent && a.agree >= 2 ? " · independent" : "") + "</span></span>";
    return html;
  }

  g.UI = {
    esc: esc, money: money, moneyShort: moneyShort, cents: cents, signed: signed, pct: pct,
    daysLabel: daysLabel, ring: ring, sideBadge: sideBadge, classChip: classChip,
    classColor: classColor, sparkline: sparkline, toast: toast, agreeDots: agreeDots
  };
})(typeof window !== "undefined" ? window : globalThis);

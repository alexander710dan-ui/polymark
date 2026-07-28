/* Polymark state — settings, watchlist, paper positions. Persisted in LocalStorage. */
(function (g) {
  "use strict";

  var KEY = "polymark_state_v1";
  var listeners = [];

  function freshState() {
    var s = {};
    for (var k in g.Strategy.DEFAULTS) s[k] = g.Strategy.DEFAULTS[k];
    return {
      settings: s,
      balance: s.bankroll,
      watchlist: {},   // marketId -> snapshot at add time
      positions: [],   // open + closed paper positions
      seq: 1,
      dayPnl: 0,       // realised P&L "today" (session-scoped demo approximation)
      createdAt: new Date().toISOString()
    };
  }

  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        // merge any new default settings added since the save
        var merged = freshState();
        for (var k in parsed) merged[k] = parsed[k];
        for (var d in g.Strategy.DEFAULTS) {
          if (!(d in merged.settings)) merged.settings[d] = g.Strategy.DEFAULTS[d];
        }
        return merged;
      }
    } catch (e) { /* corrupted save: start clean */ }
    return freshState();
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full/blocked */ }
    for (var i = 0; i < listeners.length; i++) listeners[i]();
  }

  function subscribe(fn) { listeners.push(fn); }

  /* ---------------- settings ---------------- */

  function setSetting(key, value) {
    state.settings[key] = value;
    if (key === "bankroll") resetPortfolio();
    save();
  }

  /* ---------------- watchlist ---------------- */

  function toggleWatch(marketId) {
    if (state.watchlist[marketId]) { delete state.watchlist[marketId]; save(); return false; }
    var m = g.DEMO.marketById(marketId);
    var a = g.Strategy.analyze(m, state.settings);
    state.watchlist[marketId] = {
      addedAt: new Date().toISOString(),
      yes: m.yes, score: a.score, side: a.side,
      positionsCount: m.positions.length, evidenceCount: m.evidence.length
    };
    save();
    return true;
  }
  function isWatched(id) { return !!state.watchlist[id]; }

  /* ---------------- paper trading ---------------- */

  function exposure(filter) {
    var sum = 0;
    for (var i = 0; i < state.positions.length; i++) {
      var p = state.positions[i];
      if (p.status !== "open") continue;
      if (filter && !filter(p)) continue;
      sum += p.cost;
    }
    return sum;
  }

  function openCount() {
    var n = 0;
    for (var i = 0; i < state.positions.length; i++) if (state.positions[i].status === "open") n++;
    return n;
  }

  /* Validate a proposed trade against every risk control. Returns null if OK,
     or the human-readable reason it is blocked. */
  function tradeBlockReason(m, side, amount, analysis) {
    var s = state.settings;
    if (!amount || amount <= 0) return "Enter an amount above zero.";
    if (amount > state.balance) return "Amount exceeds paper balance.";
    if (amount > s.bankroll * s.maxPositionPct / 100)
      return "Exceeds max position size (" + s.maxPositionPct + "% of bankroll = $" + (s.bankroll * s.maxPositionPct / 100).toLocaleString() + ").";
    if (exposure(function (p) { return p.marketId === m.id; }) + amount > s.bankroll * s.maxMarketPct / 100)
      return "Would exceed max exposure per market (" + s.maxMarketPct + "%).";
    if (exposure(function (p) { return p.category === m.category; }) + amount > s.bankroll * s.maxCategoryPct / 100)
      return "Would exceed max exposure for " + m.category + " (" + s.maxCategoryPct + "%).";
    if (openCount() >= s.maxOpenPositions) return "Max simultaneous positions reached (" + s.maxOpenPositions + ").";
    if (state.dayPnl <= -s.bankroll * s.dailyLossPct / 100)
      return "Daily simulated-loss limit hit (" + s.dailyLossPct + "%). Cooldown active.";
    if (m.resClarity < 0.5) return "Blocked: resolution rules are too unclear to trade.";
    if (Math.abs(m.move24) >= 8) return "Cooldown: price moved " + m.move24 + "¢ in 24h. Wait for it to settle.";
    if (analysis) {
      if (g.Strategy.CONF_RANK[analysis.confidence] < g.Strategy.CONF_RANK[s.minConfidence])
        return "Confidence (" + analysis.confidence + ") is below your minimum (" + s.minConfidence + ").";
      // no doubling down: block adding to an existing losing position on the same side
      for (var i = 0; i < state.positions.length; i++) {
        var p = state.positions[i];
        if (p.status === "open" && p.marketId === m.id && p.side === side) {
          var cur = side === "yes" ? m.yes : 100 - m.yes;
          if (cur < p.entry) return "Blocked: adding to a losing position (no doubling down).";
        }
      }
    }
    return null;
  }

  function placeTrade(m, side, amount, analysis) {
    var reason = tradeBlockReason(m, side, amount, analysis);
    if (reason) return { ok: false, reason: reason };
    var price = side === "yes" ? m.yes : 100 - m.yes;
    var shares = Math.floor((amount / price) * 100 * 100) / 100; // shares pay $1 each
    state.positions.push({
      id: "pos" + (state.seq++),
      marketId: m.id, q: m.q, category: m.category,
      side: side, entry: price, shares: shares, cost: amount,
      openedAt: new Date().toISOString(), status: "open",
      scoreAtEntry: analysis ? analysis.score : null,
      signalType: analysis ? analysis.dominant : null,
      sideSuggested: analysis ? analysis.side : null
    });
    state.balance = Math.round((state.balance - amount) * 100) / 100;
    save();
    return { ok: true };
  }

  function closePosition(posId) {
    for (var i = 0; i < state.positions.length; i++) {
      var p = state.positions[i];
      if (p.id !== posId || p.status !== "open") continue;
      var m = g.DEMO.marketById(p.marketId);
      var cur = p.side === "yes" ? m.yes : 100 - m.yes;
      var value = Math.round(p.shares * cur) / 100;
      p.status = "closed";
      p.exit = cur;
      p.closedAt = new Date().toISOString();
      p.pnl = Math.round((value - p.cost) * 100) / 100;
      state.balance = Math.round((state.balance + value) * 100) / 100;
      state.dayPnl = Math.round((state.dayPnl + p.pnl) * 100) / 100;
      save();
      return p;
    }
    return null;
  }

  function positionValue(p) {
    var m = g.DEMO.marketById(p.marketId);
    if (!m) return { cur: p.entry, value: p.cost, pnl: 0 };
    var cur = p.side === "yes" ? m.yes : 100 - m.yes;
    var value = Math.round(p.shares * cur) / 100;
    return { cur: cur, value: value, pnl: Math.round((value - p.cost) * 100) / 100 };
  }

  function resetPortfolio() {
    state.balance = state.settings.bankroll;
    state.positions = [];
    state.dayPnl = 0;
  }

  function resetAll() {
    state = freshState();
    save();
  }

  function exportJson() { return JSON.stringify(state, null, 2); }

  function importJson(text) {
    var parsed = JSON.parse(text); // let it throw — caller shows the error
    if (!parsed.settings || !Array.isArray(parsed.positions)) throw new Error("Not a Polymark export file.");
    state = parsed;
    save();
  }

  g.State = {
    get: function () { return state; },
    settings: function () { return state.settings; },
    subscribe: subscribe,
    setSetting: setSetting,
    toggleWatch: toggleWatch,
    isWatched: isWatched,
    tradeBlockReason: tradeBlockReason,
    placeTrade: placeTrade,
    closePosition: closePosition,
    positionValue: positionValue,
    resetPortfolio: function () { resetPortfolio(); save(); },
    resetAll: resetAll,
    exportJson: exportJson,
    importJson: importJson,
    save: save
  };
})(typeof window !== "undefined" ? window : globalThis);

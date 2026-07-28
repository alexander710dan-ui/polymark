/* Polymark demo data — ENTIRELY SIMULATED. No live market, trader, or news data.
   Markets, traders, prices, evidence and sources are fictional but plausible. */
(function (g) {
  "use strict";

  var CATEGORIES = ["Politics", "Economics", "Crypto", "Sports", "Science & Tech", "Culture"];

  /* ---------------- Traders ----------------
     roi/recentROI/longROI are fractional returns on resolved markets.
     consistency: share of 30-day buckets that were profitable (0-1).
     maxDD: worst peak-to-trough drawdown of paper equity (0-1).
     topWinShare: share of total profit from single best trade (0-1). */
  var TRADERS = [
    { id: "quietowl", name: "quietowl", addr: "0x3fA2…9c11", resolved: 214, roi: 0.19, consistency: 0.81, maxDD: 0.11, recentROI: 0.22, longROI: 0.18, avgLiq: 92000, topWinShare: 0.09, catROI: { Politics: 0.24, Economics: 0.11 }, style: "Polls-vs-price divergence in elections" },
    { id: "basispoint", name: "basispoint", addr: "0x81De…44aa", resolved: 167, roi: 0.16, consistency: 0.78, maxDD: 0.09, recentROI: 0.14, longROI: 0.17, avgLiq: 130000, topWinShare: 0.11, catROI: { Economics: 0.21, Politics: 0.08 }, style: "Central-bank meetings and macro prints" },
    { id: "arb_andersen", name: "arb_andersen", addr: "0xB2c9…07f3", resolved: 412, roi: 0.11, consistency: 0.88, maxDD: 0.06, recentROI: 0.10, longROI: 0.11, avgLiq: 210000, topWinShare: 0.04, catROI: { Crypto: 0.13, Economics: 0.09 }, style: "High-volume small edges, rarely directional" },
    { id: "novemberfox", name: "novemberfox", addr: "0x99A1…d2e8", resolved: 138, roi: 0.21, consistency: 0.72, maxDD: 0.16, recentROI: 0.25, longROI: 0.19, avgLiq: 75000, topWinShare: 0.14, catROI: { Politics: 0.26 }, style: "European politics, contrarian entries" },
    { id: "tapecheck", name: "tapecheck", addr: "0x4C77…b0b2", resolved: 296, roi: 0.13, consistency: 0.76, maxDD: 0.12, recentROI: 0.11, longROI: 0.14, avgLiq: 58000, topWinShare: 0.08, catROI: { Sports: 0.17 }, style: "Injury news and lineup edges in sports" },
    { id: "delphi_dk", name: "delphi_dk", addr: "0xE00f…6a19", resolved: 89, roi: 0.24, consistency: 0.74, maxDD: 0.14, recentROI: 0.28, longROI: 0.22, avgLiq: 41000, topWinShare: 0.18, catROI: { "Science & Tech": 0.29 }, style: "Launch schedules and engineering milestones" },
    { id: "slowcap", name: "slowcap", addr: "0x1Bb4…c3c3", resolved: 121, roi: 0.17, consistency: 0.83, maxDD: 0.07, recentROI: 0.15, longROI: 0.18, avgLiq: 88000, topWinShare: 0.07, catROI: { Politics: 0.15, Economics: 0.18 }, style: "Long-horizon value, holds to resolution" },
    { id: "mmqb_ghost", name: "mmqb_ghost", addr: "0x7d21…e554", resolved: 174, roi: 0.31, consistency: 0.52, maxDD: 0.34, recentROI: 0.05, longROI: 0.33, avgLiq: 36000, topWinShare: 0.58, catROI: { Sports: 0.35 }, style: "Big swings; most profit from one playoff run" },
    { id: "hexadecimal", name: "hexadecimal", addr: "0xFF08…12dd", resolved: 203, roi: 0.28, consistency: 0.58, maxDD: 0.41, recentROI: -0.06, longROI: 0.31, avgLiq: 95000, topWinShare: 0.22, catROI: { Crypto: 0.30 }, style: "Aggressive crypto momentum" },
    { id: "lowvol_lena", name: "lowvol_lena", addr: "0x5a63…9b90", resolved: 158, roi: 0.12, consistency: 0.86, maxDD: 0.05, recentROI: 0.13, longROI: 0.12, avgLiq: 112000, topWinShare: 0.06, catROI: { Economics: 0.14 }, style: "Rate decisions and data prints only" },
    { id: "pollster_pete", name: "pollster_pete", addr: "0xC4d0…77e1", resolved: 246, roi: 0.15, consistency: 0.69, maxDD: 0.18, recentROI: -0.03, longROI: 0.18, avgLiq: 67000, topWinShare: 0.12, catROI: { Politics: 0.18 }, style: "Poll aggregation; in a recent slump" },
    { id: "gamma_gustav", name: "gamma_gustav", addr: "0x2E9c…4f4f", resolved: 102, roi: 0.14, consistency: 0.71, maxDD: 0.13, recentROI: 0.17, longROI: 0.13, avgLiq: 29000, topWinShare: 0.15, catROI: { Culture: 0.19, "Science & Tech": 0.10 }, style: "Entertainment announcements and awards" },
    { id: "fenwick", name: "fenwick", addr: "0x6Aa8…0c0c", resolved: 87, roi: 0.18, consistency: 0.77, maxDD: 0.10, recentROI: 0.19, longROI: 0.17, avgLiq: 33000, topWinShare: 0.11, catROI: { Sports: 0.21 }, style: "Cycling and niche European sports" },
    { id: "stacksats", name: "stacksats", addr: "0xAB55…e2e2", resolved: 331, roi: 0.02, consistency: 0.44, maxDD: 0.52, recentROI: 0.06, longROI: 0.01, avgLiq: 71000, topWinShare: 0.30, catROI: { Crypto: 0.03 }, style: "Always long crypto; pays for the optimism" },
    { id: "calm_variance", name: "calm_variance", addr: "0xD1f7…88ab", resolved: 189, roi: 0.16, consistency: 0.84, maxDD: 0.08, recentROI: 0.18, longROI: 0.15, avgLiq: 105000, topWinShare: 0.07, catROI: { Economics: 0.17, Politics: 0.14, "Science & Tech": 0.16 }, style: "Generalist; sizes by confidence" },
    { id: "eightyfour", name: "eightyfour", addr: "0x0E84…3d3d", resolved: 12, roi: 0.44, consistency: 0.67, maxDD: 0.21, recentROI: 0.44, longROI: 0.44, avgLiq: 18000, topWinShare: 0.39, catROI: { Crypto: 0.51 }, style: "New account, tiny sample — unproven" },
    { id: "midlaner", name: "midlaner", addr: "0x9Cd2…41ef", resolved: 264, roi: 0.15, consistency: 0.82, maxDD: 0.08, recentROI: 0.17, longROI: 0.14, avgLiq: 48000, topWinShare: 0.05, catROI: { Sports: 0.19 }, style: "Live esports; watches every match, fades tilt-flow" }
  ];

  /* ---------------- Open markets ----------------
     yes: current YES price in cents. spread: full bid/ask spread in cents.
     move24 / move7: net YES price change (cents) over 1 / 7 days.
     bookImb: order-book imbalance, -1 (NO-heavy bids) .. +1 (YES-heavy bids).
     resClarity: how unambiguous the resolution rules are (0-1).
     topWallet: share of recent volume from the single largest wallet (0-1).
     sentiment.yesShare: share of public chatter leaning YES.
     sentiment.ledPrice: true if the sentiment shift happened BEFORE the price move.
     evidence: side, text, named (fictional) source, source reliability, weight 1-3. */
  var MARKETS = [
    {
      id: "ecb-sep-cut", q: "Will the ECB cut its deposit rate at the September 2026 meeting?",
      category: "Economics", days: 55, yes: 54, spread: 2, liq: 184000, vol24: 61000,
      move24: 1, move7: 3, vol: 0.35, bookImb: 0.3, resClarity: 0.97, topWallet: 0.08,
      desc: "Resolves YES if the ECB Governing Council lowers the deposit facility rate at its scheduled September 2026 monetary policy meeting.",
      rules: "Resolution per the official ECB press release following the September meeting. An inter-meeting cut before it also resolves YES.",
      sentiment: { yesShare: 0.55, intensity: 0.4, unsupported: 0.2, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Euro-area core inflation printed 1.8% in June, second consecutive month under the 2% target.", source: "Eurostat flash estimate", rel: 0.95, w: 3 },
        { side: "yes", text: "Three Governing Council members publicly flagged 'room to ease' in the past two weeks.", source: "Central bank speech transcripts", rel: 0.9, w: 3 },
        { side: "yes", text: "Euro-area PMI composite fell to 48.9, signalling contraction.", source: "S&P Global PMI", rel: 0.85, w: 2 },
        { side: "no", text: "Wage growth remains at 4.1% year-on-year, above the level the ECB has called consistent with target.", source: "ECB wage tracker", rel: 0.9, w: 2 },
        { side: "no", text: "The Bank has repeatedly preferred to move at projection meetings; some analysts argue it waits for December forecasts.", source: "Sell-side research notes", rel: 0.6, w: 1 }
      ],
      missing: ["August inflation flash (due ~Aug 31) not yet available"],
      events: [{ inDays: 8, label: "ECB July meeting (no change expected, tone matters)" }, { inDays: 47, label: "August euro-area CPI flash" }],
      risks: ["A single upside inflation surprise in August likely kills the cut", "Priced near a coin-flip — edge depends on the trader/evidence read being right"],
      positions: [
        { t: "basispoint", side: "yes", entry: 47, size: 5200, daysAgo: 12, action: "open" },
        { t: "lowvol_lena", side: "yes", entry: 50, size: 3100, daysAgo: 9, action: "open" },
        { t: "calm_variance", side: "yes", entry: 52, size: 2400, daysAgo: 5, action: "open" },
        { t: "slowcap", side: "yes", entry: 49, size: 1800, daysAgo: 10, action: "open" }
      ]
    },
    {
      id: "fomc-jul-hold", q: "Will the Federal Reserve leave rates unchanged at the July 2026 FOMC meeting?",
      category: "Economics", days: 13, yes: 79, spread: 1, liq: 312000, vol24: 140000,
      move24: 0, move7: 2, vol: 0.2, bookImb: 0.25, resClarity: 0.99, topWallet: 0.06,
      desc: "Resolves YES if the FOMC keeps the federal funds target range unchanged at the July 2026 meeting.",
      rules: "Per the official FOMC statement. Emergency inter-meeting moves before the July meeting resolve NO.",
      sentiment: { yesShare: 0.7, intensity: 0.35, unsupported: 0.1, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "June CPI came in slightly hot (3.1% headline); the Fed has signalled patience through summer.", source: "BLS CPI release", rel: 0.95, w: 3 },
        { side: "yes", text: "Fed funds futures imply ~88% probability of a hold, above this market's price.", source: "CME FedWatch (simulated)", rel: 0.9, w: 3 },
        { side: "yes", text: "Chair's June testimony: 'no urgency to adjust policy in either direction.'", source: "Congressional testimony", rel: 0.9, w: 2 },
        { side: "no", text: "One regional Fed president dissented last meeting in favour of a cut.", source: "FOMC minutes", rel: 0.85, w: 1 }
      ],
      missing: [],
      events: [{ inDays: 13, label: "FOMC decision" }],
      risks: ["High price means small absolute payoff; a shock print flips it", "Only ~9 net cents of edge after costs — sizing matters more than being right"],
      positions: [
        { t: "basispoint", side: "yes", entry: 74, size: 8000, daysAgo: 7, action: "open" },
        { t: "arb_andersen", side: "yes", entry: 77, size: 12500, daysAgo: 3, action: "open" },
        { t: "lowvol_lena", side: "yes", entry: 76, size: 4200, daysAgo: 5, action: "open" }
      ]
    },
    {
      id: "btc-150k-aug", q: "Will Bitcoin close above $150,000 on August 31, 2026?",
      category: "Crypto", days: 46, yes: 41, spread: 2, liq: 265000, vol24: 190000,
      move24: 3, move7: 9, vol: 0.8, bookImb: -0.2, resClarity: 0.95, topWallet: 0.11,
      desc: "Resolves YES if the BTC/USD reference price at 23:59 UTC on August 31, 2026 is above $150,000.",
      rules: "Uses the exchange-weighted reference index specified in the market. A single closing print decides it.",
      sentiment: { yesShare: 0.81, intensity: 0.85, unsupported: 0.7, spike: true, ledPrice: false },
      evidence: [
        { side: "no", text: "BTC trades near $128k; reaching $150k requires +17% in six weeks — historically a <25% base rate for such windows.", source: "Historical return distribution", rel: 0.85, w: 3 },
        { side: "no", text: "ETF net inflows have decelerated for three consecutive weeks.", source: "Fund-flow tracker (simulated)", rel: 0.8, w: 2 },
        { side: "no", text: "Options markets imply ~28% probability of >$150k by end of August.", source: "Derivatives-implied distribution", rel: 0.85, w: 3 },
        { side: "yes", text: "A large sovereign-fund allocation to BTC was reported as 'under discussion.'", source: "Unconfirmed press report", rel: 0.4, w: 1 },
        { side: "yes", text: "Momentum: price is +9% this week and social attention is spiking.", source: "Market data", rel: 0.9, w: 1 }
      ],
      missing: [],
      events: [{ inDays: 20, label: "Largest ETF issuer quarterly flow report" }],
      risks: ["Crypto momentum can run far past 'fair' — NO can stay underwater for weeks", "A confirmed sovereign allocation headline would gap the market instantly"],
      positions: [
        { t: "arb_andersen", side: "no", entry: 36, size: 9800, daysAgo: 4, action: "open" },
        { t: "hexadecimal", side: "yes", entry: 30, size: 7500, daysAgo: 18, action: "reduce" },
        { t: "calm_variance", side: "no", entry: 39, size: 3600, daysAgo: 2, action: "open" },
        { t: "stacksats", side: "yes", entry: 38, size: 5100, daysAgo: 6, action: "add" }
      ]
    },
    {
      id: "uk-election-2026", q: "Will the UK hold a general election before 31 December 2026?",
      category: "Politics", days: 168, yes: 33, spread: 2, liq: 148000, vol24: 38000,
      move24: -1, move7: 4, vol: 0.4, bookImb: -0.35, resClarity: 0.93, topWallet: 0.09,
      desc: "Resolves YES if a UK general election (polling day) occurs on or before 31 December 2026.",
      rules: "Polling day must occur within 2026. An announced-but-not-held election resolves NO.",
      sentiment: { yesShare: 0.62, intensity: 0.6, unsupported: 0.55, spike: true, ledPrice: true },
      evidence: [
        { side: "no", text: "The governing party holds a working majority of 40+ seats; no confidence vote is scheduled.", source: "Parliamentary record", rel: 0.95, w: 3 },
        { side: "no", text: "PM stated twice this month there will be 'no early election.'", source: "Recorded interviews", rel: 0.85, w: 2 },
        { side: "no", text: "Governing-party MPs face average polling deficits in their own seats — no incentive to go early.", source: "Constituency polling aggregate", rel: 0.8, w: 2 },
        { side: "yes", text: "A leadership challenge petition is rumoured to be near the threshold.", source: "Lobby journalist posts", rel: 0.45, w: 1 },
        { side: "yes", text: "Betting flows spiked after a cabinet resignation last week.", source: "Market flow data", rel: 0.7, w: 1 }
      ],
      missing: ["No reliable count of leadership-challenge letters (private process)"],
      events: [{ inDays: 30, label: "Autumn parliamentary session opens" }],
      risks: ["Political ruptures are fat-tailed: a scandal can make 'no election' wrong in a day", "168 days is long — capital is tied up while edge decays slowly"],
      positions: [
        { t: "quietowl", side: "no", entry: 29, size: 6400, daysAgo: 6, action: "open" },
        { t: "novemberfox", side: "no", entry: 31, size: 4800, daysAgo: 5, action: "open" },
        { t: "slowcap", side: "no", entry: 27, size: 3900, daysAgo: 14, action: "open" },
        { t: "pollster_pete", side: "yes", entry: 30, size: 2100, daysAgo: 8, action: "open" }
      ]
    },
    {
      id: "starship-refuel", q: "Will SpaceX complete a successful orbital propellant-transfer demo by 30 September 2026?",
      category: "Science & Tech", days: 76, yes: 47, spread: 3, liq: 92000, vol24: 21000,
      move24: 0, move7: -2, vol: 0.5, bookImb: 0.15, resClarity: 0.85, topWallet: 0.13,
      desc: "Resolves YES if SpaceX publicly confirms a successful ship-to-ship propellant transfer in orbit before the deadline.",
      rules: "Requires official SpaceX or NASA confirmation of transfer meeting mission success criteria. Partial transfer counts if declared successful.",
      sentiment: { yesShare: 0.58, intensity: 0.5, unsupported: 0.35, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Both tanker and target vehicles have completed static fire; launch windows are booked for August.", source: "FAA license filings", rel: 0.9, w: 3 },
        { side: "yes", text: "NASA milestone payment schedule implies agency expects the demo this quarter.", source: "NASA OIG report", rel: 0.85, w: 2 },
        { side: "no", text: "The previous two attempts slipped an average of 7 weeks from first announced window.", source: "Launch history", rel: 0.9, w: 2 },
        { side: "no", text: "Pad turnaround after the June anomaly is unresolved per latest environmental filing.", source: "Regulatory filing", rel: 0.8, w: 2 }
      ],
      missing: ["No public confirmation of repaired pad readiness"],
      events: [{ inDays: 24, label: "First available launch window" }],
      risks: ["Schedule risk is asymmetric: slips are more common than early launches", "Resolution wording ('declared successful') has mild ambiguity"],
      positions: [
        { t: "delphi_dk", side: "yes", entry: 41, size: 4400, daysAgo: 11, action: "open" },
        { t: "calm_variance", side: "yes", entry: 45, size: 2600, daysAgo: 4, action: "open" }
      ]
    },
    {
      id: "cpi-jul-25", q: "Will US CPI (YoY, headline) print below 2.5% for July 2026?",
      category: "Economics", days: 28, yes: 36, spread: 2, liq: 128000, vol24: 33000,
      move24: 1, move7: 2, vol: 0.4, bookImb: 0.2, resClarity: 0.98, topWallet: 0.07,
      desc: "Resolves YES if the BLS July 2026 CPI release (published August) shows headline YoY inflation below 2.50%.",
      rules: "First official BLS release; later revisions do not change resolution.",
      sentiment: { yesShare: 0.4, intensity: 0.3, unsupported: 0.15, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Gasoline futures are down 11% month-over-month, a strong drag on headline.", source: "Futures curve", rel: 0.9, w: 3 },
        { side: "yes", text: "Nowcast models cluster at 2.3–2.5% for July.", source: "Fed nowcast (simulated)", rel: 0.85, w: 3 },
        { side: "no", text: "Shelter inflation has been sticky at 4%+ and lags observed rents.", source: "BLS shelter series", rel: 0.9, w: 2 },
        { side: "no", text: "June printed 3.1%; a 0.6pt drop in one month would be unusually fast.", source: "Historical CPI deltas", rel: 0.85, w: 2 }
      ],
      missing: [],
      events: [{ inDays: 28, label: "CPI release" }],
      risks: ["Nowcasts have missed by ±0.3pt in energy-volatile months", "Binary data print — no exit liquidity if positioning is wrong on release morning"],
      positions: [
        { t: "basispoint", side: "yes", entry: 31, size: 4700, daysAgo: 6, action: "open" },
        { t: "lowvol_lena", side: "yes", entry: 34, size: 2900, daysAgo: 3, action: "open" }
      ]
    },
    {
      id: "hurricanes-18", q: "Will the 2026 Atlantic hurricane season produce 18 or more named storms?",
      category: "Science & Tech", days: 138, yes: 58, spread: 3, liq: 64000, vol24: 9000,
      move24: 0, move7: 1, vol: 0.3, bookImb: 0.1, resClarity: 0.96, topWallet: 0.1,
      desc: "Resolves YES if the National Hurricane Center names 18 or more tropical storms in the 2026 Atlantic season.",
      rules: "Official NHC naming list as of season end (November 30, 2026).",
      sentiment: { yesShare: 0.6, intensity: 0.35, unsupported: 0.2, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "NOAA August outlook update expected to raise the forecast range; sea-surface temps are record-warm.", source: "NOAA SST data", rel: 0.9, w: 3 },
        { side: "yes", text: "Five named storms by mid-July is ahead of the pace of most 18+ seasons.", source: "NHC season records", rel: 0.9, w: 2 },
        { side: "no", text: "A developing El Niño signal in ENSO models would suppress late-season activity.", source: "ENSO model ensemble", rel: 0.8, w: 2 }
      ],
      missing: ["NOAA mid-season outlook update (early August)"],
      events: [{ inDays: 21, label: "NOAA updated seasonal outlook" }],
      risks: ["Season outcomes hinge on ENSO evolution, which models disagree about", "Long time to resolution: 138 days of tied-up capital"],
      positions: [
        { t: "delphi_dk", side: "yes", entry: 54, size: 1900, daysAgo: 9, action: "open" }
      ]
    },
    {
      id: "apple-fold", q: "Will Apple announce a foldable device at its September 2026 event?",
      category: "Science & Tech", days: 60, yes: 22, spread: 3, liq: 71000, vol24: 15000,
      move24: 1, move7: 3, vol: 0.45, bookImb: 0.3, resClarity: 0.9, topWallet: 0.12,
      desc: "Resolves YES if Apple officially announces any foldable-display device at its September 2026 keynote.",
      rules: "Official announcement at the September event only; later announcements resolve NO.",
      sentiment: { yesShare: 0.45, intensity: 0.4, unsupported: 0.3, spike: false, ledPrice: true },
      evidence: [
        { side: "yes", text: "Two display suppliers report foldable panel shipments to a 'US customer' beginning Q2.", source: "Supply-chain analysts", rel: 0.75, w: 3 },
        { side: "yes", text: "Reliable leaker with 85% track record says announcement is 'planned for September, could slip.'", source: "Track-recorded leaker", rel: 0.7, w: 2 },
        { side: "no", text: "Apple has historically launched new categories at dedicated events, not the iPhone keynote.", source: "Launch history", rel: 0.8, w: 2 },
        { side: "no", text: "No foldable strings found in the latest OS beta.", source: "Code analysis", rel: 0.7, w: 1 }
      ],
      missing: ["No confirmed mass-production start date"],
      events: [{ inDays: 60, label: "September keynote (date unconfirmed)" }],
      risks: ["Event-specific wording: a foldable announced in October resolves NO even if the thesis was right", "Leak-based evidence chains are correlated — they may all trace to one source"],
      positions: [
        { t: "delphi_dk", side: "yes", entry: 17, size: 2800, daysAgo: 15, action: "open" },
        { t: "gamma_gustav", side: "yes", entry: 20, size: 1600, daysAgo: 7, action: "open" }
      ]
    },
    {
      id: "chiefs-week1", q: "Will the Kansas City Chiefs win their Week 1 game of the 2026 NFL season?",
      category: "Sports", days: 56, yes: 61, spread: 2, liq: 87000, vol24: 26000, bookImplied: 54,
      move24: 2, move7: 5, vol: 0.35, bookImb: 0.1, resClarity: 0.98, topWallet: 0.09,
      desc: "Resolves YES if the Chiefs win their first regular-season game of the 2026 NFL season.",
      rules: "Official NFL result. A tie resolves NO.",
      sentiment: { yesShare: 0.74, intensity: 0.65, unsupported: 0.5, spike: false, ledPrice: false },
      evidence: [
        { side: "no", text: "Sportsbook lines imply ~54% — this market trades 7 points richer than the books.", source: "Consensus sportsbook odds", rel: 0.9, w: 3 },
        { side: "no", text: "Starting QB is returning from off-season surgery; camp reports are mixed.", source: "Beat reporters", rel: 0.7, w: 2 },
        { side: "yes", text: "Opponent lost three starters on the offensive line to free agency.", source: "Roster tracking", rel: 0.8, w: 2 }
      ],
      missing: ["Preseason injury reports not yet available"],
      events: [{ inDays: 35, label: "Training camp opens" }],
      risks: ["Fan flows keep popular teams overpriced for weeks — entry timing matters", "Two months of roster news between now and kickoff"],
      positions: [
        { t: "tapecheck", side: "no", entry: 58, size: 3800, daysAgo: 4, action: "open" },
        { t: "mmqb_ghost", side: "yes", entry: 59, size: 5600, daysAgo: 3, action: "open" }
      ]
    },
    {
      id: "opec-aug", q: "Will OPEC+ announce a production increase at its August 2026 meeting?",
      category: "Economics", days: 20, yes: 44, spread: 3, liq: 76000, vol24: 18000,
      move24: -1, move7: -3, vol: 0.45, bookImb: 0.05, resClarity: 0.88, topWallet: 0.14,
      desc: "Resolves YES if the August OPEC+ ministerial announces any increase to production quotas.",
      rules: "Official communiqué; voluntary member-level adjustments outside the communiqué do not count.",
      sentiment: { yesShare: 0.5, intensity: 0.3, unsupported: 0.25, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Two members are reportedly pushing to unwind voluntary cuts as prices hold above $80.", source: "Energy newswire", rel: 0.7, w: 2 },
        { side: "no", text: "The group deferred the same decision at the last two meetings.", source: "Meeting history", rel: 0.85, w: 2 },
        { side: "no", text: "Demand forecasts were just revised down 300kb/d for H2.", source: "IEA monthly report", rel: 0.85, w: 2 }
      ],
      missing: ["No leak of the draft agenda yet"],
      events: [{ inDays: 20, label: "OPEC+ ministerial" }],
      risks: ["Cartel decisions are political and can reverse on meeting day", "Evidence is balanced — this is a genuine coin-flip zone"],
      positions: [
        { t: "basispoint", side: "no", entry: 46, size: 2200, daysAgo: 5, action: "open" }
      ]
    },
    {
      id: "eth-etf-2b", q: "Will Ethereum ETF net inflows exceed $2B for July 2026?",
      category: "Crypto", days: 16, yes: 63, spread: 3, liq: 94000, vol24: 41000,
      move24: 4, move7: 14, vol: 0.7, bookImb: 0.4, resClarity: 0.9, topWallet: 0.16,
      desc: "Resolves YES if aggregate US spot-ETH ETF net inflows for calendar July exceed $2.0B.",
      rules: "Per the issuer-reported daily flow aggregate published by the tracking source named in the market.",
      sentiment: { yesShare: 0.77, intensity: 0.8, unsupported: 0.6, spike: true, ledPrice: false },
      evidence: [
        { side: "yes", text: "Month-to-date flows already total $1.4B with half the month remaining.", source: "Flow tracker (simulated)", rel: 0.9, w: 3 },
        { side: "no", text: "Daily flows decelerated sharply this week (-60% vs last week's average).", source: "Flow tracker (simulated)", rel: 0.9, w: 2 },
        { side: "no", text: "Price has already moved +14 cents in 7 days — the signal is mostly in the price.", source: "Market data", rel: 0.95, w: 2 }
      ],
      missing: [],
      events: [],
      risks: ["The move has largely happened; remaining edge after costs is thin", "Flow data is reported with a one-day lag — late-month surprises land after positioning"],
      positions: [
        { t: "hexadecimal", side: "yes", entry: 44, size: 6900, daysAgo: 12, action: "reduce" },
        { t: "arb_andersen", side: "yes", entry: 49, size: 5400, daysAgo: 10, action: "exit" }
      ]
    },
    {
      id: "riksbank-aug", q: "Will Sweden's Riksbank cut its policy rate at the August 2026 meeting?",
      category: "Economics", days: 34, yes: 47, spread: 3, liq: 52000, vol24: 8000,
      move24: 0, move7: 1, vol: 0.3, bookImb: 0.1, resClarity: 0.97, topWallet: 0.11,
      desc: "Resolves YES if the Riksbank lowers the policy rate at its scheduled August 2026 decision.",
      rules: "Official Riksbank announcement.",
      sentiment: { yesShare: 0.5, intensity: 0.2, unsupported: 0.1, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Swedish inflation at 1.6% is below target and the krona has strengthened.", source: "SCB statistics", rel: 0.9, w: 2 },
        { side: "no", text: "The Riksbank cut last meeting and guidance suggested a pause 'to assess.'", source: "Policy statement", rel: 0.9, w: 2 }
      ],
      missing: ["July inflation print (due in 10 days)"],
      events: [{ inDays: 10, label: "Swedish July CPI" }],
      risks: ["Balanced evidence; the July CPI print will decide this — better to wait for it"],
      positions: [
        { t: "lowvol_lena", side: "yes", entry: 45, size: 1400, daysAgo: 8, action: "open" }
      ]
    },
    {
      id: "swift-tour", q: "Will Taylor Swift announce a 2027 stadium tour before October 2026?",
      category: "Culture", days: 76, yes: 39, spread: 4, liq: 44000, vol24: 12000,
      move24: 2, move7: 6, vol: 0.5, bookImb: 0.2, resClarity: 0.8, topWallet: 0.18,
      desc: "Resolves YES if an official 2027 stadium tour is announced via artist or promoter channels before October 1, 2026.",
      rules: "Requires named 2027 stadium dates; festival appearances alone do not count.",
      sentiment: { yesShare: 0.83, intensity: 0.9, unsupported: 0.85, spike: true, ledPrice: true },
      evidence: [
        { side: "yes", text: "Two stadiums show unexplained multi-day holds for summer 2027 in venue calendars.", source: "Venue calendar sleuthing", rel: 0.5, w: 2 },
        { side: "no", text: "Artist's team said 'no touring plans to announce' in a June statement.", source: "Official statement", rel: 0.8, w: 2 }
      ],
      missing: ["No promoter filings or ticketing registrations found"],
      events: [],
      risks: ["Fan-driven market: sentiment is extreme and mostly unsupported", "Resolution depends on announcement wording ('stadium tour') — mild ambiguity"],
      positions: [
        { t: "gamma_gustav", side: "no", entry: 42, size: 1700, daysAgo: 6, action: "open" }
      ]
    },
    {
      id: "hr-60", q: "Will the 2026 MLB home-run leader finish with 60 or more home runs?",
      category: "Sports", days: 82, yes: 31, spread: 3, liq: 58000, vol24: 10000,
      move24: 0, move7: -2, vol: 0.4, bookImb: -0.05, resClarity: 0.97, topWallet: 0.08,
      desc: "Resolves YES if any MLB player records 60+ home runs in the 2026 regular season.",
      rules: "Official MLB statistics at regular-season end.",
      sentiment: { yesShare: 0.45, intensity: 0.3, unsupported: 0.2, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Current leader has 38 HR through 94 games — a 62-HR pace.", source: "MLB stats", rel: 0.95, w: 2 },
        { side: "no", text: "HR pace historically decays in August/September; only 3 players since 2000 held a 60+ pace to season end.", source: "Historical pace analysis", rel: 0.85, w: 3 },
        { side: "no", text: "League-wide HR rate is down 4% year-over-year (deadened ball).", source: "League batting data", rel: 0.8, w: 1 }
      ],
      missing: [],
      events: [],
      risks: ["A single injury to the leader collapses the YES case"],
      positions: [
        { t: "tapecheck", side: "no", entry: 33, size: 2500, daysAgo: 9, action: "open" }
      ]
    },
    {
      id: "tdf-slovenian", q: "Will the 2026 Tour de France be won by a Slovenian rider?",
      category: "Sports", days: 10, yes: 64, spread: 2, liq: 69000, vol24: 24000, bookImplied: 71,
      move24: 3, move7: 8, vol: 0.4, bookImb: 0.35, resClarity: 0.99, topWallet: 0.07,
      desc: "Resolves YES if the general-classification winner of the 2026 Tour de France holds Slovenian nationality.",
      rules: "Official GC winner on the final podium in Paris.",
      sentiment: { yesShare: 0.68, intensity: 0.55, unsupported: 0.3, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Slovenian GC leader holds a 1:48 advantage with one mountain stage and a time trial left.", source: "Race standings", rel: 0.95, w: 3 },
        { side: "yes", text: "He has out-performed the closest rival in both prior time trials this season.", source: "Season results", rel: 0.85, w: 2 },
        { side: "no", text: "He crashed on stage 15; team downplayed it but he lost 20 seconds on the final climb yesterday.", source: "Stage reports", rel: 0.8, w: 2 }
      ],
      missing: ["No independent medical assessment after the stage-15 crash"],
      events: [{ inDays: 8, label: "Final mountain stage" }, { inDays: 9, label: "Individual time trial" }],
      risks: ["Crash aftermath is genuinely uncertain — yesterday's time loss may be the start of a fade"],
      positions: [
        { t: "fenwick", side: "yes", entry: 58, size: 3300, daysAgo: 5, action: "open" },
        { t: "tapecheck", side: "yes", entry: 62, size: 2000, daysAgo: 1, action: "open" }
      ]
    },
    {
      id: "moldova-confidence", q: "Will Moldova's government survive its September 2026 confidence vote?",
      category: "Politics", days: 62, yes: 55, spread: 9, liq: 6500, vol24: 900,
      move24: 0, move7: -4, vol: 0.5, bookImb: -0.1, resClarity: 0.85, topWallet: 0.34,
      desc: "Resolves YES if the sitting government wins the announced September confidence vote.",
      rules: "Official parliamentary vote record; vote postponement past October 15 resolves NO.",
      sentiment: { yesShare: 0.5, intensity: 0.25, unsupported: 0.3, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Coalition whips claim they hold 52 of 101 seats.", source: "Local press", rel: 0.6, w: 2 },
        { side: "no", text: "Two coalition MPs abstained on the last budget vote.", source: "Voting record", rel: 0.85, w: 1 }
      ],
      missing: ["No recent independent seat-by-seat whip count"],
      events: [{ inDays: 62, label: "Confidence vote" }],
      risks: ["Liquidity is too thin to enter or exit at quoted prices", "9-cent spread eats any plausible edge"],
      positions: []
    },
    {
      id: "nhi-craft", q: "Will the US government officially confirm recovery of non-human craft before 2028?",
      category: "Science & Tech", days: 240, yes: 9, spread: 4, liq: 38000, vol24: 6000,
      move24: 0, move7: 1, vol: 0.6, bookImb: 0.1, resClarity: 0.25, topWallet: 0.2,
      desc: "Resolves YES if an official US government body confirms possession of craft of non-human origin.",
      rules: "What counts as 'official confirmation' is disputed — the market comments show 40+ unresolved arguments about it.",
      sentiment: { yesShare: 0.7, intensity: 0.75, unsupported: 0.95, spike: false, ledPrice: false },
      evidence: [
        { side: "no", text: "No historical precedent; every prior 'disclosure' deadline has passed without official confirmation.", source: "Base rates", rel: 0.9, w: 2 },
        { side: "yes", text: "A scheduled congressional hearing includes two new whistleblowers.", source: "Hearing calendar", rel: 0.7, w: 1 }
      ],
      missing: ["The resolution criteria themselves are ambiguous"],
      events: [{ inDays: 33, label: "Congressional hearing" }],
      risks: ["Unresolvable-rules risk: even a dramatic hearing may not satisfy the market's resolution wording"],
      positions: []
    },
    {
      id: "gta7-2026", q: "Will GTA VII be officially announced before the end of 2026?",
      category: "Culture", days: 168, yes: 18, spread: 3, liq: 51000, vol24: 19000,
      move24: 5, move7: 7, vol: 0.6, bookImb: 0.5, resClarity: 0.92, topWallet: 0.62,
      desc: "Resolves YES if the publisher officially announces the next mainline GTA title in 2026.",
      rules: "Official publisher announcement naming the title.",
      sentiment: { yesShare: 0.66, intensity: 0.7, unsupported: 0.75, spike: true, ledPrice: false },
      evidence: [
        { side: "no", text: "GTA VI shipped 9 months ago; the studio has never announced a next mainline title within 5 years of a launch.", source: "Release history", rel: 0.9, w: 3 },
        { side: "yes", text: "A domain registration matching the title pattern was spotted this week.", source: "Domain records", rel: 0.4, w: 1 }
      ],
      missing: [],
      events: [],
      risks: ["A single wallet is responsible for 62% of recent volume — the price may be one actor's opinion, not a market"],
      positions: [
        { t: "gamma_gustav", side: "no", entry: 15, size: 900, daysAgo: 3, action: "open" }
      ]
    },
    {
      id: "spx-7000", q: "Will the S&P 500 close above 7,000 on July 24, 2026?",
      category: "Economics", days: 8, yes: 51, spread: 1, liq: 205000, vol24: 88000,
      move24: 1, move7: -1, vol: 0.4, bookImb: 0, resClarity: 0.99, topWallet: 0.05,
      desc: "Resolves YES if the S&P 500 index closes above 7,000.00 on the specified date.",
      rules: "Official closing print.",
      sentiment: { yesShare: 0.52, intensity: 0.3, unsupported: 0.2, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Index sits at 6,988, 0.2% below the strike.", source: "Market data", rel: 0.95, w: 1 },
        { side: "no", text: "One-week option-implied distribution is symmetric around the current level.", source: "Options data", rel: 0.9, w: 2 }
      ],
      missing: [],
      events: [{ inDays: 6, label: "Megacap earnings (3 of top 10 index weights)" }],
      risks: ["Pure coin-flip priced as a coin-flip — no edge on either side"],
      positions: [
        { t: "arb_andersen", side: "no", entry: 52, size: 3100, daysAgo: 1, action: "open" }
      ]
    },
    {
      id: "china-gdp-q2", q: "Will China's official Q2 2026 GDP growth beat 5.0% year-on-year?",
      category: "Economics", days: 2, yes: 72, spread: 2, liq: 96000, vol24: 47000,
      move24: 6, move7: 10, vol: 0.5, bookImb: 0.3, resClarity: 0.95, topWallet: 0.1,
      desc: "Resolves YES if the NBS first estimate of Q2 2026 real GDP growth exceeds 5.0% YoY.",
      rules: "First official NBS release.",
      sentiment: { yesShare: 0.7, intensity: 0.5, unsupported: 0.35, spike: true, ledPrice: false },
      evidence: [
        { side: "yes", text: "June industrial output and export data both beat consensus.", source: "NBS monthly data", rel: 0.85, w: 2 },
        { side: "yes", text: "Official growth prints have historically landed within 0.2pt of the annual target.", source: "Historical prints", rel: 0.8, w: 2 }
      ],
      missing: [],
      events: [{ inDays: 2, label: "GDP release" }],
      risks: ["Resolves in 2 days and the price has already moved 10 cents this week — the easy money is gone"],
      positions: [
        { t: "basispoint", side: "yes", entry: 61, size: 5200, daysAgo: 6, action: "open" }
      ]
    },
    {
      id: "bond-actor", q: "Will the next James Bond actor be officially announced before 2027?",
      category: "Culture", days: 168, yes: 44, spread: 5, liq: 23000, vol24: 3000,
      move24: 0, move7: 0, vol: 0.4, bookImb: 0, resClarity: 0.9, topWallet: 0.15,
      desc: "Resolves YES if the studio officially names the next actor to play James Bond in 2026.",
      rules: "Official studio or franchise-holder announcement.",
      sentiment: { yesShare: 0.55, intensity: 0.45, unsupported: 0.7, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Studio said casting is 'in final stages' — but has said so twice before.", source: "Trade press", rel: 0.55, w: 1 }
      ],
      missing: ["No smart-trader positions in this market", "Only one weak evidence item found", "No production-timeline documents available"],
      events: [],
      risks: ["Insufficient information: one weak source and no trader signal — the system cannot form a view"],
      positions: []
    },
    {
      id: "fusion-replicate", q: "Will a second laboratory publicly replicate net-energy fusion gain before 2027?",
      category: "Science & Tech", days: 168, yes: 26, spread: 4, liq: 31000, vol24: 4000,
      move24: 0, move7: -1, vol: 0.35, bookImb: -0.05, resClarity: 0.7, topWallet: 0.13,
      desc: "Resolves YES if a facility other than the current record-holder publicly demonstrates fusion energy gain >1 before 2027.",
      rules: "Requires peer-reviewed publication or official government lab announcement.",
      sentiment: { yesShare: 0.5, intensity: 0.2, unsupported: 0.3, spike: false, ledPrice: false },
      evidence: [
        { side: "no", text: "No other facility has publicly claimed to be within an order of magnitude of gain >1.", source: "Published results survey", rel: 0.75, w: 2 }
      ],
      missing: ["Private-company progress is unpublished — the key data simply isn't public", "No trader activity to read"],
      events: [],
      risks: ["Insufficient information: the decisive facts are behind closed doors"],
      positions: []
    },
    {
      id: "poland-runoff", q: "Will the incumbent-party candidate win Poland's 2026 presidential runoff?",
      category: "Politics", days: 40, yes: 57, spread: 2, liq: 118000, vol24: 42000,
      move24: 2, move7: 6, vol: 0.45, bookImb: -0.25, resClarity: 0.96, topWallet: 0.08,
      desc: "Resolves YES if the candidate of the current governing party wins the presidential runoff.",
      rules: "Official electoral commission result.",
      sentiment: { yesShare: 0.66, intensity: 0.7, unsupported: 0.55, spike: true, ledPrice: false },
      evidence: [
        { side: "no", text: "Runoff polls average 48.1% for the incumbent-party candidate — behind, though within margins.", source: "Poll aggregate", rel: 0.85, w: 3 },
        { side: "no", text: "First-round third-place voters split 60/40 toward the challenger in transfer surveys.", source: "Voter-transfer surveys", rel: 0.8, w: 2 },
        { side: "yes", text: "Late-deciding voters have broken for incumbents in the last three national elections.", source: "Historical voting patterns", rel: 0.7, w: 2 },
        { side: "yes", text: "Turnout models favour the incumbent's older voter base.", source: "Turnout modelling", rel: 0.7, w: 1 }
      ],
      missing: ["Final week polls (historically decisive here)"],
      events: [{ inDays: 33, label: "Final TV debate" }, { inDays: 40, label: "Runoff election day" }],
      risks: ["Polling error in this country has run both directions by up to 4 points", "Diaspora vote is hard to poll and broke unexpectedly last cycle"],
      positions: [
        { t: "quietowl", side: "no", entry: 53, size: 5900, daysAgo: 7, action: "open" },
        { t: "novemberfox", side: "no", entry: 55, size: 4100, daysAgo: 4, action: "open" },
        { t: "pollster_pete", side: "no", entry: 56, size: 2600, daysAgo: 2, action: "open" }
      ]
    },
    {
      id: "dkk-peg", q: "Will Denmark's Nationalbank change its policy rate independently of the ECB in 2026?",
      category: "Economics", days: 168, yes: 14, spread: 2, liq: 47000, vol24: 5000,
      move24: 0, move7: 0, vol: 0.2, bookImb: -0.15, resClarity: 0.95, topWallet: 0.1,
      desc: "Resolves YES if Danmarks Nationalbank moves its policy rate on a date or by an amount that differs from the ECB in 2026.",
      rules: "Any unilateral move (date or size) counts. Mirror moves resolve NO.",
      sentiment: { yesShare: 0.4, intensity: 0.15, unsupported: 0.2, spike: false, ledPrice: false },
      evidence: [
        { side: "no", text: "The krone trades mid-band; FX reserves are stable — no peg pressure requiring independent action.", source: "Nationalbank reserve data", rel: 0.9, w: 3 },
        { side: "no", text: "The Nationalbank has moved independently only under sustained krone pressure, absent for 14 months.", source: "Policy history", rel: 0.85, w: 2 },
        { side: "yes", text: "Danish inflation is diverging from the euro area by 0.8pt.", source: "Statistics Denmark", rel: 0.8, w: 1 }
      ],
      missing: [],
      events: [],
      risks: ["Long horizon; a 2026 FX shock is unlikely but not impossible", "At 14 cents, the NO side earns little unless sized meaningfully"],
      positions: [
        { t: "lowvol_lena", side: "no", entry: 15, size: 2300, daysAgo: 20, action: "open" },
        { t: "calm_variance", side: "no", entry: 13, size: 1500, daysAgo: 11, action: "open" }
      ]
    },
    {
      id: "jobless-260k", q: "Will US initial jobless claims exceed 260k in any week before September 2026?",
      category: "Economics", days: 47, yes: 42, spread: 2, liq: 83000, vol24: 14000,
      move24: 1, move7: 2, vol: 0.35, bookImb: 0.2, resClarity: 0.98, topWallet: 0.09,
      desc: "Resolves YES if any weekly initial claims print before September 1, 2026 exceeds 260,000 (seasonally adjusted).",
      rules: "First-release DOL figures; revisions do not count.",
      sentiment: { yesShare: 0.45, intensity: 0.25, unsupported: 0.15, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Claims have risen four consecutive weeks to 247k; announced layoffs are up 22% YoY.", source: "DOL weekly data", rel: 0.9, w: 3 },
        { side: "yes", text: "Seven weekly prints remain — multiple chances for one >260k print.", source: "Calendar math", rel: 0.9, w: 2 },
        { side: "no", text: "Summer auto-plant retooling distortions cut both ways and have faded post-2024.", source: "Seasonal adjustment analysis", rel: 0.7, w: 1 }
      ],
      missing: [],
      events: [{ inDays: 5, label: "Next weekly claims print" }],
      risks: ["'Any week' structure favours YES but a stabilising labour market caps the drift"],
      positions: [
        { t: "basispoint", side: "yes", entry: 38, size: 3600, daysAgo: 8, action: "open" },
        { t: "calm_variance", side: "yes", entry: 40, size: 2700, daysAgo: 5, action: "open" },
        { t: "slowcap", side: "yes", entry: 39, size: 2100, daysAgo: 6, action: "open" }
      ]
    },
    {
      id: "cat5-landfall", q: "Will a Category 5 hurricane make US landfall in 2026?",
      category: "Science & Tech", days: 138, yes: 21, spread: 3, liq: 66000, vol24: 11000,
      move24: 2, move7: 6, vol: 0.5, bookImb: 0.25, resClarity: 0.94, topWallet: 0.12,
      desc: "Resolves YES if a hurricane at Category 5 intensity at landfall strikes the US mainland in 2026.",
      rules: "NHC official landfall intensity classification.",
      sentiment: { yesShare: 0.6, intensity: 0.55, unsupported: 0.5, spike: true, ledPrice: true },
      evidence: [
        { side: "no", text: "Only 4 Cat-5 US landfalls have ever been recorded — the base rate is ~3-4% per season.", source: "NHC historical database", rel: 0.95, w: 3 },
        { side: "no", text: "Price jumped 6 cents this week on an active-season headline, but season activity ≠ landfall intensity.", source: "Market data", rel: 0.9, w: 2 },
        { side: "yes", text: "Record sea-surface temperatures modestly raise rapid-intensification odds.", source: "NOAA SST data", rel: 0.85, w: 2 }
      ],
      missing: [],
      events: [{ inDays: 21, label: "NOAA updated outlook" }],
      risks: ["Attention-driven price spike may keep inflating before base rates reassert"],
      positions: [
        { t: "delphi_dk", side: "no", entry: 16, size: 2000, daysAgo: 3, action: "open" }
      ]
    },
    {
      id: "ai-frontier-eu", q: "Will an EU-headquartered lab release a top-5 benchmark frontier model in 2026?",
      category: "Science & Tech", days: 168, yes: 29, spread: 4, liq: 42000, vol24: 7000,
      move24: -1, move7: -3, vol: 0.45, bookImb: -0.2, resClarity: 0.6, topWallet: 0.17,
      desc: "Resolves YES if a model from an EU-headquartered lab ranks top-5 on the named benchmark aggregate in 2026.",
      rules: "Uses a specific leaderboard snapshot on Dec 31 — but the leaderboard's methodology changed twice this year.",
      sentiment: { yesShare: 0.48, intensity: 0.35, unsupported: 0.4, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "The leading EU lab's June release ranked 7th and its training run for the next model is reportedly complete.", source: "Lab announcements", rel: 0.75, w: 2 },
        { side: "no", text: "Top-5 slots have turned over every ~10 weeks; hitting a moving target is harder than the price implies.", source: "Leaderboard history", rel: 0.8, w: 2 }
      ],
      missing: ["Unclear which leaderboard version applies at resolution"],
      events: [],
      risks: ["Resolution-source ambiguity: the benchmark itself keeps changing"],
      positions: [
        { t: "delphi_dk", side: "yes", entry: 31, size: 1200, daysAgo: 14, action: "open" }
      ]
    }
  ];

  /* ---------------- Sports mode: short-dated markets with book lines ---------------- */
  MARKETS.push(
    {
      id: "mlb-nyy-bos", q: "MLB: Will the Yankees beat the Red Sox on Friday night?",
      category: "Sports", days: 1, yes: 62, spread: 2, liq: 46000, vol24: 31000, bookImplied: 55,
      move24: 3, move7: 3, vol: 0.3, bookImb: 0.3, resClarity: 0.99, topWallet: 0.08,
      desc: "Resolves YES if the Yankees win the scheduled Friday game. Postponement voids per market rules.",
      rules: "Official MLB result, including extra innings.",
      sentiment: { yesShare: 0.76, intensity: 0.7, unsupported: 0.55, spike: false, ledPrice: false },
      evidence: [
        { side: "no", text: "Sportsbook consensus implies 55% for the Yankees — this market trades 7 points richer on fan flow.", source: "Book consensus line", rel: 0.9, w: 3 },
        { side: "no", text: "Boston's scheduled starter has a 2.9 ERA over his last six outings.", source: "Pitching stats", rel: 0.8, w: 2 },
        { side: "yes", text: "Yankees have won 8 of the last 10 head-to-heads at this venue.", source: "H2H record", rel: 0.75, w: 1 }
      ],
      missing: [],
      events: [{ inDays: 1, label: "First pitch" }],
      risks: ["One game of baseball is close to a coin flip whatever the lineup says"],
      positions: [
        { t: "tapecheck", side: "no", entry: 60, size: 3200, daysAgo: 0, action: "open" },
        { t: "calm_variance", side: "no", entry: 61, size: 1800, daysAgo: 0, action: "open" },
        { t: "mmqb_ghost", side: "yes", entry: 61, size: 2600, daysAgo: 1, action: "open" }
      ]
    },
    {
      id: "lol-t1-geng", q: "LoL: Will T1 beat Gen.G in the Worlds qualifier (BO5)?",
      category: "Sports", days: 2, yes: 47, spread: 2, liq: 39000, vol24: 22000, bookImplied: 54,
      move24: -4, move7: -6, vol: 0.4, bookImb: 0.25, resClarity: 0.98, topWallet: 0.1,
      desc: "Resolves YES if T1 wins the best-of-five qualifier series.",
      rules: "Official series result; forfeits count.",
      sentiment: { yesShare: 0.38, intensity: 0.75, unsupported: 0.6, spike: true, ledPrice: true },
      evidence: [
        { side: "yes", text: "Esports books price T1 at 54% — the market dumped 6 points after one bad group-stage loss.", source: "Book consensus line", rel: 0.9, w: 3 },
        { side: "yes", text: "T1 is 5-1 vs Gen.G in best-of-fives this season; the loss was a BO1.", source: "Series history", rel: 0.85, w: 2 },
        { side: "no", text: "Gen.G's new mid-laner has the highest laning differential in the league since joining.", source: "League stats", rel: 0.8, w: 2 }
      ],
      missing: [],
      events: [{ inDays: 2, label: "Series start" }],
      risks: ["Tilt narratives cut both ways — the crowd may be right that form dipped"],
      positions: [
        { t: "midlaner", side: "yes", entry: 45, size: 4100, daysAgo: 0, action: "open" },
        { t: "tapecheck", side: "yes", entry: 48, size: 2200, daysAgo: 1, action: "open" }
      ]
    },
    {
      id: "ufc-main-retain", q: "UFC 322: Will the champion retain in the main event?",
      category: "Sports", days: 3, yes: 71, spread: 2, liq: 58000, vol24: 19000, bookImplied: 70,
      move24: 0, move7: 1, vol: 0.3, bookImb: 0.05, resClarity: 0.97, topWallet: 0.09,
      desc: "Resolves YES if the current champion wins the scheduled title fight.",
      rules: "Official result; no-contest or cancellation voids.",
      sentiment: { yesShare: 0.66, intensity: 0.5, unsupported: 0.3, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Books imply 70% — this market is priced in line with them.", source: "Book consensus line", rel: 0.9, w: 2 },
        { side: "no", text: "Challenger has a 40% career finish rate against orthodox strikers.", source: "Fight metrics", rel: 0.7, w: 1 }
      ],
      missing: [],
      events: [{ inDays: 3, label: "Fight night" }],
      risks: ["Priced exactly at book consensus — there is nothing here"],
      positions: [
        { t: "tapecheck", side: "yes", entry: 70, size: 1200, daysAgo: 1, action: "open" }
      ]
    },
    {
      id: "wnba-aces-spread", q: "WNBA: Will the Aces cover -3.5 against the Liberty?",
      category: "Sports", days: 1, yes: 51, spread: 2, liq: 33000, vol24: 12000, bookImplied: 50,
      move24: 1, move7: 1, vol: 0.35, bookImb: 0, resClarity: 0.98, topWallet: 0.11,
      desc: "Resolves YES if the Aces win by 4 or more points.",
      rules: "Official final score including overtime.",
      sentiment: { yesShare: 0.53, intensity: 0.35, unsupported: 0.3, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "Books price this spread at a true coin flip (50%).", source: "Book consensus line", rel: 0.9, w: 2 },
        { side: "no", text: "Liberty are 9-3 against the spread as road underdogs this season.", source: "ATS record", rel: 0.7, w: 1 }
      ],
      missing: [],
      events: [{ inDays: 1, label: "Tip-off" }],
      risks: ["A fair-priced 50/50 is entertainment, not a trade"],
      positions: []
    },
    {
      id: "nfl-cowboys-rams", q: "NFL preseason: Will the Cowboys beat the Rams?",
      category: "Sports", days: 5, yes: 64, spread: 3, liq: 41000, vol24: 15000, bookImplied: 56,
      move24: 2, move7: 5, vol: 0.35, bookImb: 0.2, resClarity: 0.96, topWallet: 0.1,
      desc: "Resolves YES if Dallas wins the scheduled preseason game.",
      rules: "Official NFL result. Tie resolves NO.",
      sentiment: { yesShare: 0.79, intensity: 0.7, unsupported: 0.65, spike: false, ledPrice: false },
      evidence: [
        { side: "no", text: "Books imply 56% — an 8-point fan premium on one of the most bet-on teams in sports.", source: "Book consensus line", rel: 0.9, w: 3 },
        { side: "no", text: "Dallas coaching staff said starters will play one series at most.", source: "Press conference", rel: 0.8, w: 2 },
        { side: "yes", text: "Rams are resting their entire starting defense.", source: "Beat reporters", rel: 0.75, w: 2 }
      ],
      missing: ["Neither team has published a depth chart yet"],
      events: [{ inDays: 5, label: "Kickoff" }],
      risks: ["Preseason outcomes are near-random once backups play"],
      positions: [
        { t: "tapecheck", side: "no", entry: 62, size: 2900, daysAgo: 1, action: "open" },
        { t: "mmqb_ghost", side: "yes", entry: 63, size: 3400, daysAgo: 2, action: "open" }
      ]
    },
    {
      id: "dota-spirit-ti", q: "Dota 2: Will Team Spirit win The International qualifier?",
      category: "Sports", days: 4, yes: 33, spread: 3, liq: 28000, vol24: 9000, bookImplied: 41,
      move24: -2, move7: -5, vol: 0.45, bookImb: 0.15, resClarity: 0.97, topWallet: 0.12,
      desc: "Resolves YES if Team Spirit takes the qualifier's single TI slot.",
      rules: "Official qualifier bracket result.",
      sentiment: { yesShare: 0.4, intensity: 0.55, unsupported: 0.5, spike: false, ledPrice: true },
      evidence: [
        { side: "yes", text: "Esports books price them at 41% — the market oversold a roster-swap scare that was reversed yesterday.", source: "Book consensus line", rel: 0.85, w: 3 },
        { side: "yes", text: "Their mid-laner returned to the active roster this morning.", source: "Team announcement", rel: 0.9, w: 2 },
        { side: "no", text: "They dropped two group-stage series to bracket rivals this month.", source: "Match records", rel: 0.8, w: 2 }
      ],
      missing: [],
      events: [{ inDays: 4, label: "Bracket final" }],
      risks: ["Single-elimination brackets are high variance whatever the form book says"],
      positions: [
        { t: "midlaner", side: "yes", entry: 31, size: 2700, daysAgo: 0, action: "open" }
      ]
    },
    {
      id: "darts-night", q: "Darts: Will the Premier League night winner be the world #1?",
      category: "Sports", days: 1, yes: 44, spread: 8, liq: 3100, vol24: 500,
      move24: 0, move7: 2, vol: 0.4, bookImb: 0.1, resClarity: 0.95, topWallet: 0.4,
      desc: "Resolves YES if the world #1 wins the four-player night bracket.",
      rules: "Official PDC result.",
      sentiment: { yesShare: 0.55, intensity: 0.3, unsupported: 0.3, spike: false, ledPrice: false },
      evidence: [
        { side: "yes", text: "He has won 3 of the last 5 nights.", source: "Season record", rel: 0.8, w: 1 }
      ],
      missing: ["No book line available for the night format"],
      events: [],
      risks: ["Liquidity is a rounding error; the spread alone eats any edge"],
      positions: []
    }
  );

  /* ---------------- Resolved backtest set ----------------
     Fictional already-resolved markets used to compare the strategy against benchmarks.
     price: YES price when the system signal formed. side: system's suggested side then
     (null = no trade). score: system score then. topSide: what the #1-ranked trader held.
     outcome: 1 = YES resolved, 0 = NO resolved. */
  var RESOLVED = [
    { q: "Will the Fed cut rates at the June 2026 meeting?", category: "Economics", price: 34, side: "no", score: 74, topSide: "no", outcome: 0, days: 21 },
    { q: "Will BTC close above $120k on May 31, 2026?", category: "Crypto", price: 58, side: "no", score: 68, topSide: "no", outcome: 0, days: 30 },
    { q: "Will the Champions League final go to extra time?", category: "Sports", price: 27, side: null, score: 44, topSide: "yes", outcome: 0, days: 9 },
    { q: "Will April 2026 US CPI print above 3.0%?", category: "Economics", price: 62, side: "yes", score: 81, topSide: "yes", outcome: 1, days: 18 },
    { q: "Will the German coalition lose its Bundesrat majority in Q2?", category: "Politics", price: 41, side: "no", score: 71, topSide: "no", outcome: 0, days: 44 },
    { q: "Will SpaceX attempt a Starship launch in May 2026?", category: "Science & Tech", price: 66, side: "yes", score: 77, topSide: "yes", outcome: 1, days: 25 },
    { q: "Will the French open men's final feature the world #1?", category: "Sports", price: 55, side: null, score: 52, topSide: "yes", outcome: 0, days: 12 },
    { q: "Will ETH close above $8k on April 30, 2026?", category: "Crypto", price: 44, side: "no", score: 83, topSide: "no", outcome: 0, days: 27 },
    { q: "Will the UK's May 2026 by-election be won by the governing party?", category: "Politics", price: 38, side: "no", score: 69, topSide: "no", outcome: 1, days: 15 },
    { q: "Will OPEC+ cut quotas at the June meeting?", category: "Economics", price: 30, side: null, score: 47, topSide: "no", outcome: 1, days: 19 },
    { q: "Will a major studio delay its summer tentpole to 2027?", category: "Culture", price: 24, side: "yes", score: 66, topSide: "yes", outcome: 0, days: 38 },
    { q: "Will June 2026 nonfarm payrolls beat 150k?", category: "Economics", price: 57, side: "yes", score: 72, topSide: "yes", outcome: 1, days: 11 },
    { q: "Wimbledon QF: Djokovic to beat Fritz", category: "Sports", price: 71, side: "yes", score: 72, topSide: "yes", outcome: 1, days: 2 },
    { q: "MLB: Yankees to beat Orioles (Jun 28)", category: "Sports", price: 58, side: "no", score: 66, topSide: "no", outcome: 0, days: 1 },
    { q: "NFL preseason: Chiefs to beat Cardinals", category: "Sports", price: 66, side: "no", score: 68, topSide: "no", outcome: 1, days: 2 },
    { q: "Roland-Garros final: Alcaraz to win", category: "Sports", price: 55, side: "yes", score: 70, topSide: "yes", outcome: 1, days: 3 },
    { q: "LoL MSI: T1 to beat BLG", category: "Sports", price: 62, side: "yes", score: 74, topSide: "yes", outcome: 1, days: 1 },
    { q: "Dota 2: Team Spirit to win Riyadh qualifier", category: "Sports", price: 48, side: "yes", score: 67, topSide: "yes", outcome: 0, days: 1 },
    { q: "UFC 320 main event: champion retains", category: "Sports", price: 74, side: null, score: 45, topSide: "yes", outcome: 1, days: 2 },
    { q: "WNBA: Aces to cover -4.5 vs Sky", category: "Sports", price: 51, side: null, score: 40, topSide: "no", outcome: 0, days: 1 },
    { q: "F1 British GP: pole-sitter to win", category: "Sports", price: 40, side: "no", score: 66, topSide: "no", outcome: 0, days: 2 },
    { q: "MLB: Dodgers-Giants over 8.5 runs", category: "Sports", price: 45, side: "yes", score: 65, topSide: "yes", outcome: 0, days: 1 },
    { q: "ATP Halle: top seed to reach final", category: "Sports", price: 22, side: null, score: 38, topSide: "no", outcome: 1, days: 3 },
    { q: "CS Major: G2 to beat FaZe", category: "Sports", price: 57, side: null, score: 42, topSide: "yes", outcome: 0, days: 1 }
  ];

  /* Fictional data-source registry for the Data Status page */
  var SOURCES = [
    { name: "Market prices & order books", status: "simulated", note: "Hand-authored demo values" },
    { name: "Trader wallet histories", status: "simulated", note: "Fictional traders; formula is real" },
    { name: "News & official announcements", status: "unavailable", note: "Planned: read-only feed, phase 6" },
    { name: "Social sentiment", status: "unavailable", note: "Planned: comment + social ingestion" },
    { name: "Polymarket read-only API", status: "not connected", note: "Out of scope for this prototype" }
  ];

  /* Deterministic PRNG so charts are stable across reloads */
  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* 60-day YES price history ending at the current price, shaped so the last
     7 days honour move7 and the last day honours move24. */
  function genHistory(m) {
    var rnd = mulberry32(hashStr(m.id));
    var n = 60, pts = new Array(n);
    var p = m.yes - m.move7 - (rnd() - 0.5) * 6;
    pts[n - 8] = clamp(p, 3, 97);
    // walk backwards from day -7
    for (var i = n - 9; i >= 0; i--) {
      p = pts[i + 1] + (rnd() - 0.5) * 2 * (2 + m.vol * 4);
      pts[i] = clamp(p, 3, 97);
    }
    // forward: last 7 days trend toward current
    var start = pts[n - 8];
    for (var j = n - 7; j < n - 1; j++) {
      var frac = (j - (n - 8)) / 7;
      var target = start + (m.yes - m.move24 - start) * frac;
      pts[j] = clamp(target + (rnd() - 0.5) * (1 + m.vol * 2), 3, 97);
    }
    pts[n - 1] = m.yes;
    return pts;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  g.DEMO = {
    CATEGORIES: CATEGORIES,
    TRADERS: TRADERS,
    MARKETS: MARKETS,
    RESOLVED: RESOLVED,
    SOURCES: SOURCES,
    genHistory: genHistory,
    hashStr: hashStr,
    mulberry32: mulberry32,
    traderById: function (id) {
      for (var i = 0; i < TRADERS.length; i++) if (TRADERS[i].id === id) return TRADERS[i];
      return null;
    },
    marketById: function (id) {
      for (var i = 0; i < MARKETS.length; i++) if (MARKETS[i].id === id) return MARKETS[i];
      return null;
    }
  };
})(typeof window !== "undefined" ? window : globalThis);

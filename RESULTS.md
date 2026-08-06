# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33046 · Last run: 2026-08-06T02:02:53.630Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10467.22** | $787.82 | $-320.6 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10446.79** | $561.03 | $-114.24 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10313.98** | $398.22 | $-84.24 | 416 | 53% | $189.12 | 16 |
| super | **$10274.32** | $-110 | $384.32 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10130.97** | $-82.99 | $213.96 | 420 | 52% | $-1411.56 | 23 |
| mid_momentum_v2 | **$9953.79** | $-164.29 | $118.08 | 30 | 50% | $-355.11 | 25 |
| mm_cheap_v2 | **$9900.47** | $86.01 | $-185.54 | 32 | 56% | $-104.81 | 25 |
| fade_longshot | **$9868.7** | $25.97 | $-157.27 | 123 | 95% | $15.23 | 25 |
| mm_sports | **$9818.34** | $-580.34 | $398.68 | 488 | 55% | $-799.47 | 20 |
| copy_pro | **$9746.45** | $-723.84 | $470.29 | 398 | 51% | $-1573.84 | 25 |
| strong_dip | **$9612.38** | $-394.63 | $7.01 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9405.82** | $-581.01 | $-13.17 | 184 | 52% | $-790.11 | 7 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9005.8** | $-981.12 | $-13.08 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8818.8** | $-750.77 | $-430.43 | 60 | 50% | $-936.48 | 25 |
| mm_sports_v2 | **$8548.99** | $-1799.81 | $348.8 | 57 | 40% | $-1925.83 | 19 |
| mm_strong | **$8370.19** | $-1110.56 | $-519.25 | 86 | 47% | $-1314.51 | 25 |
| maker_flat | **$8332.83** | $-1452.92 | $-214.25 | 89 | 40% | $-1647.04 | 20 |
| momentum | **$8096.49** | $-1345.47 | $-558.04 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7715.25** | $-2341.5 | $56.75 | 171 | 47% | $-2544.53 | 12 |
| whale_fade | **$6579.26** | $-2842.2 | $-578.54 | 421 | 47% | $-3196.75 | 23 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 71 | 3 | 61% | 2.95¢ |
| maker_sports | 183 | 117 | 4 | 61% | 1.55¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

**Equity is the only honest headline** — realized P&L alone hides losses sitting in open positions. In this lab unrealized has been negative 97% of the time, so a realized-only view systematically overstates performance.

**Read 'minus best win' before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (frozen as v1, the control)
- **mm_sports** — mid_momentum, sports only (the one refinement walk-forward supports)
- **mm_tight** — mid_momentum, sports + 45–70¢ (walk-forward says the band cut is unjustified; running as the fitted arm)
- **mm_slow** — mid_momentum, only markets resolving in 2+ days
- **mm_strong** — mid_momentum, requires a ≥8¢ move instead of ≥5¢
- **mm_max** — all four refinements at once: sports, 45–70¢, 2+ days, ≥8¢
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite
- **copy_top** — mirrors top-10 leaderboard wallets' pregame buys (in-play skipped)
- **copy_pro** — copy trading with all refinements: filtered wallets, 6h freshness, no chasing, conviction stakes
- **whale_fade** — bets against copy_top's picks (its control)
- **ai_judge** — bets when a local model (Ollama on the runner) disagrees with the market by >4¢ after costs; the AI's skill is judged like any other strategy
- **random_control** — coin flips, the baseline every strategy must beat

Retired (history kept, no new bets): longshot, mean_revert, late_favorite, favorite, copy_month — each empirically buried by its own ledger.

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_

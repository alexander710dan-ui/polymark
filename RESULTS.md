# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77854 · Last run: 2026-10-30T19:49:46.104Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11751.12** | $1705.48 | $45.64 | 468 | 53% | $855.48 | 25 |
| maker_sports | **$11390.34** | $1527.16 | $-136.82 | 50 | 68% | $1314.66 | 25 |
| mm_tight | **$11129.03** | $1327.68 | $-198.65 | 508 | 54% | $1118.58 | 25 |
| mid_momentum | **$11092.93** | $846.46 | $246.47 | 276 | 57% | $632.98 | 25 |
| mm_cheap | **$10632.42** | $567.31 | $65.11 | 101 | 57% | $384.85 | 25 |
| mm_max | **$10515.69** | $550.04 | $-34.35 | 220 | 55% | $340.94 | 3 |
| maker_flat | **$10339.36** | $42.04 | $297.32 | 17 | 53% | $-149.51 | 25 |
| mm_sports | **$10081.46** | $277.69 | $-196.23 | 604 | 55% | $58.56 | 25 |
| fade_longshot | **$10022.07** | $19.21 | $2.86 | 157 | 95% | $8.47 | 25 |
| copy_top | **$9909.42** | $-43.02 | $-47.56 | 485 | 53% | $-1371.59 | 25 |
| mid_momentum_v2 | **$9867.75** | $-378.72 | $246.47 | 111 | 51% | $-569.54 | 25 |
| mm_strong | **$9860.45** | $-265.47 | $125.92 | 157 | 55% | $-469.42 | 25 |
| conviction | **$9802.17** | $-102.55 | $-95.28 | 1 | 0% | $0 | 2 |
| mm_cheap_v2 | **$9782.78** | $-282.33 | $65.11 | 118 | 53% | $-473.15 | 25 |
| super | **$9751.44** | $-117.27 | $-131.29 | 96 | 52% | $-399.17 | 14 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$8998.93** | $-1195.39 | $194.32 | 113 | 50% | $-1381.1 | 25 |
| mm_sports_v2 | **$8852.15** | $-951.62 | $-196.23 | 173 | 52% | $-1170.75 | 25 |
| strong_dip | **$8816.8** | $-912.64 | $-270.56 | 151 | 59% | $-1004.95 | 25 |
| random_control | **$8604.05** | $-1304.86 | $-91.09 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7555.94** | $-2337.88 | $-106.18 | 300 | 66% | $-2826.12 | 25 |
| whale_fade | **$6075.21** | $-3629.53 | $-295.26 | 486 | 46% | $-4080.99 | 25 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 42 | 0 | 0 | 100% | 2.59¢ |
| maker_sports | 75 | 1 | 0 | 99% | 1.43¢ |

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

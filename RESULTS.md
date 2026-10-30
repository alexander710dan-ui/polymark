# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77713 · Last run: 2026-10-30T19:15:47.750Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11756.82** | $1705.48 | $51.34 | 468 | 53% | $855.48 | 25 |
| maker_sports | **$11490.4** | $1527.16 | $-36.76 | 50 | 68% | $1314.66 | 25 |
| mm_tight | **$11225.76** | $1327.68 | $-101.92 | 508 | 54% | $1118.58 | 25 |
| mid_momentum | **$11132.38** | $846.46 | $285.92 | 276 | 57% | $632.98 | 25 |
| mm_cheap | **$10672.53** | $567.31 | $105.22 | 101 | 57% | $384.85 | 25 |
| mm_max | **$10535.86** | $550.04 | $-14.18 | 220 | 55% | $340.94 | 3 |
| maker_flat | **$10370.07** | $42.04 | $328.03 | 17 | 53% | $-149.51 | 25 |
| mm_sports | **$10178.84** | $277.69 | $-98.85 | 604 | 55% | $58.56 | 25 |
| fade_longshot | **$10021.46** | $19.21 | $2.25 | 157 | 95% | $8.47 | 25 |
| mid_momentum_v2 | **$9907.2** | $-378.72 | $285.92 | 111 | 51% | $-569.54 | 25 |
| copy_top | **$9904.29** | $-43.02 | $-52.69 | 485 | 53% | $-1371.59 | 25 |
| mm_strong | **$9899.94** | $-265.47 | $165.41 | 157 | 55% | $-469.42 | 25 |
| mm_cheap_v2 | **$9822.89** | $-282.33 | $105.22 | 118 | 53% | $-473.15 | 25 |
| conviction | **$9813.69** | $-102.55 | $-83.76 | 1 | 0% | $0 | 2 |
| super | **$9784.78** | $-117.27 | $-97.95 | 96 | 52% | $-399.17 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9015.03** | $-1195.39 | $210.42 | 113 | 50% | $-1381.1 | 25 |
| mm_sports_v2 | **$8949.53** | $-951.62 | $-98.85 | 173 | 52% | $-1170.75 | 25 |
| strong_dip | **$8791.29** | $-912.64 | $-296.07 | 151 | 59% | $-1004.95 | 25 |
| random_control | **$8589.73** | $-1304.86 | $-105.41 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7595.14** | $-2337.88 | $-66.98 | 300 | 66% | $-2826.12 | 25 |
| whale_fade | **$6113.8** | $-3629.53 | $-256.67 | 486 | 46% | $-4080.99 | 25 |
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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77579 · Last run: 2026-10-30T18:43:42.864Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11896.02** | $1705.48 | $190.54 | 468 | 53% | $855.48 | 25 |
| maker_sports | **$11589.69** | $1477.91 | $111.78 | 49 | 67% | $1265.41 | 25 |
| mm_tight | **$11329.45** | $1241.35 | $88.1 | 507 | 54% | $1032.25 | 24 |
| mid_momentum | **$11223.7** | $846.46 | $377.24 | 276 | 57% | $632.98 | 25 |
| mm_cheap | **$10760.73** | $567.31 | $193.42 | 101 | 57% | $384.85 | 25 |
| mm_max | **$10624.25** | $463.71 | $160.54 | 219 | 54% | $254.61 | 4 |
| maker_flat | **$10467.16** | $42.04 | $425.12 | 17 | 53% | $-149.51 | 24 |
| mm_sports | **$10276.21** | $277.69 | $-1.48 | 604 | 55% | $58.56 | 25 |
| fade_longshot | **$10020.92** | $19.21 | $1.71 | 157 | 95% | $8.47 | 25 |
| copy_top | **$10000.51** | $-43.02 | $43.53 | 485 | 53% | $-1371.59 | 25 |
| mid_momentum_v2 | **$9998.52** | $-378.72 | $377.24 | 111 | 51% | $-569.54 | 25 |
| mm_strong | **$9984.12** | $-265.47 | $249.59 | 157 | 55% | $-469.42 | 25 |
| super | **$9972.63** | $-117.27 | $89.9 | 96 | 52% | $-399.17 | 10 |
| mm_cheap_v2 | **$9911.09** | $-282.33 | $193.42 | 118 | 53% | $-473.15 | 25 |
| conviction | **$9909.82** | $-102.55 | $12.37 | 1 | 0% | $0 | 2 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9119.09** | $-1281.72 | $400.81 | 112 | 50% | $-1467.43 | 25 |
| mm_sports_v2 | **$9046.9** | $-951.62 | $-1.48 | 173 | 52% | $-1170.75 | 25 |
| strong_dip | **$8801.34** | $-912.64 | $-286.02 | 151 | 59% | $-1004.95 | 25 |
| random_control | **$8596.44** | $-1304.86 | $-98.7 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7603.64** | $-2337.88 | $-58.48 | 300 | 66% | $-2826.12 | 25 |
| whale_fade | **$5985.64** | $-3629.53 | $-384.83 | 486 | 46% | $-4080.99 | 25 |
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
| maker_flat | 41 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 74 | 1 | 0 | 99% | 1.44¢ |

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

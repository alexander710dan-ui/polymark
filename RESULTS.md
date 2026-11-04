# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91538 · Last run: 2026-11-04T07:31:56.420Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12498.47** | $2368.14 | $130.33 | 519 | 55% | $1518.14 | 16 |
| mm_cheap | **$11765.38** | $1301.81 | $463.57 | 153 | 56% | $1081.99 | 19 |
| mid_momentum | **$11613.73** | $1333.02 | $280.71 | 326 | 56% | $1113.2 | 22 |
| maker_sports | **$11499.98** | $974.11 | $525.87 | 229 | 56% | $740.78 | 8 |
| maker_flat | **$11493.16** | $641.34 | $851.82 | 65 | 52% | $447.22 | 17 |
| mm_tight | **$11331.66** | $1000.21 | $331.45 | 664 | 54% | $781.08 | 8 |
| mm_cheap_v2 | **$10915.74** | $452.17 | $463.57 | 170 | 53% | $232.35 | 19 |
| mid_momentum_v2 | **$10388.55** | $107.84 | $280.71 | 161 | 52% | $-111.98 | 22 |
| mm_max | **$10204.77** | $-132.24 | $337.01 | 276 | 53% | $-341.34 | 6 |
| mm_slow | **$10021.3** | $-261.43 | $282.73 | 147 | 52% | $-470.53 | 23 |
| mm_strong | **$9950.01** | $-392.47 | $342.48 | 223 | 53% | $-596.42 | 20 |
| fade_longshot | **$9879.34** | $-184.38 | $63.72 | 183 | 94% | $-195.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9310.42** | $-1159.82 | $470.24 | 789 | 54% | $-1378.95 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8719.28** | $-1087.53 | $-193.19 | 205 | 58% | $-1181.16 | 21 |
| super | **$8577.21** | $-1572.64 | $149.85 | 132 | 50% | $-1854.54 | 1 |
| copy_top | **$8491.04** | $-1452.83 | $-56.13 | 552 | 52% | $-2781.4 | 16 |
| mm_sports_v2 | **$8081.11** | $-2389.13 | $470.24 | 358 | 51% | $-2608.26 | 9 |
| random_control | **$7898.35** | $-1466.83 | $-634.82 | 198 | 54% | $-2081.12 | 25 |
| momentum | **$7528.16** | $-2256.77 | $-215.07 | 320 | 65% | $-2745.01 | 25 |
| whale_fade | **$7316** | $-3250.73 | $566.73 | 549 | 47% | $-3702.19 | 18 |
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
| maker_flat | 82 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 237 | 1 | 0 | 100% | 1.32¢ |

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

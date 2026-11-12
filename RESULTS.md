# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82274 · Last run: 2026-11-12T15:22:45.660Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.14** | $2469.41 | $-84.27 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12189.39** | $2439.53 | $-250.14 | 371 | 57% | $2194.7 | 9 |
| mm_tight | **$11380.07** | $1648.86 | $-268.79 | 792 | 54% | $1429.73 | 5 |
| mm_cheap | **$11287.74** | $1091.62 | $196.12 | 229 | 55% | $871.8 | 25 |
| mid_momentum | **$11229.65** | $1115.5 | $114.15 | 383 | 55% | $895.68 | 25 |
| maker_flat | **$10550.48** | $412.71 | $137.77 | 115 | 50% | $218.59 | 24 |
| mm_max | **$10546.74** | $692.76 | $-146.02 | 311 | 55% | $483.66 | 3 |
| mm_cheap_v2 | **$10438.1** | $241.98 | $196.12 | 246 | 53% | $22.16 | 25 |
| mid_momentum_v2 | **$10004.47** | $-109.68 | $114.15 | 218 | 52% | $-329.5 | 25 |
| fade_longshot | **$9883.66** | $-140.38 | $24.04 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9228.12** | $-462.01 | $-309.87 | 200 | 52% | $-681.14 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9180.7** | $-542.12 | $-277.18 | 938 | 54% | $-761.25 | 9 |
| mm_strong | **$9002.89** | $-868.29 | $-128.82 | 310 | 53% | $-1087.42 | 24 |
| strong_dip | **$8871.29** | $-1301.47 | $172.76 | 259 | 58% | $-1395.1 | 22 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8375.4** | $-1470.79 | $-153.81 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7951.39** | $-1771.43 | $-277.18 | 507 | 52% | $-1990.56 | 9 |
| random_control | **$7387.98** | $-2427.27 | $-184.75 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7257.34** | $-2770.21 | $27.55 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5975.9** | $-4244.08 | $219.98 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 139 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 380 | 2 | 0 | 99% | 1.39¢ |

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

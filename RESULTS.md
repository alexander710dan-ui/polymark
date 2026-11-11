# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80059 · Last run: 2026-11-11T11:41:11.958Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13230** | $3330.73 | $-100.73 | 298 | 59% | $3085.9 | 18 |
| copy_pro | **$12384.83** | $2469.41 | $-84.58 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12215.29** | $1815.35 | $399.94 | 201 | 57% | $1595.53 | 25 |
| mm_tight | **$12193.75** | $2262.66 | $-68.91 | 724 | 55% | $2043.53 | 13 |
| mid_momentum | **$11589.4** | $1308.03 | $281.37 | 365 | 56% | $1088.21 | 25 |
| mm_cheap_v2 | **$11365.65** | $965.71 | $399.94 | 218 | 55% | $745.89 | 25 |
| maker_flat | **$10634.69** | $713.28 | $-78.59 | 96 | 52% | $519.16 | 17 |
| mm_sports | **$10538.35** | $692.81 | $-154.46 | 862 | 55% | $473.68 | 19 |
| mid_momentum_v2 | **$10364.22** | $82.85 | $281.37 | 200 | 52% | $-136.97 | 25 |
| mm_max | **$10338.59** | $263.29 | $75.3 | 293 | 54% | $54.19 | 2 |
| fade_longshot | **$9948.41** | $-56.44 | $4.85 | 226 | 95% | $-67.18 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9558.37** | $-589.47 | $147.84 | 270 | 53% | $-808.6 | 25 |
| mm_slow | **$9511.27** | $-454.77 | $-33.96 | 177 | 52% | $-673.9 | 19 |
| mm_sports_v2 | **$9309.04** | $-536.5 | $-154.46 | 431 | 54% | $-755.63 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8656.28** | $-1242.86 | $-100.86 | 232 | 58% | $-1336.49 | 19 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8376.98** | $-1470.79 | $-152.23 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7548.02** | $-2427.27 | $-24.71 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7399.19** | $-2625.55 | $24.74 | 359 | 66% | $-3113.79 | 25 |
| whale_fade | **$6000.04** | $-4244.08 | $244.12 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 113 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 316 | 1 | 0 | 100% | 1.32¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82803 · Last run: 2026-10-31T20:12:36.803Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11682.98** | $1555.03 | $127.95 | 487 | 53% | $705.03 | 25 |
| maker_sports | **$11273.35** | $1586.9 | $-313.55 | 84 | 62% | $1374.4 | 10 |
| mid_momentum | **$10883.36** | $984.01 | $-100.65 | 289 | 56% | $770.53 | 25 |
| mm_tight | **$10691.47** | $962.75 | $-271.28 | 540 | 54% | $753.65 | 8 |
| mm_cheap | **$10404.75** | $692.44 | $-287.69 | 114 | 57% | $500.75 | 25 |
| mm_max | **$10271.66** | $271.77 | $-0.11 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10182.83** | $140.79 | $42.04 | 28 | 50% | $-50.76 | 24 |
| fade_longshot | **$9943.04** | $-70.35 | $13.39 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9691.63** | $-306.99 | $-1.38 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9658.18** | $-241.17 | $-100.65 | 124 | 52% | $-433.72 | 25 |
| mm_strong | **$9557.22** | $-232.66 | $-210.12 | 168 | 54% | $-436.61 | 25 |
| mm_cheap_v2 | **$9555.11** | $-157.2 | $-287.69 | 131 | 53% | $-348.89 | 25 |
| mm_sports | **$9475.79** | $-188.12 | $-336.09 | 638 | 55% | $-407.25 | 10 |
| copy_top | **$9215.31** | $-801.66 | $16.97 | 506 | 52% | $-2130.23 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9049.62** | $-794.17 | $-156.21 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8885.82** | $-1022.63 | $-91.55 | 161 | 58% | $-1116.26 | 22 |
| mm_slow | **$8883.29** | $-1007.21 | $-109.5 | 117 | 50% | $-1206.89 | 25 |
| super | **$8773.68** | $-786.98 | $-439.34 | 116 | 51% | $-1068.88 | 8 |
| mm_sports_v2 | **$8246.48** | $-1417.43 | $-336.09 | 207 | 51% | $-1636.56 | 10 |
| momentum | **$7274.23** | $-2644.98 | $-80.79 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6723.91** | $-2856.01 | $-420.08 | 507 | 47% | $-3307.47 | 25 |
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
| maker_flat | 52 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 94 | 1 | 0 | 99% | 1.42¢ |

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

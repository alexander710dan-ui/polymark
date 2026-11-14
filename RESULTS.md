# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85924 · Last run: 2026-11-14T15:06:44.217Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13552.33** | $3786.23 | $-233.9 | 484 | 58% | $3541.4 | 15 |
| copy_pro | **$12382.67** | $2319.6 | $63.07 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11546.9** | $1848.88 | $-301.98 | 898 | 53% | $1629.75 | 12 |
| mid_momentum | **$11442.39** | $1473.37 | $-30.98 | 435 | 55% | $1253.55 | 25 |
| maker_flat | **$11164.2** | $1019.44 | $144.76 | 139 | 53% | $825.32 | 25 |
| mm_cheap | **$10733.48** | $807.47 | $-73.99 | 299 | 53% | $587.65 | 25 |
| mm_max | **$10602.44** | $703.36 | $-100.92 | 345 | 55% | $494.26 | 2 |
| mid_momentum_v2 | **$10217.21** | $248.19 | $-30.98 | 270 | 53% | $28.37 | 25 |
| fade_longshot | **$9903.84** | $-129.36 | $33.2 | 232 | 94% | $-140.1 | 25 |
| mm_cheap_v2 | **$9883.84** | $-42.17 | $-73.99 | 316 | 52% | $-261.99 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9380.14** | $-351.22 | $-268.64 | 1063 | 54% | $-570.35 | 16 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$8922.74** | $-932.05 | $-145.21 | 226 | 51% | $-1151.18 | 25 |
| mm_strong | **$8891.69** | $-963.37 | $-144.94 | 389 | 51% | $-1182.5 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8483.71** | $-1808.77 | $292.48 | 292 | 56% | $-1902.4 | 25 |
| copy_top | **$8369.64** | $-1672.4 | $42.04 | 567 | 53% | $-3000.97 | 1 |
| mm_sports_v2 | **$8150.83** | $-1580.53 | $-268.64 | 632 | 52% | $-1799.66 | 16 |
| momentum | **$7566.28** | $-2592.82 | $159.1 | 381 | 65% | $-3081.06 | 25 |
| random_control | **$7147.25** | $-2944.83 | $92.08 | 249 | 53% | $-3559.12 | 25 |
| whale_fade | **$5963.1** | $-4002.69 | $-34.21 | 566 | 46% | $-4454.15 | 1 |
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
| maker_flat | 164 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 499 | 4 | 0 | 99% | 1.4¢ |

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

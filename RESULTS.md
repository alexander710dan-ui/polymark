# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81923 · Last run: 2026-11-12T10:30:13.217Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12671.34** | $3088.24 | $-416.9 | 362 | 58% | $2843.41 | 10 |
| copy_pro | **$12384.84** | $2469.41 | $-84.57 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11762.42** | $2203.28 | $-440.86 | 784 | 54% | $1984.15 | 7 |
| mm_cheap | **$11672.96** | $1667.46 | $5.5 | 219 | 57% | $1447.64 | 25 |
| mid_momentum | **$11351.46** | $1186.9 | $164.56 | 377 | 55% | $967.08 | 25 |
| mm_cheap_v2 | **$10823.32** | $817.82 | $5.5 | 236 | 54% | $598 | 25 |
| mm_max | **$10793.81** | $748.45 | $45.36 | 307 | 55% | $539.35 | 2 |
| maker_flat | **$10580.97** | $553.98 | $26.99 | 110 | 51% | $359.86 | 23 |
| mid_momentum_v2 | **$10126.28** | $-38.28 | $164.56 | 212 | 52% | $-258.1 | 25 |
| fade_longshot | **$9872.84** | $-140.38 | $13.22 | 230 | 94% | $-151.12 | 25 |
| mm_sports | **$9692.45** | $238.12 | $-545.67 | 928 | 55% | $18.99 | 12 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9554.4** | $-197.62 | $-247.98 | 196 | 53% | $-416.75 | 25 |
| mm_strong | **$9353.33** | $-394.3 | $-252.37 | 301 | 54% | $-613.43 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8741** | $-1505.84 | $246.84 | 254 | 57% | $-1599.47 | 24 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8463.14** | $-991.19 | $-545.67 | 497 | 53% | $-1210.32 | 12 |
| copy_top | **$8376** | $-1470.79 | $-153.21 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7524.16** | $-2427.27 | $-48.57 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7303.46** | $-2770.21 | $73.67 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5970.15** | $-4244.08 | $214.23 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 133 | 0 | 1 | 100% | 2.68¢ |
| maker_sports | 372 | 2 | 1 | 99% | 1.38¢ |

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

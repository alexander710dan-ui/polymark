# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82340 · Last run: 2026-11-12T16:17:27.300Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.14** | $2469.41 | $-84.27 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12189.31** | $2339.53 | $-150.22 | 372 | 57% | $2094.7 | 8 |
| mm_tight | **$11376.89** | $1545.81 | $-168.92 | 793 | 54% | $1326.68 | 4 |
| mm_cheap | **$11233.27** | $885.76 | $347.51 | 231 | 55% | $665.94 | 24 |
| mid_momentum | **$11204.37** | $909.16 | $295.21 | 385 | 55% | $689.34 | 24 |
| maker_flat | **$10597.34** | $701.68 | $-104.34 | 117 | 51% | $507.56 | 24 |
| mm_max | **$10543.56** | $589.71 | $-46.15 | 312 | 54% | $380.61 | 2 |
| mm_cheap_v2 | **$10383.63** | $36.12 | $347.51 | 248 | 52% | $-183.7 | 24 |
| mid_momentum_v2 | **$9979.19** | $-316.02 | $295.21 | 220 | 51% | $-535.84 | 24 |
| fade_longshot | **$9882.29** | $-140.38 | $22.67 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9223.45** | $-565.21 | $-211.34 | 201 | 52% | $-784.34 | 23 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9172.78** | $-644.12 | $-183.1 | 939 | 54% | $-863.25 | 9 |
| mm_strong | **$8952.6** | $-1074.15 | $26.75 | 312 | 53% | $-1293.28 | 22 |
| strong_dip | **$8872.37** | $-1242.08 | $114.45 | 260 | 58% | $-1335.71 | 21 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8375.01** | $-1470.79 | $-154.2 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$7943.47** | $-1873.43 | $-183.1 | 508 | 52% | $-2092.56 | 9 |
| random_control | **$7377.62** | $-2427.27 | $-195.11 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7250.49** | $-2770.21 | $20.7 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5976.03** | $-4244.08 | $220.11 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 141 | 0 | 0 | 100% | 2.67¢ |
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

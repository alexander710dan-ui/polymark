# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81961 · Last run: 2026-11-12T11:01:58.458Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12698.31** | $2888.24 | $-189.93 | 364 | 57% | $2643.41 | 9 |
| copy_pro | **$12384.79** | $2469.41 | $-84.62 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$11760.79** | $1998.78 | $-237.99 | 786 | 54% | $1779.65 | 6 |
| mm_cheap | **$11607.57** | $1462.96 | $144.61 | 221 | 56% | $1243.14 | 25 |
| mid_momentum | **$11317.41** | $1186.9 | $130.51 | 377 | 55% | $967.08 | 25 |
| mm_cheap_v2 | **$10757.93** | $613.32 | $144.61 | 238 | 54% | $393.5 | 25 |
| mm_max | **$10728.15** | $834.78 | $-106.63 | 308 | 55% | $625.68 | 2 |
| maker_flat | **$10563.18** | $453.98 | $109.2 | 111 | 50% | $259.86 | 23 |
| mid_momentum_v2 | **$10092.23** | $-38.28 | $130.51 | 212 | 52% | $-258.1 | 25 |
| fade_longshot | **$9865.95** | $-140.38 | $6.33 | 230 | 94% | $-151.12 | 25 |
| mm_sports | **$9711.2** | $33.62 | $-322.42 | 930 | 54% | $-185.51 | 10 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_slow | **$9512.37** | $-299.42 | $-188.21 | 197 | 52% | $-518.55 | 24 |
| mm_strong | **$9292.19** | $-497 | $-210.81 | 302 | 54% | $-716.13 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8737.65** | $-1426.27 | $163.92 | 255 | 57% | $-1519.9 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8481.89** | $-1195.69 | $-322.42 | 499 | 53% | $-1414.82 | 10 |
| copy_top | **$8375.57** | $-1470.79 | $-153.64 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7525.24** | $-2427.27 | $-47.49 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7296.7** | $-2770.21 | $66.91 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5973.41** | $-4244.08 | $217.49 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 134 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 373 | 2 | 0 | 99% | 1.39¢ |

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

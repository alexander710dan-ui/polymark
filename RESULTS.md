# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 84408 · Last run: 2026-11-13T18:17:17.978Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12821.27** | $2853.99 | $-32.72 | 426 | 57% | $2609.16 | 16 |
| copy_pro | **$12384.24** | $2469.41 | $-85.17 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12218.41** | $2222.62 | $-4.21 | 840 | 54% | $2003.49 | 12 |
| mid_momentum | **$11439.97** | $1217.31 | $222.66 | 418 | 55% | $997.49 | 25 |
| mm_cheap | **$11272.57** | $1069.76 | $202.81 | 273 | 55% | $849.94 | 25 |
| maker_flat | **$11213.06** | $1073.69 | $139.37 | 135 | 53% | $879.57 | 23 |
| mm_max | **$11159.24** | $1145.84 | $13.4 | 335 | 56% | $936.74 | 3 |
| mm_cheap_v2 | **$10422.93** | $220.12 | $202.81 | 290 | 53% | $0.3 | 25 |
| mid_momentum_v2 | **$10214.79** | $-7.87 | $222.66 | 253 | 52% | $-227.69 | 25 |
| fade_longshot | **$9881.55** | $-140.38 | $21.93 | 230 | 94% | $-151.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9309.14** | $-627.32 | $-63.54 | 998 | 54% | $-846.45 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9137.09** | $-628.27 | $-234.64 | 218 | 52% | $-847.4 | 25 |
| mm_strong | **$8762.9** | $-1301.64 | $64.54 | 349 | 53% | $-1520.77 | 25 |
| strong_dip | **$8700.18** | $-1377 | $77.18 | 274 | 58% | $-1470.63 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8374.45** | $-1470.79 | $-154.76 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8079.83** | $-1856.63 | $-63.54 | 567 | 52% | $-2075.76 | 19 |
| random_control | **$7400.35** | $-2434.87 | $-164.78 | 244 | 54% | $-3049.16 | 25 |
| momentum | **$7279.75** | $-2722.45 | $2.2 | 379 | 65% | $-3210.69 | 25 |
| whale_fade | **$5971.7** | $-4244.08 | $215.78 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 158 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 442 | 2 | 1 | 100% | 1.39¢ |

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

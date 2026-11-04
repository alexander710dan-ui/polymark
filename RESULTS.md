# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 92821 · Last run: 2026-11-04T17:41:24.511Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12441.8** | $2625.78 | $-183.98 | 527 | 55% | $1775.78 | 8 |
| mm_cheap | **$11804.05** | $1557.97 | $246.08 | 158 | 57% | $1338.15 | 25 |
| maker_flat | **$11738.64** | $762.88 | $975.76 | 69 | 54% | $568.76 | 20 |
| mid_momentum | **$11625.12** | $1340.65 | $284.47 | 332 | 56% | $1120.83 | 25 |
| maker_sports | **$11615.07** | $986.88 | $628.19 | 231 | 56% | $753.55 | 12 |
| mm_tight | **$11472.31** | $1105.94 | $366.37 | 665 | 54% | $886.81 | 11 |
| mm_cheap_v2 | **$10954.41** | $708.33 | $246.08 | 175 | 54% | $488.51 | 25 |
| mid_momentum_v2 | **$10399.94** | $115.47 | $284.47 | 167 | 51% | $-104.35 | 25 |
| mm_max | **$10349.27** | $-26.51 | $375.78 | 277 | 53% | $-235.61 | 6 |
| mm_slow | **$10069.19** | $-172.3 | $241.49 | 151 | 53% | $-381.4 | 24 |
| mm_strong | **$9979.35** | $-330.6 | $309.95 | 228 | 54% | $-534.55 | 22 |
| fade_longshot | **$9897.4** | $-136.63 | $34.03 | 190 | 94% | $-147.37 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9404.41** | $-1156.04 | $560.45 | 791 | 54% | $-1375.17 | 14 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8585.05** | $-1062.44 | $-352.51 | 208 | 58% | $-1156.07 | 23 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8382.06** | $-1396.72 | $-221.22 | 560 | 53% | $-2725.29 | 8 |
| mm_sports_v2 | **$8175.1** | $-2385.35 | $560.45 | 360 | 51% | $-2604.48 | 14 |
| random_control | **$7807.06** | $-1800.55 | $-392.39 | 209 | 54% | $-2414.84 | 25 |
| momentum | **$7554.76** | $-2267.52 | $-177.72 | 330 | 66% | $-2755.76 | 25 |
| whale_fade | **$6551.88** | $-3723.04 | $274.92 | 557 | 47% | $-4174.5 | 10 |
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
| maker_flat | 89 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 243 | 1 | 0 | 100% | 1.31¢ |

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

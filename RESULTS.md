# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72018 · Last run: 2026-10-29T20:53:39.070Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11012.37** | $874.81 | $137.56 | 444 | 53% | $24.81 | 25 |
| maker_sports | **$10817.18** | $816.63 | $0.55 | 20 | 75% | $625.08 | 7 |
| mid_momentum | **$10732.75** | $613.44 | $119.31 | 262 | 56% | $399.96 | 22 |
| mm_tight | **$10679.71** | $715.67 | $-35.96 | 484 | 54% | $506.57 | 3 |
| fade_longshot | **$10076.79** | $89.44 | $-12.65 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10034.19** | $93.91 | $-59.72 | 209 | 54% | $-115.19 | 2 |
| mm_cheap | **$10016.9** | $-38.67 | $55.57 | 81 | 54% | $-221.13 | 19 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9810.75** | $93 | $-282.25 | 11 | 55% | $-98.55 | 21 |
| mm_sports | **$9674.19** | $-312.69 | $-13.12 | 573 | 55% | $-531.82 | 7 |
| copy_top | **$9666.91** | $-336.59 | $3.5 | 459 | 53% | $-1665.16 | 15 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mid_momentum_v2 | **$9507.57** | $-611.74 | $119.31 | 97 | 49% | $-802.56 | 22 |
| strong_dip | **$9467.99** | $-437.85 | $-94.16 | 141 | 61% | $-530.16 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9167.26** | $-888.31 | $55.57 | 98 | 49% | $-1079.13 | 19 |
| mm_strong | **$8960.32** | $-1100.87 | $61.19 | 139 | 51% | $-1304.82 | 19 |
| random_control | **$8725.12** | $-1190.91 | $-83.97 | 182 | 56% | $-1805.2 | 25 |
| mm_slow | **$8527.74** | $-1593.91 | $121.65 | 102 | 48% | $-1779.62 | 18 |
| mm_sports_v2 | **$8444.88** | $-1542 | $-13.12 | 142 | 50% | $-1761.13 | 7 |
| momentum | **$7445.92** | $-2533.86 | $-20.22 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6101.04** | $-3817.17 | $-81.79 | 460 | 46% | $-4171.72 | 15 |
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
| maker_flat | 32 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 27 | 1 | 0 | 96% | 1.74¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72136 · Last run: 2026-10-29T21:21:07.160Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$10914.2** | $870.48 | $43.72 | 21 | 76% | $678.93 | 7 |
| mid_momentum | **$10802.51** | $661.04 | $141.47 | 263 | 56% | $447.56 | 25 |
| copy_pro | **$10723.09** | $874.81 | $-151.72 | 444 | 53% | $24.81 | 25 |
| mm_tight | **$10682.03** | $715.67 | $-33.64 | 484 | 54% | $506.57 | 4 |
| mm_cheap | **$10083.94** | $8.93 | $75.01 | 82 | 55% | $-173.53 | 22 |
| fade_longshot | **$10072.77** | $89.44 | $-16.67 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10055.88** | $93.91 | $-38.03 | 209 | 54% | $-115.19 | 2 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_sports | **$9765.06** | $-265.09 | $30.15 | 574 | 55% | $-484.22 | 8 |
| maker_flat | **$9752.61** | $-7 | $-240.39 | 12 | 50% | $-198.55 | 20 |
| mid_momentum_v2 | **$9577.33** | $-564.14 | $141.47 | 98 | 50% | $-754.96 | 25 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9499.45** | $-336.59 | $-163.96 | 459 | 53% | $-1665.16 | 15 |
| strong_dip | **$9429.17** | $-437.85 | $-132.98 | 141 | 61% | $-530.16 | 10 |
| mm_cheap_v2 | **$9234.3** | $-840.71 | $75.01 | 99 | 49% | $-1031.53 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$8954.97** | $-1053.27 | $8.24 | 140 | 51% | $-1257.22 | 21 |
| random_control | **$8777.24** | $-1190.91 | $-31.85 | 182 | 56% | $-1805.2 | 25 |
| mm_sports_v2 | **$8535.75** | $-1494.4 | $30.15 | 143 | 50% | $-1713.53 | 8 |
| mm_slow | **$8528.18** | $-1546.31 | $74.49 | 103 | 49% | $-1732.02 | 18 |
| momentum | **$7431.85** | $-2533.86 | $-34.29 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6374.2** | $-3817.17 | $191.37 | 460 | 46% | $-4171.72 | 15 |
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
| maker_sports | 28 | 1 | 1 | 97% | 1.71¢ |

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

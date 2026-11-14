# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86368 · Last run: 2026-11-14T20:26:41.176Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13936.59** | $4092.58 | $-155.99 | 495 | 58% | $3847.75 | 23 |
| copy_pro | **$12365.62** | $2319.6 | $46.02 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11676.68** | $1901.85 | $-225.17 | 907 | 53% | $1682.72 | 16 |
| mid_momentum | **$11385.76** | $1269.32 | $116.44 | 437 | 55% | $1049.5 | 25 |
| maker_flat | **$11243.66** | $1019.44 | $224.22 | 139 | 53% | $825.32 | 25 |
| mm_cheap | **$10647.28** | $602.62 | $44.66 | 301 | 53% | $382.8 | 25 |
| mm_max | **$10600.36** | $601.36 | $-1 | 346 | 55% | $392.26 | 1 |
| mid_momentum_v2 | **$10160.58** | $44.14 | $116.44 | 272 | 52% | $-175.68 | 25 |
| fade_longshot | **$9907.06** | $-129.36 | $36.42 | 232 | 94% | $-140.1 | 25 |
| mm_cheap_v2 | **$9797.64** | $-247.02 | $44.66 | 318 | 51% | $-466.84 | 25 |
| mm_sports | **$9681.91** | $-122.59 | $-195.5 | 1074 | 54% | $-341.72 | 24 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9004.15** | $-932.05 | $-63.8 | 226 | 51% | $-1151.18 | 25 |
| mm_strong | **$8628.49** | $-1169.84 | $-201.67 | 391 | 51% | $-1388.97 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8452.6** | $-1351.9 | $-195.5 | 643 | 52% | $-1571.03 | 24 |
| strong_dip | **$8396.44** | $-1847.37 | $243.81 | 296 | 56% | $-1941 | 25 |
| copy_top | **$8358.28** | $-1672.4 | $30.68 | 567 | 53% | $-3000.97 | 1 |
| momentum | **$7586.84** | $-2592.82 | $179.66 | 381 | 65% | $-3081.06 | 25 |
| random_control | **$7230.4** | $-2944.83 | $175.23 | 249 | 53% | $-3559.12 | 25 |
| whale_fade | **$5971.87** | $-4002.69 | $-25.44 | 566 | 46% | $-4454.15 | 1 |
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
| maker_sports | 518 | 4 | 0 | 99% | 1.4¢ |

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

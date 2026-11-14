# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86341 · Last run: 2026-11-14T20:07:11.503Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13989.22** | $3788.18 | $201.04 | 493 | 58% | $3543.35 | 25 |
| copy_pro | **$12372.44** | $2319.6 | $52.84 | 534 | 55% | $1469.6 | 1 |
| mm_tight | **$11749.3** | $1625.8 | $123.5 | 905 | 53% | $1406.67 | 16 |
| mid_momentum | **$11417.46** | $1269.32 | $148.14 | 437 | 55% | $1049.5 | 25 |
| maker_flat | **$11229.13** | $1019.44 | $209.69 | 139 | 53% | $825.32 | 25 |
| mm_cheap | **$10689.61** | $602.62 | $86.99 | 301 | 53% | $382.8 | 25 |
| mm_max | **$10600.36** | $601.36 | $-1 | 346 | 55% | $392.26 | 1 |
| mid_momentum_v2 | **$10192.28** | $44.14 | $148.14 | 272 | 52% | $-175.68 | 25 |
| fade_longshot | **$9905.68** | $-129.36 | $35.04 | 232 | 94% | $-140.1 | 25 |
| mm_cheap_v2 | **$9839.97** | $-247.02 | $86.99 | 318 | 51% | $-466.84 | 25 |
| mm_sports | **$9748.22** | $-398.64 | $146.86 | 1072 | 54% | $-617.77 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9035.67** | $-932.05 | $-32.28 | 226 | 51% | $-1151.18 | 25 |
| mm_strong | **$8697.83** | $-1169.84 | $-132.33 | 391 | 51% | $-1388.97 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports_v2 | **$8518.91** | $-1627.95 | $146.86 | 641 | 52% | $-1847.08 | 25 |
| strong_dip | **$8386.74** | $-1745.82 | $132.56 | 295 | 56% | $-1839.45 | 25 |
| copy_top | **$8362.83** | $-1672.4 | $35.23 | 567 | 53% | $-3000.97 | 1 |
| momentum | **$7580.24** | $-2592.82 | $173.06 | 381 | 65% | $-3081.06 | 25 |
| random_control | **$7229.88** | $-2944.83 | $174.71 | 249 | 53% | $-3559.12 | 25 |
| whale_fade | **$5968.36** | $-4002.69 | $-28.95 | 566 | 46% | $-4454.15 | 1 |
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

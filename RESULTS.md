# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71677 · Last run: 2026-10-29T19:33:30.911Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10781.76** | $455.35 | $326.41 | 442 | 53% | $-394.65 | 25 |
| maker_sports | **$10716.48** | $599.24 | $117.24 | 18 | 72% | $407.69 | 6 |
| mm_tight | **$10618.24** | $511.92 | $106.32 | 482 | 54% | $302.82 | 3 |
| mid_momentum | **$10559.27** | $409.69 | $149.58 | 260 | 56% | $196.21 | 19 |
| fade_longshot | **$10096.65** | $89.44 | $7.21 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9994.13** | $-16.21 | $10.34 | 208 | 53% | $-225.31 | 2 |
| maker_flat | **$9925.12** | $93 | $-167.88 | 11 | 55% | $-98.55 | 19 |
| mm_cheap | **$9845.58** | $-242.42 | $88 | 79 | 53% | $-424.88 | 16 |
| copy_top | **$9686.76** | $-442.32 | $129.08 | 458 | 53% | $-1770.89 | 14 |
| mm_sports | **$9587.05** | $-516.44 | $103.49 | 571 | 55% | $-735.57 | 6 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| strong_dip | **$9548.96** | $-335.55 | $-115.49 | 140 | 61% | $-427.86 | 10 |
| mid_momentum_v2 | **$9334.09** | $-815.49 | $149.58 | 95 | 48% | $-1006.31 | 19 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$8995.94** | $-1092.06 | $88 | 96 | 48% | $-1282.88 | 16 |
| random_control | **$8818.61** | $-1189.69 | $8.3 | 180 | 56% | $-1803.98 | 25 |
| mm_strong | **$8763.95** | $-1210.99 | $-25.06 | 138 | 51% | $-1414.94 | 16 |
| mm_sports_v2 | **$8357.74** | $-1745.75 | $103.49 | 140 | 49% | $-1964.88 | 6 |
| mm_slow | **$8352.17** | $-1704.03 | $56.2 | 101 | 48% | $-1889.74 | 15 |
| momentum | **$7388.92** | $-2533.86 | $-77.22 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6112.26** | $-3714.82 | $-172.92 | 459 | 46% | $-4069.37 | 14 |
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
| maker_flat | 30 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 24 | 1 | 0 | 96% | 1.79¢ |

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

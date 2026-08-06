# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32828 · Last run: 2026-08-06T00:01:33.223Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10485.74** | $787.82 | $-302.08 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10408.88** | $561.03 | $-152.15 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10183.7** | $837.78 | $-654.08 | 404 | 54% | $634.75 | 21 |
| super | **$9969.01** | $-306.37 | $275.38 | 74 | 49% | $-522.22 | 15 |
| copy_top | **$9884.94** | $-386.57 | $271.51 | 417 | 52% | $-1715.14 | 25 |
| fade_longshot | **$9850.77** | $25.97 | $-175.2 | 123 | 95% | $15.23 | 25 |
| mm_cheap_v2 | **$9818.98** | $134.51 | $-315.53 | 28 | 57% | $-56.31 | 25 |
| copy_pro | **$9685.7** | $-797.13 | $482.83 | 397 | 51% | $-1647.13 | 25 |
| mid_momentum_v2 | **$9605.16** | $-115.6 | $-279.24 | 26 | 50% | $-306.42 | 25 |
| strong_dip | **$9576.9** | $-394.63 | $-28.47 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9359.88** | $-494.85 | $-145.27 | 176 | 53% | $-661.97 | 9 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9172.71** | $-265.59 | $-561.7 | 475 | 55% | $-484.72 | 25 |
| random_control | **$9036.03** | $-1100.59 | $136.62 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8765.97** | $-750.77 | $-483.26 | 60 | 50% | $-936.48 | 25 |
| mm_strong | **$8346.31** | $-1110.56 | $-543.13 | 86 | 47% | $-1314.51 | 25 |
| maker_flat | **$8292.84** | $-1349 | $-358.16 | 86 | 41% | $-1543.12 | 20 |
| momentum | **$8034.81** | $-1345.47 | $-619.72 | 265 | 67% | $-1833.71 | 25 |
| mm_sports_v2 | **$7946.66** | $-1426.21 | $-627.13 | 43 | 40% | $-1552.23 | 25 |
| maker_sports | **$7450.7** | $-1871.4 | $-677.9 | 159 | 48% | $-2074.43 | 18 |
| whale_fade | **$6860.59** | $-2534.9 | $-604.51 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.44** | $-931.5 | $-68.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 106 | 68 | 4 | 61% | 2.97¢ |
| maker_sports | 177 | 111 | 6 | 61% | 1.55¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34709 · Last run: 2026-08-06T17:38:08.531Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10315.69** | $-15.24 | $330.93 | 4 | 50% | $-111.32 | 13 |
| maker_sports | **$10217.7** | $-7.69 | $225.39 | 4 | 50% | $-107.69 | 21 |
| mm_tight | **$10143.99** | $99.2 | $44.79 | 462 | 53% | $-109.9 | 22 |
| mm_cheap | **$10093.85** | $537.65 | $-443.8 | 40 | 60% | $359.87 | 25 |
| mid_momentum | **$10089.89** | $411.1 | $-321.21 | 218 | 56% | $197.62 | 25 |
| super | **$10003.4** | $-107.14 | $110.54 | 80 | 50% | $-371.47 | 13 |
| fade_longshot | **$9893.59** | $25.97 | $-132.38 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9725.6** | $-322.25 | $47.85 | 426 | 52% | $-1650.82 | 25 |
| strong_dip | **$9682.08** | $-517.26 | $199.34 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9645.39** | $-285.81 | $-68.8 | 201 | 53% | $-494.91 | 4 |
| copy_pro | **$9579.97** | $-706.11 | $286.08 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9523.19** | $-48.14 | $-428.67 | 55 | 53% | $-238.96 | 25 |
| mm_cheap_v2 | **$9374.06** | $-414.69 | $-211.25 | 59 | 51% | $-605.51 | 25 |
| ai_judge | **$9373.9** | $-587.64 | $-38.46 | 7 | 14% | $-600 | 2 |
| random_control | **$9082.52** | $-979.49 | $62.01 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8982.54** | $-1059.92 | $42.46 | 543 | 54% | $-1279.05 | 25 |
| mm_slow | **$8554.29** | $-809.59 | $-636.12 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8167.66** | $-1127.15 | $-705.19 | 95 | 47% | $-1331.1 | 25 |
| momentum | **$7830.59** | $-1524.39 | $-645.02 | 272 | 67% | $-2012.63 | 25 |
| mm_sports_v2 | **$7768.78** | $-2284.84 | $53.62 | 113 | 45% | $-2503.97 | 24 |
| whale_fade | **$6937.93** | $-2676.01 | $-386.06 | 427 | 47% | $-3030.56 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9007.49** | $-931.5 | $-61.01 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8479.58** | $-1937.09 | $416.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8151.46** | $-1590.97 | $-257.57 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6607.01** | $-3401.72 | $8.73 | 211 | 45% | $-3604.75 | 6 |
| longshot (retired) | **$5078.49** | $-4791.55 | $-129.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 0 | 0 | 100% | 2.89¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 25 | 0 | 0 | 100% | 1.4¢ |
| maker_sports_badsim | 217 | 138 | 0 | 61% | 1.59¢ |

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

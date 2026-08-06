# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34720 · Last run: 2026-08-06T17:43:11.461Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10273.73** | $-15.24 | $288.97 | 4 | 50% | $-111.32 | 13 |
| maker_sports | **$10236.02** | $-7.69 | $243.71 | 4 | 50% | $-107.69 | 21 |
| mm_tight | **$10112.03** | $99.2 | $12.83 | 462 | 53% | $-109.9 | 23 |
| mm_cheap | **$10101.66** | $537.65 | $-435.99 | 40 | 60% | $359.87 | 25 |
| mid_momentum | **$10095.04** | $411.1 | $-316.06 | 218 | 56% | $197.62 | 25 |
| super | **$9988.04** | $-107.14 | $95.18 | 80 | 50% | $-371.47 | 13 |
| fade_longshot | **$9893.07** | $25.97 | $-132.9 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9743.55** | $-322.25 | $65.8 | 426 | 52% | $-1650.82 | 25 |
| strong_dip | **$9680.85** | $-517.26 | $198.11 | 108 | 59% | $-609.57 | 25 |
| copy_pro | **$9642.32** | $-706.11 | $348.43 | 406 | 51% | $-1556.11 | 25 |
| mm_max | **$9617.91** | $-285.81 | $-96.28 | 201 | 53% | $-494.91 | 4 |
| mid_momentum_v2 | **$9485.5** | $-48.14 | $-466.36 | 55 | 53% | $-238.96 | 25 |
| ai_judge | **$9371.68** | $-587.64 | $-40.68 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9336.86** | $-414.69 | $-248.45 | 59 | 51% | $-605.51 | 25 |
| random_control | **$9087.89** | $-979.49 | $67.38 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8977.22** | $-1059.92 | $37.14 | 543 | 54% | $-1279.05 | 25 |
| mm_slow | **$8548.67** | $-809.59 | $-641.74 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8155** | $-1127.15 | $-717.85 | 95 | 47% | $-1331.1 | 25 |
| momentum | **$7843.14** | $-1524.39 | $-632.47 | 272 | 67% | $-2012.63 | 25 |
| mm_sports_v2 | **$7791.55** | $-2284.84 | $76.39 | 113 | 45% | $-2503.97 | 24 |
| whale_fade | **$6922.14** | $-2676.01 | $-401.85 | 427 | 47% | $-3030.56 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.32** | $-931.5 | $-62.18 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8157.4** | $-1590.97 | $-251.63 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6599.75** | $-3401.72 | $1.47 | 211 | 45% | $-3604.75 | 6 |
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

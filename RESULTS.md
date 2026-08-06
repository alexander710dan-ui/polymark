# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34748 · Last run: 2026-08-06T17:56:13.305Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10241.14** | $-15.24 | $256.38 | 4 | 50% | $-111.32 | 13 |
| mm_tight | **$10208.22** | $99.2 | $109.02 | 462 | 53% | $-109.9 | 24 |
| maker_sports | **$10189.5** | $-7.69 | $197.19 | 4 | 50% | $-107.69 | 22 |
| mm_cheap | **$10100.32** | $537.65 | $-437.33 | 40 | 60% | $359.87 | 25 |
| mid_momentum | **$10092.26** | $411.1 | $-318.84 | 218 | 56% | $197.62 | 25 |
| super | **$9965.27** | $-107.14 | $72.41 | 80 | 50% | $-371.47 | 14 |
| fade_longshot | **$9894.96** | $25.97 | $-131.01 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9775.71** | $-322.25 | $97.96 | 426 | 52% | $-1650.82 | 25 |
| copy_pro | **$9719.67** | $-706.11 | $425.78 | 406 | 51% | $-1556.11 | 25 |
| strong_dip | **$9683.04** | $-517.26 | $200.3 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9660.49** | $-285.81 | $-53.7 | 201 | 53% | $-494.91 | 5 |
| mid_momentum_v2 | **$9478.8** | $-48.14 | $-473.06 | 55 | 53% | $-238.96 | 25 |
| ai_judge | **$9371.68** | $-587.64 | $-40.68 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9321.3** | $-414.69 | $-264.01 | 59 | 51% | $-605.51 | 25 |
| random_control | **$9092.44** | $-979.49 | $71.93 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8994.72** | $-1059.92 | $54.64 | 543 | 54% | $-1279.05 | 25 |
| mm_slow | **$8548.11** | $-809.59 | $-642.3 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8141.53** | $-1127.15 | $-731.32 | 95 | 47% | $-1331.1 | 25 |
| momentum | **$7844.13** | $-1524.39 | $-631.48 | 272 | 67% | $-2012.63 | 25 |
| mm_sports_v2 | **$7732.63** | $-2284.84 | $17.47 | 113 | 45% | $-2503.97 | 25 |
| whale_fade | **$6885.02** | $-2676.01 | $-438.97 | 427 | 47% | $-3030.56 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.26** | $-931.5 | $-62.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8145.44** | $-1590.97 | $-263.59 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6543.76** | $-3401.72 | $-54.52 | 211 | 45% | $-3604.75 | 6 |
| longshot (retired) | **$5078.49** | $-4791.55 | $-129.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 0 | 0 | 100% | 2.89¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 26 | 0 | 1 | 100% | 1.38¢ |
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

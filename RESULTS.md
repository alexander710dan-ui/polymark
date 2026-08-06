# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34781 · Last run: 2026-08-06T18:12:42.535Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10355.23** | $227.67 | $127.56 | 464 | 53% | $18.57 | 23 |
| maker_sports | **$10337.04** | $261.06 | $75.98 | 6 | 67% | $48.56 | 23 |
| maker_flat | **$10269.31** | $-15.24 | $284.55 | 4 | 50% | $-111.32 | 14 |
| mm_cheap | **$10103.51** | $537.65 | $-434.14 | 40 | 60% | $359.87 | 25 |
| mid_momentum | **$10083.78** | $411.1 | $-327.32 | 218 | 56% | $197.62 | 25 |
| super | **$9955.17** | $-107.14 | $62.31 | 80 | 50% | $-371.47 | 14 |
| fade_longshot | **$9897.05** | $25.97 | $-128.92 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9774.48** | $-322.25 | $96.73 | 426 | 52% | $-1650.82 | 25 |
| copy_pro | **$9743.81** | $-706.11 | $449.92 | 406 | 51% | $-1556.11 | 25 |
| strong_dip | **$9679.78** | $-517.26 | $197.04 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9638.6** | $-285.81 | $-75.59 | 201 | 53% | $-494.91 | 6 |
| mid_momentum_v2 | **$9448.3** | $-48.14 | $-503.56 | 55 | 53% | $-238.96 | 25 |
| ai_judge | **$9371.68** | $-587.64 | $-40.68 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9294.56** | $-254.63 | $-450.81 | 60 | 52% | $-445.45 | 25 |
| mm_sports | **$9153.21** | $-888.35 | $41.56 | 545 | 54% | $-1107.48 | 25 |
| random_control | **$9089.66** | $-979.49 | $69.15 | 147 | 56% | $-1593.78 | 25 |
| mm_slow | **$8536.9** | $-809.59 | $-653.51 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8123.25** | $-1127.15 | $-749.6 | 95 | 47% | $-1331.1 | 25 |
| mm_sports_v2 | **$7872.9** | $-2113.27 | $-13.83 | 115 | 46% | $-2332.4 | 25 |
| momentum | **$7850** | $-1524.39 | $-625.61 | 272 | 67% | $-2012.63 | 25 |
| whale_fade | **$6882.41** | $-2676.01 | $-441.58 | 427 | 47% | $-3030.56 | 25 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9005.9** | $-931.5 | $-62.6 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8121.18** | $-1590.97 | $-287.85 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6578.23** | $-3274.45 | $-147.32 | 212 | 45% | $-3477.48 | 5 |
| longshot (retired) | **$5078.49** | $-4791.55 | $-129.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 18 | 0 | 0 | 100% | 2.9¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 29 | 0 | 0 | 100% | 1.34¢ |
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

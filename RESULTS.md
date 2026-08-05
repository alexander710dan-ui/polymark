# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31790 · Last run: 2026-08-05T14:13:57.726Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10927.2** | $1087.66 | $-160.46 | 370 | 54% | $884.63 | 15 |
| mid_momentum | **$10753.32** | $967.28 | $-213.96 | 206 | 58% | $753.8 | 25 |
| mm_sports | **$10747.71** | $1133.36 | $-385.65 | 432 | 56% | $914.23 | 21 |
| mm_cheap | **$10530.07** | $887.82 | $-357.75 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9927.84** | $109.23 | $-181.39 | 117 | 96% | $98.49 | 25 |
| super | **$9886.18** | $-425.73 | $311.91 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9854.02** | $47.6 | $-193.58 | 1 | 100% | $0 | 25 |
| copy_top | **$9803.11** | $-374.75 | $177.86 | 409 | 52% | $-1703.32 | 25 |
| mid_momentum_v2 | **$9630.18** | $-54.5 | $-315.32 | 2 | 50% | $-102.1 | 25 |
| mm_max | **$9616.43** | $-469.42 | $85.85 | 161 | 53% | $-636.54 | 4 |
| mm_sports_v2 | **$9612.75** | $-54.5 | $-332.75 | 2 | 50% | $-102.1 | 14 |
| strong_dip | **$9434.51** | $-528.32 | $-37.17 | 102 | 59% | $-620.63 | 25 |
| copy_pro | **$9416.7** | $-732.88 | $149.58 | 389 | 51% | $-1582.88 | 25 |
| ai_judge | **$9384.84** | $-587.64 | $-27.52 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9128.68** | $-516.83 | $-354.49 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8825.63** | $-1058.61 | $-115.76 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8790.5** | $-744.4 | $-465.1 | 124 | 51% | $-947.43 | 12 |
| mm_strong | **$8773.9** | $-876.62 | $-349.48 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8527.54** | $-1458.9 | $-13.56 | 75 | 39% | $-1653.02 | 17 |
| momentum | **$8226.67** | $-1076.77 | $-696.56 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7273.43** | $-2148.86 | $-577.71 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.27** | $-931.5 | $-66.23 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 92 | 61 | 1 | 60% | 3.03¢ |
| maker_sports | 136 | 88 | 3 | 61% | 1.59¢ |

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

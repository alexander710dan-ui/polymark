# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31804 · Last run: 2026-08-05T14:21:56.099Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10973.19** | $1087.66 | $-114.47 | 370 | 54% | $884.63 | 15 |
| mm_sports | **$10793.7** | $1133.36 | $-339.66 | 432 | 56% | $914.23 | 21 |
| mid_momentum | **$10751.29** | $967.28 | $-215.99 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10507.12** | $887.82 | $-380.7 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9932.23** | $109.23 | $-177 | 117 | 96% | $98.49 | 25 |
| mm_cheap_v2 | **$9892.01** | $47.6 | $-155.59 | 1 | 100% | $0 | 25 |
| super | **$9873.12** | $-425.73 | $298.85 | 73 | 48% | $-641.58 | 12 |
| copy_top | **$9782.21** | $-374.75 | $156.96 | 409 | 52% | $-1703.32 | 25 |
| mid_momentum_v2 | **$9668.16** | $-54.5 | $-277.34 | 2 | 50% | $-102.1 | 25 |
| mm_max | **$9662.33** | $-469.42 | $131.75 | 161 | 53% | $-636.54 | 4 |
| mm_sports_v2 | **$9658.65** | $-54.5 | $-286.85 | 2 | 50% | $-102.1 | 14 |
| strong_dip | **$9454.25** | $-528.32 | $-17.43 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9384.84** | $-587.64 | $-27.52 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9370.26** | $-732.88 | $103.14 | 389 | 51% | $-1582.88 | 25 |
| mm_slow | **$9130.42** | $-516.83 | $-352.75 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8837.34** | $-744.4 | $-418.26 | 124 | 51% | $-947.43 | 12 |
| random_control | **$8835.59** | $-1058.61 | $-105.8 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8772.69** | $-876.62 | $-350.69 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8510.96** | $-1458.9 | $-30.14 | 75 | 39% | $-1653.02 | 17 |
| momentum | **$8222.79** | $-1076.77 | $-700.44 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7282.92** | $-2148.86 | $-568.22 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.27** | $-931.5 | $-66.23 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 92 | 61 | 1 | 60% | 3.03¢ |
| maker_sports | 136 | 89 | 3 | 60% | 1.59¢ |

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

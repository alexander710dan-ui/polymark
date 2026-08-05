# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31735 · Last run: 2026-08-05T13:43:20.481Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10971.54** | $1083.13 | $-111.59 | 366 | 54% | $880.1 | 17 |
| mm_sports | **$10814.98** | $1040.22 | $-225.24 | 427 | 56% | $821.09 | 25 |
| mid_momentum | **$10688.71** | $967.28 | $-278.57 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10453.89** | $887.82 | $-433.93 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9951.82** | $109.23 | $-157.41 | 117 | 96% | $98.49 | 25 |
| super | **$9830.26** | $-425.73 | $255.99 | 73 | 48% | $-641.58 | 11 |
| mm_cheap_v2 | **$9810.18** | $47.6 | $-237.42 | 1 | 100% | $0 | 22 |
| copy_top | **$9751.59** | $-374.75 | $126.34 | 409 | 52% | $-1703.32 | 25 |
| mm_sports_v2 | **$9669.58** | $-54.5 | $-275.92 | 2 | 50% | $-102.1 | 13 |
| mid_momentum_v2 | **$9631.96** | $-54.5 | $-313.54 | 2 | 50% | $-102.1 | 25 |
| mm_max | **$9527.36** | $-469.42 | $-3.22 | 161 | 53% | $-636.54 | 4 |
| copy_pro | **$9494.75** | $-732.88 | $227.63 | 389 | 51% | $-1582.88 | 25 |
| strong_dip | **$9468.47** | $-528.32 | $-3.21 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9384.84** | $-587.64 | $-27.52 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9084.76** | $-516.83 | $-398.41 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8842.48** | $-1058.61 | $-98.91 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8825.65** | $-682.5 | $-491.85 | 121 | 51% | $-885.53 | 14 |
| mm_strong | **$8710.91** | $-876.62 | $-412.47 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8486.25** | $-1458.9 | $-54.85 | 75 | 39% | $-1653.02 | 16 |
| momentum | **$8243.53** | $-1076.77 | $-679.7 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7284.96** | $-2148.86 | $-566.18 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.27** | $-931.5 | $-66.23 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 91 | 61 | 1 | 60% | 3.02¢ |
| maker_sports | 135 | 87 | 5 | 61% | 1.6¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32072 · Last run: 2026-08-05T17:00:22.723Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11273.22** | $1107.24 | $165.98 | 377 | 54% | $904.21 | 17 |
| mm_sports | **$10875.07** | $1057.53 | $-182.46 | 440 | 56% | $838.4 | 25 |
| mid_momentum | **$10659.74** | $967.28 | $-307.54 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10471.9** | $887.82 | $-415.92 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9942.06** | $111.17 | $-169.11 | 118 | 96% | $100.43 | 25 |
| mm_max | **$9939.86** | $-330.56 | $270.42 | 163 | 53% | $-497.68 | 5 |
| super | **$9902.92** | $-425.73 | $328.65 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9848.09** | $54.87 | $-206.78 | 8 | 63% | $-42.63 | 25 |
| copy_top | **$9696.1** | $-477.25 | $173.35 | 410 | 51% | $-1805.82 | 25 |
| mm_sports_v2 | **$9665.67** | $-53.47 | $-280.86 | 9 | 56% | $-150.97 | 21 |
| mid_momentum_v2 | **$9623.55** | $-53.47 | $-322.98 | 9 | 56% | $-150.97 | 25 |
| strong_dip | **$9502.85** | $-528.32 | $31.17 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9317** | $-1246.73 | $563.73 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9064.1** | $-516.83 | $-419.07 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8948.22** | $-856.55 | $-195.23 | 131 | 50% | $-1059.58 | 12 |
| random_control | **$8879.19** | $-1058.61 | $-62.2 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8703.49** | $-876.62 | $-419.89 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8451.95** | $-1380.33 | $-167.72 | 76 | 39% | $-1574.45 | 22 |
| momentum | **$8208.58** | $-1076.77 | $-714.65 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7289.68** | $-2055.23 | $-655.09 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.26** | $-931.5 | $-72.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 1 | 61% | 2.97¢ |
| maker_sports | 143 | 94 | 6 | 60% | 1.59¢ |

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

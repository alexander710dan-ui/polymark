# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32252 · Last run: 2026-08-05T18:40:31.472Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10850.78** | $1137.56 | $-286.78 | 385 | 55% | $934.53 | 18 |
| mid_momentum | **$10622.45** | $867.28 | $-244.83 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10470.56** | $887.82 | $-417.26 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10319.67** | $839.87 | $-520.2 | 449 | 56% | $620.74 | 25 |
| fade_longshot | **$9942.82** | $118.35 | $-175.53 | 119 | 96% | $107.61 | 25 |
| super | **$9880.3** | $-425.73 | $306.03 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9828.81** | $-209.11 | $37.92 | 167 | 54% | $-376.23 | 5 |
| copy_top | **$9684.86** | $-472.32 | $157.18 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9562.81** | $-140.86 | $-296.33 | 12 | 50% | $-252.78 | 25 |
| mid_momentum_v2 | **$9561.3** | $-351.45 | $-87.25 | 14 | 43% | $-463.37 | 25 |
| strong_dip | **$9513.82** | $-482.76 | $-3.42 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9367.15** | $-587.64 | $-45.21 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9202.09** | $-1348.73 | $550.82 | 393 | 51% | $-2198.73 | 25 |
| mm_sports_v2 | **$9038.94** | $-397.79 | $-563.27 | 16 | 44% | $-523.81 | 25 |
| mm_slow | **$8997.06** | $-516.83 | $-486.11 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8978.38** | $-1012.4 | $-9.22 | 142 | 56% | $-1626.69 | 25 |
| mm_strong | **$8685.19** | $-876.62 | $-438.19 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8609.93** | $-1234.9 | $-155.17 | 81 | 41% | $-1429.02 | 18 |
| maker_sports | **$8499.6** | $-1213.83 | $-286.57 | 137 | 49% | $-1416.86 | 17 |
| momentum | **$8189.79** | $-1059.12 | $-751.09 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7226.25** | $-2155.23 | $-618.52 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9422.42** | $-730.36 | $152.78 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.71** | $-931.5 | $-69.79 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.66** | $-4791.55 | $-102.79 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 63 | 3 | 61% | 2.99¢ |
| maker_sports | 154 | 99 | 5 | 61% | 1.61¢ |

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

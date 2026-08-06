# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34242 · Last run: 2026-08-06T13:08:56.331Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10356.69** | $46.83 | $309.86 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10273.16** | $559.07 | $-285.91 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10242.56** | $685.62 | $-443.06 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10028.44** | $-117.05 | $145.49 | 424 | 52% | $-1445.62 | 25 |
| fade_longshot | **$9851.85** | $25.97 | $-174.12 | 123 | 95% | $15.23 | 25 |
| mm_tight | **$9843.96** | $302.96 | $-459 | 441 | 53% | $93.86 | 20 |
| mm_max | **$9758.02** | $-242.96 | $0.98 | 194 | 53% | $-452.06 | 2 |
| copy_pro | **$9623.93** | $-919.79 | $543.72 | 404 | 51% | $-1769.79 | 25 |
| strong_dip | **$9618.85** | $-517.26 | $136.11 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9504.48** | $-115.07 | $-380.45 | 49 | 51% | $-305.89 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9344.75** | $-322.24 | $-333.01 | 53 | 51% | $-513.06 | 25 |
| random_control | **$9140.78** | $-1085.22 | $226 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$8918.52** | $-405.41 | $-676.07 | 519 | 55% | $-624.54 | 25 |
| mm_slow | **$8674.36** | $-809.59 | $-516.05 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8423.91** | $-1190.97 | $-385.12 | 95 | 42% | $-1385.09 | 19 |
| mm_strong | **$8255.72** | $-1227.41 | $-516.87 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7859.67** | $-1376.42 | $-763.91 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7655.83** | $-1710.91 | $-633.26 | 89 | 46% | $-1930.04 | 25 |
| maker_sports | **$6716.34** | $-2666.04 | $-617.62 | 193 | 47% | $-2869.07 | 16 |
| whale_fade | **$6713.59** | $-2848.81 | $-437.6 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.67** | $-931.5 | $-73.83 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 114 | 82 | 4 | 58% | 2.92¢ |
| maker_sports | 209 | 131 | 7 | 61% | 1.58¢ |

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

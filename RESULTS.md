# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34107 · Last run: 2026-08-06T11:53:51.003Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10306.56** | $46.83 | $259.73 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10234.64** | $559.07 | $-324.43 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10214.78** | $685.62 | $-470.84 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10000.01** | $-117.05 | $117.06 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9914.94** | $246.52 | $-331.58 | 436 | 53% | $37.42 | 20 |
| fade_longshot | **$9873.81** | $25.97 | $-152.16 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9761.57** | $-344.49 | $106.06 | 193 | 53% | $-553.59 | 2 |
| strong_dip | **$9635.26** | $-517.26 | $152.52 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9523.99** | $-188.11 | $-287.9 | 46 | 50% | $-378.93 | 25 |
| copy_pro | **$9421.98** | $-919.79 | $341.77 | 404 | 51% | $-1769.79 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9347.22** | $-335.37 | $-317.41 | 51 | 51% | $-526.19 | 25 |
| random_control | **$9130.02** | $-1085.22 | $215.24 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$9126.72** | $-461.85 | $-411.43 | 514 | 55% | $-680.98 | 25 |
| mm_slow | **$8650.11** | $-809.59 | $-540.3 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8503.43** | $-1090.97 | $-405.6 | 94 | 43% | $-1285.09 | 18 |
| mm_strong | **$8219.71** | $-1227.41 | $-552.88 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7883.45** | $-1376.42 | $-740.13 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7864.54** | $-1767.35 | $-368.11 | 84 | 45% | $-1986.48 | 23 |
| maker_sports | **$6969** | $-2574.37 | $-456.63 | 190 | 47% | $-2777.4 | 13 |
| whale_fade | **$6695.71** | $-2848.81 | $-455.48 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.13** | $-931.5 | $-69.37 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5084.82** | $-4791.55 | $-123.63 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 79 | 5 | 59% | 2.94¢ |
| maker_sports | 203 | 127 | 8 | 62% | 1.55¢ |

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

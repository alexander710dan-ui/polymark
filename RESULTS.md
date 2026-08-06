# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33863 · Last run: 2026-08-06T09:38:00.320Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10389.92** | $504.85 | $-114.93 | 432 | 53% | $295.75 | 12 |
| mid_momentum | **$10331.44** | $559.07 | $-227.63 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10318.96** | $685.62 | $-366.66 | 37 | 62% | $507.84 | 25 |
| super | **$10301.82** | $46.83 | $254.99 | 79 | 51% | $-217.5 | 11 |
| copy_top | **$10086.58** | $-117.05 | $203.63 | 424 | 52% | $-1445.62 | 22 |
| fade_longshot | **$9869.17** | $25.97 | $-156.8 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9644.28** | $-344.49 | $-11.23 | 193 | 53% | $-553.59 | 1 |
| strong_dip | **$9627.1** | $-596.83 | $223.93 | 107 | 59% | $-689.14 | 25 |
| mm_sports | **$9607.47** | $-143.5 | $-249.03 | 508 | 55% | $-362.63 | 14 |
| copy_pro | **$9595.82** | $-816.24 | $412.06 | 403 | 51% | $-1666.24 | 25 |
| mid_momentum_v2 | **$9542.22** | $121.09 | $-578.87 | 43 | 53% | $-69.73 | 25 |
| mm_cheap_v2 | **$9521.28** | $26.36 | $-505.08 | 46 | 54% | $-164.46 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| random_control | **$9037.48** | $-1085.22 | $122.7 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8671.84** | $-809.59 | $-518.57 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8620.06** | $-1090.97 | $-288.97 | 94 | 43% | $-1285.09 | 18 |
| mm_sports_v2 | **$8342.64** | $-1449 | $-208.36 | 78 | 46% | $-1668.13 | 12 |
| mm_strong | **$8202.81** | $-1125.11 | $-672.08 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$7990.12** | $-1376.42 | $-633.46 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7409.72** | $-2174.37 | $-415.91 | 186 | 48% | $-2377.4 | 7 |
| whale_fade | **$6623.93** | $-2848.81 | $-527.26 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.87** | $-931.5 | $-71.63 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5093.16** | $-4791.55 | $-115.29 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 77 | 2 | 59% | 2.94¢ |
| maker_sports | 193 | 122 | 3 | 61% | 1.54¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33494 · Last run: 2026-08-06T06:12:47.986Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10497.55** | $431.69 | $65.86 | 430 | 53% | $222.59 | 6 |
| mid_momentum | **$10369.03** | $559.07 | $-190.04 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10355.68** | $685.62 | $-329.94 | 37 | 62% | $507.84 | 25 |
| super | **$10338.33** | $46.83 | $291.5 | 79 | 51% | $-217.5 | 11 |
| copy_top | **$10115.17** | $-117.05 | $232.22 | 424 | 52% | $-1445.62 | 20 |
| mid_momentum_v2 | **$9924.3** | $50.78 | $-126.48 | 42 | 52% | $-140.04 | 23 |
| mm_cheap_v2 | **$9909.56** | $26.36 | $-116.8 | 46 | 54% | $-164.46 | 19 |
| fade_longshot | **$9860.12** | $25.97 | $-165.85 | 123 | 95% | $15.23 | 25 |
| mm_sports | **$9815.01** | $-218.44 | $33.45 | 506 | 55% | $-437.57 | 7 |
| copy_pro | **$9676.99** | $-816.24 | $493.23 | 403 | 51% | $-1666.24 | 23 |
| mm_max | **$9655.51** | $-344.49 | $0 | 193 | 53% | $-553.59 | 0 |
| strong_dip | **$9528.3** | $-596.83 | $125.13 | 107 | 59% | $-689.14 | 24 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| random_control | **$9013.02** | $-1085.22 | $98.24 | 146 | 56% | $-1699.51 | 25 |
| maker_flat | **$8688.52** | $-1090.97 | $-220.51 | 94 | 43% | $-1285.09 | 17 |
| mm_slow | **$8675.72** | $-809.59 | $-514.69 | 62 | 50% | $-995.3 | 25 |
| mm_sports_v2 | **$8557.78** | $-1523.94 | $81.72 | 76 | 45% | $-1743.07 | 5 |
| mm_strong | **$8351.4** | $-1125.11 | $-523.49 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$7987.38** | $-1376.42 | $-636.2 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7795.74** | $-2266.68 | $62.42 | 185 | 48% | $-2469.71 | 3 |
| whale_fade | **$6624.56** | $-2848.81 | $-526.63 | 425 | 47% | $-3203.36 | 20 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.89** | $-931.5 | $-70.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5102.37** | $-4791.55 | $-106.08 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 111 | 76 | 0 | 59% | 2.95¢ |
| maker_sports | 188 | 121 | 1 | 61% | 1.53¢ |

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

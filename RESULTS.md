# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33874 · Last run: 2026-08-06T09:44:14.422Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10342.21** | $504.85 | $-162.64 | 432 | 53% | $295.75 | 13 |
| super | **$10305** | $46.83 | $258.17 | 79 | 51% | $-217.5 | 11 |
| mm_cheap | **$10291.01** | $685.62 | $-394.61 | 37 | 62% | $507.84 | 25 |
| mid_momentum | **$10280.47** | $559.07 | $-278.6 | 215 | 56% | $345.59 | 25 |
| copy_top | **$10089.73** | $-117.05 | $206.78 | 424 | 52% | $-1445.62 | 22 |
| fade_longshot | **$9870.22** | $25.97 | $-155.75 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9648.37** | $-344.49 | $-7.14 | 193 | 53% | $-553.59 | 1 |
| strong_dip | **$9636.49** | $-596.83 | $233.32 | 107 | 59% | $-689.14 | 25 |
| mm_sports | **$9603.96** | $-143.5 | $-252.54 | 508 | 55% | $-362.63 | 16 |
| copy_pro | **$9599.56** | $-816.24 | $415.8 | 403 | 51% | $-1666.24 | 25 |
| mid_momentum_v2 | **$9497.03** | $121.09 | $-624.06 | 43 | 53% | $-69.73 | 25 |
| mm_cheap_v2 | **$9476.71** | $26.36 | $-549.65 | 46 | 54% | $-164.46 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| random_control | **$9082.13** | $-1085.22 | $167.35 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8656.03** | $-809.59 | $-534.38 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8605.33** | $-1090.97 | $-303.7 | 94 | 43% | $-1285.09 | 18 |
| mm_sports_v2 | **$8340.41** | $-1449 | $-210.59 | 78 | 46% | $-1668.13 | 14 |
| mm_strong | **$8189.53** | $-1125.11 | $-685.36 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$7960.08** | $-1376.42 | $-663.5 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7367.42** | $-2174.37 | $-458.21 | 186 | 48% | $-2377.4 | 8 |
| whale_fade | **$6608.68** | $-2848.81 | $-542.51 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.87** | $-931.5 | $-71.63 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5091.07** | $-4791.55 | $-117.38 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 77 | 2 | 59% | 2.94¢ |
| maker_sports | 194 | 123 | 3 | 61% | 1.55¢ |

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

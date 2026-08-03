# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27240 · Last run: 2026-08-03T20:02:37.937Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11878.87** | $1859.84 | $19.03 | 292 | 58% | $1656.81 | 24 |
| mm_tight | **$10976.18** | $858.02 | $118.16 | 252 | 54% | $654.99 | 19 |
| mm_cheap | **$10409.37** | $832.49 | $-423.12 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10387.78** | $565.77 | $-177.99 | 189 | 57% | $352.29 | 25 |
| maker_sports | **$9996.73** | $175.28 | $-178.55 | 12 | 58% | $48.01 | 12 |
| strong_dip | **$9991.4** | $-337.42 | $328.82 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9954.18** | $34.52 | $-80.34 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9910.74** | $-56.38 | $-32.88 | 90 | 52% | $-175.85 | 13 |
| maker_flat | **$9896.96** | $96.03 | $-199.07 | 9 | 56% | $-31.24 | 8 |
| super | **$9648.45** | $-445.84 | $94.29 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9604.41** | $-834.75 | $439.16 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9441.93** | $-766.45 | $208.38 | 386 | 51% | $-2095.02 | 24 |
| ai_judge | **$9409.92** | $-487.64 | $-102.44 | 6 | 17% | $-500 | 3 |
| random_control | **$9279.2** | $-310.74 | $-410.06 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8989.09** | $-821.03 | $-189.88 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8813.94** | $-1021.38 | $-164.68 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8170.31** | $-1389.71 | $-439.98 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7792.38** | $-1505.86 | $-701.76 | 387 | 48% | $-1860.41 | 24 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.78** | $-1003.53 | $34.31 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8349.71** | $-1837.09 | $186.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.28** | $-4691.55 | $-199.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 16 | 3 | 52% | 2.76¢ |
| maker_sports | 24 | 14 | 3 | 63% | 1.87¢ |

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

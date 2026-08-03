# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27168 · Last run: 2026-08-03T19:22:28.922Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11731.83** | $1699.01 | $32.82 | 290 | 57% | $1495.98 | 24 |
| mm_tight | **$10874.11** | $697.19 | $176.92 | 250 | 53% | $494.16 | 20 |
| mm_cheap | **$10388.79** | $832.49 | $-443.7 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10381.72** | $506.38 | $-124.66 | 188 | 57% | $292.9 | 25 |
| maker_flat | **$10013.91** | $3.72 | $10.19 | 8 | 50% | $-123.55 | 7 |
| strong_dip | **$9980.88** | $-337.42 | $318.3 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9960.06** | $34.52 | $-74.46 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9913.06** | $-217.21 | $130.27 | 88 | 51% | $-334.6 | 14 |
| maker_sports | **$9900.61** | $128.22 | $-227.61 | 11 | 55% | $0.95 | 10 |
| super | **$9633.79** | $-445.84 | $79.63 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9593.74** | $-834.75 | $428.49 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9414.24** | $-666.45 | $80.69 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9294.28** | $-310.74 | $-394.98 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8997.58** | $-821.03 | $-181.39 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8813.21** | $-1140.85 | $-45.94 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8180.2** | $-1389.71 | $-430.09 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7901.93** | $-1683.64 | $-414.43 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.66** | $-1003.53 | $33.19 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.28** | $-4691.55 | $-207.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 15 | 15 | 4 | 50% | 2.67¢ |
| maker_sports | 21 | 10 | 5 | 68% | 1.9¢ |

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

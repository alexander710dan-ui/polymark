# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27237 · Last run: 2026-08-03T20:00:56.676Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11855.34** | $1859.84 | $-4.5 | 292 | 58% | $1656.81 | 24 |
| mm_tight | **$10956.03** | $858.02 | $98.01 | 252 | 54% | $654.99 | 19 |
| mm_cheap | **$10410.51** | $832.49 | $-421.98 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10389.25** | $565.77 | $-176.52 | 189 | 57% | $352.29 | 25 |
| strong_dip | **$9990.52** | $-337.42 | $327.94 | 96 | 60% | $-429.73 | 25 |
| maker_sports | **$9986.93** | $175.28 | $-188.35 | 12 | 58% | $48.01 | 12 |
| fade_longshot | **$9953.69** | $34.52 | $-80.83 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9906.27** | $-56.38 | $-37.35 | 90 | 52% | $-175.85 | 13 |
| maker_flat | **$9897.06** | $96.03 | $-198.97 | 9 | 56% | $-31.24 | 8 |
| super | **$9648.45** | $-445.84 | $94.29 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9603.37** | $-834.75 | $438.12 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9444.34** | $-766.45 | $210.79 | 386 | 51% | $-2095.02 | 24 |
| ai_judge | **$9409.92** | $-487.64 | $-102.44 | 6 | 17% | $-500 | 3 |
| random_control | **$9279.16** | $-310.74 | $-410.1 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8990.37** | $-821.03 | $-188.6 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8815.03** | $-1021.38 | $-163.59 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8171.78** | $-1389.71 | $-438.51 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7778.45** | $-1505.86 | $-715.69 | 387 | 48% | $-1860.41 | 24 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.78** | $-1003.53 | $34.31 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8349.71** | $-1837.09 | $186.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.28** | $-4691.55 | $-199.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 16 | 2 | 52% | 2.76¢ |
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

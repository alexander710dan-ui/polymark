# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26717 · Last run: 2026-08-03T15:11:31.953Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11398.49** | $1277.53 | $120.96 | 273 | 57% | $1074.5 | 24 |
| mm_tight | **$10626.25** | $502.07 | $124.18 | 233 | 53% | $299.04 | 19 |
| mid_momentum | **$10331.39** | $608.28 | $-276.89 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10247.77** | $832.49 | $-584.72 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$10011.45** | $-337.42 | $348.87 | 96 | 60% | $-429.73 | 25 |
| copy_pro | **$9985.39** | $-684.75 | $670.14 | 364 | 51% | $-1534.75 | 25 |
| fade_longshot | **$9961.37** | $34.52 | $-73.15 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9960.43** | $0 | $-39.57 | 0 | — | $0 | 6 |
| maker_sports | **$9895.41** | $0 | $-104.59 | 0 | — | $0 | 4 |
| copy_top | **$9625.16** | $-466.45 | $91.61 | 383 | 51% | $-1795.02 | 24 |
| super | **$9550.15** | $-445.84 | $-4.01 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9429.37** | $-475.72 | $-94.91 | 77 | 49% | $-593.11 | 11 |
| ai_judge | **$9397.79** | $-487.64 | $-114.57 | 6 | 17% | $-500 | 3 |
| random_control | **$9248.74** | $-310.74 | $-440.52 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8848.04** | $-821.03 | $-330.93 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8581.89** | $-1233.53 | $-184.58 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8201.75** | $-1339.53 | $-458.72 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7418.47** | $-1899.95 | $-681.58 | 384 | 48% | $-2254.5 | 24 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.33** | $-1003.53 | $32.86 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8363.04** | $-1837.09 | $200.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5099.2** | $-4691.55 | $-209.25 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 6 | 4 | 5 | 60% | 2.33¢ |
| maker_sports | 4 | 4 | 4 | 50% | 1.25¢ |

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

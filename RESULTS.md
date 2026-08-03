# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27066 · Last run: 2026-08-03T18:25:42.450Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11516.87** | $1564.42 | $-47.55 | 287 | 57% | $1361.39 | 23 |
| mm_tight | **$10640.66** | $576.95 | $63.71 | 247 | 53% | $373.92 | 18 |
| mm_cheap | **$10281.98** | $832.49 | $-550.51 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10277.34** | $608.28 | $-330.94 | 187 | 57% | $394.8 | 25 |
| maker_flat | **$10002.24** | $-118.5 | $120.74 | 7 | 43% | $-245.77 | 7 |
| strong_dip | **$9996.43** | $-337.42 | $333.85 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9959.15** | $34.52 | $-75.37 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9880.29** | $110.83 | $-230.54 | 9 | 56% | $-16.44 | 8 |
| mm_max | **$9685.78** | $-437.45 | $123.23 | 86 | 50% | $-554.84 | 12 |
| copy_pro | **$9568.96** | $-834.75 | $403.71 | 365 | 51% | $-1684.75 | 25 |
| super | **$9558.5** | $-445.84 | $4.34 | 63 | 46% | $-661.69 | 12 |
| copy_top | **$9457.22** | $-666.45 | $123.67 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9403.26** | $-487.64 | $-109.1 | 6 | 17% | $-500 | 3 |
| random_control | **$9287.64** | $-310.74 | $-401.62 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8912.62** | $-821.03 | $-266.35 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8700.59** | $-1190.67 | $-108.74 | 66 | 45% | $-1394.62 | 25 |
| momentum | **$8151.09** | $-1439.53 | $-409.38 | 236 | 67% | $-1927.77 | 25 |
| whale_fade | **$7731.19** | $-1683.64 | $-585.17 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.13** | $-1003.53 | $30.66 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8369.71** | $-1837.09 | $206.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5102.32** | $-4691.55 | $-206.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 14 | 13 | 4 | 52% | 2.64¢ |
| maker_sports | 17 | 10 | 4 | 63% | 1.65¢ |

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

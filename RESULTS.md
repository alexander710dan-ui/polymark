# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29387 · Last run: 2026-08-04T15:57:01.241Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11299.2** | $1140.66 | $158.54 | 361 | 56% | $937.63 | 22 |
| mm_tight | **$10724.84** | $670.79 | $54.05 | 312 | 54% | $467.76 | 16 |
| mm_cheap | **$10624.62** | $1054.47 | $-429.85 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10544.55** | $862.6 | $-318.05 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10013.08** | $-336.57 | $349.65 | 399 | 52% | $-1665.14 | 25 |
| copy_pro | **$9948.58** | $-881.58 | $830.16 | 377 | 51% | $-1731.58 | 25 |
| fade_longshot | **$9881.25** | $55.61 | $-174.36 | 108 | 95% | $44.87 | 25 |
| super | **$9844.32** | $-439.2 | $283.52 | 68 | 47% | $-655.05 | 11 |
| strong_dip | **$9683.42** | $-463.45 | $146.87 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9630.98** | $-406.2 | $37.18 | 133 | 52% | $-573.32 | 3 |
| maker_flat | **$9501.94** | $-314.96 | $-183.1 | 40 | 45% | $-492.74 | 15 |
| ai_judge | **$9412.36** | $-587.64 | $0 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9255.72** | $-741.23 | $-3.05 | 69 | 48% | $-926.94 | 11 |
| random_control | **$9187.56** | $-561.85 | $-250.59 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9166.59** | $-468.35 | $-365.06 | 53 | 53% | $-654.06 | 25 |
| mm_strong | **$8691.67** | $-924.82 | $-383.51 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8207.21** | $-1041.81 | $-750.98 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7230.92** | $-2165.05 | $-604.03 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9001.34** | $-942.24 | $-56.42 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8479.58** | $-1937.09 | $416.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 55 | 37 | 5 | 60% | 2.96¢ |
| maker_sports | 80 | 47 | 6 | 63% | 1.54¢ |

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

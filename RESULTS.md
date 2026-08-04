# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30218 · Last run: 2026-08-04T23:39:23.256Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11155.01** | $1340.09 | $-185.08 | 392 | 56% | $1120.96 | 25 |
| mm_tight | **$10895.8** | $1184.59 | $-288.79 | 342 | 54% | $981.56 | 16 |
| mid_momentum | **$10406.11** | $860.1 | $-453.99 | 202 | 57% | $646.62 | 25 |
| mm_cheap | **$10383.05** | $951.97 | $-568.92 | 32 | 69% | $774.19 | 25 |
| copy_top | **$10150.94** | $-193.36 | $344.3 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10027.6** | $-438.03 | $465.63 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9918.43** | $77.6 | $-159.17 | 112 | 96% | $66.86 | 25 |
| super | **$9762.01** | $-592.35 | $354.36 | 69 | 46% | $-808.2 | 14 |
| strong_dip | **$9710.39** | $-467.86 | $178.25 | 100 | 59% | $-560.17 | 24 |
| mm_max | **$9597.09** | $-324.37 | $-78.54 | 149 | 53% | $-491.49 | 3 |
| ai_judge | **$9394.92** | $-587.64 | $-17.44 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9375.45** | $-643.82 | $19.27 | 95 | 51% | $-829.53 | 11 |
| maker_flat | **$9237.37** | $-616.54 | $-146.09 | 59 | 42% | $-810.66 | 15 |
| mm_slow | **$9121.78** | $-468.35 | $-409.87 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8863.99** | $-957.37 | $-178.64 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8624.96** | $-927.32 | $-447.72 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8204.27** | $-1044.31 | $-751.42 | 252 | 67% | $-1532.55 | 25 |
| whale_fade | **$6903.1** | $-2370.75 | $-726.15 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9013.12** | $-931.5 | $-55.38 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5094.53** | $-4791.55 | $-113.92 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 74 | 45 | 1 | 62% | 2.97¢ |
| maker_sports | 106 | 66 | 8 | 62% | 1.62¢ |

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

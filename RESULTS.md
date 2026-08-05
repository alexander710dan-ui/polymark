# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30284 · Last run: 2026-08-05T00:16:08.649Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10968.25** | $1381.45 | $-413.2 | 393 | 56% | $1162.32 | 25 |
| mm_tight | **$10878.53** | $1225.95 | $-347.42 | 343 | 55% | $1022.92 | 19 |
| mid_momentum | **$10415.91** | $860.1 | $-444.19 | 202 | 57% | $646.62 | 25 |
| mm_cheap | **$10349.59** | $951.97 | $-602.38 | 32 | 69% | $774.19 | 25 |
| copy_top | **$10058.84** | $-193.36 | $252.2 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9967.41** | $-438.03 | $405.44 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9915.61** | $77.6 | $-161.99 | 112 | 96% | $66.86 | 25 |
| strong_dip | **$9713.39** | $-467.86 | $181.25 | 100 | 59% | $-560.17 | 25 |
| mm_max | **$9682.52** | $-324.37 | $6.89 | 149 | 53% | $-491.49 | 6 |
| super | **$9641.86** | $-592.35 | $234.21 | 69 | 46% | $-808.2 | 14 |
| ai_judge | **$9402.62** | $-587.64 | $-9.74 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9147.99** | $-468.35 | $-383.66 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9127.2** | $-594.57 | $-278.23 | 96 | 51% | $-780.28 | 15 |
| maker_flat | **$9106.42** | $-616.54 | $-277.04 | 59 | 42% | $-810.66 | 17 |
| random_control | **$8856.48** | $-957.37 | $-186.15 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8617** | $-927.32 | $-455.68 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8201.72** | $-1044.31 | $-753.97 | 252 | 67% | $-1532.55 | 25 |
| whale_fade | **$7013.15** | $-2370.75 | $-616.1 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.98** | $-931.5 | $-56.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 76 | 45 | 0 | 63% | 2.96¢ |
| maker_sports | 111 | 67 | 5 | 62% | 1.6¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30139 · Last run: 2026-08-04T22:55:33.605Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11252.48** | $1342.59 | $-90.11 | 391 | 57% | $1123.46 | 20 |
| mm_tight | **$11070.72** | $1289.59 | $-218.87 | 340 | 55% | $1086.56 | 13 |
| mid_momentum | **$10396.92** | $862.6 | $-465.68 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10375.03** | $954.47 | $-579.44 | 31 | 71% | $776.69 | 25 |
| copy_top | **$10014.48** | $-193.36 | $207.84 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9970.94** | $-438.03 | $408.97 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9915.12** | $77.6 | $-162.48 | 112 | 96% | $66.86 | 25 |
| strong_dip | **$9715.52** | $-463.45 | $178.97 | 99 | 60% | $-555.76 | 25 |
| super | **$9700.41** | $-592.35 | $292.76 | 69 | 46% | $-808.2 | 14 |
| mm_max | **$9681.42** | $-221.87 | $-96.71 | 148 | 53% | $-388.99 | 2 |
| ai_judge | **$9392.7** | $-587.64 | $-19.66 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9382.23** | $-543.82 | $-73.95 | 94 | 51% | $-729.53 | 10 |
| maker_flat | **$9233.56** | $-516.54 | $-249.9 | 58 | 43% | $-710.66 | 15 |
| mm_slow | **$9111.02** | $-468.35 | $-420.63 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8864.75** | $-957.37 | $-177.88 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8610.03** | $-924.82 | $-465.15 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8200.23** | $-1041.81 | $-757.96 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7063.39** | $-2370.75 | $-565.86 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.94** | $-931.5 | $-56.56 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8446.25** | $-1937.09 | $383.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5094.53** | $-4791.55 | $-113.92 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 73 | 45 | 0 | 62% | 2.94¢ |
| maker_sports | 104 | 65 | 3 | 62% | 1.59¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30135 · Last run: 2026-08-04T22:53:15.739Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11262.83** | $1444.04 | $-181.21 | 390 | 57% | $1224.91 | 21 |
| mm_tight | **$11060.49** | $1179.47 | $-118.98 | 339 | 55% | $976.44 | 14 |
| mid_momentum | **$10388.55** | $862.6 | $-474.05 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10378.46** | $954.47 | $-576.01 | 31 | 71% | $776.69 | 25 |
| copy_top | **$10011.76** | $-193.36 | $205.12 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9948.77** | $-438.03 | $386.8 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9916.35** | $77.6 | $-161.25 | 112 | 96% | $66.86 | 25 |
| strong_dip | **$9718.54** | $-463.45 | $181.99 | 99 | 60% | $-555.76 | 25 |
| super | **$9695** | $-592.35 | $287.35 | 69 | 46% | $-808.2 | 14 |
| mm_max | **$9668.66** | $-221.87 | $-109.47 | 148 | 53% | $-388.99 | 2 |
| ai_judge | **$9398.26** | $-587.64 | $-14.1 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9391.26** | $-443.82 | $-164.92 | 93 | 52% | $-629.53 | 11 |
| maker_flat | **$9234.53** | $-643.81 | $-121.66 | 57 | 42% | $-837.93 | 16 |
| mm_slow | **$9109.85** | $-468.35 | $-421.8 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8849.48** | $-957.37 | $-193.15 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8608.05** | $-924.82 | $-467.13 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8194.64** | $-1041.81 | $-763.55 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7063.4** | $-2370.75 | $-565.85 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9014.88** | $-931.5 | $-53.62 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8429.58** | $-1937.09 | $366.67 | 146 | 25% | $-3964.75 | 1 |
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

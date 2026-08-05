# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30393 · Last run: 2026-08-05T01:16:40.471Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10883.95** | $1304.66 | $-420.71 | 398 | 56% | $1085.53 | 24 |
| mm_tight | **$10748.96** | $1356.68 | $-607.72 | 347 | 55% | $1153.65 | 17 |
| mid_momentum | **$10550.85** | $757.35 | $-206.5 | 203 | 57% | $543.87 | 25 |
| mm_cheap | **$10265.12** | $849.22 | $-584.1 | 33 | 67% | $671.44 | 25 |
| copy_top | **$10009.12** | $-193.36 | $202.48 | 401 | 52% | $-1521.93 | 25 |
| fade_longshot | **$9921.96** | $82.61 | $-160.65 | 113 | 96% | $71.87 | 25 |
| copy_pro | **$9741.48** | $-438.03 | $179.51 | 382 | 52% | $-1288.03 | 25 |
| strong_dip | **$9717.08** | $-426.02 | $143.1 | 101 | 59% | $-518.33 | 25 |
| super | **$9655.65** | $-592.35 | $248 | 69 | 46% | $-808.2 | 15 |
| mm_max | **$9457.95** | $-269.1 | $-272.95 | 152 | 53% | $-436.22 | 7 |
| ai_judge | **$9402.62** | $-587.64 | $-9.74 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9197.03** | $-468.35 | $-334.62 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9062.4** | $-816.54 | $-121.06 | 61 | 41% | $-1010.66 | 18 |
| maker_sports | **$9055.34** | $-637.69 | $-306.97 | 101 | 50% | $-840.72 | 16 |
| random_control | **$8887.17** | $-1025.29 | $-87.54 | 136 | 56% | $-1639.58 | 25 |
| mm_strong | **$8697.86** | $-927.32 | $-374.82 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8218.54** | $-1137.13 | $-644.33 | 254 | 67% | $-1625.37 | 25 |
| whale_fade | **$7017.8** | $-2370.75 | $-611.45 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.98** | $-931.5 | $-56.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 79 | 45 | 0 | 64% | 2.95¢ |
| maker_sports | 117 | 71 | 1 | 62% | 1.58¢ |

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

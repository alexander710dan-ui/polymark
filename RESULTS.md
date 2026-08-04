# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30130 · Last run: 2026-08-04T22:50:27.094Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11271.43** | $1444.04 | $-172.61 | 390 | 57% | $1224.91 | 21 |
| mm_tight | **$11071.02** | $1179.47 | $-108.45 | 339 | 55% | $976.44 | 14 |
| mid_momentum | **$10393.02** | $862.6 | $-469.58 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10382.4** | $954.47 | $-572.07 | 31 | 71% | $776.69 | 25 |
| copy_top | **$10009.14** | $-193.36 | $202.5 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$9950.05** | $-438.03 | $388.08 | 382 | 52% | $-1288.03 | 25 |
| fade_longshot | **$9915.25** | $77.6 | $-162.35 | 112 | 96% | $66.86 | 25 |
| strong_dip | **$9715.35** | $-463.45 | $178.8 | 99 | 60% | $-555.76 | 25 |
| super | **$9690.45** | $-592.35 | $282.8 | 69 | 46% | $-808.2 | 14 |
| mm_max | **$9668.66** | $-221.87 | $-109.47 | 148 | 53% | $-388.99 | 2 |
| ai_judge | **$9405.95** | $-587.64 | $-6.41 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9387.69** | $-443.82 | $-168.49 | 93 | 52% | $-629.53 | 11 |
| maker_flat | **$9230.23** | $-643.81 | $-125.96 | 57 | 42% | $-837.93 | 16 |
| mm_slow | **$9111.16** | $-468.35 | $-420.49 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8849.97** | $-957.37 | $-192.66 | 134 | 56% | $-1571.66 | 25 |
| mm_strong | **$8611.6** | $-924.82 | $-463.58 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8205.35** | $-1041.81 | $-752.84 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7071.68** | $-2370.75 | $-557.57 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9013.75** | $-931.5 | $-54.75 | 133 | 69% | $-995.43 | 3 |
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

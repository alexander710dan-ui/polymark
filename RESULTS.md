# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29689 · Last run: 2026-08-04T18:45:07.050Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11279.56** | $1648.86 | $-369.3 | 374 | 57% | $1429.73 | 23 |
| mm_tight | **$10838.49** | $840.59 | $-2.1 | 324 | 54% | $637.56 | 17 |
| mm_cheap | **$10574.75** | $1054.47 | $-479.72 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10500.88** | $862.6 | $-361.72 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10025.56** | $-193.36 | $218.92 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10018.49** | $-592.99 | $611.48 | 380 | 51% | $-1442.99 | 25 |
| fade_longshot | **$9895.72** | $55.61 | $-159.89 | 108 | 95% | $44.87 | 25 |
| super | **$9713.91** | $-439.2 | $153.11 | 68 | 47% | $-655.05 | 15 |
| strong_dip | **$9696.26** | $-463.45 | $159.71 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9687.86** | $-289.94 | $-22.2 | 140 | 53% | $-457.06 | 4 |
| maker_flat | **$9448.89** | $-208.2 | $-342.91 | 47 | 47% | $-385.98 | 19 |
| ai_judge | **$9405.78** | $-587.64 | $-6.58 | 7 | 14% | $-600 | 2 |
| random_control | **$9127.62** | $-661.85 | $-210.53 | 129 | 57% | $-1276.14 | 25 |
| mm_slow | **$9126.49** | $-468.35 | $-405.16 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9018.78** | $-653.19 | $-328.03 | 80 | 50% | $-838.9 | 10 |
| mm_strong | **$8702.92** | $-924.82 | $-372.26 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8215.2** | $-1041.81 | $-742.99 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7109.97** | $-2370.75 | $-519.28 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9404.36** | $-730.36 | $134.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.78** | $-942.24 | $-53.98 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8476.25** | $-1937.09 | $413.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5100.24** | $-4691.55 | $-208.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 66 | 41 | 1 | 62% | 2.97¢ |
| maker_sports | 90 | 55 | 5 | 62% | 1.57¢ |

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

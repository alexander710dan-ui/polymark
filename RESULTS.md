# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29537 · Last run: 2026-08-04T17:20:36.179Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11256.36** | $1367.1 | $-110.74 | 365 | 56% | $1147.97 | 22 |
| mm_tight | **$10714.92** | $753.39 | $-38.47 | 315 | 54% | $550.36 | 18 |
| mm_cheap | **$10628.79** | $1054.47 | $-425.68 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10543.66** | $862.6 | $-318.94 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10041.9** | $-193.36 | $235.26 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10009.27** | $-609.89 | $619.16 | 379 | 51% | $-1459.89 | 25 |
| fade_longshot | **$9892.07** | $55.61 | $-163.54 | 108 | 95% | $44.87 | 25 |
| super | **$9826.89** | $-439.2 | $266.09 | 68 | 47% | $-655.05 | 12 |
| mm_max | **$9754.41** | $-248.13 | $2.54 | 135 | 53% | $-415.25 | 5 |
| strong_dip | **$9698.14** | $-463.45 | $161.59 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9489.68** | $-420.62 | $-89.7 | 44 | 43% | $-598.4 | 17 |
| ai_judge | **$9404.67** | $-587.64 | $-7.69 | 7 | 14% | $-600 | 2 |
| random_control | **$9172.68** | $-561.85 | $-265.47 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9161.83** | $-468.35 | $-369.82 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9002.66** | $-720.86 | $-276.48 | 72 | 49% | $-906.57 | 14 |
| mm_strong | **$8703.41** | $-924.82 | $-371.77 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8208.46** | $-1041.81 | $-749.73 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7102.68** | $-2370.75 | $-526.57 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9416.86** | $-730.36 | $147.22 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.19** | $-942.24 | $-54.57 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8479.58** | $-1937.09 | $416.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.24** | $-4691.55 | $-204.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 61 | 40 | 2 | 60% | 2.95¢ |
| maker_sports | 86 | 53 | 3 | 62% | 1.54¢ |

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

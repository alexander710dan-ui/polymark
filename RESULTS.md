# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29313 · Last run: 2026-08-04T15:15:48.492Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11203.72** | $1242.41 | $-38.69 | 360 | 56% | $1039.38 | 18 |
| mm_tight | **$10694.78** | $773.24 | $-78.46 | 311 | 54% | $570.21 | 11 |
| mm_cheap | **$10637.24** | $1054.47 | $-417.23 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10543.46** | $862.6 | $-319.14 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9915.83** | $-336.57 | $252.4 | 399 | 52% | $-1665.14 | 25 |
| fade_longshot | **$9894.11** | $55.61 | $-161.5 | 108 | 95% | $44.87 | 25 |
| super | **$9802.23** | $-439.2 | $241.43 | 68 | 47% | $-655.05 | 11 |
| copy_pro | **$9736.98** | $-881.58 | $618.56 | 377 | 51% | $-1731.58 | 25 |
| strong_dip | **$9693.75** | $-463.45 | $157.2 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9667.05** | $-214.96 | $-117.99 | 39 | 46% | $-392.74 | 15 |
| mm_max | **$9596.35** | $-303.75 | $-99.9 | 132 | 52% | $-470.87 | 1 |
| ai_judge | **$9410.31** | $-587.64 | $-2.05 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9281.05** | $-641.23 | $-77.72 | 68 | 49% | $-826.94 | 8 |
| mm_slow | **$9218.03** | $-468.35 | $-313.62 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9121.93** | $-561.85 | $-316.22 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8714.5** | $-924.82 | $-360.68 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8203.44** | $-1041.81 | $-754.75 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7327.29** | $-2165.05 | $-507.66 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9419.64** | $-730.36 | $150 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9010.67** | $-942.24 | $-47.09 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 54 | 35 | 4 | 61% | 2.98¢ |
| maker_sports | 76 | 45 | 6 | 63% | 1.56¢ |

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

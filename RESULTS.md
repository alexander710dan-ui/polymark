# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29389 · Last run: 2026-08-04T15:58:09.304Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11306.82** | $1140.66 | $166.16 | 361 | 56% | $937.63 | 22 |
| mm_tight | **$10730.9** | $670.79 | $60.11 | 312 | 54% | $467.76 | 16 |
| mm_cheap | **$10624.62** | $1054.47 | $-429.85 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10544.83** | $862.6 | $-317.77 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10020.57** | $-336.57 | $357.14 | 399 | 52% | $-1665.14 | 25 |
| copy_pro | **$9950.57** | $-881.58 | $832.15 | 377 | 51% | $-1731.58 | 25 |
| fade_longshot | **$9881.3** | $55.61 | $-174.31 | 108 | 95% | $44.87 | 25 |
| super | **$9844.32** | $-439.2 | $283.52 | 68 | 47% | $-655.05 | 11 |
| strong_dip | **$9683.27** | $-463.45 | $146.72 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9635.94** | $-406.2 | $42.14 | 133 | 52% | $-573.32 | 4 |
| maker_flat | **$9494.32** | $-314.96 | $-190.72 | 40 | 45% | $-492.74 | 16 |
| ai_judge | **$9412.36** | $-587.64 | $0 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9263.47** | $-741.23 | $4.7 | 69 | 48% | $-926.94 | 11 |
| random_control | **$9186.66** | $-561.85 | $-251.49 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9166.59** | $-468.35 | $-365.06 | 53 | 53% | $-654.06 | 25 |
| mm_strong | **$8691.67** | $-924.82 | $-383.51 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8207.21** | $-1041.81 | $-750.98 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7222.86** | $-2165.05 | $-612.09 | 400 | 48% | $-2519.6 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9001.34** | $-942.24 | $-56.42 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8479.58** | $-1937.09 | $416.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.37** | $-4691.55 | $-201.08 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 56 | 37 | 4 | 60% | 2.94¢ |
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

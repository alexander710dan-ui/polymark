# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29585 · Last run: 2026-08-04T17:47:12.250Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11387.07** | $1418.63 | $-31.56 | 368 | 57% | $1199.5 | 22 |
| mm_tight | **$10851.64** | $1000.18 | $-148.54 | 319 | 54% | $797.15 | 17 |
| mm_cheap | **$10627.67** | $1054.47 | $-426.8 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10562.35** | $862.6 | $-300.25 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10045.76** | $-193.36 | $239.12 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10032.61** | $-609.89 | $642.5 | 379 | 51% | $-1459.89 | 25 |
| fade_longshot | **$9885.89** | $55.61 | $-169.72 | 108 | 95% | $44.87 | 25 |
| super | **$9820.7** | $-439.2 | $259.9 | 68 | 47% | $-655.05 | 12 |
| mm_max | **$9736.36** | $-152.93 | $-110.71 | 137 | 53% | $-320.05 | 5 |
| strong_dip | **$9684.99** | $-463.45 | $148.44 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9620.61** | $-420.62 | $41.23 | 44 | 43% | $-598.4 | 19 |
| ai_judge | **$9404.67** | $-587.64 | $-7.69 | 7 | 14% | $-600 | 2 |
| random_control | **$9161.35** | $-561.85 | $-276.8 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9136.66** | $-468.35 | $-394.99 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9060.45** | $-756.57 | $-182.98 | 76 | 49% | $-942.28 | 12 |
| mm_strong | **$8714.34** | $-924.82 | $-360.84 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8208.12** | $-1041.81 | $-750.07 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7103.58** | $-2370.75 | $-525.67 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.19** | $-942.24 | $-54.57 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8479.58** | $-1937.09 | $416.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.24** | $-4691.55 | $-204.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 63 | 41 | 2 | 61% | 2.93¢ |
| maker_sports | 88 | 54 | 4 | 62% | 1.55¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29858 · Last run: 2026-08-04T20:19:07.116Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11461.04** | $1394.53 | $66.51 | 379 | 56% | $1175.4 | 25 |
| mm_tight | **$11274.54** | $924.24 | $350.3 | 329 | 54% | $721.21 | 17 |
| mm_cheap | **$10471.14** | $1054.47 | $-583.33 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10390.08** | $862.6 | $-472.52 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10031.34** | $-193.36 | $224.7 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10023.66** | $-592.99 | $616.65 | 380 | 51% | $-1442.99 | 25 |
| fade_longshot | **$9901.07** | $55.61 | $-154.54 | 108 | 95% | $44.87 | 25 |
| mm_max | **$9766.85** | $-256.85 | $23.7 | 143 | 53% | $-423.97 | 3 |
| strong_dip | **$9706.32** | $-463.45 | $169.77 | 99 | 60% | $-555.76 | 25 |
| super | **$9663.08** | $-592.35 | $255.43 | 69 | 46% | $-808.2 | 14 |
| ai_judge | **$9401.42** | $-587.64 | $-10.94 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9357.96** | $-690.03 | $47.99 | 83 | 49% | $-875.74 | 13 |
| maker_flat | **$9184.52** | $-414.08 | $-401.4 | 52 | 44% | $-608.2 | 18 |
| mm_slow | **$9143.74** | $-468.35 | $-387.91 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8989.35** | $-661.85 | $-348.8 | 129 | 57% | $-1276.14 | 25 |
| mm_strong | **$8664.03** | $-924.82 | $-411.15 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8207.29** | $-1041.81 | $-750.9 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7046.81** | $-2370.75 | $-582.44 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.44** | $-942.24 | $-51.32 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8466.25** | $-1937.09 | $403.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5096.24** | $-4691.55 | $-212.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 70 | 42 | 1 | 63% | 2.93¢ |
| maker_sports | 96 | 58 | 7 | 62% | 1.54¢ |

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

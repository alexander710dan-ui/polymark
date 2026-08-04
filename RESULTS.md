# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29807 · Last run: 2026-08-04T19:50:45.306Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11363.3** | $1394.53 | $-31.23 | 379 | 56% | $1175.4 | 20 |
| mm_tight | **$11158.91** | $924.24 | $234.67 | 329 | 54% | $721.21 | 15 |
| mm_cheap | **$10489.62** | $1054.47 | $-564.85 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10401.02** | $862.6 | $-461.58 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10022.6** | $-193.36 | $215.96 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10014.6** | $-592.99 | $607.59 | 380 | 51% | $-1442.99 | 25 |
| fade_longshot | **$9897.55** | $55.61 | $-158.06 | 108 | 95% | $44.87 | 25 |
| mm_max | **$9772.05** | $-256.85 | $28.9 | 143 | 53% | $-423.97 | 2 |
| strong_dip | **$9706.44** | $-463.45 | $169.89 | 99 | 60% | $-555.76 | 25 |
| super | **$9633.66** | $-592.35 | $226.01 | 69 | 46% | $-808.2 | 14 |
| ai_judge | **$9409.11** | $-587.64 | $-3.25 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9335.49** | $-414.08 | $-250.43 | 52 | 44% | $-608.2 | 17 |
| maker_sports | **$9227.01** | $-690.03 | $-82.96 | 83 | 49% | $-875.74 | 10 |
| mm_slow | **$9145.99** | $-468.35 | $-385.66 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9009.15** | $-661.85 | $-329 | 129 | 57% | $-1276.14 | 25 |
| mm_strong | **$8682.28** | $-924.82 | $-392.9 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8218.26** | $-1041.81 | $-739.93 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7062.34** | $-2370.75 | $-566.91 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9005.3** | $-942.24 | $-52.46 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8466.25** | $-1937.09 | $403.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5096.24** | $-4691.55 | $-212.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 69 | 42 | 1 | 62% | 2.94¢ |
| maker_sports | 93 | 58 | 4 | 62% | 1.55¢ |

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

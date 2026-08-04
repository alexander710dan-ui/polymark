# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27790 · Last run: 2026-08-04T01:08:31.052Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11388.84** | $1922.06 | $-533.22 | 316 | 58% | $1719.03 | 24 |
| mm_tight | **$10775.73** | $978.65 | $-202.92 | 274 | 54% | $775.62 | 21 |
| mid_momentum | **$10296.74** | $780.44 | $-483.7 | 193 | 58% | $566.96 | 25 |
| mm_cheap | **$10265.83** | $893.78 | $-627.95 | 25 | 72% | $716 | 25 |
| fade_longshot | **$9975.49** | $39.78 | $-64.29 | 106 | 95% | $29.04 | 25 |
| maker_flat | **$9890.18** | $192.93 | $-302.75 | 16 | 56% | $15.15 | 17 |
| strong_dip | **$9801.32** | $-361.15 | $162.47 | 98 | 60% | $-453.46 | 25 |
| copy_top | **$9727.01** | $-716.01 | $443.02 | 391 | 51% | $-2044.58 | 23 |
| mm_max | **$9616.63** | $-41.54 | $-341.83 | 107 | 53% | $-161.01 | 12 |
| super | **$9561.85** | $-353.9 | $-84.25 | 64 | 47% | $-569.75 | 11 |
| maker_sports | **$9512.76** | $-266.9 | $-220.34 | 30 | 47% | $-452.61 | 17 |
| ai_judge | **$9448.43** | $-587.64 | $36.07 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9438.09** | $-916.05 | $354.14 | 370 | 51% | $-1766.05 | 24 |
| random_control | **$8986.84** | $-354.2 | $-658.96 | 126 | 58% | $-968.49 | 25 |
| mm_slow | **$8899.9** | $-762.3 | $-337.8 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8655.13** | $-1021.38 | $-323.49 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8184.07** | $-1176.09 | $-639.84 | 242 | 67% | $-1664.33 | 25 |
| whale_fade | **$7393.72** | $-1868.7 | $-737.58 | 392 | 48% | $-2223.25 | 23 |
| copy_month (retired) | **$9377.97** | $-730.36 | $108.33 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9051.51** | $-942.24 | $-6.25 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8232.91** | $-1937.09 | $170 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5102.07** | $-4691.55 | $-206.38 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 33 | 22 | 3 | 60% | 3.05¢ |
| maker_sports | 47 | 23 | 5 | 67% | 1.6¢ |

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

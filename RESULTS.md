# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27821 · Last run: 2026-08-04T01:25:44.557Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11403.41** | $1838.49 | $-435.08 | 320 | 58% | $1635.46 | 22 |
| mm_tight | **$10852.69** | $949.22 | $-96.53 | 278 | 54% | $746.19 | 17 |
| mm_cheap | **$10285.6** | $893.78 | $-608.18 | 25 | 72% | $716 | 25 |
| mid_momentum | **$10265.51** | $780.44 | $-514.93 | 193 | 58% | $566.96 | 25 |
| fade_longshot | **$9966.95** | $39.78 | $-72.83 | 106 | 95% | $29.04 | 25 |
| maker_flat | **$9832.19** | $92.93 | $-260.74 | 17 | 53% | $-84.85 | 17 |
| strong_dip | **$9783.63** | $-463.45 | $247.08 | 99 | 60% | $-555.76 | 25 |
| copy_top | **$9735.09** | $-716.01 | $451.1 | 391 | 51% | $-2044.58 | 24 |
| mm_max | **$9716.76** | $-48.29 | $-234.95 | 109 | 53% | $-167.76 | 10 |
| super | **$9581.63** | $-353.9 | $-64.47 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9557.44** | $-916.05 | $473.49 | 370 | 51% | $-1766.05 | 24 |
| ai_judge | **$9436.2** | $-587.64 | $23.84 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9376.47** | $-270.11 | $-353.42 | 35 | 49% | $-455.82 | 14 |
| random_control | **$9060.52** | $-354.2 | $-585.28 | 126 | 58% | $-968.49 | 25 |
| mm_slow | **$8914.24** | $-762.3 | $-323.46 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8705.44** | $-1021.38 | $-273.18 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8203.05** | $-1176.09 | $-620.86 | 242 | 67% | $-1664.33 | 25 |
| whale_fade | **$7395.87** | $-1868.7 | $-735.43 | 392 | 48% | $-2223.25 | 24 |
| copy_month (retired) | **$9377.97** | $-730.36 | $108.33 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9045.04** | $-942.24 | $-12.72 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8269.58** | $-1937.09 | $206.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 34 | 24 | 1 | 59% | 3.01¢ |
| maker_sports | 49 | 24 | 4 | 67% | 1.57¢ |

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

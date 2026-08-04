# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27829 · Last run: 2026-08-04T01:30:11.727Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11376.55** | $1738.49 | $-361.94 | 321 | 57% | $1535.46 | 21 |
| mm_tight | **$10828.64** | $849.22 | $-20.58 | 279 | 54% | $646.19 | 17 |
| mm_cheap | **$10295.03** | $893.78 | $-598.75 | 25 | 72% | $716 | 25 |
| mid_momentum | **$10268.55** | $780.44 | $-511.89 | 193 | 58% | $566.96 | 25 |
| fade_longshot | **$9965.12** | $39.78 | $-74.66 | 106 | 95% | $29.04 | 25 |
| maker_flat | **$9837.24** | $-7.07 | $-155.69 | 18 | 50% | $-184.85 | 16 |
| strong_dip | **$9778.72** | $-463.45 | $242.17 | 99 | 60% | $-555.76 | 25 |
| copy_top | **$9748.16** | $-716.01 | $464.17 | 391 | 51% | $-2044.58 | 24 |
| mm_max | **$9697.54** | $-148.29 | $-154.17 | 110 | 53% | $-267.76 | 10 |
| super | **$9585.86** | $-353.9 | $-60.24 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9500.38** | $-916.05 | $416.43 | 370 | 51% | $-1766.05 | 24 |
| ai_judge | **$9435.09** | $-587.64 | $22.73 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9317.07** | $-220.86 | $-462.07 | 36 | 50% | $-406.57 | 14 |
| random_control | **$9038.63** | $-354.2 | $-607.17 | 126 | 58% | $-968.49 | 25 |
| mm_slow | **$8926.07** | $-762.3 | $-311.63 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8711.02** | $-1021.38 | $-267.6 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8192.53** | $-1176.09 | $-631.38 | 242 | 67% | $-1664.33 | 25 |
| whale_fade | **$7407.57** | $-1868.7 | $-723.73 | 392 | 48% | $-2223.25 | 24 |
| copy_month (retired) | **$9377.97** | $-730.36 | $108.33 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9044.45** | $-942.24 | $-13.31 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8272.91** | $-1937.09 | $210 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 34 | 24 | 1 | 59% | 3.01¢ |
| maker_sports | 50 | 25 | 2 | 67% | 1.58¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13750 · Last run: 2026-07-30T01:12:54.407Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 264 | 133 | 50% | $455.9 | 1.73% | $-872.67 | 23 | $10399.34 |
| fade_longshot | 69 | 67 | 97% | $133.55 | 1.94% | $123.66 | 25 | $10225.78 |
| mid_momentum | 140 | 83 | 59% | $1037.71 | 7.41% | $824.23 | 25 | $10189.74 |
| momentum | 169 | 120 | 71% | $-35 | -0.21% | $-523.24 | 25 | $9697.91 |
| copy_pro | 236 | 117 | 50% | $-586.58 | -1.56% | $-1436.58 | 24 | $9598.63 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9531.93 |
| strong_dip | 60 | 34 | 57% | $-511.6 | -8.53% | $-603.91 | 25 | $9481.66 |
| super | 48 | 21 | 44% | $-508.29 | -8.07% | $-724.14 | 18 | $9435.3 |
| random_control | 66 | 35 | 53% | $-537.13 | -8.14% | $-1151.42 | 25 | $9149.76 |
| whale_fade | 264 | 129 | 49% | $-923.38 | -3.5% | $-1258.16 | 23 | $8689.91 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9676.95 |
| favorite (retired) | 119 | 78 | 66% | $-1251.16 | -10.51% | $-1315.09 | 17 | $8903.3 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8372.04 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 65 | 2 | 3% | $-3091.55 | -47.56% | $-4991.55 | 19 | $5369.99 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric
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

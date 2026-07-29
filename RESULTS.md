# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 10995 · Last run: 2026-07-29T02:10:55.195Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 212 | 105 | 50% | $-227.63 | -0.69% | $-1077.63 | 25 | $10925.84 |
| copy_top | 242 | 123 | 51% | $446.03 | 1.84% | $-882.54 | 22 | $10651.43 |
| random_control | 58 | 32 | 55% | $-137.91 | -2.38% | $-752.2 | 25 | $10341.08 |
| mid_momentum | 125 | 74 | 59% | $807.8 | 6.46% | $594.32 | 25 | $10200.38 |
| fade_longshot | 63 | 61 | 97% | $102.46 | 1.63% | $92.57 | 25 | $10121.13 |
| momentum | 141 | 101 | 72% | $47.06 | 0.33% | $-441.18 | 25 | $10006.91 |
| ai_judge | 1 | 0 | 0% | $-100 | -100% | $0 | 8 | $9678.8 |
| super | 41 | 18 | 44% | $-243.59 | -4.6% | $-459.44 | 20 | $9613.7 |
| strong_dip | 54 | 30 | 56% | $-437.03 | -8.09% | $-529.34 | 25 | $9534.24 |
| whale_fade | 242 | 117 | 48% | $-826.87 | -3.42% | $-1161.65 | 22 | $8907.05 |
| copy_month (retired) | 152 | 73 | 48% | $-146.4 | -0.96% | $-955.49 | 13 | $10113.4 |
| favorite (retired) | 115 | 75 | 65% | $-1196.99 | -10.41% | $-1260.92 | 21 | $8773.44 |
| mean_revert (retired) | 126 | 29 | 23% | $-1024.26 | -8.13% | $-3051.92 | 21 | $8427.92 |
| late_favorite (retired) | 408 | 316 | 77% | $-1702.76 | -4.17% | $-1744.81 | 1 | $8338.02 |
| longshot (retired) | 62 | 2 | 3% | $-2791.55 | -45.02% | $-4691.55 | 22 | $7104.88 |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 10938 · Last run: 2026-07-29T01:42:23.682Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_pro | 211 | 104 | 49% | $-412.25 | -1.25% | $-1262.25 | 25 | $10892.01 |
| copy_top | 241 | 122 | 51% | $353.72 | 1.47% | $-974.85 | 23 | $10661.19 |
| random_control | 58 | 32 | 55% | $-137.91 | -2.38% | $-752.2 | 25 | $10368.02 |
| mid_momentum | 123 | 73 | 59% | $841.13 | 6.84% | $627.65 | 25 | $10242.56 |
| fade_longshot | 63 | 61 | 97% | $102.46 | 1.63% | $92.57 | 25 | $10118.12 |
| momentum | 140 | 100 | 71% | $42.89 | 0.31% | $-445.35 | 25 | $9966.9 |
| ai_judge | 1 | 0 | 0% | $-100 | -100% | $0 | 8 | $9673.21 |
| super | 40 | 18 | 45% | $-93.59 | -1.82% | $-309.44 | 21 | $9648.08 |
| strong_dip | 54 | 30 | 56% | $-437.03 | -8.09% | $-529.34 | 25 | $9542.97 |
| whale_fade | 241 | 117 | 49% | $-726.87 | -3.02% | $-1061.65 | 23 | $8851.79 |
| copy_month (retired) | 152 | 73 | 48% | $-146.4 | -0.96% | $-955.49 | 13 | $10104.2 |
| favorite (retired) | 115 | 75 | 65% | $-1196.99 | -10.41% | $-1260.92 | 21 | $8768.01 |
| mean_revert (retired) | 126 | 29 | 23% | $-1024.26 | -8.13% | $-3051.92 | 21 | $8523.53 |
| late_favorite (retired) | 408 | 316 | 77% | $-1702.76 | -4.17% | $-1744.81 | 1 | $8338.02 |
| longshot (retired) | 62 | 2 | 3% | $-2791.55 | -45.02% | $-4691.55 | 22 | $7165.81 |

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

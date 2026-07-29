# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13193 · Last run: 2026-07-29T20:33:03.489Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 257 | 129 | 50% | $454.25 | 1.77% | $-874.32 | 23 | $10627.21 |
| fade_longshot | 65 | 63 | 97% | $110.36 | 1.7% | $100.47 | 25 | $10204.71 |
| mid_momentum | 136 | 79 | 58% | $643.72 | 4.73% | $430.24 | 25 | $10118.64 |
| copy_pro | 227 | 113 | 50% | $-449.42 | -1.25% | $-1299.42 | 25 | $9926.54 |
| momentum | 158 | 110 | 70% | $-265.51 | -1.68% | $-753.75 | 25 | $9825.59 |
| ai_judge | 3 | 0 | 0% | $-300 | -100% | $-200 | 6 | $9558.54 |
| random_control | 60 | 33 | 55% | $-231.98 | -3.87% | $-846.27 | 25 | $9447.16 |
| strong_dip | 58 | 33 | 57% | $-434 | -7.48% | $-526.31 | 25 | $9441.19 |
| super | 42 | 18 | 43% | $-443.59 | -8.07% | $-659.44 | 23 | $9226.54 |
| whale_fade | 257 | 126 | 49% | $-705.19 | -2.74% | $-1039.97 | 23 | $8820.72 |
| copy_month (retired) | 154 | 73 | 47% | $-346.4 | -2.25% | $-1155.49 | 11 | $9678.17 |
| favorite (retired) | 117 | 77 | 66% | $-1170.21 | -10% | $-1234.14 | 19 | $8877.31 |
| late_favorite (retired) | 408 | 316 | 77% | $-1702.76 | -4.17% | $-1744.81 | 1 | $8338.02 |
| mean_revert (retired) | 128 | 31 | 24% | $-981.38 | -7.67% | $-3009.04 | 19 | $8272.21 |
| longshot (retired) | 64 | 2 | 3% | $-2991.55 | -46.74% | $-4891.55 | 20 | $5522.76 |

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

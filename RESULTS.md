# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13451 · Last run: 2026-07-29T22:42:10.905Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 260 | 131 | 50% | $531.61 | 2.04% | $-796.96 | 25 | $10674.84 |
| fade_longshot | 66 | 64 | 97% | $113.45 | 1.72% | $103.56 | 25 | $10212.92 |
| mid_momentum | 138 | 81 | 59% | $785.62 | 5.69% | $572.14 | 25 | $10144.39 |
| copy_pro | 231 | 115 | 50% | $-394.7 | -1.08% | $-1244.7 | 25 | $9962.21 |
| momentum | 161 | 113 | 70% | $-14.4 | -0.09% | $-502.64 | 25 | $9875.45 |
| ai_judge | 3 | 0 | 0% | $-300 | -100% | $-200 | 6 | $9565.94 |
| strong_dip | 59 | 34 | 58% | $-411.6 | -6.98% | $-503.91 | 25 | $9481.01 |
| random_control | 60 | 33 | 55% | $-231.98 | -3.87% | $-846.27 | 25 | $9415.34 |
| super | 44 | 18 | 41% | $-743.59 | -12.82% | $-959.44 | 22 | $9193.59 |
| whale_fade | 260 | 127 | 49% | $-832.78 | -3.2% | $-1167.56 | 25 | $8708.93 |
| copy_month (retired) | 154 | 73 | 47% | $-346.4 | -2.25% | $-1155.49 | 11 | $9681.44 |
| favorite (retired) | 117 | 77 | 66% | $-1170.21 | -10% | $-1234.14 | 19 | $8893.79 |
| mean_revert (retired) | 128 | 31 | 24% | $-981.38 | -7.67% | $-3009.04 | 19 | $8372.02 |
| late_favorite (retired) | 408 | 316 | 77% | $-1702.76 | -4.17% | $-1744.81 | 1 | $8338.02 |
| longshot (retired) | 64 | 2 | 3% | $-2991.55 | -46.74% | $-4891.55 | 20 | $5453.48 |

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

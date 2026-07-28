# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 10569 · Last run: 2026-07-28T22:37:38.811Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 236 | 118 | 50% | $113.6 | 0.48% | $-1214.97 | 25 | $10497.5 |
| copy_pro | 207 | 101 | 49% | $-811.27 | -2.52% | $-1661.27 | 25 | $10327.5 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10278.61 |
| mid_momentum | 119 | 70 | 59% | $657.86 | 5.53% | $444.38 | 25 | $10143.1 |
| fade_longshot | 62 | 60 | 97% | $98.29 | 1.59% | $88.4 | 25 | $10127.79 |
| momentum | 136 | 97 | 71% | $35.56 | 0.26% | $-452.68 | 25 | $9935 |
| ai_judge | 1 | 0 | 0% | $-100 | -100% | $0 | 8 | $9742.65 |
| super | 37 | 16 | 43% | $-313.99 | -6.9% | $-506.15 | 24 | $9546.3 |
| strong_dip | 52 | 28 | 54% | $-559.21 | -10.75% | $-651.52 | 25 | $9493.21 |
| whale_fade | 236 | 116 | 49% | $-408.69 | -1.73% | $-743.47 | 25 | $9021.13 |
| copy_month (retired) | 151 | 72 | 48% | $-174.61 | -1.16% | $-983.7 | 14 | $10072.28 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8795.47 |
| mean_revert (retired) | 125 | 29 | 23% | $-924.26 | -7.39% | $-2951.92 | 22 | $8501.37 |
| late_favorite (retired) | 407 | 315 | 77% | $-1737.9 | -4.27% | $-1779.95 | 2 | $8337.95 |
| longshot (retired) | 61 | 2 | 3% | $-2691.55 | -44.12% | $-4591.55 | 23 | $7005.35 |

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

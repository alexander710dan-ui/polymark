# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 10094 · Last run: 2026-07-28T18:41:18.101Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 235 | 118 | 50% | $213.6 | 0.91% | $-1114.97 | 24 | $10757.34 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10396.39 |
| fade_longshot | 61 | 59 | 97% | $95.41 | 1.56% | $85.52 | 25 | $10109.53 |
| copy_pro | 206 | 100 | 49% | $-1065.82 | -3.33% | $-1915.82 | 25 | $10062.79 |
| momentum | 135 | 97 | 72% | $135.56 | 1% | $-352.68 | 25 | $10039.41 |
| super | 35 | 15 | 43% | $-236.4 | -5.5% | $-428.56 | 24 | $9881.39 |
| mid_momentum | 117 | 68 | 58% | $468.24 | 4% | $254.76 | 25 | $9864.97 |
| ai_judge | 0 | 0 | — | $0 | — | $0 | 9 | $9748.99 |
| strong_dip | 51 | 28 | 55% | $-459.21 | -9% | $-551.52 | 25 | $9473.83 |
| whale_fade | 235 | 115 | 49% | $-541.25 | -2.3% | $-876.03 | 24 | $8772.82 |
| copy_month (retired) | 151 | 72 | 48% | $-174.61 | -1.16% | $-983.7 | 14 | $10200.76 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8740.08 |
| mean_revert (retired) | 125 | 29 | 23% | $-924.26 | -7.39% | $-2951.92 | 22 | $8516.64 |
| late_favorite (retired) | 407 | 315 | 77% | $-1737.9 | -4.27% | $-1779.95 | 2 | $8337.95 |
| longshot (retired) | 61 | 2 | 3% | $-2691.55 | -44.12% | $-4591.55 | 23 | $7154.98 |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 10056 · Last run: 2026-07-28T18:22:17.106Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 234 | 118 | 50% | $313.6 | 1.34% | $-1014.97 | 25 | $10756.39 |
| random_control | 57 | 31 | 54% | $-146.61 | -2.57% | $-760.9 | 25 | $10316.82 |
| fade_longshot | 60 | 58 | 97% | $89.03 | 1.48% | $79.14 | 25 | $10114.1 |
| copy_pro | 205 | 100 | 49% | $-965.82 | -3.03% | $-1815.82 | 25 | $10041.58 |
| momentum | 133 | 95 | 71% | $122.68 | 0.92% | $-365.56 | 25 | $10024.78 |
| super | 35 | 15 | 43% | $-236.4 | -5.5% | $-428.56 | 24 | $9908.91 |
| mid_momentum | 116 | 68 | 59% | $568.24 | 4.9% | $354.76 | 25 | $9882.91 |
| ai_judge | 0 | 0 | — | $0 | — | $0 | 9 | $9728.38 |
| strong_dip | 51 | 28 | 55% | $-459.21 | -9% | $-551.52 | 24 | $9470.28 |
| whale_fade | 234 | 114 | 49% | $-553.61 | -2.37% | $-888.39 | 25 | $8777.47 |
| copy_month (retired) | 150 | 72 | 48% | $-74.61 | -0.5% | $-883.7 | 15 | $10187.79 |
| favorite (retired) | 114 | 74 | 65% | $-1228.57 | -10.78% | $-1292.5 | 22 | $8744.26 |
| mean_revert (retired) | 123 | 29 | 24% | $-724.26 | -5.89% | $-2751.92 | 24 | $8516.42 |
| late_favorite (retired) | 407 | 315 | 77% | $-1737.9 | -4.27% | $-1779.95 | 2 | $8337.95 |
| longshot (retired) | 60 | 2 | 3% | $-2591.55 | -43.19% | $-4491.55 | 24 | $7080.1 |

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

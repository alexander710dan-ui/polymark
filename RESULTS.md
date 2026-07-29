# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13138 · Last run: 2026-07-29T20:05:30.906Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 256 | 129 | 50% | $554.25 | 2.17% | $-774.32 | 24 | $10517.87 |
| fade_longshot | 64 | 62 | 97% | $106.19 | 1.66% | $96.3 | 25 | $10202.62 |
| mid_momentum | 136 | 79 | 58% | $643.72 | 4.73% | $430.24 | 25 | $10140.15 |
| momentum | 157 | 110 | 70% | $-165.51 | -1.05% | $-653.75 | 25 | $9758.86 |
| copy_pro | 226 | 113 | 50% | $-199.42 | -0.56% | $-1049.42 | 25 | $9711.23 |
| ai_judge | 2 | 0 | 0% | $-200 | -100% | $-100 | 7 | $9556 |
| random_control | 59 | 32 | 54% | $-237.91 | -4.03% | $-852.2 | 25 | $9492.25 |
| strong_dip | 57 | 32 | 56% | $-456.25 | -8% | $-548.56 | 25 | $9480.94 |
| super | 42 | 18 | 43% | $-443.59 | -8.07% | $-659.44 | 23 | $9231.52 |
| whale_fade | 256 | 125 | 49% | $-719.48 | -2.81% | $-1054.26 | 24 | $8926.56 |
| copy_month (retired) | 153 | 73 | 48% | $-246.4 | -1.61% | $-1055.49 | 12 | $9680.5 |
| favorite (retired) | 116 | 76 | 66% | $-1184.63 | -10.21% | $-1248.56 | 20 | $8880.56 |
| late_favorite (retired) | 408 | 316 | 77% | $-1702.76 | -4.17% | $-1744.81 | 1 | $8338.02 |
| mean_revert (retired) | 127 | 30 | 24% | $-1003.63 | -7.9% | $-3031.29 | 20 | $8305.37 |
| longshot (retired) | 63 | 2 | 3% | $-2891.55 | -45.9% | $-4791.55 | 21 | $5528.31 |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13663 · Last run: 2026-07-30T00:28:20.261Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 264 | 133 | 50% | $455.9 | 1.73% | $-872.67 | 23 | $10344.84 |
| fade_longshot | 68 | 66 | 97% | $127.51 | 1.88% | $117.62 | 25 | $10221.29 |
| mid_momentum | 138 | 81 | 59% | $785.62 | 5.69% | $572.14 | 25 | $10131.82 |
| momentum | 168 | 119 | 71% | $-37.77 | -0.22% | $-526.01 | 25 | $9730.99 |
| ai_judge | 3 | 0 | 0% | $-300 | -100% | $-200 | 6 | $9536.07 |
| copy_pro | 235 | 117 | 50% | $-486.58 | -1.3% | $-1336.58 | 24 | $9513.11 |
| strong_dip | 59 | 34 | 58% | $-411.6 | -6.98% | $-503.91 | 25 | $9499.07 |
| super | 45 | 19 | 42% | $-551.43 | -9.19% | $-767.28 | 21 | $9257.59 |
| random_control | 65 | 35 | 54% | $-437.13 | -6.73% | $-1051.42 | 25 | $9209.32 |
| whale_fade | 264 | 129 | 49% | $-923.38 | -3.5% | $-1258.16 | 23 | $8781.93 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9675.06 |
| favorite (retired) | 118 | 78 | 66% | $-1151.16 | -9.76% | $-1215.09 | 18 | $8904.53 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8391.12 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 65 | 2 | 3% | $-3091.55 | -47.56% | $-4991.55 | 19 | $5388.29 |

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

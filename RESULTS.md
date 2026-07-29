# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 13555 · Last run: 2026-07-29T23:34:14.512Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 263 | 133 | 51% | $555.9 | 2.11% | $-772.67 | 23 | $10653.31 |
| fade_longshot | 68 | 66 | 97% | $127.51 | 1.88% | $117.62 | 25 | $10221.88 |
| mid_momentum | 138 | 81 | 59% | $785.62 | 5.69% | $572.14 | 25 | $10135.3 |
| copy_pro | 234 | 117 | 50% | $-386.58 | -1.04% | $-1236.58 | 25 | $9946.9 |
| momentum | 166 | 118 | 71% | $54.7 | 0.33% | $-433.54 | 25 | $9789.77 |
| ai_judge | 3 | 0 | 0% | $-300 | -100% | $-200 | 6 | $9551.2 |
| strong_dip | 59 | 34 | 58% | $-411.6 | -6.98% | $-503.91 | 25 | $9471.35 |
| super | 45 | 19 | 42% | $-551.43 | -9.19% | $-767.28 | 21 | $9278.43 |
| random_control | 63 | 35 | 56% | $-237.13 | -3.76% | $-851.42 | 25 | $9251.74 |
| whale_fade | 263 | 128 | 49% | $-960.37 | -3.65% | $-1295.15 | 23 | $8712.27 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9689.84 |
| favorite (retired) | 118 | 78 | 66% | $-1151.16 | -9.76% | $-1215.09 | 18 | $8893.34 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8398.86 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 65 | 2 | 3% | $-3091.55 | -47.56% | $-4991.55 | 19 | $5409.15 |

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

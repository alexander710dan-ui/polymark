# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 15904 · Last run: 2026-07-30T19:13:03.481Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mid_momentum | 150 | 92 | 61% | $1469.83 | 9.8% | $1256.35 | 25 | $10704.45 |
| copy_top | 279 | 141 | 51% | $503.53 | 1.8% | $-825.04 | 20 | $10512.18 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10257.47 |
| mm_strong | 15 | 9 | 60% | $139.68 | 9.31% | $1.58 | 25 | $10084.07 |
| mm_max | 8 | 5 | 63% | $84.18 | 10.52% | $-33.21 | 8 | $9975.97 |
| mm_tight | 18 | 10 | 56% | $82.04 | 4.56% | $-56.06 | 19 | $9943.14 |
| mm_slow | 10 | 5 | 50% | $-153.25 | -15.32% | $-270.64 | 24 | $9814.57 |
| mm_sports | 21 | 10 | 48% | $-284.94 | -13.57% | $-423.04 | 21 | $9781.61 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9574.18 |
| strong_dip | 61 | 34 | 56% | $-611.6 | -10.03% | $-703.91 | 25 | $9527.59 |
| momentum | 185 | 130 | 70% | $-112.36 | -0.61% | $-600.6 | 25 | $9518.67 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9477.27 |
| copy_pro | 250 | 122 | 49% | $-598.77 | -1.51% | $-1448.77 | 25 | $9413.79 |
| random_control | 74 | 38 | 51% | $-728.01 | -9.84% | $-1342.3 | 25 | $8985 |
| whale_fade | 279 | 136 | 49% | $-1237.29 | -4.43% | $-1572.07 | 21 | $8486.05 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9672.27 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8941.75 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8560.59 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5220.57 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (frozen as v1, the control)
- **mm_sports** — mid_momentum, sports only (the one refinement walk-forward supports)
- **mm_tight** — mid_momentum, sports + 45–70¢ (walk-forward says the band cut is unjustified; running as the fitted arm)
- **mm_slow** — mid_momentum, only markets resolving in 2+ days
- **mm_strong** — mid_momentum, requires a ≥8¢ move instead of ≥5¢
- **mm_max** — all four refinements at once: sports, 45–70¢, 2+ days, ≥8¢
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

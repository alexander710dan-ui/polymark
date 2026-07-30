# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 15784 · Last run: 2026-07-30T18:12:54.813Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mid_momentum | 149 | 92 | 62% | $1569.83 | 10.54% | $1356.35 | 25 | $10617.83 |
| copy_top | 279 | 141 | 51% | $503.53 | 1.8% | $-825.04 | 20 | $10498.64 |
| fade_longshot | 72 | 70 | 97% | $156.21 | 2.17% | $146.32 | 25 | $10240.6 |
| mm_strong | 11 | 7 | 64% | $214.99 | 19.54% | $76.89 | 25 | $10088.1 |
| mm_max | 6 | 3 | 50% | $-25.35 | -4.23% | $-142.74 | 6 | $10072.06 |
| mm_tight | 11 | 6 | 55% | $123.26 | 11.21% | $-14.84 | 23 | $9920.87 |
| mm_slow | 8 | 4 | 50% | $-96.11 | -12.01% | $-213.5 | 23 | $9878.63 |
| copy_pro | 250 | 122 | 49% | $-598.77 | -1.51% | $-1448.77 | 25 | $9726.05 |
| mm_sports | 14 | 7 | 50% | $-77.05 | -5.5% | $-215.15 | 25 | $9679.36 |
| super | 50 | 23 | 46% | $-193.77 | -2.89% | $-409.62 | 16 | $9566.3 |
| strong_dip | 60 | 34 | 57% | $-511.6 | -8.53% | $-603.91 | 25 | $9545.26 |
| ai_judge | 4 | 0 | 0% | $-400 | -100% | $-300 | 5 | $9475.41 |
| momentum | 185 | 130 | 70% | $-112.36 | -0.61% | $-600.6 | 25 | $9415.77 |
| random_control | 73 | 38 | 52% | $-628.01 | -8.6% | $-1242.3 | 25 | $8974.34 |
| whale_fade | 279 | 136 | 49% | $-1237.29 | -4.43% | $-1572.07 | 21 | $8451.84 |
| copy_month (retired) | 155 | 74 | 48% | $-318.19 | -2.05% | $-1127.28 | 10 | $9650.93 |
| favorite (retired) | 120 | 79 | 66% | $-1232.11 | -10.27% | $-1296.04 | 16 | $8948.97 |
| mean_revert (retired) | 129 | 31 | 24% | $-1081.38 | -8.38% | $-3109.04 | 18 | $8577.88 |
| late_favorite (retired) | 409 | 317 | 78% | $-1661.91 | -4.06% | $-1703.96 | 0 | $8338.09 |
| longshot (retired) | 66 | 2 | 3% | $-3191.55 | -48.36% | $-5091.55 | 18 | $5240.11 |

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

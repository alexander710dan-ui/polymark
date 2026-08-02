# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24269 · Last run: 2026-08-02T17:22:57.828Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10749.49** | $683.91 | $65.58 | 223 | 57% | $480.88 | 17 |
| mid_momentum | **$10434.18** | $630.98 | $-196.8 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10355.63** | $511.61 | $-155.98 | 192 | 55% | $308.58 | 14 |
| copy_top | **$10184.18** | $50.53 | $133.65 | 368 | 52% | $-1278.04 | 23 |
| mm_cheap | **$10141.68** | $704.44 | $-562.76 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$9997.4** | $-392.45 | $389.85 | 353 | 51% | $-1242.45 | 25 |
| strong_dip | **$9975.48** | $-393.8 | $369.28 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9959.1** | $117.48 | $-158.38 | 102 | 96% | $106.74 | 25 |
| super | **$9699.14** | $-245.84 | $-55.02 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9411.2** | $-487.64 | $-101.16 | 6 | 17% | $-500 | 3 |
| mm_max | **$9361.58** | $-613.77 | $-24.65 | 59 | 51% | $-731.16 | 3 |
| random_control | **$9241.72** | $-310.74 | $-447.54 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8921.12** | $-882.32 | $-196.56 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8647.78** | $-933.53 | $-418.69 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8252.53** | $-1139.53 | $-607.94 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7303.12** | $-2198.76 | $-498.12 | 369 | 47% | $-2553.31 | 23 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9039.67** | $-1003.53 | $43.2 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8299.71** | $-1837.09 | $136.8 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5118.24** | $-4691.55 | $-190.21 | 81 | 2% | $-6591.55 | 3 |

**Equity is the only honest headline** — realized P&L alone hides losses sitting in open positions. In this lab unrealized has been negative 97% of the time, so a realized-only view systematically overstates performance.

**Read 'minus best win' before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

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

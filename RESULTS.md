# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71548 · Last run: 2026-10-29T19:03:28.767Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10565.36** | $345.41 | $219.95 | 441 | 53% | $-504.59 | 25 |
| maker_sports | **$10493.99** | $370.01 | $123.98 | 15 | 67% | $178.46 | 8 |
| mm_tight | **$10415.92** | $485.97 | $-70.05 | 479 | 53% | $276.87 | 5 |
| mid_momentum | **$10402.4** | $208.05 | $194.35 | 257 | 55% | $-5.43 | 20 |
| fade_longshot | **$10068.76** | $89.44 | $-20.68 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9912.74** | $93 | $-180.26 | 11 | 55% | $-98.55 | 18 |
| mm_max | **$9891.54** | $-99.1 | $-9.36 | 207 | 53% | $-308.2 | 2 |
| mm_cheap | **$9697.41** | $-366.67 | $64.08 | 77 | 52% | $-549.13 | 17 |
| strong_dip | **$9632.89** | $-233.15 | $-133.96 | 139 | 62% | $-325.46 | 9 |
| copy_top | **$9620.79** | $-537.6 | $158.39 | 456 | 53% | $-1866.17 | 16 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9379.09** | $-718.08 | $97.17 | 568 | 54% | $-937.21 | 8 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9177.22** | $-1017.13 | $194.35 | 92 | 47% | $-1207.95 | 20 |
| mm_cheap_v2 | **$8847.77** | $-1216.31 | $64.08 | 94 | 47% | $-1407.13 | 17 |
| random_control | **$8749.93** | $-1189.69 | $-60.38 | 180 | 56% | $-1803.98 | 25 |
| mm_strong | **$8674.81** | $-1380.7 | $55.51 | 135 | 50% | $-1584.65 | 17 |
| mm_slow | **$8299.22** | $-1786.92 | $86.14 | 100 | 47% | $-1972.63 | 14 |
| mm_sports_v2 | **$8149.78** | $-1947.39 | $97.17 | 137 | 48% | $-2166.52 | 8 |
| momentum | **$7400.02** | $-2533.86 | $-66.12 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6218.14** | $-3508.42 | $-273.44 | 457 | 47% | $-3862.97 | 16 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 29 | 0 | 0 | 100% | 2.71¢ |
| maker_sports | 23 | 1 | 0 | 96% | 1.82¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

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

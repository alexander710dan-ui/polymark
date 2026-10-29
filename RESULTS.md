# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69636 · Last run: 2026-10-29T11:32:49.029Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10304.04** | $259.9 | $44.14 | 2 | 100% | $68.35 | 11 |
| mm_tight | **$10282.43** | $309.6 | $-27.17 | 470 | 53% | $100.5 | 3 |
| maker_sports | **$10176.56** | $259.9 | $-83.34 | 2 | 100% | $68.35 | 4 |
| copy_pro | **$10148.53** | $68.12 | $80.41 | 430 | 52% | $-781.88 | 15 |
| fade_longshot | **$10077.97** | $77.06 | $0.91 | 150 | 95% | $66.32 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum | **$9836.37** | $-20.51 | $-143.12 | 243 | 55% | $-233.99 | 15 |
| strong_dip | **$9773.99** | $-218.44 | $-7.57 | 134 | 62% | $-310.75 | 3 |
| mm_max | **$9761.24** | $-211.59 | $-27.17 | 201 | 53% | $-420.69 | 3 |
| copy_top | **$9592.39** | $-398.51 | $-9.1 | 450 | 53% | $-1727.08 | 7 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9360.74** | $-555.12 | $-84.14 | 64 | 50% | $-732.9 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8990.07** | $-946.64 | $-63.29 | 554 | 54% | $-1165.77 | 5 |
| random_control | **$8772.11** | $-1186 | $-41.89 | 175 | 56% | $-1800.29 | 25 |
| mid_momentum_v2 | **$8611.19** | $-1245.69 | $-143.12 | 78 | 44% | $-1436.51 | 15 |
| mm_cheap_v2 | **$8511.1** | $-1404.76 | $-84.14 | 81 | 44% | $-1595.58 | 10 |
| mm_strong | **$8265.86** | $-1648.32 | $-85.82 | 121 | 47% | $-1852.27 | 13 |
| mm_slow | **$7888.96** | $-1967.92 | $-143.12 | 89 | 45% | $-2153.63 | 15 |
| mm_sports_v2 | **$7760.76** | $-2175.95 | $-63.29 | 123 | 46% | $-2395.08 | 5 |
| momentum | **$7415.7** | $-2548.15 | $-36.15 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6227.24** | $-3759.78 | $-12.98 | 451 | 46% | $-4114.33 | 7 |
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
| maker_flat | 13 | 0 | 0 | 100% | 2.89¢ |
| maker_sports | 6 | 0 | 1 | 100% | 1.95¢ |

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

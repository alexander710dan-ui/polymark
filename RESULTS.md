# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69810 · Last run: 2026-10-29T12:12:50.142Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$10338.93** | $259.9 | $79.03 | 2 | 100% | $68.35 | 5 |
| maker_flat | **$10326.38** | $259.9 | $66.48 | 2 | 100% | $68.35 | 13 |
| copy_pro | **$10301.08** | $68.12 | $232.96 | 430 | 52% | $-781.88 | 17 |
| mm_tight | **$10290.19** | $309.6 | $-19.41 | 470 | 53% | $100.5 | 4 |
| mid_momentum | **$10109.1** | $-20.51 | $129.61 | 243 | 55% | $-233.99 | 16 |
| fade_longshot | **$10076.43** | $77.06 | $-0.63 | 150 | 95% | $66.32 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9768.99** | $-211.59 | $-19.42 | 201 | 53% | $-420.69 | 4 |
| strong_dip | **$9737.5** | $-218.44 | $-44.06 | 134 | 62% | $-310.75 | 5 |
| copy_top | **$9656.13** | $-398.51 | $54.64 | 450 | 53% | $-1727.08 | 8 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9548.64** | $-555.12 | $103.76 | 64 | 50% | $-732.9 | 11 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9196.76** | $-946.64 | $143.4 | 554 | 54% | $-1165.77 | 6 |
| mid_momentum_v2 | **$8883.92** | $-1245.69 | $129.61 | 78 | 44% | $-1436.51 | 16 |
| random_control | **$8807.9** | $-1050.8 | $-141.3 | 176 | 56% | $-1665.09 | 25 |
| mm_cheap_v2 | **$8699** | $-1404.76 | $103.76 | 81 | 44% | $-1595.58 | 11 |
| mm_strong | **$8467.24** | $-1648.32 | $115.56 | 121 | 47% | $-1852.27 | 14 |
| mm_slow | **$8161.69** | $-1967.92 | $129.61 | 89 | 45% | $-2153.63 | 16 |
| mm_sports_v2 | **$7967.45** | $-2175.95 | $143.4 | 123 | 46% | $-2395.08 | 6 |
| momentum | **$7399.11** | $-2548.15 | $-52.74 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6183.65** | $-3759.78 | $-56.57 | 451 | 46% | $-4114.33 | 8 |
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
| maker_flat | 15 | 0 | 0 | 100% | 2.97¢ |
| maker_sports | 7 | 0 | 1 | 100% | 2.24¢ |

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

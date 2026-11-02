# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87209 · Last run: 2026-11-02T04:37:09.873Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11448.78** | $1446.33 | $2.45 | 500 | 54% | $596.33 | 25 |
| maker_sports | **$11144.32** | $1452.72 | $-308.4 | 118 | 59% | $1240.22 | 6 |
| mid_momentum | **$10702.06** | $755.27 | $-53.21 | 299 | 56% | $541.79 | 25 |
| maker_flat | **$10539.67** | $426.17 | $113.5 | 30 | 53% | $234.62 | 25 |
| mm_tight | **$10502.49** | $650.18 | $-147.69 | 567 | 54% | $441.08 | 4 |
| mm_max | **$10294.2** | $289.41 | $4.79 | 232 | 54% | $80.31 | 1 |
| mm_cheap | **$10064.1** | $375.47 | $-311.37 | 128 | 55% | $183.78 | 25 |
| fade_longshot | **$10007.58** | $-39.09 | $46.67 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9476.88** | $-469.91 | $-53.21 | 134 | 51% | $-662.46 | 25 |
| mm_cheap_v2 | **$9214.46** | $-474.17 | $-311.37 | 145 | 52% | $-665.86 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9200.24** | $-553.3 | $-246.46 | 176 | 53% | $-757.25 | 25 |
| mm_sports | **$9175.82** | $-488.08 | $-336.1 | 672 | 55% | $-707.21 | 6 |
| strong_dip | **$9135.43** | $-880.35 | $15.78 | 163 | 59% | $-973.98 | 24 |
| random_control | **$8953.14** | $-899.06 | $-147.8 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8696.24** | $-1007.21 | $-296.55 | 117 | 50% | $-1206.89 | 25 |
| copy_top | **$8562.99** | $-1053.52 | $-383.49 | 528 | 52% | $-2382.09 | 25 |
| super | **$8344.41** | $-1355.61 | $-299.98 | 124 | 50% | $-1637.51 | 4 |
| mm_sports_v2 | **$7946.51** | $-1717.39 | $-336.1 | 241 | 51% | $-1936.52 | 6 |
| momentum | **$7166.88** | $-2734.26 | $-98.86 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6899.97** | $-2998.02 | $-102.01 | 529 | 47% | $-3449.48 | 25 |
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
| maker_flat | 55 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 124 | 1 | 0 | 99% | 1.4¢ |

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

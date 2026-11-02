# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87123 · Last run: 2026-11-02T04:00:40.790Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11411.46** | $1446.33 | $-34.87 | 500 | 54% | $596.33 | 25 |
| maker_sports | **$11221.63** | $1625.97 | $-404.34 | 113 | 60% | $1413.47 | 10 |
| mid_momentum | **$10712.17** | $857.92 | $-145.75 | 298 | 56% | $644.44 | 25 |
| mm_tight | **$10588.2** | $842.83 | $-254.63 | 562 | 54% | $633.73 | 8 |
| maker_flat | **$10537.15** | $426.17 | $110.98 | 30 | 53% | $234.62 | 25 |
| mm_max | **$10296.26** | $216.12 | $80.14 | 231 | 54% | $7.02 | 2 |
| mm_cheap | **$10088.8** | $478.12 | $-389.32 | 127 | 56% | $286.43 | 25 |
| fade_longshot | **$10005.81** | $-39.09 | $44.9 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9677.58** | $-306.99 | $-15.43 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9486.99** | $-367.26 | $-145.75 | 133 | 51% | $-559.81 | 25 |
| mm_sports | **$9277.97** | $-295.43 | $-426.6 | 667 | 55% | $-514.56 | 10 |
| mm_cheap_v2 | **$9239.16** | $-371.52 | $-389.32 | 144 | 52% | $-563.21 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9199.72** | $-450.65 | $-349.63 | 175 | 54% | $-654.6 | 25 |
| strong_dip | **$9140.04** | $-963.24 | $103.28 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8953.24** | $-899.06 | $-147.7 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8693.69** | $-1007.21 | $-299.1 | 117 | 50% | $-1206.89 | 25 |
| copy_top | **$8675.25** | $-1053.52 | $-271.23 | 528 | 52% | $-2382.09 | 25 |
| super | **$8394.19** | $-1150.21 | $-455.6 | 123 | 50% | $-1432.11 | 5 |
| mm_sports_v2 | **$8048.66** | $-1524.74 | $-426.6 | 236 | 52% | $-1743.87 | 10 |
| momentum | **$7160.89** | $-2734.26 | $-104.85 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6827.02** | $-2998.02 | $-174.96 | 529 | 47% | $-3449.48 | 25 |
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
| maker_sports | 123 | 1 | 0 | 99% | 1.4¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83311 · Last run: 2026-11-01T00:03:30.083Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12016.31** | $1350.53 | $665.78 | 488 | 53% | $500.53 | 25 |
| maker_sports | **$11444.24** | $1364.4 | $79.84 | 90 | 60% | $1151.9 | 6 |
| mid_momentum | **$11075.93** | $861.05 | $214.88 | 292 | 56% | $647.57 | 25 |
| mm_tight | **$10749.92** | $817.3 | $-67.38 | 545 | 54% | $608.2 | 4 |
| mm_cheap | **$10509.9** | $463.76 | $46.14 | 118 | 56% | $272.07 | 24 |
| maker_flat | **$10367.22** | $140.79 | $226.43 | 28 | 50% | $-50.76 | 25 |
| mm_max | **$10272.53** | $271.77 | $0.76 | 229 | 54% | $62.67 | 1 |
| fade_longshot | **$9960.28** | $-70.35 | $30.63 | 161 | 94% | $-81.09 | 25 |
| mid_momentum_v2 | **$9850.75** | $-364.13 | $214.88 | 127 | 51% | $-556.68 | 25 |
| conviction | **$9689.08** | $-306.99 | $-3.93 | 3 | 0% | $-204.85 | 1 |
| mm_cheap_v2 | **$9660.26** | $-385.88 | $46.14 | 135 | 52% | $-577.57 | 24 |
| mm_strong | **$9636.93** | $-258.69 | $-104.38 | 170 | 54% | $-462.64 | 23 |
| mm_sports | **$9615.52** | $-436.52 | $52.04 | 644 | 55% | $-655.65 | 6 |
| copy_top | **$9464.73** | $-768.54 | $233.27 | 509 | 52% | $-2097.11 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9006.13** | $-794.17 | $-199.7 | 189 | 56% | $-1408.46 | 25 |
| super | **$8903.18** | $-1025.67 | $-71.15 | 119 | 50% | $-1307.57 | 6 |
| mm_slow | **$8885.55** | $-1007.21 | $-107.24 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8884.34** | $-1022.63 | $-93.03 | 161 | 58% | $-1116.26 | 22 |
| mm_sports_v2 | **$8386.21** | $-1665.83 | $52.04 | 213 | 51% | $-1884.96 | 6 |
| momentum | **$7265.07** | $-2644.98 | $-89.95 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6508.75** | $-2947.22 | $-544.03 | 510 | 47% | $-3398.68 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 96 | 1 | 0 | 99% | 1.42¢ |

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

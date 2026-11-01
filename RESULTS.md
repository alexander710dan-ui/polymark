# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83641 · Last run: 2026-11-01T02:33:44.309Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11806.04** | $1626.72 | $179.32 | 492 | 53% | $776.72 | 24 |
| maker_sports | **$11422.47** | $1333.39 | $89.08 | 96 | 59% | $1120.89 | 2 |
| mid_momentum | **$11036.99** | $797.55 | $239.44 | 295 | 56% | $584.07 | 23 |
| mm_tight | **$10668.39** | $667.3 | $1.09 | 548 | 53% | $458.2 | 1 |
| mm_cheap | **$10416.89** | $344.86 | $72.03 | 123 | 55% | $153.17 | 22 |
| maker_flat | **$10387.03** | $303.95 | $83.08 | 29 | 52% | $112.4 | 24 |
| mm_max | **$10272.86** | $271.77 | $1.09 | 229 | 54% | $62.67 | 1 |
| fade_longshot | **$9964.44** | $-64.27 | $28.71 | 162 | 94% | $-75.01 | 25 |
| mid_momentum_v2 | **$9811.81** | $-427.63 | $239.44 | 130 | 51% | $-620.18 | 23 |
| conviction | **$9688.72** | $-306.99 | $-4.29 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9654.29** | $-314.09 | $-31.62 | 172 | 54% | $-518.04 | 24 |
| mm_sports | **$9574.38** | $-500.97 | $75.35 | 650 | 54% | $-720.1 | 2 |
| mm_cheap_v2 | **$9567.25** | $-504.78 | $72.03 | 140 | 51% | $-696.47 | 22 |
| copy_top | **$9370.55** | $-602.88 | $-26.57 | 512 | 53% | $-1931.45 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9002.97** | $-794.17 | $-202.86 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8955.38** | $-963.24 | $-81.38 | 162 | 59% | $-1056.87 | 22 |
| super | **$8921.09** | $-1247.21 | $168.3 | 122 | 50% | $-1529.11 | 3 |
| mm_slow | **$8882.07** | $-1007.21 | $-110.72 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8345.07** | $-1730.28 | $75.35 | 219 | 51% | $-1949.41 | 2 |
| momentum | **$7235.12** | $-2644.98 | $-119.9 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6449.81** | $-3061.56 | $-488.63 | 513 | 47% | $-3513.02 | 25 |
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
| maker_sports | 98 | 1 | 0 | 99% | 1.43¢ |

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

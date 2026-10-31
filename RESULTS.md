# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79541 · Last run: 2026-10-31T02:41:30.199Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11746.4** | $1831.75 | $-85.35 | 68 | 66% | $1619.25 | 13 |
| mid_momentum | **$11319.23** | $728.34 | $590.89 | 279 | 56% | $514.86 | 25 |
| mm_tight | **$11158.47** | $1461.82 | $-303.35 | 527 | 54% | $1252.72 | 12 |
| copy_pro | **$11111.19** | $1142.45 | $-31.26 | 479 | 53% | $292.45 | 25 |
| mm_cheap | **$10847.26** | $449.19 | $398.07 | 104 | 57% | $266.73 | 25 |
| mm_max | **$10420.81** | $432.17 | $-11.36 | 226 | 54% | $223.07 | 2 |
| mm_sports | **$10313.57** | $338.29 | $-24.72 | 622 | 55% | $119.16 | 13 |
| maker_flat | **$10296.41** | $-245.19 | $541.6 | 22 | 45% | $-436.74 | 25 |
| mid_momentum_v2 | **$10094.05** | $-496.84 | $590.89 | 114 | 51% | $-687.66 | 25 |
| mm_cheap_v2 | **$9997.62** | $-400.45 | $398.07 | 121 | 52% | $-591.27 | 25 |
| mm_strong | **$9992.74** | $-489.05 | $481.79 | 161 | 54% | $-693 | 25 |
| fade_longshot | **$9919.72** | $21.44 | $-101.72 | 158 | 95% | $10.7 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| super | **$9593.25** | $-259.46 | $-147.29 | 106 | 52% | $-541.36 | 9 |
| copy_top | **$9271.84** | $-747.19 | $19.03 | 495 | 53% | $-2075.76 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9156.9** | $-794.17 | $-48.93 | 189 | 56% | $-1408.46 | 25 |
| mm_sports_v2 | **$9084.26** | $-891.02 | $-24.72 | 191 | 52% | $-1110.15 | 13 |
| mm_slow | **$8974.58** | $-1297.59 | $272.17 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8625.98** | $-1034.1 | $-339.92 | 154 | 58% | $-1126.41 | 25 |
| momentum | **$7297.92** | $-2543.63 | $-158.45 | 302 | 65% | $-3031.87 | 25 |
| whale_fade | **$6871.62** | $-2797.24 | $-331.14 | 496 | 47% | $-3248.7 | 24 |
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
| maker_flat | 47 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 81 | 1 | 0 | 99% | 1.45¢ |

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

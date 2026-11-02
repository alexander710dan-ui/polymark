# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87363 · Last run: 2026-11-02T05:41:19.827Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11408.08** | $1489.91 | $-81.83 | 506 | 54% | $639.91 | 25 |
| maker_sports | **$11252.8** | $1052.72 | $200.08 | 122 | 57% | $840.22 | 5 |
| mid_momentum | **$10715.97** | $562.89 | $153.08 | 304 | 56% | $349.41 | 25 |
| mm_tight | **$10608.83** | $445.88 | $162.95 | 569 | 53% | $236.78 | 4 |
| maker_flat | **$10548.36** | $451.57 | $96.79 | 33 | 55% | $260.02 | 22 |
| mm_max | **$10292.92** | $289.41 | $3.51 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10149.79** | $80.64 | $69.15 | 134 | 54% | $-111.05 | 25 |
| fade_longshot | **$10005.14** | $-25.49 | $30.63 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9490.79** | $-662.29 | $153.08 | 139 | 50% | $-854.84 | 25 |
| mm_cheap_v2 | **$9300.15** | $-769 | $69.15 | 151 | 51% | $-960.69 | 25 |
| mm_sports | **$9274.64** | $-897.18 | $171.82 | 676 | 54% | $-1116.31 | 5 |
| mm_strong | **$9267.29** | $-642.82 | $-89.89 | 180 | 53% | $-846.77 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9021.91** | $-887.57 | $-90.52 | 166 | 59% | $-981.2 | 24 |
| random_control | **$8945.51** | $-899.06 | $-155.43 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8690.98** | $-1096.69 | $-212.33 | 121 | 50% | $-1296.37 | 22 |
| copy_top | **$8530.03** | $-1352.19 | $-117.78 | 537 | 53% | $-2680.76 | 25 |
| super | **$8500.07** | $-1637.68 | $137.75 | 127 | 50% | $-1919.58 | 2 |
| mm_sports_v2 | **$8045.33** | $-2126.49 | $171.82 | 245 | 51% | $-2345.62 | 5 |
| momentum | **$7191.46** | $-2649.53 | $-159.01 | 310 | 65% | $-3137.77 | 25 |
| whale_fade | **$6824.43** | $-3176.08 | $0.51 | 538 | 47% | $-3627.54 | 25 |
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
| maker_sports | 127 | 1 | 0 | 99% | 1.4¢ |

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

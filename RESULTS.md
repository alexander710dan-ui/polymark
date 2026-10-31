# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79909 · Last run: 2026-10-31T04:16:39.513Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11388.07** | $987.05 | $401.02 | 480 | 53% | $137.05 | 25 |
| maker_sports | **$11351.9** | $1352.76 | $-0.86 | 76 | 62% | $1140.26 | 5 |
| mid_momentum | **$11066.54** | $711.73 | $354.81 | 285 | 56% | $498.25 | 24 |
| mm_tight | **$10710.42** | $744.73 | $-34.31 | 534 | 54% | $535.63 | 5 |
| mm_cheap | **$10598.13** | $416.24 | $181.89 | 110 | 56% | $233.78 | 23 |
| mm_max | **$10328.19** | $329.06 | $-0.87 | 227 | 54% | $119.96 | 1 |
| maker_flat | **$10177.34** | $-73.55 | $250.89 | 25 | 48% | $-265.1 | 23 |
| fade_longshot | **$9919.71** | $-77.53 | $-2.76 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9841.36** | $-513.45 | $354.81 | 120 | 51% | $-704.27 | 24 |
| mm_strong | **$9767.55** | $-322.96 | $90.51 | 166 | 54% | $-526.91 | 21 |
| mm_cheap_v2 | **$9748.49** | $-433.4 | $181.89 | 127 | 52% | $-624.22 | 23 |
| mm_sports | **$9701.72** | $-166.77 | $-131.51 | 630 | 55% | $-385.9 | 5 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| copy_top | **$9488.78** | $-667.33 | $156.11 | 499 | 53% | $-1995.9 | 25 |
| super | **$9348.41** | $-698.52 | $46.93 | 112 | 51% | $-980.42 | 5 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9146.79** | $-794.17 | $-59.04 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8982.21** | $-1097.91 | $80.12 | 115 | 50% | $-1297.59 | 25 |
| strong_dip | **$8780.52** | $-995.2 | $-224.28 | 159 | 58% | $-1088.83 | 21 |
| mm_sports_v2 | **$8472.41** | $-1396.08 | $-131.51 | 199 | 51% | $-1615.21 | 5 |
| momentum | **$7265.83** | $-2644.98 | $-89.19 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6653.88** | $-2873.97 | $-472.15 | 500 | 47% | $-3325.43 | 25 |
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
| maker_flat | 48 | 0 | 0 | 100% | 2.68¢ |
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

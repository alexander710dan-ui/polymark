# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32786 · Last run: 2026-08-05T23:38:14.845Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10482.57** | $787.82 | $-305.25 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10394.67** | $663.13 | $-268.46 | 210 | 57% | $449.65 | 25 |
| mm_tight | **$10378.1** | $878.5 | $-500.4 | 402 | 54% | $675.47 | 20 |
| super | **$9982.58** | $-306.37 | $288.95 | 74 | 49% | $-522.22 | 15 |
| fade_longshot | **$9850.73** | $25.97 | $-175.24 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9807.51** | $-386.57 | $194.08 | 417 | 52% | $-1715.14 | 25 |
| mm_cheap_v2 | **$9779.11** | $175.03 | $-395.92 | 26 | 58% | $-15.79 | 25 |
| copy_pro | **$9644.17** | $-797.13 | $441.3 | 397 | 51% | $-1647.13 | 25 |
| strong_dip | **$9591.52** | $-459.3 | $50.82 | 104 | 60% | $-551.61 | 25 |
| mid_momentum_v2 | **$9507.79** | $-13.5 | $-478.71 | 25 | 52% | $-204.32 | 25 |
| mm_max | **$9466.68** | $-392.15 | $-141.17 | 175 | 53% | $-559.27 | 7 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9343.46** | $-266.23 | $-390.31 | 472 | 55% | $-485.36 | 25 |
| random_control | **$9023.6** | $-1100.59 | $124.19 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8690.89** | $-648.67 | $-660.44 | 59 | 51% | $-834.38 | 25 |
| maker_flat | **$8506.04** | $-1249 | $-244.96 | 85 | 41% | $-1443.12 | 21 |
| mm_strong | **$8325.92** | $-1008.46 | $-665.62 | 85 | 47% | $-1212.41 | 25 |
| mm_sports_v2 | **$8125.24** | $-1426.85 | $-447.91 | 40 | 38% | $-1552.87 | 25 |
| momentum | **$8025.78** | $-1242.52 | $-731.7 | 264 | 67% | $-1730.76 | 25 |
| maker_sports | **$7682.04** | $-1898.15 | $-419.81 | 156 | 47% | $-2101.18 | 18 |
| whale_fade | **$6941.94** | $-2534.9 | $-523.16 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.44** | $-931.5 | $-68.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 106 | 68 | 2 | 61% | 2.97¢ |
| maker_sports | 174 | 109 | 6 | 61% | 1.56¢ |

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

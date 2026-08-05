# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32748 · Last run: 2026-08-05T23:17:04.722Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10501.31** | $878.5 | $-377.19 | 402 | 54% | $675.47 | 18 |
| mm_cheap | **$10485.03** | $787.82 | $-302.79 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10442.8** | $663.13 | $-220.33 | 210 | 57% | $449.65 | 25 |
| super | **$10023.46** | $-306.37 | $329.83 | 74 | 49% | $-522.22 | 15 |
| mm_cheap_v2 | **$9944.3** | $175.03 | $-230.73 | 26 | 58% | $-15.79 | 25 |
| fade_longshot | **$9847.62** | $25.97 | $-178.35 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9847.02** | $-386.57 | $233.59 | 417 | 52% | $-1715.14 | 25 |
| copy_pro | **$9685.71** | $-797.13 | $482.84 | 397 | 51% | $-1647.13 | 25 |
| mid_momentum_v2 | **$9602.47** | $-13.5 | $-384.03 | 25 | 52% | $-204.32 | 25 |
| strong_dip | **$9546.42** | $-459.3 | $5.72 | 104 | 60% | $-551.61 | 25 |
| mm_max | **$9466.75** | $-392.15 | $-141.1 | 175 | 53% | $-559.27 | 5 |
| mm_sports | **$9460.39** | $-266.23 | $-273.38 | 472 | 55% | $-485.36 | 23 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9035.7** | $-1100.59 | $136.29 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8744.53** | $-648.67 | $-606.8 | 59 | 51% | $-834.38 | 25 |
| maker_flat | **$8545.79** | $-1249 | $-205.21 | 85 | 41% | $-1443.12 | 20 |
| mm_strong | **$8472.6** | $-1008.46 | $-518.94 | 85 | 47% | $-1212.41 | 25 |
| mm_sports_v2 | **$8243** | $-1426.85 | $-330.15 | 40 | 38% | $-1552.87 | 22 |
| momentum | **$8087.59** | $-1242.52 | $-669.89 | 264 | 67% | $-1730.76 | 25 |
| maker_sports | **$7799.62** | $-1898.15 | $-302.23 | 156 | 47% | $-2101.18 | 17 |
| whale_fade | **$6912.94** | $-2534.9 | $-552.16 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.44** | $-931.5 | $-68.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 105 | 68 | 2 | 61% | 2.95¢ |
| maker_sports | 173 | 109 | 4 | 61% | 1.56¢ |

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

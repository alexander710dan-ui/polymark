# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32676 · Last run: 2026-08-05T22:36:59.822Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10707.94** | $833.04 | $-125.1 | 401 | 54% | $630.01 | 17 |
| mid_momentum | **$10507.22** | $663.13 | $-155.91 | 210 | 57% | $449.65 | 25 |
| mm_cheap | **$10484.14** | $787.82 | $-303.68 | 36 | 64% | $610.04 | 25 |
| mm_cheap_v2 | **$10038.17** | $-144.14 | $182.31 | 23 | 52% | $-256.06 | 25 |
| super | **$10033.08** | $-425.73 | $458.81 | 73 | 48% | $-641.58 | 15 |
| fade_longshot | **$9849.09** | $25.97 | $-176.88 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9788.17** | $-386.57 | $174.74 | 417 | 52% | $-1715.14 | 25 |
| mid_momentum_v2 | **$9725.18** | $-283.89 | $9.07 | 23 | 48% | $-395.81 | 25 |
| copy_pro | **$9698.89** | $-797.13 | $496.02 | 397 | 51% | $-1647.13 | 25 |
| mm_sports | **$9649.04** | $-210.19 | $-140.77 | 470 | 55% | $-429.32 | 22 |
| mm_max | **$9646.5** | $-392.15 | $38.65 | 175 | 53% | $-559.27 | 4 |
| strong_dip | **$9494.81** | $-459.3 | $-45.89 | 104 | 60% | $-551.61 | 25 |
| ai_judge | **$9351.76** | $-587.64 | $-60.6 | 7 | 14% | $-600 | 2 |
| random_control | **$8928.82** | $-1100.59 | $29.41 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8802.02** | $-648.67 | $-549.31 | 59 | 51% | $-834.38 | 25 |
| maker_flat | **$8582.37** | $-1249 | $-168.63 | 85 | 41% | $-1443.12 | 18 |
| mm_strong | **$8525.11** | $-1008.46 | $-466.43 | 85 | 47% | $-1212.41 | 25 |
| mm_sports_v2 | **$8431.64** | $-1370.81 | $-197.55 | 38 | 37% | $-1496.83 | 21 |
| momentum | **$8163.5** | $-1242.52 | $-593.98 | 264 | 67% | $-1730.76 | 25 |
| maker_sports | **$7930.75** | $-1798.15 | $-271.1 | 155 | 48% | $-2001.18 | 11 |
| whale_fade | **$6942.69** | $-2534.9 | $-522.41 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.85** | $-931.5 | $-68.65 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8522.91** | $-1937.09 | $460 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.49** | $-4791.55 | $-98.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 103 | 68 | 1 | 60% | 2.96¢ |
| maker_sports | 166 | 107 | 7 | 61% | 1.58¢ |

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

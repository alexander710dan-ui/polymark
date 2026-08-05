# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32690 · Last run: 2026-08-05T22:44:43.262Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10644.59** | $833.04 | $-188.45 | 401 | 54% | $630.01 | 17 |
| mid_momentum | **$10529.92** | $663.13 | $-133.21 | 210 | 57% | $449.65 | 25 |
| mm_cheap | **$10487.24** | $787.82 | $-300.58 | 36 | 64% | $610.04 | 25 |
| mm_cheap_v2 | **$10079.31** | $-144.14 | $223.45 | 23 | 52% | $-256.06 | 25 |
| super | **$10028.54** | $-425.73 | $454.27 | 73 | 48% | $-641.58 | 15 |
| fade_longshot | **$9845.58** | $25.97 | $-180.39 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9841.83** | $-386.57 | $228.4 | 417 | 52% | $-1715.14 | 25 |
| mid_momentum_v2 | **$9727.14** | $-283.89 | $11.03 | 23 | 48% | $-395.81 | 25 |
| copy_pro | **$9704.81** | $-797.13 | $501.94 | 397 | 51% | $-1647.13 | 25 |
| mm_sports | **$9594.97** | $-210.19 | $-194.84 | 470 | 55% | $-429.32 | 23 |
| mm_max | **$9589.46** | $-392.15 | $-18.39 | 175 | 53% | $-559.27 | 5 |
| strong_dip | **$9478.77** | $-459.3 | $-61.93 | 104 | 60% | $-551.61 | 25 |
| ai_judge | **$9350.65** | $-587.64 | $-61.71 | 7 | 14% | $-600 | 2 |
| random_control | **$8983.15** | $-1100.59 | $83.74 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8828.24** | $-648.67 | $-523.09 | 59 | 51% | $-834.38 | 25 |
| maker_flat | **$8571.9** | $-1249 | $-179.1 | 85 | 41% | $-1443.12 | 19 |
| mm_strong | **$8541.12** | $-1008.46 | $-450.42 | 85 | 47% | $-1212.41 | 25 |
| mm_sports_v2 | **$8377.58** | $-1370.81 | $-251.61 | 38 | 37% | $-1496.83 | 22 |
| momentum | **$8180.13** | $-1242.52 | $-577.35 | 264 | 67% | $-1730.76 | 25 |
| maker_sports | **$7864.67** | $-1798.15 | $-337.18 | 155 | 48% | $-2001.18 | 12 |
| whale_fade | **$6903.75** | $-2534.9 | $-561.35 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.26** | $-931.5 | $-69.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.49** | $-4791.55 | $-104.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 104 | 68 | 0 | 60% | 2.96¢ |
| maker_sports | 167 | 107 | 8 | 61% | 1.58¢ |

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

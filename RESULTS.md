# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70692 · Last run: 2026-10-29T15:38:08.919Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10364.07** | $402.24 | $-38.17 | 474 | 53% | $193.14 | 4 |
| maker_sports | **$10344** | $369.76 | $-25.76 | 8 | 75% | $178.21 | 5 |
| maker_flat | **$10153.03** | $493 | $-339.97 | 7 | 86% | $301.45 | 18 |
| mid_momentum | **$10117.4** | $171.7 | $-54.3 | 250 | 55% | $-41.78 | 17 |
| fade_longshot | **$10046.84** | $80 | $-33.16 | 151 | 95% | $69.26 | 25 |
| copy_pro | **$10016.33** | $234.11 | $-217.78 | 437 | 53% | $-615.89 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9816.27** | $-118.65 | $-65.08 | 205 | 53% | $-327.75 | 2 |
| strong_dip | **$9644.98** | $-275.18 | $-79.84 | 136 | 62% | $-367.49 | 6 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9516.9** | $-462.41 | $-20.69 | 453 | 53% | $-1790.98 | 13 |
| mm_cheap | **$9427.05** | $-404.12 | $-168.83 | 70 | 51% | $-586.58 | 15 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9210.71** | $-754.43 | $-34.86 | 561 | 54% | $-973.56 | 5 |
| mid_momentum_v2 | **$8892.22** | $-1053.48 | $-54.3 | 85 | 46% | $-1244.3 | 17 |
| random_control | **$8725.5** | $-1189.69 | $-84.81 | 180 | 56% | $-1803.98 | 25 |
| mm_cheap_v2 | **$8577.41** | $-1253.76 | $-168.83 | 87 | 46% | $-1444.58 | 15 |
| mm_strong | **$8295.54** | $-1544.24 | $-160.22 | 128 | 48% | $-1748.19 | 15 |
| mm_slow | **$8154.3** | $-1775.71 | $-69.99 | 96 | 47% | $-1961.42 | 15 |
| mm_sports_v2 | **$7981.4** | $-1983.74 | $-34.86 | 130 | 48% | $-2202.87 | 5 |
| momentum | **$7313.54** | $-2548.15 | $-138.31 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6359.25** | $-3630.32 | $-10.43 | 454 | 46% | $-3984.87 | 13 |
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
| maker_flat | 25 | 0 | 0 | 100% | 2.82¢ |
| maker_sports | 13 | 1 | 0 | 93% | 1.98¢ |

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

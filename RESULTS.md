# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71763 · Last run: 2026-10-29T19:53:33.289Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10622.6** | $608.09 | $14.51 | 443 | 53% | $-241.91 | 25 |
| maker_sports | **$10614.7** | $699.24 | $-84.54 | 19 | 74% | $507.69 | 5 |
| mm_tight | **$10522.27** | $605.55 | $-83.28 | 483 | 54% | $396.45 | 2 |
| mid_momentum | **$10440.27** | $503.32 | $-63.05 | 261 | 56% | $289.84 | 18 |
| fade_longshot | **$10093.07** | $89.44 | $3.63 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9900.51** | $-16.21 | $-83.28 | 208 | 53% | $-225.31 | 2 |
| maker_flat | **$9897.82** | $93 | $-195.18 | 11 | 55% | $-98.55 | 19 |
| mm_cheap | **$9727.14** | $-148.79 | $-124.07 | 80 | 54% | $-331.25 | 15 |
| copy_top | **$9671.22** | $-442.32 | $113.54 | 458 | 53% | $-1770.89 | 14 |
| strong_dip | **$9637.16** | $-335.55 | $-27.29 | 140 | 61% | $-427.86 | 10 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_sports | **$9485.01** | $-422.81 | $-92.18 | 572 | 55% | $-641.94 | 5 |
| mid_momentum_v2 | **$9215.09** | $-721.86 | $-63.05 | 96 | 49% | $-912.68 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$8877.5** | $-998.43 | $-124.07 | 97 | 48% | $-1189.25 | 15 |
| random_control | **$8797.49** | $-1190.91 | $-11.6 | 182 | 56% | $-1805.2 | 25 |
| mm_strong | **$8654.12** | $-1210.99 | $-134.89 | 138 | 51% | $-1414.94 | 16 |
| mm_sports_v2 | **$8255.7** | $-1652.12 | $-92.18 | 141 | 50% | $-1871.25 | 5 |
| mm_slow | **$8241.59** | $-1704.03 | $-54.38 | 101 | 48% | $-1889.74 | 15 |
| momentum | **$7369.48** | $-2533.86 | $-96.66 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6135.87** | $-3714.82 | $-149.31 | 459 | 46% | $-4069.37 | 14 |
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
| maker_flat | 30 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 24 | 1 | 0 | 96% | 1.79¢ |

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

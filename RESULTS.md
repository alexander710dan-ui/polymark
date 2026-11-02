# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87332 · Last run: 2026-11-02T05:28:42.741Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11424.19** | $1432.66 | $-8.47 | 505 | 54% | $582.66 | 25 |
| maker_sports | **$11179.08** | $1052.72 | $126.36 | 122 | 57% | $840.22 | 3 |
| mid_momentum | **$10705.39** | $665.49 | $39.9 | 303 | 56% | $452.01 | 25 |
| maker_flat | **$10543.68** | $451.57 | $92.11 | 33 | 55% | $260.02 | 22 |
| mm_tight | **$10539.67** | $445.88 | $93.79 | 569 | 53% | $236.78 | 4 |
| mm_max | **$10292.92** | $289.41 | $3.51 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10086.96** | $183.24 | $-96.28 | 133 | 55% | $-8.45 | 25 |
| fade_longshot | **$10007.9** | $-31.63 | $39.53 | 173 | 95% | $-42.37 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9480.21** | $-559.69 | $39.9 | 138 | 51% | $-752.24 | 25 |
| mm_cheap_v2 | **$9237.32** | $-666.4 | $-96.28 | 150 | 51% | $-858.09 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9207.98** | $-897.18 | $105.16 | 676 | 54% | $-1116.31 | 4 |
| mm_strong | **$9206.44** | $-540.18 | $-253.38 | 179 | 54% | $-744.13 | 25 |
| strong_dip | **$9084.08** | $-935.5 | $19.58 | 165 | 59% | $-1029.13 | 25 |
| random_control | **$8948.54** | $-899.06 | $-152.4 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8688.74** | $-994.09 | $-317.17 | 120 | 51% | $-1193.77 | 23 |
| copy_top | **$8542.34** | $-1352.19 | $-105.47 | 537 | 53% | $-2680.76 | 25 |
| super | **$8466.73** | $-1637.68 | $104.41 | 127 | 50% | $-1919.58 | 2 |
| mm_sports_v2 | **$7978.67** | $-2126.49 | $105.16 | 245 | 51% | $-2345.62 | 4 |
| momentum | **$7178.4** | $-2665.25 | $-156.35 | 309 | 65% | $-3153.49 | 25 |
| whale_fade | **$6814.47** | $-3176.08 | $-9.45 | 538 | 47% | $-3627.54 | 25 |
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
| maker_sports | 125 | 1 | 1 | 99% | 1.4¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82166 · Last run: 2026-10-31T15:27:41.937Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11429.61** | $1370 | $59.61 | 485 | 53% | $520 | 25 |
| maker_sports | **$11325.14** | $1370.15 | $-45.01 | 78 | 62% | $1157.65 | 13 |
| mid_momentum | **$11027.31** | $916.57 | $110.74 | 288 | 56% | $703.09 | 25 |
| mm_tight | **$10677** | $747.96 | $-70.96 | 536 | 54% | $538.86 | 10 |
| mm_cheap | **$10558.33** | $625 | $-66.67 | 113 | 57% | $433.31 | 25 |
| mm_max | **$10331** | $329.06 | $1.94 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10133.92** | $102.69 | $31.23 | 26 | 50% | $-88.86 | 25 |
| fade_longshot | **$9930.84** | $-77.53 | $8.37 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9802.13** | $-308.61 | $110.74 | 123 | 51% | $-501.16 | 25 |
| mm_cheap_v2 | **$9708.69** | $-224.64 | $-66.67 | 130 | 52% | $-416.33 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_strong | **$9639.06** | $-232.66 | $-128.28 | 168 | 54% | $-436.61 | 25 |
| mm_sports | **$9546.4** | $-371.57 | $-82.03 | 632 | 55% | $-590.7 | 13 |
| copy_top | **$9420.02** | $-662.45 | $82.47 | 503 | 52% | $-1991.02 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| super | **$9093.21** | $-921.86 | $15.07 | 115 | 50% | $-1203.76 | 6 |
| random_control | **$9072.59** | $-794.17 | $-133.24 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8938.38** | $-905.36 | $-156.26 | 116 | 51% | $-1105.04 | 25 |
| strong_dip | **$8809.24** | $-1095.92 | $-94.84 | 160 | 58% | $-1189.55 | 23 |
| mm_sports_v2 | **$8317.09** | $-1600.88 | $-82.03 | 201 | 51% | $-1820.01 | 13 |
| momentum | **$7284.65** | $-2644.98 | $-70.37 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6706.83** | $-2847.48 | $-445.69 | 504 | 47% | $-3298.94 | 25 |
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
| maker_flat | 51 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 91 | 1 | 0 | 99% | 1.42¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82063 · Last run: 2026-10-31T14:47:38.070Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11465.39** | $1370 | $95.39 | 485 | 53% | $520 | 25 |
| maker_sports | **$11319.09** | $1370.15 | $-51.06 | 78 | 62% | $1157.65 | 11 |
| mid_momentum | **$11038.9** | $916.57 | $122.33 | 288 | 56% | $703.09 | 25 |
| mm_tight | **$10662.19** | $747.96 | $-85.77 | 536 | 54% | $538.86 | 8 |
| mm_cheap | **$10564.45** | $625 | $-60.55 | 113 | 57% | $433.31 | 25 |
| mm_max | **$10283.41** | $329.06 | $-45.65 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10086.01** | $102.69 | $-16.68 | 26 | 50% | $-88.86 | 25 |
| fade_longshot | **$9934.21** | $-77.53 | $11.74 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9813.72** | $-308.61 | $122.33 | 123 | 51% | $-501.16 | 25 |
| mm_cheap_v2 | **$9714.81** | $-224.64 | $-60.55 | 130 | 52% | $-416.33 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_strong | **$9631.41** | $-232.66 | $-135.93 | 168 | 54% | $-436.61 | 25 |
| mm_sports | **$9545.53** | $-371.57 | $-82.9 | 632 | 55% | $-590.7 | 11 |
| copy_top | **$9393.13** | $-662.45 | $55.58 | 503 | 52% | $-1991.02 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| super | **$9116.32** | $-921.86 | $38.18 | 115 | 50% | $-1203.76 | 6 |
| random_control | **$9072.34** | $-794.17 | $-133.49 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8910.89** | $-905.36 | $-183.75 | 116 | 51% | $-1105.04 | 25 |
| strong_dip | **$8820.28** | $-1095.92 | $-83.8 | 160 | 58% | $-1189.55 | 23 |
| mm_sports_v2 | **$8316.22** | $-1600.88 | $-82.9 | 201 | 51% | $-1820.01 | 11 |
| momentum | **$7295.4** | $-2644.98 | $-59.62 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6710.51** | $-2847.48 | $-442.01 | 504 | 47% | $-3298.94 | 25 |
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
| maker_sports | 89 | 1 | 0 | 99% | 1.43¢ |

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

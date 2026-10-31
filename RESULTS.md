# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82154 · Last run: 2026-10-31T15:22:41.635Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11427.95** | $1370 | $57.95 | 485 | 53% | $520 | 25 |
| maker_sports | **$11249.8** | $1370.15 | $-120.35 | 78 | 62% | $1157.65 | 12 |
| mid_momentum | **$11014.1** | $916.57 | $97.53 | 288 | 56% | $703.09 | 25 |
| mm_tight | **$10619.39** | $747.96 | $-128.57 | 536 | 54% | $538.86 | 9 |
| mm_cheap | **$10544.95** | $625 | $-80.05 | 113 | 57% | $433.31 | 25 |
| mm_max | **$10282.11** | $329.06 | $-46.95 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10090.17** | $102.69 | $-12.52 | 26 | 50% | $-88.86 | 25 |
| fade_longshot | **$9928.36** | $-77.53 | $5.89 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9788.92** | $-308.61 | $97.53 | 123 | 51% | $-501.16 | 25 |
| mm_cheap_v2 | **$9695.31** | $-224.64 | $-80.05 | 130 | 52% | $-416.33 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_strong | **$9638.24** | $-232.66 | $-129.1 | 168 | 54% | $-436.61 | 25 |
| mm_sports | **$9475.86** | $-371.57 | $-152.57 | 632 | 55% | $-590.7 | 12 |
| copy_top | **$9419.9** | $-662.45 | $82.35 | 503 | 52% | $-1991.02 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9070.32** | $-794.17 | $-135.51 | 189 | 56% | $-1408.46 | 25 |
| super | **$9067.79** | $-921.86 | $-10.35 | 115 | 50% | $-1203.76 | 6 |
| mm_slow | **$8902.24** | $-905.36 | $-192.4 | 116 | 51% | $-1105.04 | 25 |
| strong_dip | **$8849.09** | $-1095.92 | $-54.99 | 160 | 58% | $-1189.55 | 23 |
| mm_sports_v2 | **$8246.55** | $-1600.88 | $-152.57 | 201 | 51% | $-1820.01 | 12 |
| momentum | **$7288.88** | $-2644.98 | $-66.14 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6707.67** | $-2847.48 | $-444.85 | 504 | 47% | $-3298.94 | 25 |
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
| maker_sports | 90 | 1 | 0 | 99% | 1.42¢ |

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

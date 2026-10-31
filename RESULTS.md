# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82308 · Last run: 2026-10-31T16:27:47.423Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11552.76** | $1441.27 | $111.49 | 486 | 53% | $591.27 | 25 |
| maker_sports | **$11405.76** | $1370.15 | $35.61 | 78 | 62% | $1157.65 | 13 |
| mid_momentum | **$11059.72** | $916.57 | $143.15 | 288 | 56% | $703.09 | 25 |
| mm_tight | **$10698.31** | $747.96 | $-49.65 | 536 | 54% | $538.86 | 10 |
| mm_cheap | **$10606.43** | $625 | $-18.57 | 113 | 57% | $433.31 | 25 |
| mm_max | **$10227.86** | $329.06 | $-101.2 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10023.84** | $102.69 | $-78.85 | 26 | 50% | $-88.86 | 25 |
| fade_longshot | **$9932.87** | $-77.53 | $10.4 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9834.54** | $-308.61 | $143.15 | 123 | 51% | $-501.16 | 25 |
| mm_cheap_v2 | **$9756.79** | $-224.64 | $-18.57 | 130 | 52% | $-416.33 | 25 |
| conviction | **$9692.94** | $-306.99 | $-0.07 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9628.6** | $-232.66 | $-138.74 | 168 | 54% | $-436.61 | 25 |
| mm_sports | **$9627.07** | $-371.57 | $-1.36 | 632 | 55% | $-590.7 | 13 |
| copy_top | **$9243.98** | $-766 | $9.98 | 504 | 52% | $-2094.57 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| super | **$9208.32** | $-921.86 | $130.18 | 115 | 50% | $-1203.76 | 7 |
| random_control | **$9085.07** | $-794.17 | $-120.76 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8891.5** | $-1095.92 | $-12.58 | 160 | 58% | $-1189.55 | 23 |
| mm_slow | **$8874.04** | $-905.36 | $-220.6 | 116 | 51% | $-1105.04 | 25 |
| mm_sports_v2 | **$8397.76** | $-1600.88 | $-1.36 | 201 | 51% | $-1820.01 | 13 |
| momentum | **$7278.16** | $-2644.98 | $-76.86 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6793.94** | $-2809.99 | $-396.07 | 505 | 47% | $-3261.45 | 25 |
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

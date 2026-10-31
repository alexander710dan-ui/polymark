# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81709 · Last run: 2026-10-31T12:22:24.479Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11623.18** | $1472.4 | $150.78 | 484 | 53% | $622.4 | 25 |
| maker_sports | **$11382** | $1370.15 | $11.85 | 78 | 62% | $1157.65 | 10 |
| mid_momentum | **$11174.09** | $1018.97 | $155.12 | 287 | 56% | $805.49 | 25 |
| mm_tight | **$10720.71** | $747.96 | $-27.25 | 536 | 54% | $538.86 | 7 |
| mm_cheap | **$10699.58** | $727.4 | $-27.82 | 112 | 57% | $535.71 | 25 |
| mm_max | **$10337.9** | $329.06 | $8.84 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10168.14** | $102.69 | $65.45 | 26 | 50% | $-88.86 | 25 |
| mid_momentum_v2 | **$9948.91** | $-206.21 | $155.12 | 122 | 52% | $-398.76 | 25 |
| fade_longshot | **$9931.05** | $-77.53 | $8.58 | 160 | 94% | $-88.27 | 25 |
| mm_cheap_v2 | **$9849.94** | $-122.24 | $-27.82 | 129 | 53% | $-313.93 | 25 |
| mm_strong | **$9750.12** | $-130.41 | $-119.47 | 167 | 54% | $-334.36 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_sports | **$9608.13** | $-371.57 | $-20.3 | 632 | 55% | $-590.7 | 10 |
| copy_top | **$9506.85** | $-560.05 | $66.9 | 502 | 53% | $-1888.62 | 25 |
| super | **$9306.12** | $-768.26 | $74.38 | 114 | 51% | $-1050.16 | 6 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9112.57** | $-794.17 | $-93.26 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8977.09** | $-905.36 | $-117.55 | 116 | 51% | $-1105.04 | 25 |
| strong_dip | **$8764.66** | $-1095.92 | $-139.42 | 160 | 58% | $-1189.55 | 21 |
| mm_sports_v2 | **$8378.82** | $-1600.88 | $-20.3 | 201 | 51% | $-1820.01 | 10 |
| momentum | **$7287.85** | $-2644.98 | $-67.17 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6590.54** | $-2949.01 | $-460.45 | 503 | 47% | $-3400.47 | 25 |
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
| maker_sports | 88 | 1 | 0 | 99% | 1.43¢ |

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

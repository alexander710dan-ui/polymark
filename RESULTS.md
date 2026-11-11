# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79899 · Last run: 2026-11-11T09:44:39.085Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13184.75** | $3330.73 | $-145.98 | 298 | 59% | $3085.9 | 9 |
| copy_pro | **$12384.93** | $2469.41 | $-84.48 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12105.06** | $2262.66 | $-157.6 | 724 | 55% | $2043.53 | 6 |
| mm_cheap | **$12074.5** | $1815.35 | $259.15 | 201 | 57% | $1595.53 | 23 |
| mid_momentum | **$11676.73** | $1308.03 | $368.7 | 365 | 56% | $1088.21 | 25 |
| mm_cheap_v2 | **$11224.86** | $965.71 | $259.15 | 218 | 55% | $745.89 | 23 |
| maker_flat | **$10747.73** | $637.84 | $109.89 | 95 | 52% | $443.72 | 17 |
| mm_sports | **$10519.3** | $692.81 | $-173.51 | 862 | 55% | $473.68 | 9 |
| mid_momentum_v2 | **$10451.55** | $82.85 | $368.7 | 200 | 52% | $-136.97 | 25 |
| mm_max | **$10224.76** | $263.29 | $-38.53 | 293 | 54% | $54.19 | 1 |
| fade_longshot | **$9949.25** | $-73.54 | $22.79 | 223 | 95% | $-84.28 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9406.96** | $-589.47 | $-3.57 | 270 | 53% | $-808.6 | 22 |
| mm_slow | **$9379.86** | $-454.77 | $-165.37 | 177 | 52% | $-673.9 | 18 |
| mm_sports_v2 | **$9289.99** | $-536.5 | $-173.51 | 431 | 54% | $-755.63 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8784.31** | $-1242.86 | $27.17 | 232 | 58% | $-1336.49 | 15 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.01** | $-1470.79 | $-152.2 | 564 | 53% | $-2799.36 | 4 |
| momentum | **$7483.94** | $-2625.55 | $109.49 | 359 | 66% | $-3113.79 | 25 |
| random_control | **$7455.69** | $-2427.27 | $-117.04 | 241 | 54% | $-3041.56 | 25 |
| whale_fade | **$6005.9** | $-4244.08 | $249.98 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 112 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 307 | 1 | 0 | 100% | 1.3¢ |

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

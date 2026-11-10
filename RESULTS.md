# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78811 · Last run: 2026-11-10T20:50:59.228Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.13** | $2469.41 | $-84.28 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12149.6** | $2117.33 | $32.27 | 258 | 58% | $1872.5 | 12 |
| mm_cheap | **$11913.42** | $1472.32 | $441.1 | 176 | 56% | $1252.5 | 24 |
| mid_momentum | **$11648.82** | $1061.51 | $587.31 | 347 | 55% | $841.69 | 25 |
| mm_tight | **$11457.47** | $1488.87 | $-31.4 | 689 | 54% | $1269.74 | 10 |
| maker_flat | **$11070.9** | $875.28 | $195.62 | 87 | 53% | $681.16 | 16 |
| mm_cheap_v2 | **$11063.78** | $622.68 | $441.1 | 193 | 53% | $402.86 | 24 |
| mid_momentum_v2 | **$10423.64** | $-163.67 | $587.31 | 182 | 51% | $-383.49 | 25 |
| mm_max | **$10187.27** | $334.95 | $-147.68 | 285 | 54% | $125.85 | 3 |
| fade_longshot | **$9966.03** | $-17.99 | $-15.98 | 215 | 95% | $-28.73 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9576.91** | $-408.08 | $-15.01 | 821 | 54% | $-627.21 | 12 |
| mm_strong | **$9476.81** | $-766.86 | $243.67 | 247 | 52% | $-985.99 | 25 |
| mm_slow | **$9371.28** | $-429.52 | $-199.2 | 168 | 52% | $-648.65 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9057** | $-936.27 | $-6.73 | 224 | 58% | $-1029.9 | 18 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.26** | $-1470.79 | $-150.95 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8347.6** | $-1637.39 | $-15.01 | 390 | 52% | $-1856.52 | 12 |
| random_control | **$7576.67** | $-2289.22 | $-134.1 | 231 | 54% | $-2903.51 | 25 |
| momentum | **$7313.92** | $-2717.88 | $31.8 | 344 | 65% | $-3206.12 | 25 |
| whale_fade | **$6011.18** | $-4244.08 | $255.26 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 103 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 270 | 1 | 0 | 100% | 1.33¢ |

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

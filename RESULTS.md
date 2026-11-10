# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78957 · Last run: 2026-11-10T22:34:37.463Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12385.38** | $2469.41 | $-84.03 | 532 | 55% | $1619.41 | 3 |
| maker_sports | **$12215.1** | $2187.38 | $27.72 | 264 | 58% | $1942.55 | 14 |
| mm_cheap | **$11872.17** | $1406.8 | $465.37 | 181 | 56% | $1186.98 | 25 |
| mid_momentum | **$11527.67** | $991.63 | $536.04 | 352 | 55% | $771.81 | 25 |
| mm_tight | **$11446.22** | $1471.03 | $-24.81 | 694 | 54% | $1251.9 | 12 |
| mm_cheap_v2 | **$11022.53** | $557.16 | $465.37 | 198 | 54% | $337.34 | 25 |
| maker_flat | **$10947.66** | $857.1 | $90.56 | 89 | 53% | $662.98 | 16 |
| mid_momentum_v2 | **$10302.49** | $-233.55 | $536.04 | 187 | 51% | $-453.37 | 25 |
| mm_max | **$10244.43** | $228.15 | $16.28 | 288 | 54% | $19.05 | 2 |
| fade_longshot | **$9885.3** | $-114.32 | $-0.38 | 217 | 94% | $-125.06 | 25 |
| mm_sports | **$9606.82** | $-380.46 | $-12.72 | 827 | 54% | $-599.59 | 14 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9439.61** | $-784.7 | $224.31 | 252 | 52% | $-1003.83 | 24 |
| mm_slow | **$9409.4** | $-490.86 | $-99.74 | 172 | 52% | $-709.99 | 16 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8982.32** | $-955.63 | $-62.05 | 226 | 58% | $-1049.26 | 19 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8378.41** | $-1470.79 | $-150.8 | 564 | 53% | $-2799.36 | 4 |
| mm_sports_v2 | **$8377.51** | $-1609.77 | $-12.72 | 396 | 52% | $-1828.9 | 14 |
| random_control | **$7787.88** | $-2289.22 | $77.1 | 231 | 54% | $-2903.51 | 25 |
| momentum | **$7379.78** | $-2780.83 | $160.61 | 346 | 65% | $-3269.07 | 25 |
| whale_fade | **$6013.73** | $-4244.08 | $257.81 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 105 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 278 | 1 | 0 | 100% | 1.32¢ |

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

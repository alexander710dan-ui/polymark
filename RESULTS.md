# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81661 · Last run: 2026-11-12T06:51:36.022Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12852.28** | $3182.12 | $-329.84 | 358 | 58% | $2937.29 | 10 |
| copy_pro | **$12385.24** | $2469.41 | $-84.17 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12002.29** | $1872.01 | $130.28 | 217 | 57% | $1652.19 | 24 |
| mm_tight | **$11959.25** | $2312.83 | $-353.58 | 780 | 54% | $2093.7 | 7 |
| mid_momentum | **$11587.06** | $1391.45 | $195.61 | 375 | 56% | $1171.63 | 25 |
| mm_cheap_v2 | **$11152.65** | $1022.37 | $130.28 | 234 | 55% | $802.55 | 24 |
| maker_flat | **$10790.1** | $653.98 | $136.12 | 109 | 51% | $459.86 | 21 |
| mm_max | **$10766.52** | $900.85 | $-134.33 | 304 | 55% | $691.75 | 2 |
| mid_momentum_v2 | **$10361.88** | $166.27 | $195.61 | 210 | 52% | $-53.55 | 25 |
| mm_sports | **$9989.13** | $347.67 | $-358.54 | 924 | 55% | $128.54 | 10 |
| fade_longshot | **$9874.81** | $-140.38 | $15.19 | 230 | 94% | $-151.12 | 25 |
| mm_slow | **$9685.61** | $-90.57 | $-223.82 | 193 | 53% | $-309.7 | 23 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9542.53** | $-241.9 | $-215.57 | 298 | 54% | $-461.03 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$8759.82** | $-881.64 | $-358.54 | 493 | 53% | $-1100.77 | 10 |
| strong_dip | **$8673.23** | $-1595.75 | $268.98 | 253 | 57% | $-1689.38 | 24 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8375.69** | $-1470.79 | $-153.52 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7526.37** | $-2427.27 | $-46.36 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7318.18** | $-2770.21 | $88.39 | 369 | 66% | $-3258.45 | 25 |
| whale_fade | **$5969.58** | $-4244.08 | $213.66 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 130 | 0 | 0 | 100% | 2.67¢ |
| maker_sports | 368 | 2 | 0 | 99% | 1.38¢ |

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

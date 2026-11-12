# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81575 · Last run: 2026-11-12T05:41:29.559Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13084.2** | $3110.6 | $-26.4 | 355 | 58% | $2865.77 | 10 |
| copy_pro | **$12385.09** | $2469.41 | $-84.32 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12238.79** | $1801.7 | $437.09 | 216 | 57% | $1581.88 | 22 |
| mm_tight | **$12197.28** | $2329.05 | $-131.77 | 778 | 54% | $2109.92 | 6 |
| mid_momentum | **$11725.85** | $1239.26 | $486.59 | 373 | 55% | $1019.44 | 25 |
| mm_cheap_v2 | **$11389.15** | $952.06 | $437.09 | 233 | 55% | $732.24 | 22 |
| mm_max | **$10900.85** | $900.85 | $0 | 304 | 55% | $691.75 | 0 |
| maker_flat | **$10832.49** | $653.98 | $178.51 | 109 | 51% | $459.86 | 20 |
| mid_momentum_v2 | **$10500.67** | $14.08 | $486.59 | 208 | 52% | $-205.74 | 25 |
| mm_sports | **$10229.54** | $290.3 | $-60.76 | 921 | 55% | $71.17 | 10 |
| fade_longshot | **$9872.8** | $-140.38 | $13.18 | 230 | 94% | $-151.12 | 25 |
| mm_slow | **$9812.82** | $-90.57 | $-96.61 | 193 | 53% | $-309.7 | 21 |
| mm_strong | **$9782.86** | $-548.67 | $331.53 | 294 | 53% | $-767.8 | 23 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9000.23** | $-939.01 | $-60.76 | 490 | 53% | $-1158.14 | 10 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8479.84** | $-1595.75 | $75.59 | 253 | 57% | $-1689.38 | 21 |
| copy_top | **$8375.38** | $-1470.79 | $-153.83 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7527.39** | $-2427.27 | $-45.34 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7322.95** | $-2843.5 | $166.45 | 368 | 65% | $-3331.74 | 25 |
| whale_fade | **$5972.97** | $-4244.08 | $217.05 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 129 | 0 | 0 | 100% | 2.67¢ |
| maker_sports | 365 | 2 | 0 | 99% | 1.38¢ |

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

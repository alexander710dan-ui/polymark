# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89905 · Last run: 2026-11-03T06:12:19.105Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12693.8** | $2431.07 | $262.73 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$10990.73** | $681.26 | $309.47 | 177 | 56% | $468.76 | 6 |
| mid_momentum | **$10771.58** | $702.82 | $68.76 | 310 | 56% | $489.34 | 25 |
| mm_tight | **$10453.83** | $184.66 | $269.17 | 619 | 53% | $-24.44 | 6 |
| maker_flat | **$10351.39** | $210.93 | $140.46 | 48 | 50% | $16.81 | 19 |
| mm_cheap | **$10180.61** | $170.75 | $9.86 | 141 | 55% | $-20.94 | 25 |
| mm_max | **$9829.8** | $-158.65 | $-11.55 | 251 | 53% | $-367.75 | 1 |
| fade_longshot | **$9753.22** | $-226.09 | $-20.69 | 176 | 94% | $-236.83 | 25 |
| conviction | **$9680.13** | $-306.99 | $-12.88 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9555.38** | $-428.46 | $-16.16 | 192 | 54% | $-632.41 | 23 |
| mid_momentum_v2 | **$9546.4** | $-522.36 | $68.76 | 145 | 51% | $-714.91 | 25 |
| mm_slow | **$9498.84** | $-551.93 | $50.77 | 129 | 52% | $-761.03 | 19 |
| mm_cheap_v2 | **$9330.97** | $-678.89 | $9.86 | 158 | 51% | $-870.58 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9066.54** | $-1212.25 | $278.79 | 734 | 54% | $-1431.38 | 6 |
| strong_dip | **$8950.68** | $-763.89 | $-285.43 | 184 | 59% | $-857.52 | 22 |
| copy_top | **$8705.06** | $-1204.02 | $-90.92 | 547 | 52% | $-2532.59 | 21 |
| super | **$8608.6** | $-1370.14 | $-21.26 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8567.94** | $-1203.06 | $-229 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$7837.23** | $-2441.56 | $278.79 | 303 | 50% | $-2660.69 | 6 |
| momentum | **$6804.33** | $-2991.46 | $-204.21 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6518.77** | $-3320.58 | $-160.65 | 545 | 47% | $-3772.04 | 22 |
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
| maker_flat | 67 | 0 | 0 | 100% | 2.75¢ |
| maker_sports | 183 | 1 | 0 | 99% | 1.36¢ |

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

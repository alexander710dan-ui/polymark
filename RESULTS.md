# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80124 · Last run: 2026-10-31T05:12:04.727Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11508.17** | $1290.59 | $217.58 | 482 | 53% | $440.59 | 25 |
| maker_sports | **$11342.95** | $1370.15 | $-27.2 | 78 | 62% | $1157.65 | 4 |
| mid_momentum | **$11069.13** | $711.73 | $357.4 | 285 | 56% | $498.25 | 25 |
| mm_tight | **$10696.16** | $747.96 | $-51.8 | 536 | 54% | $538.86 | 4 |
| mm_cheap | **$10597.6** | $416.24 | $181.36 | 110 | 56% | $233.78 | 25 |
| mm_max | **$10305.42** | $329.06 | $-23.64 | 227 | 54% | $119.96 | 1 |
| maker_flat | **$10185.15** | $-73.55 | $258.7 | 25 | 48% | $-265.1 | 24 |
| fade_longshot | **$9919.62** | $-77.53 | $-2.85 | 160 | 94% | $-88.27 | 25 |
| mid_momentum_v2 | **$9843.95** | $-513.45 | $357.4 | 120 | 51% | $-704.27 | 25 |
| mm_strong | **$9766.83** | $-322.96 | $89.79 | 166 | 54% | $-526.91 | 24 |
| mm_cheap_v2 | **$9747.96** | $-433.4 | $181.36 | 127 | 52% | $-624.22 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_sports | **$9584.93** | $-371.57 | $-43.5 | 632 | 55% | $-590.7 | 4 |
| copy_top | **$9583.01** | $-457.95 | $40.96 | 501 | 53% | $-1786.52 | 25 |
| super | **$9305.95** | $-768.26 | $74.21 | 114 | 51% | $-1050.16 | 3 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9172.91** | $-794.17 | $-32.92 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8990.06** | $-1097.91 | $87.97 | 115 | 50% | $-1297.59 | 25 |
| strong_dip | **$8800.67** | $-995.2 | $-204.13 | 159 | 58% | $-1088.83 | 21 |
| mm_sports_v2 | **$8355.62** | $-1600.88 | $-43.5 | 201 | 51% | $-1820.01 | 4 |
| momentum | **$7279.43** | $-2644.98 | $-75.59 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6561.67** | $-3078.72 | $-359.61 | 502 | 47% | $-3530.18 | 25 |
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
| maker_flat | 49 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 82 | 1 | 0 | 99% | 1.45¢ |

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

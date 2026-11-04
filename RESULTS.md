# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91201 · Last run: 2026-11-04T02:49:49.474Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12409.3** | $2431.07 | $-21.77 | 516 | 54% | $1581.07 | 19 |
| mm_cheap | **$11775.14** | $438.8 | $1336.34 | 143 | 55% | $247.11 | 25 |
| mid_momentum | **$11644.06** | $643.6 | $1000.46 | 318 | 55% | $430.12 | 25 |
| maker_flat | **$11370.11** | $88.72 | $1281.39 | 57 | 49% | $-105.4 | 24 |
| maker_sports | **$11284.55** | $496.2 | $788.35 | 222 | 55% | $262.87 | 12 |
| mm_tight | **$11116.56** | $713.85 | $402.71 | 659 | 53% | $494.72 | 11 |
| mm_cheap_v2 | **$10925.5** | $-410.84 | $1336.34 | 160 | 52% | $-602.53 | 25 |
| mid_momentum_v2 | **$10418.88** | $-581.58 | $1000.46 | 153 | 50% | $-774.13 | 25 |
| mm_max | **$10042.67** | $-277.82 | $320.49 | 273 | 53% | $-486.92 | 7 |
| mm_strong | **$9960.91** | $-809.1 | $770.01 | 214 | 53% | $-1013.05 | 25 |
| mm_slow | **$9933.28** | $-544.29 | $477.57 | 141 | 52% | $-753.39 | 24 |
| fade_longshot | **$9880.15** | $-197.58 | $77.73 | 180 | 94% | $-208.32 | 25 |
| conviction | **$9596.87** | $-306.99 | $-96.14 | 3 | 0% | $-204.85 | 1 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9120.54** | $-1601.21 | $721.75 | 782 | 54% | $-1820.34 | 13 |
| strong_dip | **$8678.57** | $-838.98 | $-482.45 | 200 | 59% | $-932.61 | 25 |
| super | **$8577.07** | $-1370.14 | $-52.79 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8377.01** | $-1201.39 | $-421.6 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8011.2** | $-1203.06 | $-785.74 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$7891.23** | $-2830.52 | $721.75 | 351 | 50% | $-3049.65 | 13 |
| momentum | **$7473.09** | $-2991.46 | $464.55 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$7054.72** | $-3425.44 | $480.16 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 81 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 234 | 1 | 0 | 100% | 1.32¢ |

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

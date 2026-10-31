# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82419 · Last run: 2026-10-31T17:17:52.522Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11607.37** | $1631.3 | $-23.93 | 80 | 63% | $1418.8 | 12 |
| copy_pro | **$11570.04** | $1441.27 | $128.77 | 486 | 53% | $591.27 | 25 |
| mid_momentum | **$11071.97** | $984.01 | $87.96 | 289 | 56% | $770.53 | 25 |
| mm_tight | **$10859.58** | $922.54 | $-62.96 | 537 | 54% | $713.44 | 10 |
| mm_cheap | **$10615.91** | $692.44 | $-76.53 | 114 | 57% | $500.75 | 25 |
| mm_max | **$10227.24** | $329.06 | $-101.82 | 227 | 54% | $119.96 | 3 |
| maker_flat | **$10017.84** | $102.69 | $-84.85 | 26 | 50% | $-88.86 | 25 |
| fade_longshot | **$9944.99** | $-70.35 | $15.34 | 161 | 94% | $-81.09 | 25 |
| mid_momentum_v2 | **$9846.79** | $-241.17 | $87.96 | 124 | 52% | $-433.72 | 25 |
| mm_sports | **$9815.51** | $-126.68 | $-57.81 | 634 | 55% | $-345.81 | 12 |
| mm_cheap_v2 | **$9766.27** | $-157.2 | $-76.53 | 131 | 53% | $-348.89 | 25 |
| conviction | **$9691.26** | $-306.99 | $-1.75 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9620** | $-232.66 | $-147.34 | 168 | 54% | $-436.61 | 25 |
| super | **$9259.68** | $-786.98 | $46.66 | 116 | 51% | $-1068.88 | 7 |
| copy_top | **$9244.84** | $-766 | $10.84 | 504 | 52% | $-2094.57 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9089.68** | $-794.17 | $-116.15 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8897.92** | $-1095.92 | $-6.16 | 160 | 58% | $-1189.55 | 23 |
| mm_slow | **$8867.87** | $-905.36 | $-226.77 | 116 | 51% | $-1105.04 | 25 |
| mm_sports_v2 | **$8586.2** | $-1355.99 | $-57.81 | 203 | 51% | $-1575.12 | 12 |
| momentum | **$7288.01** | $-2644.98 | $-67.01 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6790.11** | $-2809.99 | $-399.9 | 505 | 47% | $-3261.45 | 25 |
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
| maker_sports | 92 | 1 | 0 | 99% | 1.42¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82768 · Last run: 2026-10-31T19:58:08.979Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11686.6** | $1555.03 | $131.57 | 487 | 53% | $705.03 | 25 |
| maker_sports | **$11309.93** | $1482.82 | $-172.89 | 83 | 61% | $1270.32 | 11 |
| mid_momentum | **$10910.07** | $984.01 | $-73.94 | 289 | 56% | $770.53 | 25 |
| mm_tight | **$10728.29** | $865.25 | $-136.96 | 539 | 54% | $656.15 | 9 |
| mm_cheap | **$10441.33** | $692.44 | $-251.11 | 114 | 57% | $500.75 | 25 |
| mm_max | **$10271.33** | $271.77 | $-0.44 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10186.47** | $2.69 | $183.78 | 27 | 48% | $-188.86 | 25 |
| fade_longshot | **$9944.62** | $-70.35 | $14.97 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9691.63** | $-306.99 | $-1.38 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9684.89** | $-241.17 | $-73.94 | 124 | 52% | $-433.72 | 25 |
| mm_cheap_v2 | **$9591.69** | $-157.2 | $-251.11 | 131 | 53% | $-348.89 | 25 |
| mm_strong | **$9580.92** | $-232.66 | $-186.42 | 168 | 54% | $-436.61 | 25 |
| mm_sports | **$9513.79** | $-285.62 | $-200.59 | 637 | 55% | $-504.75 | 11 |
| copy_top | **$9226.1** | $-801.66 | $27.76 | 506 | 52% | $-2130.23 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9049.77** | $-794.17 | $-156.06 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8895.29** | $-1022.63 | $-82.08 | 161 | 58% | $-1116.26 | 22 |
| mm_slow | **$8872.53** | $-1007.21 | $-120.26 | 117 | 50% | $-1206.89 | 25 |
| super | **$8826.45** | $-786.98 | $-386.57 | 116 | 51% | $-1068.88 | 8 |
| mm_sports_v2 | **$8284.48** | $-1514.93 | $-200.59 | 206 | 51% | $-1734.06 | 11 |
| momentum | **$7282.32** | $-2644.98 | $-72.7 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6713.51** | $-2856.01 | $-430.48 | 507 | 47% | $-3307.47 | 25 |
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
| maker_flat | 52 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 94 | 1 | 0 | 99% | 1.42¢ |

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

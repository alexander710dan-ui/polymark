# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83485 · Last run: 2026-11-01T01:22:38.526Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11803.68** | $1348.22 | $455.46 | 490 | 53% | $498.22 | 25 |
| maker_sports | **$11328.22** | $1520.81 | $-192.59 | 91 | 60% | $1308.31 | 6 |
| mid_momentum | **$11058.01** | $1002 | $56.01 | 293 | 56% | $788.52 | 25 |
| mm_tight | **$10662.99** | $817.3 | $-154.31 | 545 | 54% | $608.2 | 4 |
| mm_cheap | **$10388.66** | $604.71 | $-216.05 | 119 | 56% | $413.02 | 25 |
| maker_flat | **$10383** | $303.95 | $79.05 | 29 | 52% | $112.4 | 24 |
| mm_max | **$10271.33** | $271.77 | $-0.44 | 229 | 54% | $62.67 | 1 |
| fade_longshot | **$9961.3** | $-70.35 | $31.65 | 161 | 94% | $-81.09 | 25 |
| mid_momentum_v2 | **$9832.83** | $-223.18 | $56.01 | 128 | 52% | $-415.73 | 25 |
| conviction | **$9686.9** | $-306.99 | $-6.11 | 3 | 0% | $-204.85 | 1 |
| mm_strong | **$9606.71** | $-258.69 | $-134.6 | 170 | 54% | $-462.64 | 25 |
| mm_cheap_v2 | **$9539.02** | $-244.93 | $-216.05 | 136 | 52% | $-436.62 | 25 |
| mm_sports | **$9496.31** | $-295.57 | $-208.12 | 645 | 55% | $-514.7 | 7 |
| copy_top | **$9381.38** | $-871.09 | $252.47 | 510 | 52% | $-2199.66 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$8991.36** | $-794.17 | $-214.47 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8945.11** | $-1022.63 | $-32.26 | 161 | 58% | $-1116.26 | 23 |
| mm_slow | **$8886.14** | $-1007.21 | $-106.65 | 117 | 50% | $-1206.89 | 25 |
| super | **$8842.59** | $-1025.67 | $-131.74 | 119 | 50% | $-1307.57 | 6 |
| mm_sports_v2 | **$8267** | $-1524.88 | $-208.12 | 214 | 51% | $-1744.01 | 7 |
| momentum | **$7223.81** | $-2644.98 | $-131.21 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6523.15** | $-2857.31 | $-619.54 | 511 | 47% | $-3308.77 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 97 | 1 | 1 | 99% | 1.42¢ |

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

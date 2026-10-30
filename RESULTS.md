# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73117 · Last run: 2026-10-30T01:14:04.008Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11157.87** | $1274.23 | $-116.36 | 28 | 79% | $1082.68 | 12 |
| mid_momentum | **$10844.93** | $776.07 | $68.86 | 269 | 57% | $562.59 | 25 |
| mm_tight | **$10844.08** | $1007.29 | $-163.21 | 489 | 54% | $798.19 | 11 |
| copy_pro | **$10747.34** | $964.2 | $-216.86 | 447 | 53% | $114.2 | 25 |
| mm_cheap | **$10340.72** | $229.69 | $111.03 | 89 | 56% | $47.23 | 25 |
| super | **$10145.57** | $-424.16 | $569.73 | 92 | 51% | $-688.49 | 4 |
| mm_sports | **$10139.63** | $100.55 | $39.08 | 581 | 55% | $-118.58 | 13 |
| mm_max | **$10128.18** | $259.03 | $-130.85 | 211 | 54% | $49.93 | 3 |
| fade_longshot | **$10058.53** | $89.44 | $-30.91 | 152 | 95% | $78.7 | 25 |
| maker_flat | **$10003** | $-107 | $110 | 13 | 46% | $-298.55 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum_v2 | **$9619.75** | $-449.11 | $68.86 | 104 | 51% | $-639.93 | 25 |
| copy_top | **$9550.35** | $-342.79 | $-106.86 | 462 | 53% | $-1671.36 | 23 |
| mm_cheap_v2 | **$9491.08** | $-619.95 | $111.03 | 106 | 51% | $-810.77 | 25 |
| mm_strong | **$9255.84** | $-927.98 | $183.82 | 147 | 52% | $-1131.93 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9163.54** | $-555.62 | $-280.84 | 144 | 60% | $-647.93 | 21 |
| random_control | **$8943.98** | $-1294.96 | $238.94 | 183 | 56% | $-1909.25 | 25 |
| mm_sports_v2 | **$8910.32** | $-1128.76 | $39.08 | 150 | 52% | $-1347.89 | 13 |
| mm_slow | **$8776.11** | $-1337.81 | $113.92 | 106 | 50% | $-1523.52 | 25 |
| momentum | **$7468.86** | $-2533.86 | $2.72 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6226.18** | $-3883.02 | $109.2 | 463 | 46% | $-4237.57 | 23 |
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
| maker_flat | 38 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 40 | 1 | 0 | 98% | 1.54¢ |

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

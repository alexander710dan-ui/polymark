# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73517 · Last run: 2026-10-30T02:49:13.592Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11139.04** | $1245.13 | $-106.09 | 33 | 73% | $1053.58 | 10 |
| mm_tight | **$10861.28** | $947.21 | $-85.93 | 495 | 54% | $738.11 | 8 |
| mid_momentum | **$10836.61** | $673.87 | $162.74 | 270 | 56% | $460.39 | 25 |
| copy_pro | **$10557.32** | $164.15 | $393.17 | 455 | 53% | $-685.85 | 20 |
| mm_cheap | **$10362.96** | $316.04 | $46.92 | 92 | 57% | $133.58 | 25 |
| super | **$10143.68** | $-47.05 | $190.73 | 94 | 52% | $-328.95 | 2 |
| mm_sports | **$10100.55** | $223.57 | $-123.02 | 587 | 55% | $4.44 | 10 |
| fade_longshot | **$10076** | $89.44 | $-13.44 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10070.19** | $156.38 | $-86.19 | 212 | 54% | $-52.72 | 4 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9977.39** | $-104.96 | $82.35 | 14 | 50% | $-296.51 | 25 |
| copy_top | **$9824.68** | $-452.92 | $277.6 | 470 | 53% | $-1781.49 | 18 |
| mid_momentum_v2 | **$9611.43** | $-551.31 | $162.74 | 105 | 50% | $-742.13 | 25 |
| mm_cheap_v2 | **$9513.32** | $-533.6 | $46.92 | 109 | 51% | $-724.42 | 25 |
| strong_dip | **$9257.95** | $-584.11 | $-157.94 | 146 | 60% | $-676.42 | 21 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9211.64** | $-787.03 | $-1.33 | 148 | 53% | $-990.98 | 25 |
| random_control | **$8957.43** | $-998.71 | $-43.86 | 184 | 56% | $-1613 | 25 |
| mm_sports_v2 | **$8871.24** | $-1005.74 | $-123.02 | 156 | 52% | $-1224.87 | 10 |
| mm_slow | **$8682.16** | $-1337.81 | $19.97 | 106 | 50% | $-1523.52 | 25 |
| momentum | **$7373.41** | $-2533.86 | $-92.73 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5859.33** | $-3763.51 | $-377.16 | 471 | 46% | $-4118.06 | 18 |
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
| maker_flat | 39 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 43 | 1 | 0 | 98% | 1.5¢ |

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

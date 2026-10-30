# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73602 · Last run: 2026-10-30T03:09:30.744Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11087.97** | $1290.06 | $-202.09 | 34 | 74% | $1098.51 | 9 |
| mm_tight | **$10772.45** | $947.21 | $-174.76 | 495 | 54% | $738.11 | 8 |
| mid_momentum | **$10745.97** | $715.23 | $30.74 | 271 | 56% | $501.75 | 25 |
| copy_pro | **$10562.83** | $248.91 | $313.92 | 457 | 53% | $-601.09 | 18 |
| mm_cheap | **$10269.19** | $357.4 | $-88.21 | 93 | 57% | $174.94 | 25 |
| super | **$10141.38** | $-47.05 | $188.43 | 94 | 52% | $-328.95 | 2 |
| fade_longshot | **$10076.56** | $89.44 | $-12.88 | 152 | 95% | $78.7 | 25 |
| mm_sports | **$10048.86** | $264.93 | $-216.07 | 588 | 55% | $45.8 | 9 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9967.28** | $156.38 | $-189.1 | 212 | 54% | $-52.72 | 4 |
| maker_flat | **$9961.97** | $-104.96 | $66.93 | 14 | 50% | $-296.51 | 25 |
| copy_top | **$9806.92** | $-296.2 | $103.12 | 474 | 53% | $-1624.77 | 15 |
| mid_momentum_v2 | **$9520.79** | $-509.95 | $30.74 | 106 | 51% | $-700.77 | 25 |
| mm_cheap_v2 | **$9419.55** | $-492.24 | $-88.21 | 110 | 52% | $-683.06 | 25 |
| strong_dip | **$9318.64** | $-584.11 | $-97.25 | 146 | 60% | $-676.42 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9123.28** | $-745.67 | $-131.05 | 149 | 53% | $-949.62 | 25 |
| random_control | **$8923.02** | $-998.71 | $-78.27 | 184 | 56% | $-1613 | 25 |
| mm_sports_v2 | **$8819.55** | $-964.38 | $-216.07 | 157 | 52% | $-1183.51 | 9 |
| mm_slow | **$8679.09** | $-1337.81 | $16.9 | 106 | 50% | $-1523.52 | 25 |
| momentum | **$7378.82** | $-2533.86 | $-87.32 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5838.14** | $-3911.3 | $-250.56 | 475 | 46% | $-4265.85 | 15 |
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

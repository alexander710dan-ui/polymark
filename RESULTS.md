# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 88278 · Last run: 2026-11-02T12:31:58.905Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11878.8** | $1766.37 | $112.43 | 508 | 54% | $916.37 | 25 |
| maker_sports | **$11125.84** | $959.55 | $166.29 | 140 | 57% | $747.05 | 8 |
| mid_momentum | **$10710.01** | $627.56 | $82.45 | 305 | 56% | $414.08 | 25 |
| mm_tight | **$10442.61** | $392.5 | $50.11 | 588 | 53% | $183.4 | 6 |
| maker_flat | **$10398.48** | $418.58 | $-20.1 | 37 | 54% | $227.03 | 24 |
| mm_max | **$10219.82** | $313.97 | $-94.15 | 240 | 53% | $104.87 | 3 |
| fade_longshot | **$10010.99** | $-25.49 | $36.48 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9993.43** | $71.35 | $-77.92 | 138 | 54% | $-120.34 | 25 |
| conviction | **$9685.37** | $-306.99 | $-7.64 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9484.83** | $-597.62 | $82.45 | 140 | 51% | $-790.17 | 25 |
| mm_sports | **$9285.25** | $-848.04 | $133.29 | 697 | 54% | $-1067.17 | 8 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9143.79** | $-778.29 | $-77.92 | 155 | 51% | $-969.98 | 25 |
| strong_dip | **$9135.09** | $-892.34 | $27.43 | 173 | 59% | $-985.97 | 22 |
| mm_strong | **$9068.72** | $-782.82 | $-148.46 | 185 | 53% | $-986.77 | 25 |
| random_control | **$8914.49** | $-899.06 | $-186.45 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8700.49** | $-1046.87 | $-252.64 | 122 | 51% | $-1246.55 | 25 |
| super | **$8604.89** | $-1375.81 | $-19.3 | 128 | 50% | $-1657.71 | 2 |
| copy_top | **$8568.74** | $-1193.93 | $-237.33 | 541 | 52% | $-2522.5 | 25 |
| mm_sports_v2 | **$8055.94** | $-2077.35 | $133.29 | 266 | 50% | $-2296.48 | 8 |
| momentum | **$7031.93** | $-2788.51 | $-179.56 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6857.35** | $-3176.85 | $34.2 | 540 | 47% | $-3628.31 | 25 |
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
| maker_flat | 61 | 0 | 0 | 100% | 2.73¢ |
| maker_sports | 148 | 1 | 0 | 99% | 1.39¢ |

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

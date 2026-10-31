# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83082 · Last run: 2026-10-31T22:19:30.418Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11444.04** | $1350.53 | $93.51 | 488 | 53% | $500.53 | 25 |
| maker_sports | **$11247.4** | $1186.9 | $60.5 | 88 | 59% | $974.4 | 7 |
| mid_momentum | **$10898.49** | $778.16 | $120.33 | 291 | 56% | $564.68 | 25 |
| mm_tight | **$10688.03** | $654.6 | $33.43 | 543 | 53% | $445.5 | 6 |
| mm_cheap | **$10332.83** | $384.19 | $-51.36 | 117 | 56% | $192.5 | 24 |
| mm_max | **$10272.09** | $271.77 | $0.32 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10129.08** | $140.79 | $-11.71 | 28 | 50% | $-50.76 | 25 |
| fade_longshot | **$9945.25** | $-70.35 | $15.6 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9689.37** | $-306.99 | $-3.64 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9673.31** | $-447.02 | $120.33 | 126 | 51% | $-639.57 | 25 |
| mm_strong | **$9515.65** | $-335.06 | $-149.29 | 169 | 54% | $-539.01 | 24 |
| mm_cheap_v2 | **$9483.19** | $-465.45 | $-51.36 | 134 | 51% | $-657.14 | 24 |
| mm_sports | **$9437.74** | $-599.22 | $36.96 | 642 | 54% | $-818.35 | 7 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9208.7** | $-768.54 | $-22.76 | 509 | 52% | $-2097.11 | 25 |
| random_control | **$9028.82** | $-794.17 | $-177.01 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8880.92** | $-1007.21 | $-111.87 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8879.61** | $-1022.63 | $-97.76 | 161 | 58% | $-1116.26 | 22 |
| super | **$8816.61** | $-1198.33 | $14.94 | 118 | 50% | $-1480.23 | 7 |
| mm_sports_v2 | **$8208.43** | $-1828.53 | $36.96 | 211 | 50% | $-2047.66 | 7 |
| momentum | **$7257.01** | $-2644.98 | $-98.01 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6706.37** | $-2947.22 | $-346.41 | 510 | 47% | $-3398.68 | 25 |
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
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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

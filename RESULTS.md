# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72943 · Last run: 2026-10-30T00:34:00.360Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11197.69** | $1274.23 | $-76.54 | 28 | 79% | $1082.68 | 10 |
| mid_momentum | **$10903.28** | $776.07 | $127.21 | 269 | 57% | $562.59 | 25 |
| copy_pro | **$10884.68** | $964.2 | $-79.52 | 447 | 53% | $114.2 | 25 |
| mm_tight | **$10791.48** | $1007.29 | $-215.81 | 489 | 54% | $798.19 | 8 |
| mm_cheap | **$10434.12** | $229.69 | $204.43 | 89 | 56% | $47.23 | 25 |
| mm_max | **$10150.82** | $259.03 | $-108.21 | 211 | 54% | $49.93 | 2 |
| super | **$10087.77** | $-424.16 | $511.93 | 92 | 51% | $-688.49 | 4 |
| maker_flat | **$10040.13** | $-107 | $147.13 | 13 | 46% | $-298.55 | 25 |
| mm_sports | **$10004.06** | $100.55 | $-96.49 | 581 | 55% | $-118.58 | 11 |
| fade_longshot | **$10002.02** | $89.44 | $-87.42 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum_v2 | **$9678.1** | $-449.11 | $127.21 | 104 | 51% | $-639.93 | 25 |
| copy_top | **$9636.95** | $-342.79 | $-20.26 | 462 | 53% | $-1671.36 | 23 |
| mm_cheap_v2 | **$9584.48** | $-619.95 | $204.43 | 106 | 51% | $-810.77 | 25 |
| mm_strong | **$9385.33** | $-927.98 | $313.31 | 147 | 52% | $-1131.93 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9137.88** | $-555.62 | $-306.5 | 144 | 60% | $-647.93 | 20 |
| mm_slow | **$9023.32** | $-1337.81 | $361.13 | 106 | 50% | $-1523.52 | 25 |
| mm_sports_v2 | **$8774.75** | $-1128.76 | $-96.49 | 150 | 52% | $-1347.89 | 11 |
| random_control | **$8653.48** | $-1294.96 | $-51.56 | 183 | 56% | $-1909.25 | 25 |
| momentum | **$7396.85** | $-2533.86 | $-69.29 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6047.93** | $-3883.02 | $-69.05 | 463 | 46% | $-4237.57 | 23 |
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
| maker_sports | 38 | 1 | 0 | 97% | 1.57¢ |

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

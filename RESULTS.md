# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 73160 · Last run: 2026-10-30T01:24:05.179Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11169.28** | $1274.23 | $-104.95 | 28 | 79% | $1082.68 | 12 |
| mid_momentum | **$10877.75** | $776.07 | $101.68 | 269 | 57% | $562.59 | 25 |
| mm_tight | **$10852.79** | $1007.29 | $-154.5 | 489 | 54% | $798.19 | 11 |
| copy_pro | **$10711.35** | $964.2 | $-252.85 | 447 | 53% | $114.2 | 25 |
| mm_cheap | **$10374.66** | $229.69 | $144.97 | 89 | 56% | $47.23 | 25 |
| mm_sports | **$10150.77** | $100.55 | $50.22 | 581 | 55% | $-118.58 | 13 |
| super | **$10150.18** | $-424.16 | $574.34 | 92 | 51% | $-688.49 | 4 |
| mm_max | **$10135.67** | $259.03 | $-123.36 | 211 | 54% | $49.93 | 3 |
| fade_longshot | **$10061.81** | $89.44 | $-27.63 | 152 | 95% | $78.7 | 25 |
| maker_flat | **$10040.74** | $-104.96 | $145.7 | 14 | 50% | $-296.51 | 24 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum_v2 | **$9652.57** | $-449.11 | $101.68 | 104 | 51% | $-639.93 | 25 |
| copy_top | **$9583.13** | $-342.79 | $-74.08 | 462 | 53% | $-1671.36 | 24 |
| mm_cheap_v2 | **$9525.02** | $-619.95 | $144.97 | 106 | 51% | $-810.77 | 25 |
| mm_strong | **$9282.06** | $-927.98 | $210.04 | 147 | 52% | $-1131.93 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9150.2** | $-555.62 | $-294.18 | 144 | 60% | $-647.93 | 21 |
| random_control | **$8971.48** | $-1294.96 | $266.44 | 183 | 56% | $-1909.25 | 25 |
| mm_sports_v2 | **$8921.46** | $-1128.76 | $50.22 | 150 | 52% | $-1347.89 | 13 |
| mm_slow | **$8799.86** | $-1337.81 | $137.67 | 106 | 50% | $-1523.52 | 25 |
| momentum | **$7410.79** | $-2533.86 | $-55.35 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6176.72** | $-3883.02 | $59.74 | 463 | 46% | $-4237.57 | 24 |
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

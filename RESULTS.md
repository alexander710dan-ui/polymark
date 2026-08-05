# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32709 · Last run: 2026-08-05T22:55:18.299Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10522.44** | $833.04 | $-310.6 | 401 | 54% | $630.01 | 18 |
| mm_cheap | **$10482.65** | $787.82 | $-305.17 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10481.69** | $663.13 | $-181.44 | 210 | 57% | $449.65 | 25 |
| mm_cheap_v2 | **$10035.26** | $-61.25 | $96.51 | 24 | 54% | $-173.17 | 25 |
| super | **$10016.3** | $-306.37 | $322.67 | 74 | 49% | $-522.22 | 14 |
| fade_longshot | **$9846.12** | $25.97 | $-179.85 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9841.77** | $-386.57 | $228.34 | 417 | 52% | $-1715.14 | 25 |
| copy_pro | **$9697.31** | $-797.13 | $494.44 | 397 | 51% | $-1647.13 | 25 |
| mid_momentum_v2 | **$9690.92** | $-204.32 | $-104.76 | 24 | 50% | $-316.24 | 25 |
| strong_dip | **$9524.75** | $-459.3 | $-15.95 | 104 | 60% | $-551.61 | 25 |
| mm_max | **$9478.66** | $-392.15 | $-129.19 | 175 | 53% | $-559.27 | 5 |
| mm_sports | **$9466.86** | $-210.19 | $-322.95 | 470 | 55% | $-429.32 | 24 |
| ai_judge | **$9350.65** | $-587.64 | $-61.71 | 7 | 14% | $-600 | 2 |
| random_control | **$8989.48** | $-1100.59 | $90.07 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8773.84** | $-648.67 | $-577.49 | 59 | 51% | $-834.38 | 25 |
| maker_flat | **$8522.84** | $-1249 | $-228.16 | 85 | 41% | $-1443.12 | 19 |
| mm_strong | **$8481.49** | $-1008.46 | $-510.05 | 85 | 47% | $-1212.41 | 25 |
| mm_sports_v2 | **$8249.46** | $-1370.81 | $-379.73 | 38 | 37% | $-1496.83 | 23 |
| momentum | **$8117.65** | $-1242.52 | $-639.83 | 264 | 67% | $-1730.76 | 25 |
| maker_sports | **$7778.37** | $-1798.15 | $-423.48 | 155 | 48% | $-2001.18 | 16 |
| whale_fade | **$6905.92** | $-2534.9 | $-559.18 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.26** | $-931.5 | $-69.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.49** | $-4791.55 | $-104.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 104 | 68 | 0 | 60% | 2.96¢ |
| maker_sports | 171 | 108 | 5 | 61% | 1.57¢ |

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

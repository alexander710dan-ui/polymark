# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69462 · Last run: 2026-10-29T10:52:42.135Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10192.31** | $259.9 | $-67.59 | 2 | 100% | $68.35 | 7 |
| mm_tight | **$10169.82** | $309.6 | $-139.78 | 470 | 53% | $100.5 | 2 |
| copy_pro | **$10140.41** | $68.12 | $72.29 | 430 | 52% | $-781.88 | 13 |
| maker_sports | **$10114.75** | $259.9 | $-145.15 | 2 | 100% | $68.35 | 3 |
| fade_longshot | **$10073.73** | $77.06 | $-3.33 | 150 | 95% | $66.32 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$9775.49** | $-218.44 | $-6.07 | 134 | 62% | $-310.75 | 3 |
| mid_momentum | **$9760.23** | $-20.51 | $-219.26 | 243 | 55% | $-233.99 | 11 |
| mm_max | **$9648.52** | $-211.59 | $-139.89 | 201 | 53% | $-420.69 | 2 |
| copy_top | **$9597.72** | $-398.51 | $-3.77 | 450 | 53% | $-1727.08 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9288.12** | $-555.12 | $-156.76 | 64 | 50% | $-732.9 | 8 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8905.55** | $-946.64 | $-147.81 | 554 | 54% | $-1165.77 | 3 |
| random_control | **$8740.35** | $-1186 | $-73.65 | 175 | 56% | $-1800.29 | 25 |
| mid_momentum_v2 | **$8535.05** | $-1245.69 | $-219.26 | 78 | 44% | $-1436.51 | 11 |
| mm_cheap_v2 | **$8438.48** | $-1404.76 | $-156.76 | 81 | 44% | $-1595.58 | 8 |
| mm_strong | **$8190.78** | $-1648.32 | $-160.9 | 121 | 47% | $-1852.27 | 9 |
| mm_slow | **$7812.82** | $-1967.92 | $-219.26 | 89 | 45% | $-2153.63 | 11 |
| mm_sports_v2 | **$7676.24** | $-2175.95 | $-147.81 | 123 | 46% | $-2395.08 | 3 |
| momentum | **$7402.6** | $-2548.15 | $-49.25 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6228.01** | $-3759.78 | $-12.21 | 451 | 46% | $-4114.33 | 5 |
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
| maker_flat | 9 | 0 | 0 | 100% | 2.74¢ |
| maker_sports | 5 | 0 | 0 | 100% | 2.14¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91531 · Last run: 2026-11-04T07:25:19.141Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12473.43** | $2368.14 | $105.29 | 519 | 55% | $1518.14 | 16 |
| mm_cheap | **$11849.12** | $925.99 | $923.13 | 150 | 55% | $706.17 | 22 |
| mid_momentum | **$11683.38** | $1092.98 | $590.4 | 324 | 56% | $873.16 | 24 |
| maker_sports | **$11542.71** | $974.11 | $568.6 | 229 | 56% | $740.78 | 8 |
| maker_flat | **$11495.03** | $209.78 | $1285.25 | 62 | 50% | $15.66 | 20 |
| mm_tight | **$11330.46** | $1000.21 | $330.25 | 664 | 54% | $781.08 | 8 |
| mm_cheap_v2 | **$10999.48** | $76.35 | $923.13 | 167 | 52% | $-143.47 | 22 |
| mid_momentum_v2 | **$10458.2** | $-132.2 | $590.4 | 159 | 51% | $-352.02 | 24 |
| mm_max | **$10203.57** | $-132.24 | $335.81 | 276 | 53% | $-341.34 | 6 |
| mm_slow | **$10074.12** | $-501.47 | $575.59 | 145 | 52% | $-710.57 | 25 |
| mm_strong | **$10038.69** | $-736.54 | $775.23 | 220 | 53% | $-940.49 | 23 |
| fade_longshot | **$9884.66** | $-184.38 | $69.04 | 183 | 94% | $-195.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9351.76** | $-1159.82 | $511.58 | 789 | 54% | $-1378.95 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8701.97** | $-883.61 | $-414.42 | 203 | 59% | $-977.24 | 23 |
| super | **$8577.21** | $-1572.64 | $149.85 | 132 | 50% | $-1854.54 | 1 |
| copy_top | **$8441.36** | $-1350.83 | $-207.81 | 551 | 52% | $-2679.4 | 17 |
| mm_sports_v2 | **$8122.45** | $-2389.13 | $511.58 | 358 | 51% | $-2608.26 | 9 |
| random_control | **$7826.34** | $-1364.71 | $-808.95 | 197 | 54% | $-1979 | 25 |
| momentum | **$7520.62** | $-2316.54 | $-162.84 | 319 | 65% | $-2804.78 | 25 |
| whale_fade | **$7075.64** | $-3344.85 | $420.49 | 548 | 47% | $-3796.31 | 19 |
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
| maker_flat | 82 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 237 | 1 | 0 | 100% | 1.32¢ |

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

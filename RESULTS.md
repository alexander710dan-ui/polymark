# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 85602 · Last run: 2026-11-01T17:30:09.450Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11698.3** | $1516.04 | $182.26 | 496 | 54% | $666.04 | 25 |
| maker_sports | **$11464.27** | $1591.58 | $-127.31 | 102 | 61% | $1379.08 | 7 |
| mid_momentum | **$10768.26** | $760.42 | $7.84 | 297 | 56% | $546.94 | 25 |
| mm_tight | **$10719.02** | $830.25 | $-111.23 | 553 | 54% | $621.15 | 5 |
| mm_cheap | **$10325.39** | $482.82 | $-157.43 | 125 | 56% | $291.13 | 25 |
| maker_flat | **$10302.64** | $303.95 | $-1.31 | 29 | 52% | $112.4 | 25 |
| mm_max | **$10209.49** | $319.37 | $-109.88 | 230 | 54% | $110.27 | 2 |
| fade_longshot | **$9997.41** | $-49.11 | $46.52 | 167 | 95% | $-59.85 | 25 |
| conviction | **$9692.79** | $-306.99 | $-0.22 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9574.76** | $-276.04 | $-149.2 | 656 | 55% | $-495.17 | 7 |
| mid_momentum_v2 | **$9543.08** | $-464.76 | $7.84 | 132 | 51% | $-657.31 | 25 |
| mm_cheap_v2 | **$9475.75** | $-366.82 | $-157.43 | 142 | 52% | $-558.51 | 25 |
| mm_strong | **$9375.06** | $-348.45 | $-276.49 | 174 | 54% | $-552.4 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9178.73** | $-848.93 | $27.66 | 519 | 52% | $-2177.5 | 25 |
| strong_dip | **$9080.3** | $-963.24 | $43.54 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8967.91** | $-899.06 | $-133.03 | 190 | 55% | $-1513.35 | 25 |
| super | **$8926.19** | $-1150.21 | $76.4 | 123 | 50% | $-1432.11 | 3 |
| mm_slow | **$8673.47** | $-1007.21 | $-319.32 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8345.45** | $-1505.35 | $-149.2 | 225 | 52% | $-1724.48 | 7 |
| momentum | **$7212.7** | $-2740.4 | $-46.9 | 306 | 65% | $-3228.64 | 25 |
| whale_fade | **$6389.69** | $-3089.37 | $-520.94 | 520 | 47% | $-3540.83 | 25 |
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
| maker_flat | 54 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 109 | 1 | 0 | 99% | 1.41¢ |

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

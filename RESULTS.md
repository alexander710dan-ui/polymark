# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33541 · Last run: 2026-08-06T06:38:53.950Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10484.57** | $431.69 | $52.88 | 430 | 53% | $222.59 | 7 |
| mm_cheap | **$10353.61** | $685.62 | $-332.01 | 37 | 62% | $507.84 | 25 |
| super | **$10335.8** | $46.83 | $288.97 | 79 | 51% | $-217.5 | 11 |
| mid_momentum | **$10329.24** | $559.07 | $-229.83 | 215 | 56% | $345.59 | 25 |
| copy_top | **$10130.12** | $-117.05 | $247.17 | 424 | 52% | $-1445.62 | 20 |
| mid_momentum_v2 | **$9866.35** | $50.78 | $-184.43 | 42 | 52% | $-140.04 | 24 |
| fade_longshot | **$9858.55** | $25.97 | $-167.42 | 123 | 95% | $15.23 | 25 |
| mm_cheap_v2 | **$9854.5** | $26.36 | $-171.86 | 46 | 54% | $-164.46 | 20 |
| mm_sports | **$9802.07** | $-218.44 | $20.51 | 506 | 55% | $-437.57 | 8 |
| copy_pro | **$9711.84** | $-816.24 | $528.08 | 403 | 51% | $-1666.24 | 24 |
| mm_max | **$9655.51** | $-344.49 | $0 | 193 | 53% | $-553.59 | 0 |
| strong_dip | **$9546.42** | $-596.83 | $143.25 | 107 | 59% | $-689.14 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| random_control | **$9032.95** | $-1085.22 | $118.17 | 146 | 56% | $-1699.51 | 25 |
| maker_flat | **$8662.59** | $-1090.97 | $-246.44 | 94 | 43% | $-1285.09 | 17 |
| mm_slow | **$8646.43** | $-809.59 | $-543.98 | 62 | 50% | $-995.3 | 25 |
| mm_sports_v2 | **$8535.87** | $-1523.94 | $59.81 | 76 | 45% | $-1743.07 | 6 |
| mm_strong | **$8318.93** | $-1125.11 | $-555.96 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$7991.3** | $-1376.42 | $-632.28 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7806.37** | $-2266.68 | $73.05 | 185 | 48% | $-2469.71 | 5 |
| whale_fade | **$6615.41** | $-2848.81 | $-535.78 | 425 | 47% | $-3203.36 | 20 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.75** | $-931.5 | $-71.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5102.37** | $-4791.55 | $-106.08 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 111 | 76 | 0 | 59% | 2.95¢ |
| maker_sports | 190 | 121 | 0 | 61% | 1.55¢ |

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

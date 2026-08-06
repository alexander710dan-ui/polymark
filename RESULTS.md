# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34178 · Last run: 2026-08-06T12:33:18.033Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10360.48** | $46.83 | $313.65 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10269.81** | $559.07 | $-289.26 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10239.34** | $685.62 | $-446.28 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10038.01** | $-117.05 | $155.06 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$10022.36** | $506.12 | $-483.76 | 439 | 54% | $297.02 | 19 |
| fade_longshot | **$9854.1** | $25.97 | $-171.87 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9757.02** | $-242.96 | $-0.02 | 194 | 53% | $-452.06 | 2 |
| strong_dip | **$9615.91** | $-517.26 | $133.17 | 108 | 59% | $-609.57 | 25 |
| copy_pro | **$9556.12** | $-919.79 | $475.91 | 404 | 51% | $-1769.79 | 25 |
| mid_momentum_v2 | **$9555.1** | $-52.91 | $-391.99 | 47 | 51% | $-243.73 | 25 |
| ai_judge | **$9388** | $-587.64 | $-24.36 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9383.73** | $-220.68 | $-395.59 | 52 | 52% | $-411.5 | 25 |
| random_control | **$9142.49** | $-1085.22 | $227.71 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$9095.69** | $-202.25 | $-702.06 | 517 | 55% | $-421.38 | 24 |
| mm_slow | **$8666.93** | $-809.59 | $-523.48 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8481.91** | $-1190.97 | $-327.12 | 95 | 42% | $-1385.09 | 18 |
| mm_strong | **$8250.73** | $-1227.41 | $-521.86 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7869.22** | $-1376.42 | $-754.36 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7839.16** | $-1507.75 | $-653.09 | 87 | 47% | $-1726.88 | 22 |
| maker_sports | **$6885.02** | $-2466.04 | $-648.94 | 191 | 47% | $-2669.07 | 16 |
| whale_fade | **$6699.92** | $-2848.81 | $-451.27 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.6** | $-931.5 | $-73.9 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8529.58** | $-1937.09 | $466.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5083.78** | $-4791.55 | $-124.67 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 113 | 81 | 3 | 58% | 2.93¢ |
| maker_sports | 207 | 128 | 5 | 62% | 1.57¢ |

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

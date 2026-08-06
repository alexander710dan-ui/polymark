# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34325 · Last run: 2026-08-06T13:54:51.095Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10330.61** | $46.83 | $283.78 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10300.55** | $456.72 | $-156.17 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10266.92** | $583.27 | $-316.35 | 38 | 61% | $405.49 | 25 |
| copy_top | **$10007.87** | $-117.05 | $124.92 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9914.75** | $144.27 | $-229.52 | 444 | 53% | $-64.83 | 20 |
| fade_longshot | **$9862.08** | $25.97 | $-163.89 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9842.74** | $-919.79 | $762.53 | 404 | 51% | $-1769.79 | 25 |
| mm_max | **$9766.98** | $-242.96 | $9.94 | 194 | 53% | $-452.06 | 5 |
| strong_dip | **$9630.18** | $-517.26 | $147.44 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9590.53** | $-217.42 | $-192.05 | 50 | 50% | $-408.24 | 25 |
| mm_cheap_v2 | **$9431.15** | $-424.59 | $-144.26 | 54 | 50% | $-615.41 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9140.99** | $-979.49 | $120.48 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8884.98** | $-564.1 | $-550.92 | 522 | 55% | $-783.23 | 25 |
| mm_slow | **$8649.51** | $-809.59 | $-540.9 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8341.76** | $-1290.97 | $-367.27 | 96 | 42% | $-1485.09 | 21 |
| mm_strong | **$8230.21** | $-1227.41 | $-542.38 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7934.23** | $-1478.77 | $-587 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7678.29** | $-1869.6 | $-452.11 | 92 | 46% | $-2088.73 | 25 |
| maker_sports | **$6756.51** | $-2816.79 | $-426.7 | 196 | 46% | $-3019.82 | 16 |
| whale_fade | **$6696.33** | $-2848.81 | $-454.86 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 117 | 83 | 3 | 59% | 2.91¢ |
| maker_sports | 212 | 133 | 5 | 61% | 1.58¢ |

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

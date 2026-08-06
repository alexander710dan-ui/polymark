# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34277 · Last run: 2026-08-06T13:28:23.335Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10338.37** | $46.83 | $291.54 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10316.58** | $456.72 | $-140.14 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10291.09** | $583.27 | $-292.18 | 38 | 61% | $405.49 | 25 |
| copy_top | **$10012.57** | $-117.05 | $129.62 | 424 | 52% | $-1445.62 | 25 |
| fade_longshot | **$9855.45** | $25.97 | $-170.52 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9844.24** | $-919.79 | $764.03 | 404 | 51% | $-1769.79 | 25 |
| mm_tight | **$9813.65** | $98.81 | $-285.16 | 443 | 53% | $-110.29 | 19 |
| mm_max | **$9715.59** | $-242.96 | $-41.45 | 194 | 53% | $-452.06 | 4 |
| strong_dip | **$9626.55** | $-517.26 | $143.81 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9525.33** | $-217.42 | $-257.25 | 50 | 50% | $-408.24 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9372.52** | $-424.59 | $-202.89 | 54 | 50% | $-615.41 | 25 |
| random_control | **$9156.34** | $-979.49 | $135.83 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8894.43** | $-609.56 | $-496.01 | 521 | 55% | $-828.69 | 25 |
| mm_slow | **$8663.17** | $-809.59 | $-527.24 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8386.51** | $-1290.97 | $-322.52 | 96 | 42% | $-1485.09 | 19 |
| mm_strong | **$8233.11** | $-1227.41 | $-539.48 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7925.28** | $-1478.77 | $-595.95 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7627.63** | $-1915.06 | $-457.31 | 91 | 45% | $-2134.19 | 24 |
| whale_fade | **$6728.24** | $-2848.81 | $-422.95 | 425 | 47% | $-3203.36 | 25 |
| maker_sports | **$6698.52** | $-2866.04 | $-435.44 | 195 | 46% | $-3069.07 | 16 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.61** | $-931.5 | $-73.89 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 115 | 83 | 2 | 58% | 2.93¢ |
| maker_sports | 211 | 133 | 5 | 61% | 1.59¢ |

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

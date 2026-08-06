# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34262 · Last run: 2026-08-06T13:19:47.774Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10346.76** | $46.83 | $299.93 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10330.14** | $456.72 | $-126.58 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10299.26** | $583.27 | $-284.01 | 38 | 61% | $405.49 | 25 |
| copy_top | **$10020.55** | $-117.05 | $137.6 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9871.72** | $98.81 | $-227.09 | 443 | 53% | $-110.29 | 19 |
| fade_longshot | **$9850.94** | $25.97 | $-175.03 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9850.75** | $-919.79 | $770.54 | 404 | 51% | $-1769.79 | 25 |
| mm_max | **$9753.45** | $-242.96 | $-3.59 | 194 | 53% | $-452.06 | 4 |
| strong_dip | **$9623.3** | $-517.26 | $140.56 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9531.25** | $-217.42 | $-251.33 | 50 | 50% | $-408.24 | 25 |
| mm_cheap_v2 | **$9390.08** | $-424.59 | $-185.33 | 54 | 50% | $-615.41 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9149.67** | $-979.49 | $129.16 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8969.48** | $-609.56 | $-420.96 | 521 | 55% | $-828.69 | 25 |
| mm_slow | **$8675.89** | $-809.59 | $-514.52 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8425.54** | $-1290.97 | $-283.49 | 96 | 42% | $-1485.09 | 19 |
| mm_strong | **$8250.38** | $-1227.41 | $-522.21 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7919.25** | $-1478.77 | $-601.98 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7719.93** | $-1915.06 | $-365.01 | 91 | 45% | $-2134.19 | 24 |
| maker_sports | **$6770.27** | $-2866.04 | $-363.69 | 195 | 46% | $-3069.07 | 15 |
| whale_fade | **$6726.09** | $-2848.81 | $-425.1 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.61** | $-931.5 | $-73.89 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 115 | 82 | 3 | 58% | 2.93¢ |
| maker_sports | 210 | 132 | 6 | 61% | 1.59¢ |

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

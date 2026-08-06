# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34204 · Last run: 2026-08-06T12:47:44.417Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10365.01** | $46.83 | $318.18 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10275.01** | $559.07 | $-284.06 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10240.85** | $685.62 | $-444.77 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10038.71** | $-117.05 | $155.76 | 424 | 52% | $-1445.62 | 25 |
| fade_longshot | **$9852.33** | $25.97 | $-173.64 | 123 | 95% | $15.23 | 25 |
| mm_tight | **$9837.31** | $302.96 | $-465.65 | 441 | 53% | $93.86 | 18 |
| mm_max | **$9757.02** | $-242.96 | $-0.02 | 194 | 53% | $-452.06 | 2 |
| strong_dip | **$9618.18** | $-517.26 | $135.44 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9519.65** | $-115.07 | $-365.28 | 49 | 51% | $-305.89 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9354.96** | $-322.24 | $-322.8 | 53 | 51% | $-513.06 | 25 |
| copy_pro | **$9273.2** | $-919.79 | $192.99 | 404 | 51% | $-1769.79 | 25 |
| random_control | **$9138.81** | $-1085.22 | $224.03 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$8915.75** | $-405.41 | $-678.84 | 519 | 55% | $-624.54 | 24 |
| mm_slow | **$8674.26** | $-809.59 | $-516.15 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8533.46** | $-1190.97 | $-275.57 | 95 | 42% | $-1385.09 | 18 |
| mm_strong | **$8258.05** | $-1227.41 | $-514.54 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7859.37** | $-1376.42 | $-764.21 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7658.57** | $-1710.91 | $-630.52 | 89 | 46% | $-1930.04 | 22 |
| maker_sports | **$6755.27** | $-2666.04 | $-578.69 | 193 | 47% | $-2869.07 | 15 |
| whale_fade | **$6697.93** | $-2848.81 | $-453.26 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8995.09** | $-931.5 | $-73.41 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 113 | 81 | 3 | 58% | 2.93¢ |
| maker_sports | 208 | 129 | 6 | 62% | 1.58¢ |

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

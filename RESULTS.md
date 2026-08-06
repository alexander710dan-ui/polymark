# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34202 · Last run: 2026-08-06T12:46:32.960Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10363.15** | $46.83 | $316.32 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10273.95** | $559.07 | $-285.12 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10239.81** | $685.62 | $-445.81 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10036.95** | $-117.05 | $154 | 424 | 52% | $-1445.62 | 25 |
| fade_longshot | **$9852.76** | $25.97 | $-173.21 | 123 | 95% | $15.23 | 25 |
| mm_tight | **$9839.13** | $404.71 | $-565.58 | 440 | 53% | $195.61 | 19 |
| mm_max | **$9757.02** | $-242.96 | $-0.02 | 194 | 53% | $-452.06 | 2 |
| strong_dip | **$9618.68** | $-517.26 | $135.94 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9524.72** | $-154.47 | $-320.81 | 48 | 50% | $-345.29 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9357.44** | $-322.24 | $-320.32 | 53 | 51% | $-513.06 | 25 |
| copy_pro | **$9271.68** | $-919.79 | $191.47 | 404 | 51% | $-1769.79 | 25 |
| random_control | **$9139.3** | $-1085.22 | $224.52 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$8917.58** | $-303.66 | $-778.76 | 518 | 55% | $-522.79 | 25 |
| mm_slow | **$8673.49** | $-809.59 | $-516.92 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8535.84** | $-1190.97 | $-273.19 | 95 | 42% | $-1385.09 | 18 |
| mm_strong | **$8260.18** | $-1227.41 | $-512.41 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7859.79** | $-1376.42 | $-763.79 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7660.39** | $-1609.16 | $-730.45 | 88 | 47% | $-1828.29 | 23 |
| maker_sports | **$6755.35** | $-2566.04 | $-678.61 | 192 | 47% | $-2769.07 | 16 |
| whale_fade | **$6698.44** | $-2848.81 | $-452.75 | 425 | 47% | $-3203.36 | 25 |
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

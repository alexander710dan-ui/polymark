# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34445 · Last run: 2026-08-06T15:02:30.062Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10312.19** | $46.83 | $265.36 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10287.87** | $456.72 | $-168.85 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10262.54** | $583.27 | $-320.73 | 38 | 61% | $405.49 | 25 |
| mm_tight | **$10225.87** | $-12.88 | $238.75 | 449 | 53% | $-221.98 | 20 |
| copy_top | **$9982.63** | $-219.6 | $202.23 | 425 | 52% | $-1548.17 | 25 |
| mm_max | **$9947.06** | $-242.96 | $190.02 | 194 | 53% | $-452.06 | 6 |
| fade_longshot | **$9864.29** | $25.97 | $-161.68 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9794.74** | $-1073.61 | $868.35 | 405 | 51% | $-1923.61 | 25 |
| mid_momentum_v2 | **$9736.01** | $-174.04 | $-89.95 | 51 | 51% | $-364.86 | 25 |
| strong_dip | **$9635.81** | $-517.26 | $153.07 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9579.07** | $-381.21 | $-39.72 | 55 | 51% | $-572.03 | 25 |
| ai_judge | **$9371.5** | $-587.64 | $-40.86 | 7 | 14% | $-600 | 2 |
| random_control | **$9140.07** | $-979.49 | $119.56 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$9046.61** | $-882.77 | $-70.62 | 530 | 54% | $-1101.9 | 23 |
| mm_slow | **$8638.43** | $-809.59 | $-551.98 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8350.91** | $-1290.97 | $-358.12 | 96 | 42% | $-1485.09 | 22 |
| mm_strong | **$8297.99** | $-1184.03 | $-517.98 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7930.35** | $-1478.77 | $-590.88 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7873.92** | $-2188.17 | $62.09 | 100 | 45% | $-2407.3 | 22 |
| maker_sports | **$6835.77** | $-3120.71 | $-43.52 | 201 | 46% | $-3323.74 | 15 |
| whale_fade | **$6720.93** | $-2758.9 | $-520.17 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8995.87** | $-931.5 | $-72.63 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 118 | 84 | 1 | 58% | 2.9¢ |
| maker_sports | 216 | 135 | 5 | 62% | 1.59¢ |

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

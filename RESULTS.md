# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29945 · Last run: 2026-08-04T21:07:28.746Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11571.96** | $1240.35 | $331.61 | 333 | 55% | $1037.32 | 16 |
| mm_sports | **$11567.44** | $1344.78 | $222.66 | 383 | 56% | $1125.65 | 25 |
| mm_cheap | **$10385.6** | $1054.47 | $-668.87 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10378.3** | $862.6 | $-484.3 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10024.3** | $-193.36 | $217.66 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10016.8** | $-588.91 | $605.71 | 381 | 51% | $-1438.91 | 25 |
| mm_max | **$9961.39** | $-213.47 | $174.86 | 144 | 53% | $-380.59 | 4 |
| fade_longshot | **$9909.2** | $67.84 | $-158.64 | 110 | 95% | $57.1 | 25 |
| strong_dip | **$9719.06** | $-463.45 | $182.51 | 99 | 60% | $-555.76 | 25 |
| super | **$9704.73** | $-592.35 | $297.08 | 69 | 46% | $-808.2 | 14 |
| maker_sports | **$9622.21** | $-840.78 | $462.99 | 86 | 49% | $-1026.49 | 12 |
| ai_judge | **$9393.73** | $-587.64 | $-18.63 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9180.96** | $-614.08 | $-204.96 | 54 | 43% | $-808.2 | 17 |
| mm_slow | **$9121.45** | $-468.35 | $-410.2 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8881.72** | $-752.77 | $-365.51 | 132 | 57% | $-1367.06 | 25 |
| mm_strong | **$8631.67** | $-924.82 | $-443.51 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8208.07** | $-1041.81 | $-750.12 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7052.99** | $-2370.75 | $-576.26 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9007.28** | $-931.5 | $-61.22 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8466.25** | $-1937.09 | $403.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5091.57** | $-4791.55 | $-116.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 71 | 43 | 3 | 62% | 2.94¢ |
| maker_sports | 98 | 61 | 7 | 62% | 1.52¢ |

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

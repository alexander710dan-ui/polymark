# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28759 · Last run: 2026-08-04T10:07:37.522Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10985.41** | $1115.92 | $-130.51 | 344 | 56% | $912.89 | 17 |
| mm_tight | **$10687.82** | $789.14 | $-101.32 | 299 | 54% | $586.11 | 10 |
| mm_cheap | **$10590.08** | $1054.47 | $-464.39 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10448.88** | $862.6 | $-413.72 | 201 | 58% | $649.12 | 25 |
| copy_top | **$9975.17** | $-129.92 | $105.09 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9971.66** | $55.61 | $-83.95 | 108 | 95% | $44.87 | 25 |
| strong_dip | **$9761.75** | $-463.45 | $225.2 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9746.7** | $-12.95 | $-240.35 | 29 | 48% | $-190.73 | 14 |
| copy_pro | **$9633.14** | $-725.28 | $358.42 | 376 | 51% | $-1575.28 | 25 |
| super | **$9605.74** | $-353.9 | $-40.36 | 64 | 47% | $-569.75 | 14 |
| ai_judge | **$9422.87** | $-587.64 | $10.51 | 7 | 14% | $-600 | 2 |
| mm_max | **$9408.85** | $-482.6 | $-108.55 | 124 | 52% | $-602.07 | 2 |
| maker_sports | **$9239.4** | $-538.86 | $-221.74 | 55 | 49% | $-724.57 | 11 |
| mm_slow | **$9167.2** | $-468.35 | $-364.45 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8899.44** | $-561.85 | $-538.71 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8591.99** | $-920.12 | $-487.89 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8297.58** | $-1041.81 | $-660.61 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7161.06** | $-2279.45 | $-559.49 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9393.25** | $-730.36 | $123.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.44** | $-942.24 | $-20.32 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8309.58** | $-1937.09 | $246.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5093.82** | $-4691.55 | $-214.63 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 43 | 29 | 1 | 60% | 3.06¢ |
| maker_sports | 66 | 38 | 2 | 63% | 1.61¢ |

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

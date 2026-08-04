# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29179 · Last run: 2026-08-04T14:01:17.041Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10874.2** | $807.61 | $66.59 | 351 | 56% | $604.58 | 21 |
| mm_cheap | **$10639.28** | $1054.47 | $-415.19 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10523.86** | $862.6 | $-338.74 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10389.31** | $379.69 | $9.62 | 303 | 53% | $176.66 | 16 |
| copy_top | **$9929.76** | $-129.92 | $59.68 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9887.3** | $55.61 | $-168.31 | 108 | 95% | $44.87 | 25 |
| super | **$9803.46** | $-507.95 | $311.41 | 65 | 46% | $-723.8 | 14 |
| copy_pro | **$9716.3** | $-725.28 | $441.58 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9672.76** | $-463.45 | $136.21 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9648.12** | $-370.45 | $18.57 | 36 | 44% | $-548.23 | 15 |
| ai_judge | **$9410.39** | $-587.64 | $-1.97 | 7 | 14% | $-600 | 2 |
| mm_max | **$9336.19** | $-789.2 | $125.39 | 127 | 50% | $-908.67 | 4 |
| mm_slow | **$9211.53** | $-468.35 | $-320.12 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9100.75** | $-561.85 | $-337.4 | 128 | 57% | $-1176.14 | 25 |
| maker_sports | **$9081.4** | $-900.33 | $-18.27 | 61 | 46% | $-1086.04 | 12 |
| mm_strong | **$8693.11** | $-920.12 | $-386.77 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8213.77** | $-1041.81 | $-744.42 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7356.05** | $-2279.45 | $-364.5 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9015.92** | $-942.24 | $-41.84 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8416.25** | $-1937.09 | $353.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 51 | 32 | 4 | 61% | 3.04¢ |
| maker_sports | 73 | 42 | 5 | 63% | 1.58¢ |

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

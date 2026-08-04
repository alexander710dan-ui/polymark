# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29163 · Last run: 2026-08-04T13:52:23.987Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10925.69** | $909.31 | $16.38 | 350 | 56% | $706.28 | 22 |
| mm_cheap | **$10618.47** | $1054.47 | $-436 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10506.35** | $862.6 | $-356.25 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10399.78** | $481.39 | $-81.61 | 302 | 53% | $278.36 | 16 |
| copy_top | **$9924.22** | $-129.92 | $54.14 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9897.65** | $55.61 | $-157.96 | 108 | 95% | $44.87 | 25 |
| super | **$9799.39** | $-507.95 | $307.34 | 65 | 46% | $-723.8 | 14 |
| copy_pro | **$9713.25** | $-725.28 | $438.53 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9684.94** | $-463.45 | $148.39 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9657.85** | $-370.45 | $28.3 | 36 | 44% | $-548.23 | 13 |
| ai_judge | **$9416.97** | $-587.64 | $4.61 | 7 | 14% | $-600 | 2 |
| mm_max | **$9315.03** | $-687.5 | $2.53 | 126 | 51% | $-806.97 | 4 |
| mm_slow | **$9185.33** | $-468.35 | $-346.32 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9108.63** | $-561.85 | $-329.52 | 128 | 57% | $-1176.14 | 25 |
| maker_sports | **$9087.91** | $-800.33 | $-111.76 | 60 | 47% | $-986.04 | 13 |
| mm_strong | **$8667.86** | $-920.12 | $-412.02 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8231.21** | $-1041.81 | $-726.98 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7340.9** | $-2279.45 | $-379.65 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9014.2** | $-942.24 | $-43.56 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8419.58** | $-1937.09 | $356.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5108.41** | $-4691.55 | $-200.04 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 49 | 32 | 5 | 60% | 3.06¢ |
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

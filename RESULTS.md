# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32551 · Last run: 2026-08-05T21:27:33.963Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10663.55** | $980.43 | $-316.88 | 395 | 54% | $777.4 | 17 |
| mid_momentum | **$10523.23** | $765.63 | $-242.4 | 208 | 57% | $552.15 | 25 |
| mm_cheap | **$10496.76** | $887.82 | $-391.06 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10043.16** | $-136.87 | $180.03 | 19 | 53% | $-248.79 | 25 |
| super | **$10006.75** | $-425.73 | $432.48 | 73 | 48% | $-641.58 | 12 |
| copy_top | **$9845.61** | $-471.82 | $317.43 | 414 | 52% | $-1800.39 | 25 |
| fade_longshot | **$9842.14** | $22.92 | $-180.78 | 122 | 95% | $12.18 | 25 |
| mid_momentum_v2 | **$9792.46** | $-222.17 | $14.63 | 20 | 50% | $-334.09 | 25 |
| copy_pro | **$9744.87** | $-1017.28 | $762.15 | 395 | 51% | $-1867.28 | 25 |
| mm_max | **$9640.9** | $-185.1 | $-174 | 172 | 54% | $-352.22 | 4 |
| mm_sports | **$9590.64** | $147.11 | $-556.47 | 464 | 55% | $-72.02 | 20 |
| strong_dip | **$9513.39** | $-482.76 | $-3.85 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9348.43** | $-587.64 | $-63.93 | 7 | 14% | $-600 | 2 |
| random_control | **$8977.08** | $-1000.59 | $-22.33 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8817.14** | $-546.17 | $-636.69 | 57 | 53% | $-731.88 | 25 |
| maker_flat | **$8685.69** | $-1049 | $-265.31 | 83 | 42% | $-1243.12 | 18 |
| mm_strong | **$8564.63** | $-905.96 | $-529.41 | 83 | 48% | $-1109.91 | 25 |
| mm_sports_v2 | **$8370.66** | $-1093.08 | $-536.26 | 31 | 39% | $-1219.1 | 20 |
| momentum | **$8104.48** | $-1160.77 | $-734.75 | 262 | 68% | $-1649.01 | 25 |
| maker_sports | **$7941.04** | $-1456.88 | $-602.08 | 150 | 49% | $-1659.91 | 12 |
| whale_fade | **$6949.75** | $-2327.89 | $-722.36 | 415 | 48% | $-2682.44 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.85** | $-931.5 | $-70.65 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.49** | $-4791.55 | $-98.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 101 | 67 | 1 | 60% | 2.97¢ |
| maker_sports | 162 | 104 | 5 | 61% | 1.59¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32572 · Last run: 2026-08-05T21:39:02.006Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10847.82** | $980.43 | $-132.61 | 395 | 54% | $777.4 | 17 |
| mid_momentum | **$10521.87** | $765.63 | $-243.76 | 208 | 57% | $552.15 | 25 |
| mm_cheap | **$10495.5** | $887.82 | $-392.32 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10179.99** | $-82.42 | $262.41 | 20 | 55% | $-194.34 | 25 |
| super | **$10003.41** | $-425.73 | $429.14 | 73 | 48% | $-641.58 | 12 |
| mid_momentum_v2 | **$9852.8** | $-222.17 | $74.97 | 20 | 50% | $-334.09 | 25 |
| fade_longshot | **$9843.06** | $22.92 | $-179.86 | 122 | 95% | $12.18 | 25 |
| copy_top | **$9841.72** | $-471.82 | $313.54 | 414 | 52% | $-1800.39 | 25 |
| mm_sports | **$9772.27** | $201.56 | $-429.29 | 465 | 55% | $-17.57 | 19 |
| copy_pro | **$9741** | $-1017.28 | $758.28 | 395 | 51% | $-1867.28 | 25 |
| mm_max | **$9723.43** | $-185.1 | $-91.47 | 172 | 54% | $-352.22 | 4 |
| strong_dip | **$9513.69** | $-482.76 | $-3.55 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9356.12** | $-587.64 | $-56.24 | 7 | 14% | $-600 | 2 |
| random_control | **$8978.56** | $-1000.59 | $-20.85 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8813.23** | $-546.17 | $-640.6 | 57 | 53% | $-731.88 | 25 |
| maker_flat | **$8737.25** | $-1049 | $-213.75 | 83 | 42% | $-1243.12 | 18 |
| mm_strong | **$8563.73** | $-905.96 | $-530.31 | 83 | 48% | $-1109.91 | 25 |
| mm_sports_v2 | **$8554.49** | $-1038.63 | $-406.88 | 32 | 41% | $-1164.65 | 19 |
| maker_sports | **$8090.14** | $-1398.15 | $-511.71 | 151 | 49% | $-1601.18 | 11 |
| momentum | **$8073.26** | $-1160.77 | $-765.97 | 262 | 68% | $-1649.01 | 25 |
| whale_fade | **$6952.32** | $-2327.89 | $-719.79 | 415 | 48% | $-2682.44 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.89** | $-931.5 | $-71.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.49** | $-4791.55 | $-98.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 101 | 68 | 0 | 60% | 2.97¢ |
| maker_sports | 162 | 105 | 5 | 61% | 1.59¢ |

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

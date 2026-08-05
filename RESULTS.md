# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32521 · Last run: 2026-08-05T21:10:46.738Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10729.54** | $980.43 | $-250.89 | 395 | 54% | $777.4 | 16 |
| mid_momentum | **$10519.2** | $867.28 | $-348.08 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10501.18** | $887.82 | $-386.64 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10047.84** | $-35.02 | $82.86 | 18 | 56% | $-146.94 | 25 |
| super | **$9993.17** | $-425.73 | $418.9 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9846.33** | $123.32 | $-276.99 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9814.69** | $-542.13 | $356.82 | 413 | 52% | $-1870.7 | 25 |
| mid_momentum_v2 | **$9810.56** | $-120.32 | $-69.12 | 19 | 53% | $-232.24 | 25 |
| mm_max | **$9703.3** | $-185.1 | $-111.6 | 172 | 54% | $-352.22 | 4 |
| copy_pro | **$9681.46** | $-1348.73 | $1030.19 | 393 | 51% | $-2198.73 | 25 |
| mm_sports | **$9668.36** | $249.01 | $-580.65 | 463 | 55% | $29.88 | 20 |
| strong_dip | **$9514.28** | $-482.76 | $-2.96 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9350.65** | $-587.64 | $-61.71 | 7 | 14% | $-600 | 2 |
| random_control | **$8974.14** | $-1000.59 | $-25.27 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8827.82** | $-444.42 | $-727.76 | 56 | 54% | $-630.13 | 25 |
| maker_flat | **$8758.29** | $-1049 | $-192.71 | 83 | 42% | $-1243.12 | 18 |
| mm_strong | **$8568.26** | $-804.21 | $-627.53 | 82 | 49% | $-1008.16 | 25 |
| mm_sports_v2 | **$8435.3** | $-991.23 | $-573.47 | 30 | 40% | $-1117.25 | 20 |
| momentum | **$8110.32** | $-1059.12 | $-830.56 | 261 | 68% | $-1547.36 | 25 |
| maker_sports | **$8001.51** | $-1356.88 | $-641.61 | 149 | 49% | $-1559.91 | 12 |
| whale_fade | **$6984.95** | $-2225.04 | $-790.01 | 414 | 48% | $-2579.59 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.5** | $-931.5 | $-69 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 101 | 67 | 1 | 60% | 2.97¢ |
| maker_sports | 161 | 103 | 5 | 61% | 1.6¢ |

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

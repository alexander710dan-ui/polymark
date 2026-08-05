# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32405 · Last run: 2026-08-05T20:06:29.387Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10891.71** | $1105.88 | $-214.17 | 390 | 55% | $902.85 | 16 |
| mid_momentum | **$10627.5** | $867.28 | $-239.78 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10471.62** | $887.82 | $-416.2 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10129.71** | $-199.63 | $329.34 | 14 | 50% | $-311.55 | 25 |
| mm_sports | **$10128.27** | $477.96 | $-349.69 | 457 | 56% | $258.83 | 20 |
| mid_momentum_v2 | **$9978.67** | $-208.56 | $187.23 | 16 | 50% | $-320.48 | 25 |
| super | **$9972.95** | $-425.73 | $398.68 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9934.33** | $123.32 | $-188.99 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9755.9** | $-575.97 | $331.87 | 412 | 51% | $-1904.54 | 25 |
| mm_max | **$9699.62** | $-169.83 | $-130.55 | 170 | 54% | $-336.95 | 4 |
| strong_dip | **$9527.77** | $-482.76 | $10.53 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9358.34** | $-587.64 | $-54.02 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9338.38** | $-1348.73 | $687.11 | 393 | 51% | $-2198.73 | 25 |
| mm_slow | **$8977.45** | $-444.42 | $-578.13 | 56 | 54% | $-630.13 | 25 |
| random_control | **$8975.89** | $-1000.59 | $-23.52 | 143 | 57% | $-1614.88 | 25 |
| mm_sports_v2 | **$8821.29** | $-762.28 | $-416.43 | 24 | 42% | $-888.3 | 20 |
| maker_flat | **$8775.31** | $-1130.82 | $-93.87 | 82 | 41% | $-1324.94 | 17 |
| mm_strong | **$8694.5** | $-804.21 | $-501.29 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8390.59** | $-1250.4 | $-359.01 | 144 | 49% | $-1453.43 | 15 |
| momentum | **$8204.39** | $-1059.12 | $-736.49 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7089.24** | $-2121.39 | $-789.37 | 413 | 48% | $-2475.94 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.48** | $-931.5 | $-70.02 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.74** | $-4791.55 | $-100.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 66 | 2 | 60% | 2.99¢ |
| maker_sports | 159 | 103 | 2 | 61% | 1.6¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30606 · Last run: 2026-08-05T03:15:14.406Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10901.59** | $898.75 | $2.84 | 414 | 56% | $679.62 | 10 |
| mm_tight | **$10836.43** | $838.02 | $-1.59 | 358 | 54% | $634.99 | 7 |
| mid_momentum | **$10813.01** | $915.76 | $-102.75 | 205 | 58% | $702.28 | 25 |
| copy_pro | **$10507.86** | $-534.88 | $1042.74 | 385 | 51% | $-1384.88 | 23 |
| mm_cheap | **$10479.56** | $887.82 | $-408.26 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10079.28** | $-67.5 | $146.78 | 406 | 52% | $-1396.07 | 22 |
| fade_longshot | **$9897.68** | $92.73 | $-195.05 | 115 | 96% | $81.99 | 25 |
| super | **$9779.12** | $-591.5 | $370.62 | 72 | 47% | $-807.35 | 12 |
| mm_max | **$9644.45** | $-488.01 | $132.46 | 158 | 53% | $-655.13 | 2 |
| strong_dip | **$9495.97** | $-528.32 | $24.29 | 102 | 59% | $-620.63 | 24 |
| maker_sports | **$9455.23** | $-695.97 | $151.2 | 111 | 50% | $-899 | 7 |
| ai_judge | **$9392.53** | $-587.64 | $-19.83 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9272.17** | $-617.63 | $-110.2 | 65 | 43% | $-811.75 | 16 |
| mm_slow | **$9134.35** | $-468.35 | $-397.3 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9044.79** | $-955.81 | $0.6 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8783.88** | $-928.14 | $-287.98 | 80 | 48% | $-1132.09 | 25 |
| momentum | **$8306.33** | $-998.83 | $-694.84 | 258 | 68% | $-1487.07 | 25 |
| whale_fade | **$7400.44** | $-2477.11 | $-122.45 | 407 | 47% | $-2831.66 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9001.43** | $-931.5 | $-67.07 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 45 | 3 | 64% | 2.94¢ |
| maker_sports | 118 | 72 | 0 | 62% | 1.57¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31049 · Last run: 2026-08-05T07:21:48.648Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11242.8** | $1109.68 | $133.12 | 419 | 56% | $890.55 | 12 |
| mm_tight | **$11076.32** | $975.71 | $100.61 | 362 | 54% | $772.68 | 7 |
| mid_momentum | **$10779.4** | $967.28 | $-187.88 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10529.66** | $887.82 | $-358.16 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10061.47** | $-271.55 | $333.02 | 408 | 52% | $-1600.12 | 25 |
| copy_pro | **$10020.87** | $-578.08 | $598.95 | 388 | 51% | $-1428.08 | 25 |
| super | **$9928.07** | $-425.73 | $353.8 | 73 | 48% | $-641.58 | 11 |
| fade_longshot | **$9903.12** | $102.17 | $-199.05 | 116 | 96% | $91.43 | 25 |
| mm_max | **$9483.76** | $-517.02 | $0.78 | 160 | 53% | $-684.14 | 1 |
| maker_sports | **$9436.78** | $-655.39 | $92.17 | 116 | 51% | $-858.42 | 5 |
| strong_dip | **$9433.59** | $-528.32 | $-38.09 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9387.06** | $-587.64 | $-25.3 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9125.76** | $-516.83 | $-357.41 | 55 | 53% | $-702.54 | 25 |
| maker_flat | **$9005.73** | $-917.63 | $-76.64 | 68 | 41% | $-1111.75 | 14 |
| random_control | **$8938.39** | $-955.81 | $-105.8 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8771.47** | $-876.62 | $-351.91 | 81 | 48% | $-1080.57 | 25 |
| momentum | **$8205.12** | $-1076.77 | $-718.11 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7145.53** | $-2200.96 | $-653.51 | 409 | 48% | $-2555.51 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.87** | $-931.5 | $-64.63 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5099.57** | $-4791.55 | $-108.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 82 | 52 | 3 | 61% | 2.96¢ |
| maker_sports | 121 | 75 | 3 | 62% | 1.59¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32320 · Last run: 2026-08-05T19:18:22.355Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10907.84** | $1137.56 | $-229.72 | 385 | 55% | $934.53 | 19 |
| mid_momentum | **$10655.3** | $867.28 | $-211.98 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10494.68** | $887.82 | $-393.14 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10250.84** | $736.62 | $-485.78 | 450 | 56% | $517.49 | 25 |
| fade_longshot | **$9943.56** | $120.58 | $-177.02 | 120 | 96% | $109.84 | 25 |
| super | **$9905.25** | $-425.73 | $330.98 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9772.26** | $-209.11 | $-18.63 | 167 | 54% | $-376.23 | 6 |
| copy_top | **$9743.01** | $-472.32 | $215.33 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9741.84** | $-140.86 | $-117.3 | 12 | 50% | $-252.78 | 25 |
| mid_momentum_v2 | **$9731.71** | $-351.45 | $83.16 | 14 | 43% | $-463.37 | 25 |
| strong_dip | **$9514.5** | $-482.76 | $-2.74 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9247.82** | $-1348.73 | $596.55 | 393 | 51% | $-2198.73 | 25 |
| random_control | **$8994.99** | $-1012.4 | $7.39 | 142 | 56% | $-1626.69 | 25 |
| mm_slow | **$8975.95** | $-516.83 | $-507.22 | 55 | 53% | $-702.54 | 25 |
| mm_sports_v2 | **$8928.17** | $-501.04 | $-570.79 | 17 | 41% | $-627.06 | 25 |
| maker_flat | **$8707.71** | $-1234.9 | $-57.39 | 81 | 41% | $-1429.02 | 18 |
| mm_strong | **$8693.28** | $-876.62 | $-430.1 | 81 | 48% | $-1080.57 | 25 |
| maker_sports | **$8432.41** | $-1213.83 | $-353.76 | 137 | 49% | $-1416.86 | 20 |
| momentum | **$8228.9** | $-1059.12 | $-711.98 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7132.59** | $-2155.23 | $-712.18 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9423.81** | $-730.36 | $154.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.88** | $-931.5 | $-70.62 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.62** | $-4791.55 | $-103.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 64 | 2 | 61% | 2.99¢ |
| maker_sports | 157 | 101 | 3 | 61% | 1.61¢ |

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

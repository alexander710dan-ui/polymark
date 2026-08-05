# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32265 · Last run: 2026-08-05T18:47:50.478Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10857.68** | $1137.56 | $-279.88 | 385 | 55% | $934.53 | 18 |
| mid_momentum | **$10660.28** | $867.28 | $-207 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10492.15** | $887.82 | $-395.67 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10328.6** | $736.62 | $-408.02 | 450 | 56% | $517.49 | 24 |
| fade_longshot | **$9941.95** | $118.35 | $-176.4 | 119 | 96% | $107.61 | 25 |
| super | **$9888.22** | $-425.73 | $313.95 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9783.51** | $-209.11 | $-7.38 | 167 | 54% | $-376.23 | 5 |
| copy_top | **$9680.92** | $-472.32 | $153.24 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9648.47** | $-140.86 | $-210.67 | 12 | 50% | $-252.78 | 25 |
| mid_momentum_v2 | **$9579.94** | $-351.45 | $-68.61 | 14 | 43% | $-463.37 | 25 |
| strong_dip | **$9491.39** | $-482.76 | $-25.85 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9368.26** | $-587.64 | $-44.1 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9185.29** | $-1348.73 | $534.02 | 393 | 51% | $-2198.73 | 25 |
| mm_sports_v2 | **$9036.51** | $-501.04 | $-462.45 | 17 | 41% | $-627.06 | 24 |
| mm_slow | **$9025.59** | $-516.83 | $-457.58 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8975.01** | $-1012.4 | $-12.59 | 142 | 56% | $-1626.69 | 25 |
| mm_strong | **$8724.1** | $-876.62 | $-399.28 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8633.55** | $-1234.9 | $-131.55 | 81 | 41% | $-1429.02 | 18 |
| maker_sports | **$8449.54** | $-1213.83 | $-336.63 | 137 | 49% | $-1416.86 | 17 |
| momentum | **$8202.74** | $-1059.12 | $-738.14 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7234.41** | $-2155.23 | $-610.36 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.3** | $-931.5 | $-69.2 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.62** | $-4791.55 | $-103.83 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 63 | 3 | 61% | 2.99¢ |
| maker_sports | 154 | 99 | 5 | 61% | 1.61¢ |

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

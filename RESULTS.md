# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30456 · Last run: 2026-08-05T01:51:43.461Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10779.87** | $1123.4 | $-343.53 | 403 | 56% | $904.27 | 20 |
| mid_momentum | **$10633.1** | $814.23 | $-181.13 | 204 | 57% | $600.75 | 25 |
| mm_tight | **$10623.95** | $1049.88 | $-425.93 | 350 | 54% | $846.85 | 15 |
| mm_cheap | **$10334.66** | $746.87 | $-412.21 | 34 | 65% | $569.09 | 25 |
| copy_top | **$10094.27** | $-222.82 | $317.09 | 403 | 52% | $-1551.39 | 25 |
| copy_pro | **$9984.94** | $-643.53 | $628.47 | 383 | 51% | $-1493.53 | 25 |
| fade_longshot | **$9932.07** | $82.61 | $-150.54 | 113 | 96% | $71.87 | 25 |
| super | **$9754.35** | $-387.2 | $141.55 | 71 | 48% | $-603.05 | 13 |
| strong_dip | **$9642.88** | $-426.02 | $68.9 | 101 | 59% | $-518.33 | 25 |
| mm_max | **$9482.37** | $-473.6 | $-44.03 | 154 | 53% | $-640.72 | 5 |
| ai_judge | **$9390.48** | $-587.64 | $-21.88 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9231.56** | $-852.61 | $84.17 | 63 | 41% | $-1046.73 | 16 |
| mm_slow | **$9207.76** | $-468.35 | $-323.89 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9203.44** | $-659.12 | $-137.44 | 103 | 50% | $-862.15 | 15 |
| random_control | **$8913.8** | $-1025.29 | $-60.91 | 136 | 56% | $-1639.58 | 25 |
| mm_strong | **$8704.52** | $-1029.67 | $-265.81 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8271.28** | $-1113.4 | $-615.32 | 256 | 68% | $-1601.64 | 25 |
| whale_fade | **$6945.62** | $-2397.18 | $-657.2 | 404 | 48% | $-2751.73 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9010.76** | $-931.5 | $-57.74 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 79 | 45 | 0 | 64% | 2.95¢ |
| maker_sports | 118 | 71 | 1 | 62% | 1.57¢ |

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

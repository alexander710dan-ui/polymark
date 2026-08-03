# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27210 · Last run: 2026-08-03T19:45:49.005Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11801.66** | $1740.37 | $61.29 | 291 | 57% | $1537.34 | 24 |
| mm_tight | **$10975.12** | $738.55 | $236.57 | 251 | 53% | $535.52 | 20 |
| mm_cheap | **$10395.05** | $832.49 | $-437.44 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10394.68** | $506.38 | $-111.7 | 188 | 57% | $292.9 | 25 |
| maker_sports | **$10011.13** | $175.28 | $-164.15 | 12 | 58% | $48.01 | 9 |
| strong_dip | **$9985.83** | $-337.42 | $323.25 | 96 | 60% | $-429.73 | 25 |
| maker_flat | **$9975.43** | $96.03 | $-120.6 | 9 | 56% | $-31.24 | 7 |
| fade_longshot | **$9958.46** | $34.52 | $-76.06 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9903.74** | $-175.85 | $79.59 | 89 | 52% | $-293.24 | 14 |
| super | **$9653.33** | $-445.84 | $99.17 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9611.94** | $-834.75 | $446.69 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9442.39** | $-666.45 | $108.84 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9278.45** | $-310.74 | $-410.81 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8990.75** | $-821.03 | $-188.22 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8821.18** | $-1140.85 | $-37.97 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8180.76** | $-1389.71 | $-429.53 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7790.7** | $-1683.64 | $-525.66 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.19** | $-1003.53 | $33.72 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.28** | $-4691.55 | $-199.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 16 | 15 | 4 | 52% | 2.69¢ |
| maker_sports | 21 | 14 | 5 | 60% | 1.9¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27186 · Last run: 2026-08-03T19:32:29.165Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11759.64** | $1740.37 | $19.27 | 291 | 57% | $1537.34 | 23 |
| mm_tight | **$10896.32** | $738.55 | $157.77 | 251 | 53% | $535.52 | 19 |
| mid_momentum | **$10386.69** | $506.38 | $-119.69 | 188 | 57% | $292.9 | 25 |
| mm_cheap | **$10385.73** | $832.49 | $-446.76 | 24 | 71% | $654.71 | 25 |
| maker_flat | **$9999.6** | $96.03 | $-96.43 | 9 | 56% | $-31.24 | 6 |
| strong_dip | **$9985.42** | $-337.42 | $322.84 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9959.34** | $34.52 | $-75.18 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9896.52** | $-175.85 | $72.37 | 89 | 52% | $-293.24 | 13 |
| maker_sports | **$9895.72** | $175.28 | $-279.56 | 12 | 58% | $48.01 | 9 |
| super | **$9640.07** | $-445.84 | $85.91 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9602.71** | $-834.75 | $437.46 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9410.95** | $-666.45 | $77.4 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9281.06** | $-310.74 | $-408.2 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8988.18** | $-821.03 | $-190.79 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8820.71** | $-1140.85 | $-38.44 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8174.05** | $-1389.71 | $-436.24 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7892.01** | $-1683.64 | $-424.35 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.01** | $-1003.53 | $33.54 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.28** | $-4691.55 | $-203.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 15 | 15 | 5 | 50% | 2.67¢ |
| maker_sports | 21 | 11 | 4 | 66% | 1.9¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27223 · Last run: 2026-08-03T19:53:07.239Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11817.81** | $1740.37 | $77.44 | 291 | 57% | $1537.34 | 25 |
| mm_tight | **$10951** | $738.55 | $212.45 | 251 | 53% | $535.52 | 20 |
| mm_cheap | **$10406.85** | $832.49 | $-425.64 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10390.62** | $506.38 | $-115.76 | 188 | 57% | $292.9 | 25 |
| strong_dip | **$9989.49** | $-337.42 | $326.91 | 96 | 60% | $-429.73 | 25 |
| maker_sports | **$9982.9** | $175.28 | $-192.38 | 12 | 58% | $48.01 | 10 |
| fade_longshot | **$9957.12** | $34.52 | $-77.4 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9936.29** | $96.03 | $-159.74 | 9 | 56% | $-31.24 | 8 |
| mm_max | **$9892.39** | $-175.85 | $68.24 | 89 | 52% | $-293.24 | 14 |
| super | **$9640.87** | $-445.84 | $86.71 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9579.05** | $-834.75 | $413.8 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9435.79** | $-666.45 | $102.24 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9415.48** | $-487.64 | $-96.88 | 6 | 17% | $-500 | 3 |
| random_control | **$9267.45** | $-310.74 | $-421.81 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8997.06** | $-821.03 | $-181.91 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8824.54** | $-1140.85 | $-34.61 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8167.63** | $-1389.71 | $-442.66 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7788.89** | $-1683.64 | $-527.47 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9033.72** | $-1003.53 | $37.25 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8333.04** | $-1837.09 | $170.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5105.28** | $-4691.55 | $-203.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 16 | 2 | 52% | 2.76¢ |
| maker_sports | 22 | 14 | 5 | 61% | 1.91¢ |

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

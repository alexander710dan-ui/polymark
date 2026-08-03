# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27517 · Last run: 2026-08-03T22:36:01.922Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11624.61** | $1803.03 | $-178.42 | 304 | 58% | $1600 | 25 |
| mm_tight | **$10908.61** | $817.87 | $90.74 | 264 | 54% | $614.84 | 19 |
| mid_momentum | **$10447.93** | $627.06 | $-179.13 | 190 | 57% | $413.58 | 25 |
| mm_cheap | **$10358.15** | $893.78 | $-535.63 | 25 | 72% | $716 | 25 |
| strong_dip | **$10008.9** | $-337.42 | $346.32 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9953.27** | $34.52 | $-81.25 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9807.28** | $-205.15 | $12.43 | 99 | 53% | $-324.62 | 9 |
| maker_flat | **$9726.71** | $-103.97 | $-169.32 | 11 | 45% | $-231.24 | 10 |
| maker_sports | **$9687.17** | $-240.23 | $-72.6 | 22 | 45% | $-425.94 | 11 |
| super | **$9677.51** | $-353.9 | $31.41 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9595.83** | $-982.82 | $578.65 | 367 | 51% | $-1832.82 | 25 |
| copy_top | **$9446.01** | $-682.88 | $128.89 | 388 | 51% | $-2011.45 | 25 |
| ai_judge | **$9406.59** | $-487.64 | $-105.77 | 6 | 17% | $-500 | 3 |
| random_control | **$9273.59** | $-310.74 | $-415.67 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8942.64** | $-762.3 | $-295.06 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8798.84** | $-1021.38 | $-179.78 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8157.66** | $-1365.71 | $-476.63 | 238 | 67% | $-1853.95 | 25 |
| whale_fade | **$7710.69** | $-1710.06 | $-579.25 | 389 | 48% | $-2064.61 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9028.96** | $-1003.53 | $32.49 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8359.71** | $-1837.09 | $196.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 21 | 19 | 3 | 53% | 3.17¢ |
| maker_sports | 33 | 17 | 6 | 66% | 1.85¢ |

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

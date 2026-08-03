# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27507 · Last run: 2026-08-03T22:30:28.806Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11645.85** | $1905.38 | $-259.53 | 303 | 58% | $1702.35 | 25 |
| mm_tight | **$10936.84** | $920.22 | $16.62 | 263 | 54% | $717.19 | 20 |
| mid_momentum | **$10441.35** | $627.06 | $-185.71 | 190 | 57% | $413.58 | 25 |
| mm_cheap | **$10359.91** | $893.78 | $-533.87 | 25 | 72% | $716 | 25 |
| strong_dip | **$10007.9** | $-337.42 | $345.32 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9952.51** | $34.52 | $-82.01 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9812.4** | $-102.8 | $-84.8 | 98 | 53% | $-222.27 | 9 |
| maker_flat | **$9781.53** | $-103.97 | $-114.5 | 11 | 45% | $-231.24 | 10 |
| maker_sports | **$9719.35** | $-140.23 | $-140.42 | 21 | 48% | $-325.94 | 12 |
| super | **$9681.22** | $-353.9 | $35.12 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9597.03** | $-982.82 | $579.85 | 367 | 51% | $-1832.82 | 25 |
| copy_top | **$9445.59** | $-682.88 | $128.47 | 388 | 51% | $-2011.45 | 25 |
| ai_judge | **$9406.59** | $-487.64 | $-105.77 | 6 | 17% | $-500 | 3 |
| random_control | **$9272.61** | $-310.74 | $-416.65 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8941.63** | $-762.3 | $-296.07 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8797.82** | $-1021.38 | $-180.8 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8158.53** | $-1365.71 | $-475.76 | 238 | 67% | $-1853.95 | 25 |
| whale_fade | **$7700.31** | $-1710.06 | $-589.63 | 389 | 48% | $-2064.61 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9028.96** | $-1003.53 | $32.49 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8359.71** | $-1837.09 | $196.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 21 | 19 | 3 | 53% | 3.17¢ |
| maker_sports | 33 | 17 | 5 | 66% | 1.85¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27390 · Last run: 2026-08-03T21:25:56.104Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11582.14** | $1816.45 | $-234.31 | 300 | 58% | $1613.42 | 23 |
| mm_tight | **$10813.66** | $831.29 | $-17.63 | 260 | 54% | $628.26 | 17 |
| mid_momentum | **$10410.29** | $627.06 | $-216.77 | 190 | 57% | $413.58 | 25 |
| mm_cheap | **$10380.39** | $893.78 | $-513.39 | 25 | 72% | $716 | 25 |
| strong_dip | **$10008.23** | $-337.42 | $345.65 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9953.11** | $34.52 | $-81.41 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9829.07** | $-44.73 | $-126.2 | 96 | 53% | $-164.2 | 10 |
| maker_flat | **$9738.5** | $-103.97 | $-157.53 | 11 | 45% | $-231.24 | 9 |
| maker_sports | **$9700.74** | $-225.94 | $-73.32 | 19 | 47% | $-353.21 | 11 |
| super | **$9664.59** | $-353.9 | $18.49 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9606.12** | $-982.82 | $588.94 | 367 | 51% | $-1832.82 | 24 |
| copy_top | **$9445.06** | $-699.78 | $144.84 | 387 | 51% | $-2028.35 | 25 |
| ai_judge | **$9406.59** | $-487.64 | $-105.77 | 6 | 17% | $-500 | 3 |
| random_control | **$9265.24** | $-310.74 | $-424.02 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8957.6** | $-762.3 | $-280.1 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8805.73** | $-1021.38 | $-172.89 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8173.22** | $-1365.71 | $-461.07 | 238 | 67% | $-1853.95 | 25 |
| whale_fade | **$7701.14** | $-1605.86 | $-693 | 388 | 48% | $-1960.41 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9029.02** | $-1003.53 | $32.55 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8359.71** | $-1837.09 | $196.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5106.16** | $-4691.55 | $-202.29 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 20 | 18 | 2 | 53% | 3.02¢ |
| maker_sports | 30 | 16 | 3 | 65% | 1.77¢ |

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

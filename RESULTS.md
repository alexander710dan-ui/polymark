# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27607 · Last run: 2026-08-03T23:26:06.880Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11727.22** | $1541.26 | $185.96 | 308 | 57% | $1338.23 | 23 |
| mm_tight | **$10970.62** | $798.61 | $172.01 | 266 | 54% | $595.58 | 20 |
| mid_momentum | **$10408.43** | $715.77 | $-307.34 | 192 | 58% | $502.29 | 25 |
| mm_cheap | **$10371.36** | $893.78 | $-522.42 | 25 | 72% | $716 | 25 |
| fade_longshot | **$9969.44** | $39.78 | $-70.34 | 106 | 95% | $29.04 | 25 |
| strong_dip | **$9931.04** | $-258.85 | $189.89 | 97 | 61% | $-351.16 | 25 |
| mm_max | **$9922.36** | $-122.26 | $44.62 | 100 | 53% | $-241.73 | 12 |
| maker_flat | **$9903.6** | $-203.97 | $107.57 | 12 | 42% | $-331.24 | 12 |
| maker_sports | **$9848.58** | $-273.56 | $122.14 | 24 | 46% | $-459.27 | 13 |
| super | **$9608.17** | $-353.9 | $-37.93 | 64 | 47% | $-569.75 | 11 |
| copy_top | **$9444.99** | $-645.89 | $90.88 | 389 | 51% | $-1974.46 | 25 |
| ai_judge | **$9419.62** | $-587.64 | $7.26 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9376.13** | $-882.82 | $258.95 | 368 | 51% | $-1732.82 | 25 |
| random_control | **$9147.75** | $-249.45 | $-602.8 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8942.36** | $-762.3 | $-295.34 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8765.43** | $-1021.38 | $-213.19 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8192.14** | $-1304.42 | $-503.44 | 239 | 67% | $-1792.66 | 25 |
| whale_fade | **$7722.5** | $-1810.06 | $-467.44 | 390 | 48% | $-2164.61 | 25 |
| copy_month (retired) | **$9373.81** | $-730.36 | $104.17 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9041.35** | $-942.24 | $-16.41 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8296.24** | $-1937.09 | $233.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 24 | 21 | 2 | 53% | 3.19¢ |
| maker_sports | 37 | 20 | 3 | 65% | 1.76¢ |

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

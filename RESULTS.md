# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27700 · Last run: 2026-08-04T00:17:51.930Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11987.26** | $1538.77 | $448.49 | 311 | 57% | $1335.74 | 25 |
| mm_tight | **$11275.93** | $638.32 | $637.61 | 269 | 54% | $435.29 | 19 |
| mid_momentum | **$10446.29** | $780.44 | $-334.15 | 193 | 58% | $566.96 | 25 |
| mm_cheap | **$10383.4** | $893.78 | $-510.38 | 25 | 72% | $716 | 25 |
| mm_max | **$10126.64** | $-145.89 | $272.53 | 102 | 53% | $-265.36 | 12 |
| maker_flat | **$10063.96** | $-125.4 | $189.36 | 13 | 46% | $-252.67 | 14 |
| fade_longshot | **$9971.23** | $39.78 | $-68.55 | 106 | 95% | $29.04 | 25 |
| strong_dip | **$9910.18** | $-258.85 | $169.03 | 97 | 61% | $-351.16 | 25 |
| maker_sports | **$9609.87** | $-426.5 | $36.37 | 27 | 44% | $-612.21 | 13 |
| super | **$9604.91** | $-353.9 | $-41.19 | 64 | 47% | $-569.75 | 11 |
| copy_top | **$9467.27** | $-612.56 | $79.83 | 390 | 52% | $-1941.13 | 24 |
| ai_judge | **$9426.2** | $-587.64 | $13.84 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9310.16** | $-812.55 | $122.71 | 369 | 51% | $-1662.55 | 25 |
| random_control | **$9111.76** | $-249.45 | $-638.79 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8986.06** | $-762.3 | $-251.64 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8807.68** | $-1021.38 | $-170.94 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8354.26** | $-1208.17 | $-437.57 | 241 | 67% | $-1696.41 | 25 |
| whale_fade | **$7608.66** | $-1910.06 | $-481.28 | 391 | 48% | $-2264.61 | 24 |
| copy_month (retired) | **$9384.92** | $-730.36 | $115.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9039.68** | $-942.24 | $-18.08 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8299.58** | $-1937.09 | $236.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 27 | 21 | 6 | 56% | 3.06¢ |
| maker_sports | 40 | 22 | 6 | 65% | 1.7¢ |

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

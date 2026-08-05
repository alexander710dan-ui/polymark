# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32119 · Last run: 2026-08-05T17:26:34.593Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11042.66** | $1068.71 | $-26.05 | 381 | 54% | $865.68 | 15 |
| mid_momentum | **$10650.41** | $867.28 | $-216.87 | 207 | 57% | $653.8 | 25 |
| mm_sports | **$10618.8** | $929.7 | $-310.9 | 445 | 56% | $710.57 | 22 |
| mm_cheap | **$10486.53** | $887.82 | $-401.29 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9937.29** | $111.17 | $-173.88 | 118 | 96% | $100.43 | 25 |
| super | **$9897.08** | $-425.73 | $322.81 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9828.54** | $-164.19 | $-7.27 | 165 | 54% | $-331.31 | 4 |
| copy_top | **$9790.45** | $-472.32 | $262.77 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9647.96** | $-39.26 | $-312.78 | 11 | 55% | $-151.18 | 25 |
| strong_dip | **$9502.69** | $-482.76 | $-14.55 | 103 | 59% | $-575.07 | 25 |
| mid_momentum_v2 | **$9458.06** | $-249.85 | $-292.09 | 13 | 46% | $-361.77 | 25 |
| mm_sports_v2 | **$9415.88** | $-235.75 | $-348.37 | 13 | 46% | $-361.77 | 19 |
| ai_judge | **$9378.17** | $-587.64 | $-34.19 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9212.85** | $-1246.73 | $459.58 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$9017.82** | $-516.83 | $-465.35 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8987.32** | $-1153.35 | $140.67 | 141 | 56% | $-1767.64 | 25 |
| maker_sports | **$8772.23** | $-1013.83 | $-213.94 | 135 | 50% | $-1216.86 | 11 |
| mm_strong | **$8696.81** | $-876.62 | $-426.57 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8642.06** | $-1237.61 | $-120.33 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8189.35** | $-1059.12 | $-751.53 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7249.7** | $-2155.23 | $-595.07 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.75** | $-931.5 | $-68.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8512.91** | $-1937.09 | $450 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 2 | 61% | 2.97¢ |
| maker_sports | 146 | 97 | 4 | 60% | 1.59¢ |

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

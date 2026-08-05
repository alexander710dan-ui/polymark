# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32091 · Last run: 2026-08-05T17:10:58.124Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11209.77** | $1116.91 | $92.86 | 379 | 54% | $913.88 | 15 |
| mm_sports | **$10812.49** | $978.45 | $-165.96 | 443 | 56% | $759.32 | 22 |
| mid_momentum | **$10597.7** | $967.28 | $-369.58 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10475.67** | $887.82 | $-412.15 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9945.35** | $111.17 | $-165.82 | 118 | 96% | $100.43 | 25 |
| super | **$9892.25** | $-425.73 | $317.98 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9880.05** | $-218.64 | $98.69 | 164 | 54% | $-385.76 | 4 |
| mm_cheap_v2 | **$9726.77** | $63.94 | $-337.17 | 10 | 60% | $-47.98 | 25 |
| copy_top | **$9687.11** | $-477.25 | $164.36 | 410 | 51% | $-1805.82 | 25 |
| mm_sports_v2 | **$9606.5** | $-132.55 | $-260.95 | 12 | 50% | $-258.57 | 18 |
| strong_dip | **$9537.67** | $-528.32 | $65.99 | 102 | 59% | $-620.63 | 25 |
| mid_momentum_v2 | **$9504.13** | $-146.65 | $-349.22 | 12 | 50% | $-258.57 | 25 |
| ai_judge | **$9383.64** | $-587.64 | $-28.72 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9243.84** | $-1246.73 | $490.57 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$8982.1** | $-516.83 | $-501.07 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8959.53** | $-1058.61 | $18.14 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8902.88** | $-913.83 | $-183.29 | 134 | 50% | $-1116.86 | 11 |
| mm_strong | **$8641.62** | $-876.62 | $-481.76 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8499.22** | $-1237.61 | $-263.17 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8199.66** | $-1076.77 | $-723.57 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7281.72** | $-2055.23 | $-663.05 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.44** | $-931.5 | $-71.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 98 | 62 | 1 | 61% | 2.97¢ |
| maker_sports | 145 | 96 | 3 | 60% | 1.58¢ |

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

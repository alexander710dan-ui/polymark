# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32097 · Last run: 2026-08-05T17:14:13.422Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11150.96** | $1014.26 | $136.7 | 380 | 54% | $811.23 | 15 |
| mm_sports | **$10739.59** | $875.25 | $-135.66 | 444 | 56% | $656.12 | 22 |
| mid_momentum | **$10590.19** | $967.28 | $-377.09 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10466.04** | $887.82 | $-421.78 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9945.45** | $111.17 | $-165.72 | 118 | 96% | $100.43 | 25 |
| super | **$9891.37** | $-425.73 | $317.1 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9880.05** | $-218.64 | $98.69 | 164 | 54% | $-385.76 | 4 |
| copy_top | **$9740.58** | $-477.25 | $217.83 | 410 | 51% | $-1805.82 | 25 |
| mm_cheap_v2 | **$9668.33** | $-39.26 | $-292.41 | 11 | 55% | $-151.18 | 25 |
| strong_dip | **$9543.59** | $-528.32 | $71.91 | 102 | 59% | $-620.63 | 25 |
| mm_sports_v2 | **$9533.62** | $-235.75 | $-230.63 | 13 | 46% | $-361.77 | 18 |
| mid_momentum_v2 | **$9447.22** | $-249.85 | $-302.93 | 13 | 46% | $-361.77 | 25 |
| ai_judge | **$9384.75** | $-587.64 | $-27.61 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9241.69** | $-1246.73 | $488.42 | 392 | 51% | $-2096.73 | 25 |
| mm_slow | **$8976.06** | $-516.83 | $-507.11 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8956.44** | $-1058.61 | $15.05 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8831.95** | $-1013.83 | $-154.22 | 135 | 50% | $-1216.86 | 10 |
| mm_strong | **$8632.55** | $-876.62 | $-490.83 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8499.33** | $-1237.61 | $-263.06 | 77 | 40% | $-1431.73 | 21 |
| momentum | **$8193.89** | $-1076.77 | $-729.34 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7265.15** | $-2055.23 | $-679.62 | 411 | 48% | $-2409.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.03** | $-931.5 | $-70.47 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8516.25** | $-1937.09 | $453.34 | 146 | 25% | $-3964.75 | 1 |
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

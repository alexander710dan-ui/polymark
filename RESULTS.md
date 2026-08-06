# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33304 · Last run: 2026-08-06T04:26:21.087Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10412.57** | $661.27 | $-248.7 | 214 | 57% | $447.79 | 25 |
| mm_cheap | **$10384.23** | $787.82 | $-403.59 | 36 | 64% | $610.04 | 25 |
| super | **$10331.12** | $251.33 | $79.79 | 78 | 51% | $-13 | 12 |
| mm_tight | **$10328.67** | $546.58 | $-217.91 | 427 | 53% | $337.48 | 7 |
| copy_top | **$10095.91** | $-14.85 | $110.76 | 423 | 52% | $-1343.42 | 20 |
| fade_longshot | **$9860.91** | $25.97 | $-165.06 | 123 | 95% | $15.23 | 25 |
| mm_cheap_v2 | **$9758.74** | $38.7 | $-279.96 | 44 | 55% | $-152.12 | 18 |
| mid_momentum_v2 | **$9750.92** | $63.07 | $-312.15 | 40 | 53% | $-127.75 | 20 |
| copy_pro | **$9704.08** | $-611.84 | $315.92 | 402 | 51% | $-1461.84 | 21 |
| mm_sports | **$9646.12** | $-103.55 | $-250.33 | 503 | 55% | $-322.68 | 8 |
| strong_dip | **$9600.37** | $-494.63 | $95 | 106 | 59% | $-586.94 | 24 |
| mm_max | **$9567.73** | $-332.35 | $-99.92 | 191 | 53% | $-541.45 | 1 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| random_control | **$9015.06** | $-1085.22 | $100.28 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8744.86** | $-707.39 | $-547.75 | 61 | 51% | $-893.1 | 25 |
| maker_flat | **$8550.44** | $-1218.24 | $-231.32 | 93 | 42% | $-1412.36 | 16 |
| mm_sports_v2 | **$8388.9** | $-1409.05 | $-202.05 | 73 | 45% | $-1628.18 | 6 |
| mm_strong | **$8306.02** | $-1112.97 | $-581.01 | 90 | 47% | $-1316.92 | 24 |
| momentum | **$8019.11** | $-1274.22 | $-706.67 | 268 | 68% | $-1762.46 | 25 |
| maker_sports | **$7632.64** | $-2262.76 | $-104.6 | 183 | 48% | $-2465.79 | 2 |
| whale_fade | **$6645.98** | $-2968.28 | $-385.74 | 424 | 47% | $-3322.83 | 20 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.75** | $-931.5 | $-71.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5109.32** | $-4791.55 | $-99.13 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 74 | 2 | 60% | 2.95¢ |
| maker_sports | 185 | 121 | 2 | 60% | 1.54¢ |

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

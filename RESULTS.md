# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32890 · Last run: 2026-08-06T00:36:02.234Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10482.47** | $787.82 | $-305.35 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10431.31** | $561.03 | $-129.72 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10147.89** | $850.52 | $-702.63 | 406 | 54% | $647.49 | 21 |
| super | **$10125.22** | $-306.37 | $431.59 | 74 | 49% | $-522.22 | 16 |
| mm_cheap_v2 | **$9895.36** | $134.51 | $-239.15 | 28 | 57% | $-56.31 | 25 |
| copy_top | **$9873.19** | $-386.57 | $259.76 | 417 | 52% | $-1715.14 | 25 |
| fade_longshot | **$9850.45** | $25.97 | $-175.52 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9726.17** | $-115.6 | $-158.23 | 26 | 50% | $-306.42 | 25 |
| copy_pro | **$9629.45** | $-797.13 | $426.58 | 397 | 51% | $-1647.13 | 25 |
| strong_dip | **$9575.12** | $-394.63 | $-30.25 | 105 | 60% | $-486.94 | 25 |
| ai_judge | **$9350.65** | $-587.64 | $-61.71 | 7 | 14% | $-600 | 2 |
| mm_max | **$9304.53** | $-435.46 | $-260.01 | 177 | 53% | $-602.58 | 9 |
| mm_sports | **$9279.35** | $-150.9 | $-569.75 | 476 | 55% | $-370.03 | 25 |
| random_control | **$9091.49** | $-1100.59 | $192.08 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8756.57** | $-750.77 | $-492.66 | 60 | 50% | $-936.48 | 25 |
| mm_strong | **$8363.85** | $-1110.56 | $-525.59 | 86 | 47% | $-1314.51 | 25 |
| maker_flat | **$8256.89** | $-1349 | $-394.11 | 86 | 41% | $-1543.12 | 22 |
| momentum | **$8052.52** | $-1345.47 | $-602.01 | 265 | 67% | $-1833.71 | 25 |
| mm_sports_v2 | **$8005.12** | $-1413.47 | $-581.41 | 45 | 40% | $-1539.49 | 25 |
| maker_sports | **$7464.87** | $-1849.18 | $-685.95 | 161 | 48% | $-2052.21 | 19 |
| whale_fade | **$6894.12** | $-2534.9 | $-570.98 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.26** | $-931.5 | $-69.24 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 108 | 68 | 3 | 61% | 2.95¢ |
| maker_sports | 180 | 111 | 6 | 62% | 1.54¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26971 · Last run: 2026-08-03T17:32:51.785Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11472.77** | $1373.25 | $99.52 | 282 | 57% | $1170.22 | 24 |
| mm_tight | **$10642.8** | $598 | $44.8 | 241 | 53% | $394.97 | 20 |
| mm_cheap | **$10314.03** | $832.49 | $-518.46 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10262.81** | $608.28 | $-345.47 | 187 | 57% | $394.8 | 25 |
| maker_flat | **$10050.68** | $-72.73 | $123.41 | 3 | 33% | $-200 | 9 |
| strong_dip | **$9985.23** | $-337.42 | $322.65 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9971.68** | $34.52 | $-62.84 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9919.05** | $-72.73 | $-8.22 | 3 | 33% | $-200 | 11 |
| mm_max | **$9687.04** | $-416.4 | $103.44 | 80 | 50% | $-533.79 | 15 |
| copy_pro | **$9581.65** | $-684.75 | $266.4 | 364 | 51% | $-1534.75 | 25 |
| super | **$9541.49** | $-445.84 | $-12.67 | 63 | 46% | $-661.69 | 12 |
| copy_top | **$9470.93** | $-566.45 | $37.38 | 384 | 51% | $-1895.02 | 25 |
| ai_judge | **$9394.45** | $-487.64 | $-117.91 | 6 | 17% | $-500 | 3 |
| random_control | **$9271.97** | $-310.74 | $-417.29 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8959.75** | $-821.03 | $-219.22 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8647.99** | $-1233.53 | $-118.48 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8102.52** | $-1339.53 | $-557.95 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7655.9** | $-1827.54 | $-516.56 | 385 | 48% | $-2182.09 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.74** | $-1003.53 | $31.27 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8373.04** | $-1837.09 | $210.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5106.32** | $-4691.55 | $-202.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 9 | 6 | 57% | 2.58¢ |
| maker_sports | 14 | 7 | 4 | 67% | 1.79¢ |

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

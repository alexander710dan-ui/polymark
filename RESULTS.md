# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27038 · Last run: 2026-08-03T18:10:07.575Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11457.29** | $1592.78 | $-135.49 | 285 | 57% | $1389.75 | 23 |
| mm_tight | **$10582.26** | $780.5 | $-198.24 | 245 | 53% | $577.47 | 18 |
| mm_cheap | **$10326.67** | $832.49 | $-505.82 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10277.5** | $608.28 | $-330.78 | 187 | 57% | $394.8 | 25 |
| maker_flat | **$9979.44** | $-100.32 | $79.76 | 5 | 40% | $-227.59 | 7 |
| strong_dip | **$9975.95** | $-337.42 | $313.37 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9961.65** | $34.52 | $-72.87 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9854.01** | $129.01 | $-275 | 7 | 57% | $1.74 | 9 |
| mm_max | **$9627.25** | $-233.9 | $-138.85 | 84 | 51% | $-351.29 | 13 |
| copy_pro | **$9570.57** | $-834.75 | $405.32 | 365 | 51% | $-1684.75 | 25 |
| super | **$9561.43** | $-445.84 | $7.27 | 63 | 46% | $-661.69 | 12 |
| copy_top | **$9475.77** | $-666.45 | $142.22 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9403.26** | $-487.64 | $-109.1 | 6 | 17% | $-500 | 3 |
| random_control | **$9304.51** | $-310.74 | $-384.75 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8973.06** | $-821.03 | $-205.91 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8662.91** | $-1190.67 | $-146.42 | 66 | 45% | $-1394.62 | 25 |
| momentum | **$8104.56** | $-1439.53 | $-455.91 | 236 | 67% | $-1927.77 | 25 |
| whale_fade | **$7718.33** | $-1683.64 | $-598.03 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.19** | $-1003.53 | $30.72 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8369.71** | $-1837.09 | $206.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5106.32** | $-4691.55 | $-202.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 11 | 7 | 52% | 2.58¢ |
| maker_sports | 16 | 8 | 5 | 67% | 1.69¢ |

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

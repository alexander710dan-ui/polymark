# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27120 · Last run: 2026-08-03T18:55:47.905Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11638.44** | $1688.89 | $-50.45 | 288 | 57% | $1485.86 | 23 |
| mm_tight | **$10765.96** | $687.07 | $78.89 | 248 | 53% | $484.04 | 18 |
| mm_cheap | **$10383.52** | $832.49 | $-448.97 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10329.35** | $608.28 | $-278.93 | 187 | 57% | $394.8 | 25 |
| maker_flat | **$10023.34** | $-118.5 | $141.84 | 7 | 43% | $-245.77 | 8 |
| strong_dip | **$9975.19** | $-337.42 | $312.61 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9959.33** | $34.52 | $-75.19 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9896.33** | $110.83 | $-214.5 | 9 | 56% | $-16.44 | 9 |
| mm_max | **$9815.21** | $-327.33 | $142.54 | 87 | 51% | $-444.72 | 12 |
| super | **$9627.63** | $-445.84 | $73.47 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9583.84** | $-834.75 | $418.59 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9483.11** | $-666.45 | $149.56 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9409.92** | $-487.64 | $-102.44 | 6 | 17% | $-500 | 3 |
| random_control | **$9291.44** | $-310.74 | $-397.82 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$9001.1** | $-821.03 | $-177.87 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8717.31** | $-1140.85 | $-141.84 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8168.28** | $-1389.71 | $-442.01 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7740.31** | $-1683.64 | $-576.05 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.6** | $-1003.53 | $34.13 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8349.71** | $-1837.09 | $186.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5102.32** | $-4691.55 | $-206.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 15 | 15 | 3 | 50% | 2.67¢ |
| maker_sports | 18 | 10 | 4 | 64% | 1.78¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34531 · Last run: 2026-08-06T16:12:02.857Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10337.49** | $46.83 | $290.66 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10280.73** | $513.6 | $-232.87 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10253.44** | $640.15 | $-386.71 | 39 | 62% | $462.37 | 25 |
| maker_sports | **$10200.39** | $-7.69 | $208.08 | 2 | 50% | $-100 | 13 |
| maker_flat | **$10196.1** | $-11.32 | $207.42 | 2 | 50% | $-100 | 10 |
| mm_tight | **$10156.27** | $-164.88 | $321.15 | 457 | 53% | $-373.98 | 19 |
| copy_top | **$10004.57** | $-219.6 | $224.17 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9885.94** | $25.97 | $-140.03 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9773.36** | $-706.11 | $479.47 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9757.56** | $-117.16 | $-125.28 | 52 | 52% | $-307.98 | 25 |
| mm_max | **$9703.24** | $-276.89 | $-19.87 | 199 | 53% | $-485.99 | 3 |
| strong_dip | **$9657.11** | $-517.26 | $174.37 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9621.25** | $-426.73 | $47.98 | 57 | 51% | $-617.55 | 25 |
| ai_judge | **$9374.92** | $-587.64 | $-37.44 | 7 | 14% | $-600 | 2 |
| random_control | **$9111** | $-979.49 | $90.49 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$9011.12** | $-1116.1 | $127.22 | 538 | 54% | $-1335.23 | 22 |
| mm_slow | **$8594.49** | $-809.59 | $-595.92 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8277.12** | $-1184.03 | $-538.85 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7982.34** | $-1421.89 | $-595.77 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7831.35** | $-2341.02 | $172.37 | 108 | 44% | $-2560.15 | 21 |
| whale_fade | **$6704.5** | $-2758.9 | $-536.6 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.89** | $-931.5 | $-65.61 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8499.58** | $-1937.09 | $436.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8182.52** | $-1590.97 | $-226.51 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6815.6** | $-3334.28 | $149.88 | 208 | 45% | $-3537.31 | 9 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 0 | 0 | 100% | 2.85¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 15 | 0 | 0 | 100% | 1.4¢ |
| maker_sports_badsim | 217 | 138 | 0 | 61% | 1.59¢ |

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

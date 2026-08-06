# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34513 · Last run: 2026-08-06T16:03:01.771Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10339.29** | $46.83 | $292.46 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10285.42** | $513.6 | $-228.18 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10257.4** | $640.15 | $-382.75 | 39 | 62% | $462.37 | 25 |
| maker_sports | **$10218.86** | $0 | $218.86 | 0 | — | $0 | 12 |
| mm_tight | **$10166.35** | $39.37 | $126.98 | 455 | 53% | $-169.73 | 19 |
| maker_flat | **$10133.66** | $0 | $133.66 | 0 | — | $0 | 12 |
| copy_top | **$10004.02** | $-219.6 | $223.62 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9880.3** | $25.97 | $-145.67 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9785.7** | $-706.11 | $491.81 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9736.82** | $-117.16 | $-146.02 | 52 | 52% | $-307.98 | 25 |
| mm_max | **$9706.5** | $-72.84 | $-220.66 | 197 | 53% | $-281.94 | 5 |
| mm_cheap_v2 | **$9680.18** | $-324.33 | $4.51 | 56 | 52% | $-515.15 | 25 |
| strong_dip | **$9650.72** | $-517.26 | $167.98 | 108 | 59% | $-609.57 | 25 |
| ai_judge | **$9378.17** | $-587.64 | $-34.19 | 7 | 14% | $-600 | 2 |
| random_control | **$9120.73** | $-979.49 | $100.22 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$9013.37** | $-912.05 | $-74.58 | 536 | 54% | $-1131.18 | 22 |
| mm_slow | **$8597.66** | $-809.59 | $-592.75 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8282.24** | $-1184.03 | $-533.73 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7975.86** | $-1421.89 | $-602.25 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7833.8** | $-2136.77 | $-29.43 | 106 | 45% | $-2355.9 | 21 |
| whale_fade | **$6691.11** | $-2758.9 | $-549.99 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.4** | $-931.5 | $-69.1 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8512.91** | $-1937.09 | $450 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8161.29** | $-1390.97 | $-447.74 | 97 | 41% | $-1585.09 | 21 |
| maker_sports_badsim (retired) | **$6797.39** | $-3134.28 | $-68.33 | 206 | 46% | $-3337.31 | 11 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 0 | 0 | 100% | 2.85¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 12 | 0 | 0 | 100% | 1.42¢ |
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

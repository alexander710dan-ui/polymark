# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34512 · Last run: 2026-08-06T16:02:32.086Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10335.14** | $46.83 | $288.31 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10284.86** | $513.6 | $-228.74 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10252.58** | $640.15 | $-387.57 | 39 | 62% | $462.37 | 25 |
| maker_sports | **$10193.86** | $0 | $193.86 | 0 | — | $0 | 12 |
| mm_tight | **$10141.74** | $39.37 | $102.37 | 455 | 53% | $-169.73 | 19 |
| maker_flat | **$10133.66** | $0 | $133.66 | 0 | — | $0 | 12 |
| copy_top | **$9999.71** | $-219.6 | $219.31 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9881.35** | $25.97 | $-144.62 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9790.25** | $-706.11 | $496.36 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9733.87** | $-117.16 | $-148.97 | 52 | 52% | $-307.98 | 25 |
| mm_max | **$9706.5** | $-72.84 | $-220.66 | 197 | 53% | $-281.94 | 5 |
| mm_cheap_v2 | **$9677.09** | $-324.33 | $1.42 | 56 | 52% | $-515.15 | 25 |
| strong_dip | **$9651.73** | $-517.26 | $168.99 | 108 | 59% | $-609.57 | 25 |
| ai_judge | **$9375.95** | $-587.64 | $-36.41 | 7 | 14% | $-600 | 2 |
| random_control | **$9127.28** | $-979.49 | $106.77 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8988.75** | $-912.05 | $-99.2 | 536 | 54% | $-1131.18 | 22 |
| mm_slow | **$8595.6** | $-809.59 | $-594.81 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8280.04** | $-1184.03 | $-535.93 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7978.83** | $-1421.89 | $-599.28 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7809.19** | $-2136.77 | $-54.04 | 106 | 45% | $-2355.9 | 21 |
| whale_fade | **$6690.39** | $-2758.9 | $-550.71 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9419.64** | $-730.36 | $150 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8998.22** | $-931.5 | $-70.28 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8158.85** | $-1390.97 | $-450.18 | 97 | 41% | $-1585.09 | 21 |
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

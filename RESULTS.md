# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34705 · Last run: 2026-08-06T17:36:09.690Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10318.65** | $84.76 | $233.89 | 3 | 67% | $-11.32 | 14 |
| maker_sports | **$10226.57** | $92.31 | $134.26 | 3 | 67% | $-7.69 | 21 |
| mm_tight | **$10150.19** | $201.85 | $-51.66 | 461 | 53% | $-7.25 | 23 |
| mm_cheap | **$10095.92** | $640.15 | $-544.23 | 39 | 62% | $462.37 | 25 |
| mid_momentum | **$10093.41** | $513.6 | $-420.19 | 217 | 56% | $300.12 | 25 |
| super | **$10007.77** | $46.83 | $-39.06 | 79 | 51% | $-217.5 | 14 |
| fade_longshot | **$9893.21** | $25.97 | $-132.76 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9728.74** | $-219.6 | $-51.66 | 425 | 52% | $-1548.17 | 25 |
| strong_dip | **$9682.11** | $-517.26 | $199.37 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9648.84** | $-183.26 | $-167.9 | 200 | 53% | $-392.36 | 5 |
| copy_pro | **$9582.73** | $-706.11 | $288.84 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9523.78** | $54.41 | $-530.63 | 54 | 54% | $-136.41 | 25 |
| mm_cheap_v2 | **$9374.74** | $-312.04 | $-313.22 | 58 | 52% | $-502.86 | 25 |
| ai_judge | **$9372.79** | $-587.64 | $-39.57 | 7 | 14% | $-600 | 2 |
| random_control | **$9085.83** | $-979.49 | $65.32 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8986.72** | $-957.27 | $-56.01 | 542 | 54% | $-1176.4 | 25 |
| mm_slow | **$8553.16** | $-809.59 | $-637.25 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8166.61** | $-1127.15 | $-706.24 | 95 | 47% | $-1331.1 | 25 |
| momentum | **$7834.67** | $-1421.89 | $-743.44 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7781.86** | $-2182.19 | $-35.95 | 112 | 46% | $-2401.32 | 25 |
| whale_fade | **$6941.27** | $-2758.9 | $-299.83 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.9** | $-931.5 | $-61.6 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8482.91** | $-1937.09 | $420 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8152.5** | $-1590.97 | $-256.53 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6607.11** | $-3301.72 | $-91.17 | 210 | 45% | $-3504.75 | 7 |
| longshot (retired) | **$5078.49** | $-4791.55 | $-129.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 0 | 0 | 100% | 2.89¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 24 | 0 | 1 | 100% | 1.42¢ |
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

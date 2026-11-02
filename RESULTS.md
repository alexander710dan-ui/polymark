# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87160 · Last run: 2026-11-02T04:16:11.815Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11448.67** | $1446.33 | $2.34 | 500 | 54% | $596.33 | 25 |
| maker_sports | **$11171.72** | $1470.9 | $-299.18 | 116 | 59% | $1258.4 | 7 |
| mid_momentum | **$10705.5** | $755.27 | $-49.77 | 299 | 56% | $541.79 | 25 |
| maker_flat | **$10544.28** | $426.17 | $118.11 | 30 | 53% | $234.62 | 25 |
| mm_tight | **$10543.18** | $679.24 | $-136.06 | 565 | 54% | $470.14 | 5 |
| mm_max | **$10296.26** | $216.12 | $80.14 | 231 | 54% | $7.02 | 2 |
| mm_cheap | **$10069.31** | $375.47 | $-306.16 | 128 | 55% | $183.78 | 25 |
| fade_longshot | **$10006.08** | $-39.09 | $45.17 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9480.32** | $-469.91 | $-49.77 | 134 | 51% | $-662.46 | 25 |
| mm_sports | **$9222.52** | $-459.02 | $-318.46 | 670 | 55% | $-678.15 | 7 |
| mm_cheap_v2 | **$9219.67** | $-474.17 | $-306.16 | 145 | 52% | $-665.86 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9198.58** | $-553.3 | $-248.12 | 176 | 53% | $-757.25 | 25 |
| strong_dip | **$9136.12** | $-880.35 | $16.47 | 163 | 59% | $-973.98 | 24 |
| random_control | **$8953.19** | $-899.06 | $-147.75 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8694.99** | $-1007.21 | $-297.8 | 117 | 50% | $-1206.89 | 25 |
| copy_top | **$8571.75** | $-1053.52 | $-374.73 | 528 | 52% | $-2382.09 | 25 |
| super | **$8353.58** | $-1355.61 | $-290.81 | 124 | 50% | $-1637.51 | 4 |
| mm_sports_v2 | **$7993.21** | $-1688.33 | $-318.46 | 239 | 51% | $-1907.46 | 7 |
| momentum | **$7160.89** | $-2734.26 | $-104.85 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6900.41** | $-2998.02 | $-101.57 | 529 | 47% | $-3449.48 | 25 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 55 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 123 | 1 | 0 | 99% | 1.4¢ |

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

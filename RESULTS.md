# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27049 · Last run: 2026-08-03T18:16:13.426Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11398.67** | $1592.78 | $-194.11 | 285 | 57% | $1389.75 | 25 |
| mm_tight | **$10525.62** | $780.5 | $-254.88 | 245 | 53% | $577.47 | 20 |
| mid_momentum | **$10279.65** | $608.28 | $-328.63 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10277.72** | $832.49 | $-554.77 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$9995.96** | $-337.42 | $333.38 | 96 | 60% | $-429.73 | 25 |
| maker_flat | **$9981.76** | $-100.32 | $82.08 | 5 | 40% | $-227.59 | 7 |
| fade_longshot | **$9955.59** | $34.52 | $-78.93 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9850.93** | $129.01 | $-278.08 | 7 | 57% | $1.74 | 9 |
| mm_max | **$9573.24** | $-233.9 | $-192.86 | 84 | 51% | $-351.29 | 14 |
| copy_pro | **$9563.3** | $-834.75 | $398.05 | 365 | 51% | $-1684.75 | 25 |
| super | **$9556.22** | $-445.84 | $2.06 | 63 | 46% | $-661.69 | 12 |
| copy_top | **$9474.48** | $-666.45 | $140.93 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9403.26** | $-487.64 | $-109.1 | 6 | 17% | $-500 | 3 |
| random_control | **$9302.16** | $-310.74 | $-387.1 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8920.4** | $-821.03 | $-258.57 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8655.48** | $-1190.67 | $-153.85 | 66 | 45% | $-1394.62 | 25 |
| momentum | **$8105.93** | $-1439.53 | $-454.54 | 236 | 67% | $-1927.77 | 25 |
| whale_fade | **$7723.58** | $-1683.64 | $-592.78 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.13** | $-1003.53 | $30.66 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8369.71** | $-1837.09 | $206.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5106.32** | $-4691.55 | $-202.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 12 | 6 | 50% | 2.58¢ |
| maker_sports | 16 | 9 | 6 | 64% | 1.69¢ |

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

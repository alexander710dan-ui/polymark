# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77380 · Last run: 2026-10-30T17:55:39.921Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11865.84** | $1807.48 | $58.36 | 467 | 53% | $957.48 | 25 |
| maker_sports | **$11574.12** | $1477.91 | $96.21 | 49 | 67% | $1265.41 | 25 |
| mid_momentum | **$11361.59** | $664 | $697.59 | 275 | 56% | $450.52 | 25 |
| mm_tight | **$11277.6** | $1241.35 | $36.25 | 507 | 54% | $1032.25 | 22 |
| mm_cheap | **$10900.22** | $384.85 | $515.37 | 100 | 57% | $202.39 | 25 |
| maker_flat | **$10566.67** | $-143.67 | $710.34 | 16 | 50% | $-335.22 | 25 |
| mm_max | **$10527.86** | $463.71 | $64.15 | 219 | 54% | $254.61 | 3 |
| mm_sports | **$10311.31** | $277.69 | $33.62 | 604 | 55% | $58.56 | 25 |
| mid_momentum_v2 | **$10136.41** | $-561.18 | $697.59 | 110 | 51% | $-752 | 25 |
| mm_strong | **$10095.6** | $-447.93 | $543.53 | 156 | 54% | $-651.88 | 25 |
| mm_cheap_v2 | **$10050.58** | $-464.79 | $515.37 | 117 | 52% | $-655.61 | 25 |
| fade_longshot | **$10018.42** | $119.56 | $-101.14 | 156 | 96% | $108.82 | 25 |
| copy_top | **$9973** | $58.98 | $-85.98 | 484 | 53% | $-1269.59 | 25 |
| super | **$9959.1** | $-117.27 | $76.37 | 96 | 52% | $-399.17 | 7 |
| conviction | **$9901.6** | $-102.55 | $4.15 | 1 | 0% | $0 | 2 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9082** | $-951.62 | $33.62 | 173 | 52% | $-1170.75 | 25 |
| mm_slow | **$9037.05** | $-1464.18 | $501.23 | 111 | 50% | $-1649.89 | 25 |
| strong_dip | **$8731.15** | $-810.94 | $-457.91 | 150 | 59% | $-903.25 | 25 |
| random_control | **$8591.65** | $-1304.86 | $-103.49 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7548.94** | $-2520.34 | $69.28 | 299 | 66% | $-3008.58 | 25 |
| whale_fade | **$6047.85** | $-3770.48 | $-181.67 | 485 | 46% | $-4221.94 | 25 |
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
| maker_flat | 41 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 74 | 1 | 0 | 99% | 1.44¢ |

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

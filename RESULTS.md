# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 78381 · Last run: 2026-10-30T21:56:02.699Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11842.16** | $1581.07 | $261.09 | 470 | 53% | $731.07 | 25 |
| mid_momentum | **$11357.73** | $744.31 | $613.42 | 277 | 56% | $530.83 | 25 |
| maker_sports | **$11321.38** | $1327.16 | $-5.78 | 52 | 65% | $1114.66 | 25 |
| mm_tight | **$11057.32** | $1122.88 | $-65.56 | 510 | 54% | $913.78 | 25 |
| mm_cheap | **$10890.91** | $465.16 | $425.75 | 102 | 57% | $282.7 | 25 |
| mm_max | **$10521.25** | $448.05 | $73.2 | 221 | 54% | $238.95 | 3 |
| maker_flat | **$10295.95** | $-57.96 | $353.91 | 18 | 50% | $-249.51 | 25 |
| mid_momentum_v2 | **$10132.55** | $-480.87 | $613.42 | 112 | 51% | $-671.69 | 25 |
| mm_strong | **$10067.07** | $-367.39 | $434.46 | 158 | 54% | $-571.34 | 25 |
| mm_cheap_v2 | **$10041.27** | $-384.48 | $425.75 | 119 | 52% | $-575.3 | 25 |
| mm_sports | **$10006.72** | $72.89 | $-66.17 | 606 | 55% | $-146.24 | 25 |
| fade_longshot | **$9926.4** | $21.44 | $-95.04 | 158 | 95% | $10.7 | 25 |
| copy_top | **$9899.95** | $-116.37 | $16.32 | 487 | 53% | $-1444.94 | 25 |
| conviction | **$9803.65** | $-204.69 | $8.34 | 2 | 0% | $-102.55 | 1 |
| super | **$9746.63** | $-321.55 | $68.18 | 97 | 52% | $-603.45 | 18 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9020.7** | $-1297.59 | $318.29 | 114 | 50% | $-1483.3 | 25 |
| random_control | **$8788.39** | $-1304.86 | $93.25 | 187 | 55% | $-1919.15 | 25 |
| mm_sports_v2 | **$8777.41** | $-1156.42 | $-66.17 | 175 | 51% | $-1375.55 | 25 |
| strong_dip | **$8677.29** | $-912.64 | $-410.07 | 151 | 59% | $-1004.95 | 25 |
| momentum | **$7436.37** | $-2441.58 | $-122.05 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6113.51** | $-3602.01 | $-284.48 | 488 | 46% | $-4053.47 | 25 |
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
| maker_flat | 43 | 0 | 0 | 100% | 2.58¢ |
| maker_sports | 77 | 1 | 0 | 99% | 1.42¢ |

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

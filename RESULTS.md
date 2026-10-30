# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77945 · Last run: 2026-10-30T20:11:58.587Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11756.34** | $1552.35 | $203.99 | 469 | 53% | $702.35 | 25 |
| maker_sports | **$11383.28** | $1327.16 | $56.12 | 52 | 65% | $1114.66 | 24 |
| mm_tight | **$11113.88** | $1122.88 | $-9 | 510 | 54% | $913.78 | 25 |
| mid_momentum | **$11098.7** | $744.31 | $354.39 | 277 | 56% | $530.83 | 25 |
| mm_cheap | **$10637.71** | $465.16 | $172.55 | 102 | 57% | $282.7 | 25 |
| mm_max | **$10511.56** | $448.05 | $63.51 | 221 | 54% | $238.95 | 2 |
| maker_flat | **$10342.92** | $-57.96 | $400.88 | 18 | 50% | $-249.51 | 25 |
| mm_sports | **$10068.11** | $72.89 | $-4.78 | 606 | 55% | $-146.24 | 25 |
| fade_longshot | **$10023.29** | $21.44 | $1.85 | 158 | 95% | $10.7 | 25 |
| copy_top | **$9910.12** | $-145.09 | $55.21 | 486 | 53% | $-1473.66 | 25 |
| mid_momentum_v2 | **$9873.52** | $-480.87 | $354.39 | 112 | 51% | $-671.69 | 25 |
| mm_strong | **$9862.97** | $-367.39 | $230.36 | 158 | 54% | $-571.34 | 25 |
| conviction | **$9803.65** | $-204.69 | $8.34 | 2 | 0% | $-102.55 | 1 |
| mm_cheap_v2 | **$9788.07** | $-384.48 | $172.55 | 119 | 52% | $-575.3 | 25 |
| super | **$9751.8** | $-321.55 | $73.35 | 97 | 52% | $-603.45 | 13 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$9001.06** | $-1297.59 | $298.65 | 114 | 50% | $-1483.3 | 25 |
| mm_sports_v2 | **$8838.8** | $-1156.42 | $-4.78 | 175 | 51% | $-1375.55 | 25 |
| strong_dip | **$8821.06** | $-912.64 | $-266.3 | 151 | 59% | $-1004.95 | 25 |
| random_control | **$8582.71** | $-1304.86 | $-112.43 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7558.72** | $-2337.88 | $-103.4 | 300 | 66% | $-2826.12 | 25 |
| whale_fade | **$6069.15** | $-3498.21 | $-432.64 | 487 | 46% | $-3949.67 | 25 |
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
| maker_sports | 76 | 1 | 1 | 99% | 1.43¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70529 · Last run: 2026-10-29T14:58:54.102Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$10432.76** | $469.76 | $-37 | 7 | 86% | $278.21 | 3 |
| mm_tight | **$10400.45** | $402.24 | $-1.79 | 474 | 53% | $193.14 | 2 |
| maker_flat | **$10349.8** | $493 | $-143.2 | 7 | 86% | $301.45 | 14 |
| mid_momentum | **$10259.88** | $275.05 | $-15.17 | 249 | 55% | $61.57 | 15 |
| copy_pro | **$10219.15** | $274.83 | $-55.68 | 433 | 53% | $-575.17 | 25 |
| fade_longshot | **$10070.4** | $80 | $-9.6 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9880.54** | $-118.65 | $-0.81 | 205 | 53% | $-327.75 | 1 |
| strong_dip | **$9624.81** | $-320.64 | $-54.55 | 135 | 61% | $-412.95 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9557.17** | $-300.77 | $-142.06 | 69 | 52% | $-483.23 | 13 |
| copy_top | **$9543.02** | $-398.51 | $-58.47 | 450 | 53% | $-1727.08 | 12 |
| mm_sports | **$9301.84** | $-651.08 | $-47.08 | 560 | 54% | $-870.21 | 3 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9034.7** | $-950.13 | $-15.17 | 84 | 46% | $-1140.95 | 15 |
| random_control | **$8730.74** | $-1086.59 | $-182.67 | 179 | 56% | $-1700.88 | 25 |
| mm_cheap_v2 | **$8707.53** | $-1150.41 | $-142.06 | 86 | 47% | $-1341.23 | 13 |
| mm_strong | **$8423.08** | $-1440.89 | $-136.03 | 127 | 49% | $-1644.84 | 13 |
| mm_slow | **$8313.45** | $-1672.36 | $-14.19 | 95 | 47% | $-1858.07 | 14 |
| mm_sports_v2 | **$8072.53** | $-1880.39 | $-47.08 | 129 | 48% | $-2099.52 | 3 |
| momentum | **$7373.86** | $-2548.15 | $-77.99 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6352.68** | $-3759.78 | $112.46 | 451 | 46% | $-4114.33 | 12 |
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
| maker_flat | 21 | 0 | 0 | 100% | 2.84¢ |
| maker_sports | 10 | 1 | 0 | 91% | 1.97¢ |

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

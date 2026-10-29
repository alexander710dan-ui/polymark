# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72794 · Last run: 2026-10-29T23:58:57.119Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11179.09** | $964.2 | $214.89 | 447 | 53% | $114.2 | 25 |
| maker_sports | **$11125.53** | $1082.89 | $42.64 | 26 | 77% | $891.34 | 12 |
| mm_tight | **$10930.97** | $734.44 | $196.53 | 487 | 54% | $525.34 | 9 |
| mid_momentum | **$10891.82** | $702.78 | $189.04 | 268 | 56% | $489.3 | 25 |
| mm_cheap | **$10394.98** | $50.67 | $344.31 | 87 | 55% | $-131.79 | 25 |
| mm_max | **$10159.71** | $153.3 | $6.41 | 210 | 54% | $-55.8 | 3 |
| fade_longshot | **$10040.16** | $89.44 | $-49.28 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9969.52** | $-107 | $76.52 | 13 | 46% | $-298.55 | 25 |
| mm_sports | **$9940.05** | $-78.47 | $18.52 | 579 | 55% | $-297.6 | 12 |
| copy_top | **$9933.51** | $-342.79 | $276.3 | 462 | 53% | $-1671.36 | 23 |
| super | **$9892.44** | $-424.16 | $316.6 | 92 | 51% | $-688.49 | 4 |
| mid_momentum_v2 | **$9666.64** | $-522.4 | $189.04 | 103 | 50% | $-713.22 | 25 |
| mm_cheap_v2 | **$9545.34** | $-798.97 | $344.31 | 104 | 50% | $-989.79 | 25 |
| mm_strong | **$9248.01** | $-1107 | $355.01 | 145 | 52% | $-1310.95 | 25 |
| strong_dip | **$9241.52** | $-351.52 | $-406.96 | 142 | 61% | $-443.83 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$8854.71** | $-1443.54 | $298.25 | 105 | 50% | $-1629.25 | 25 |
| mm_sports_v2 | **$8710.74** | $-1307.78 | $18.52 | 148 | 51% | $-1526.91 | 12 |
| random_control | **$8579.87** | $-1294.96 | $-125.17 | 183 | 56% | $-1909.25 | 25 |
| momentum | **$7435.23** | $-2533.86 | $-30.91 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5620.97** | $-3883.02 | $-496.01 | 463 | 46% | $-4237.57 | 23 |
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
| maker_flat | 38 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 38 | 1 | 0 | 97% | 1.57¢ |

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

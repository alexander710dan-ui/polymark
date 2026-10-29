# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72657 · Last run: 2026-10-29T23:27:13.470Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11191.39** | $1082.89 | $108.5 | 26 | 77% | $891.34 | 10 |
| copy_pro | **$11082.95** | $964.2 | $118.75 | 447 | 53% | $114.2 | 25 |
| mm_tight | **$10912.09** | $734.44 | $177.65 | 487 | 54% | $525.34 | 9 |
| mid_momentum | **$10882.99** | $702.78 | $180.21 | 268 | 56% | $489.3 | 25 |
| mm_cheap | **$10343.37** | $50.67 | $292.7 | 87 | 55% | $-131.79 | 25 |
| mm_max | **$10134.47** | $153.3 | $-18.83 | 210 | 54% | $-55.8 | 2 |
| fade_longshot | **$10030.3** | $89.44 | $-59.14 | 152 | 95% | $78.7 | 25 |
| mm_sports | **$10008.67** | $-78.47 | $87.14 | 579 | 55% | $-297.6 | 11 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9943.96** | $-107 | $50.96 | 13 | 46% | $-298.55 | 25 |
| copy_top | **$9848.96** | $-342.79 | $191.75 | 462 | 53% | $-1671.36 | 22 |
| super | **$9786.66** | $-424.16 | $210.82 | 92 | 51% | $-688.49 | 4 |
| mid_momentum_v2 | **$9657.81** | $-522.4 | $180.21 | 103 | 50% | $-713.22 | 25 |
| mm_cheap_v2 | **$9493.73** | $-798.97 | $292.7 | 104 | 50% | $-989.79 | 25 |
| strong_dip | **$9267.26** | $-351.52 | $-381.22 | 142 | 61% | $-443.83 | 19 |
| mm_strong | **$9218.63** | $-1107 | $325.63 | 145 | 52% | $-1310.95 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_slow | **$8804.54** | $-1443.54 | $248.08 | 105 | 50% | $-1629.25 | 25 |
| mm_sports_v2 | **$8779.36** | $-1307.78 | $87.14 | 148 | 51% | $-1526.91 | 11 |
| random_control | **$8614.7** | $-1294.96 | $-90.34 | 183 | 56% | $-1909.25 | 25 |
| momentum | **$7442.07** | $-2533.86 | $-24.07 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5721.88** | $-3883.02 | $-395.1 | 463 | 46% | $-4237.57 | 22 |
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
| maker_sports | 36 | 1 | 1 | 97% | 1.6¢ |

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

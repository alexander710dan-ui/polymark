# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69941 · Last run: 2026-10-29T12:42:52.329Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10319.64** | $323.83 | $-4.19 | 3 | 100% | $132.28 | 13 |
| maker_sports | **$10315.8** | $390.97 | $-75.17 | 4 | 100% | $199.42 | 4 |
| copy_pro | **$10271.78** | $68.12 | $203.66 | 430 | 52% | $-781.88 | 18 |
| mm_tight | **$10263.11** | $309.6 | $-46.49 | 470 | 53% | $100.5 | 4 |
| mid_momentum | **$10096.5** | $105.68 | $-9.18 | 245 | 55% | $-107.8 | 17 |
| fade_longshot | **$10083.28** | $77.06 | $6.22 | 150 | 95% | $66.32 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$9752.21** | $-218.44 | $-29.35 | 134 | 62% | $-310.75 | 6 |
| mm_max | **$9741.91** | $-211.59 | $-46.5 | 201 | 53% | $-420.69 | 4 |
| copy_top | **$9622.41** | $-398.51 | $20.92 | 450 | 53% | $-1727.08 | 8 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9515.39** | $-428.93 | $-55.68 | 66 | 52% | $-606.71 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9158.91** | $-820.45 | $-20.64 | 556 | 54% | $-1039.58 | 5 |
| mid_momentum_v2 | **$8871.32** | $-1119.5 | $-9.18 | 80 | 45% | $-1310.32 | 17 |
| random_control | **$8830.26** | $-1023.69 | $-146.05 | 177 | 56% | $-1637.98 | 25 |
| mm_cheap_v2 | **$8665.75** | $-1278.57 | $-55.68 | 83 | 46% | $-1469.39 | 12 |
| mm_strong | **$8438.04** | $-1533.83 | $-28.13 | 123 | 48% | $-1737.78 | 14 |
| mm_slow | **$8149.09** | $-1841.73 | $-9.18 | 91 | 46% | $-2027.44 | 17 |
| mm_sports_v2 | **$7929.6** | $-2049.76 | $-20.64 | 125 | 47% | $-2268.89 | 5 |
| momentum | **$7411.04** | $-2548.15 | $-40.81 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6204.77** | $-3759.78 | $-35.45 | 451 | 46% | $-4114.33 | 8 |
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
| maker_flat | 16 | 0 | 0 | 100% | 2.91¢ |
| maker_sports | 8 | 0 | 1 | 100% | 2.09¢ |

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

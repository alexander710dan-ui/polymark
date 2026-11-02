# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 86980 · Last run: 2026-11-02T03:01:04.156Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11542.57** | $1650.53 | $-107.96 | 111 | 60% | $1438.03 | 11 |
| copy_pro | **$11481.19** | $1446.33 | $34.86 | 500 | 54% | $596.33 | 25 |
| mid_momentum | **$10801.63** | $857.92 | $-56.29 | 298 | 56% | $644.44 | 25 |
| mm_tight | **$10778.23** | $772.52 | $5.71 | 561 | 54% | $563.42 | 8 |
| maker_flat | **$10517.64** | $426.17 | $91.47 | 30 | 53% | $234.62 | 25 |
| mm_max | **$10297.03** | $216.12 | $80.91 | 231 | 54% | $7.02 | 2 |
| mm_cheap | **$10221.47** | $478.12 | $-256.65 | 127 | 56% | $286.43 | 25 |
| fade_longshot | **$10003.83** | $-39.09 | $42.92 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9683.4** | $-306.99 | $-9.61 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9597.83** | $-262.54 | $-139.63 | 665 | 55% | $-481.67 | 11 |
| mid_momentum_v2 | **$9576.45** | $-367.26 | $-56.29 | 133 | 51% | $-559.81 | 25 |
| mm_cheap_v2 | **$9371.83** | $-371.52 | $-256.65 | 144 | 52% | $-563.21 | 25 |
| mm_strong | **$9234.62** | $-450.65 | $-314.73 | 175 | 54% | $-654.6 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$9098.46** | $-963.24 | $61.7 | 162 | 59% | $-1056.87 | 25 |
| random_control | **$8945.49** | $-899.06 | $-155.45 | 190 | 55% | $-1513.35 | 25 |
| copy_top | **$8812.73** | $-1053.52 | $-133.75 | 528 | 52% | $-2382.09 | 25 |
| mm_slow | **$8698.52** | $-1007.21 | $-294.27 | 117 | 50% | $-1206.89 | 25 |
| super | **$8658.04** | $-1150.21 | $-191.75 | 123 | 50% | $-1432.11 | 5 |
| mm_sports_v2 | **$8368.52** | $-1491.85 | $-139.63 | 234 | 52% | $-1710.98 | 11 |
| momentum | **$7169.02** | $-2734.26 | $-96.72 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6711.08** | $-2998.02 | $-290.9 | 529 | 47% | $-3449.48 | 25 |
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
| maker_sports | 122 | 1 | 0 | 99% | 1.39¢ |

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

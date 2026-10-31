# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79560 · Last run: 2026-10-31T02:46:30.830Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11567.75** | $1831.75 | $-264 | 68 | 66% | $1619.25 | 13 |
| mid_momentum | **$11321.86** | $910.8 | $411.06 | 280 | 56% | $697.32 | 25 |
| copy_pro | **$11139.62** | $1142.45 | $-2.83 | 479 | 53% | $292.45 | 25 |
| mm_tight | **$11000.24** | $1461.82 | $-461.58 | 527 | 54% | $1252.72 | 12 |
| mm_cheap | **$10848.85** | $631.65 | $217.2 | 105 | 57% | $449.19 | 25 |
| mm_max | **$10401.78** | $432.17 | $-30.39 | 226 | 54% | $223.07 | 2 |
| maker_flat | **$10297.36** | $-152.88 | $450.24 | 23 | 48% | $-344.43 | 24 |
| mm_sports | **$10157.77** | $338.29 | $-180.52 | 622 | 55% | $119.16 | 13 |
| mid_momentum_v2 | **$10096.68** | $-314.38 | $411.06 | 115 | 51% | $-505.2 | 25 |
| mm_cheap_v2 | **$9999.21** | $-217.99 | $217.2 | 122 | 52% | $-408.81 | 25 |
| mm_strong | **$9991.03** | $-364.58 | $355.61 | 162 | 54% | $-568.53 | 24 |
| fade_longshot | **$9918.43** | $-78.68 | $-2.89 | 159 | 94% | $-89.42 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| super | **$9611.99** | $-259.46 | $-128.55 | 106 | 52% | $-541.36 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9159.07** | $-794.17 | $-46.76 | 189 | 56% | $-1408.46 | 25 |
| copy_top | **$9130.8** | $-747.19 | $-122.01 | 495 | 53% | $-2075.76 | 24 |
| mm_slow | **$8977.56** | $-1297.59 | $275.15 | 114 | 50% | $-1483.3 | 25 |
| mm_sports_v2 | **$8928.46** | $-891.02 | $-180.52 | 191 | 52% | $-1110.15 | 13 |
| strong_dip | **$8613.39** | $-1136.1 | $-250.51 | 155 | 58% | $-1228.41 | 24 |
| momentum | **$7295.09** | $-2644.98 | $-59.93 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$7032.65** | $-2797.24 | $-170.11 | 496 | 47% | $-3248.7 | 24 |
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
| maker_flat | 47 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 81 | 1 | 0 | 99% | 1.45¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 90495 · Last run: 2026-11-03T15:49:42.738Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12513.06** | $2431.07 | $81.99 | 516 | 54% | $1581.07 | 19 |
| maker_sports | **$11840.19** | $1273.84 | $566.35 | 197 | 57% | $1040.51 | 11 |
| mm_tight | **$11336.89** | $1029.31 | $307.58 | 639 | 54% | $810.18 | 11 |
| maker_flat | **$10970.66** | $488.72 | $481.94 | 53 | 53% | $294.6 | 25 |
| mid_momentum | **$10841.58** | $753.78 | $87.8 | 312 | 56% | $540.3 | 25 |
| mm_max | **$10398.59** | $-21.27 | $419.86 | 260 | 53% | $-230.37 | 9 |
| mm_cheap | **$10269.95** | $324.11 | $-54.16 | 142 | 55% | $132.42 | 25 |
| mm_slow | **$10027.97** | $-662.96 | $690.93 | 134 | 51% | $-872.06 | 25 |
| mm_sports | **$9868.99** | $-632.24 | $501.23 | 756 | 54% | $-851.37 | 12 |
| fade_longshot | **$9792** | $-210.25 | $2.25 | 178 | 94% | $-220.99 | 25 |
| mm_strong | **$9788.1** | $-395.64 | $183.74 | 202 | 54% | $-599.59 | 25 |
| conviction | **$9685.95** | $-306.99 | $-7.06 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9616.4** | $-471.4 | $87.8 | 147 | 51% | $-663.95 | 25 |
| mm_cheap_v2 | **$9420.31** | $-525.53 | $-54.16 | 159 | 52% | $-717.22 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$8721.16** | $-1201.39 | $-77.45 | 548 | 53% | $-2529.96 | 20 |
| strong_dip | **$8707.16** | $-1082.61 | $-210.23 | 192 | 58% | $-1176.24 | 24 |
| mm_sports_v2 | **$8639.68** | $-1861.55 | $501.23 | 325 | 51% | $-2080.68 | 12 |
| super | **$8620.24** | $-1370.14 | $-9.62 | 131 | 50% | $-1652.04 | 2 |
| random_control | **$8606.21** | $-1203.06 | $-190.73 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$6811.88** | $-2991.46 | $-196.66 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6466.05** | $-3425.44 | $-108.51 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 78 | 0 | 0 | 100% | 2.69¢ |
| maker_sports | 208 | 1 | 0 | 100% | 1.33¢ |

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

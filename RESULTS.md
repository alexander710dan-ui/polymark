# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91378 · Last run: 2026-11-04T05:17:23.342Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12496.49** | $2431.07 | $65.42 | 516 | 54% | $1581.07 | 19 |
| mm_cheap | **$11886.35** | $558.27 | $1328.08 | 144 | 56% | $366.58 | 24 |
| mid_momentum | **$11644.68** | $842.64 | $802.04 | 320 | 56% | $629.16 | 25 |
| maker_sports | **$11539.45** | $872.07 | $667.38 | 227 | 56% | $638.74 | 8 |
| maker_flat | **$11497.66** | $88.72 | $1408.94 | 57 | 49% | $-105.4 | 25 |
| mm_tight | **$11331.03** | $909.08 | $421.95 | 662 | 54% | $689.95 | 9 |
| mm_cheap_v2 | **$11036.71** | $-291.37 | $1328.08 | 161 | 52% | $-483.06 | 24 |
| mid_momentum_v2 | **$10419.5** | $-382.54 | $802.04 | 155 | 51% | $-575.09 | 25 |
| mm_max | **$10204.14** | $-223.37 | $427.51 | 274 | 53% | $-432.47 | 7 |
| mm_slow | **$10087.2** | $-489.84 | $577.04 | 142 | 52% | $-698.94 | 25 |
| mm_strong | **$9999.46** | $-664.86 | $664.32 | 216 | 53% | $-868.81 | 25 |
| fade_longshot | **$9896.4** | $-189.2 | $85.6 | 181 | 94% | $-199.94 | 25 |
| conviction | **$9593.08** | $-306.99 | $-99.93 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9358.78** | $-1250.95 | $609.73 | 787 | 54% | $-1470.08 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8696.54** | $-879.2 | $-424.26 | 202 | 59% | $-972.83 | 23 |
| super | **$8579.86** | $-1370.14 | $-50 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8408.84** | $-1201.39 | $-389.77 | 548 | 53% | $-2529.96 | 20 |
| mm_sports_v2 | **$8129.47** | $-2480.26 | $609.73 | 356 | 51% | $-2699.39 | 9 |
| random_control | **$7850.59** | $-1203.06 | $-946.35 | 193 | 54% | $-1817.35 | 25 |
| momentum | **$7493.49** | $-2991.46 | $484.95 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$6453.22** | $-3425.44 | $-121.34 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 82 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 235 | 1 | 0 | 100% | 1.32¢ |

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

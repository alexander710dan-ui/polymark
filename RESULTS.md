# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91246 · Last run: 2026-11-04T03:27:35.271Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12446.59** | $2431.07 | $15.52 | 516 | 54% | $1581.07 | 19 |
| mm_cheap | **$11831.17** | $438.8 | $1392.37 | 143 | 55% | $247.11 | 25 |
| mid_momentum | **$11737.63** | $723.17 | $1014.46 | 319 | 55% | $509.69 | 25 |
| maker_sports | **$11401.21** | $554.93 | $846.28 | 223 | 55% | $321.6 | 11 |
| maker_flat | **$11377.69** | $88.72 | $1288.97 | 57 | 49% | $-105.4 | 24 |
| mm_tight | **$11202.48** | $768.3 | $434.18 | 660 | 53% | $549.17 | 10 |
| mm_cheap_v2 | **$10981.53** | $-410.84 | $1392.37 | 160 | 52% | $-602.53 | 25 |
| mid_momentum_v2 | **$10512.45** | $-502.01 | $1014.46 | 154 | 51% | $-694.56 | 25 |
| mm_max | **$10109.19** | $-223.37 | $332.56 | 274 | 53% | $-432.47 | 6 |
| mm_strong | **$10038.77** | $-729.53 | $768.3 | 215 | 53% | $-933.48 | 25 |
| mm_slow | **$9993.14** | $-489.84 | $482.98 | 142 | 52% | $-698.94 | 23 |
| fade_longshot | **$9880.06** | $-197.58 | $77.64 | 180 | 94% | $-208.32 | 25 |
| conviction | **$9596.65** | $-306.99 | $-96.36 | 3 | 0% | $-204.85 | 1 |
| mm_sports | **$9233.49** | $-1546.76 | $780.25 | 783 | 54% | $-1765.89 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8672.54** | $-838.98 | $-488.48 | 200 | 59% | $-932.61 | 25 |
| super | **$8577.24** | $-1370.14 | $-52.62 | 131 | 50% | $-1652.04 | 2 |
| copy_top | **$8444.22** | $-1201.39 | $-354.39 | 548 | 53% | $-2529.96 | 20 |
| random_control | **$8009.06** | $-1203.06 | $-787.88 | 193 | 54% | $-1817.35 | 25 |
| mm_sports_v2 | **$8004.18** | $-2776.07 | $780.25 | 352 | 51% | $-2995.2 | 12 |
| momentum | **$7489.26** | $-2991.46 | $480.72 | 315 | 65% | $-3479.7 | 25 |
| whale_fade | **$7124.86** | $-3425.44 | $550.3 | 546 | 47% | $-3876.9 | 21 |
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
| maker_flat | 81 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 234 | 1 | 0 | 100% | 1.32¢ |

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

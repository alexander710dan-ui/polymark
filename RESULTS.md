# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89422 · Last run: 2026-11-02T22:13:02.080Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11975.92** | $2156.34 | $-180.42 | 510 | 54% | $1306.34 | 25 |
| maker_sports | **$10861.72** | $880.05 | $-18.33 | 156 | 56% | $667.55 | 17 |
| mid_momentum | **$10576.68** | $524.96 | $51.72 | 306 | 56% | $311.48 | 25 |
| mm_tight | **$10472.45** | $525.37 | $-52.92 | 602 | 53% | $316.27 | 12 |
| maker_flat | **$10309.56** | $350.14 | $-40.58 | 42 | 52% | $158.59 | 24 |
| fade_longshot | **$9983.88** | $-25.49 | $9.37 | 174 | 95% | $-36.23 | 25 |
| mm_cheap | **$9958.67** | $71.35 | $-112.68 | 138 | 54% | $-120.34 | 25 |
| mm_max | **$9931.64** | $-96.16 | $27.8 | 247 | 53% | $-305.26 | 2 |
| conviction | **$9682.02** | $-306.99 | $-10.99 | 3 | 0% | $-204.85 | 1 |
| strong_dip | **$9528.26** | $-582.13 | $110.39 | 177 | 60% | $-675.76 | 24 |
| mid_momentum_v2 | **$9351.5** | $-700.22 | $51.72 | 141 | 50% | $-892.77 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9109.03** | $-778.29 | $-112.68 | 155 | 51% | $-969.98 | 25 |
| mm_sports | **$9009.96** | $-935.39 | $-54.65 | 713 | 54% | $-1154.52 | 17 |
| mm_strong | **$8956.39** | $-820.8 | $-222.81 | 187 | 53% | $-1024.75 | 25 |
| random_control | **$8918.11** | $-899.06 | $-182.83 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8659.78** | $-1149.52 | $-190.7 | 123 | 50% | $-1349.2 | 25 |
| super | **$8595.86** | $-1375.81 | $-28.33 | 128 | 50% | $-1657.71 | 5 |
| copy_top | **$8486.08** | $-1399.58 | $-114.34 | 543 | 52% | $-2728.15 | 25 |
| mm_sports_v2 | **$7780.65** | $-2164.7 | $-54.65 | 282 | 50% | $-2383.83 | 17 |
| momentum | **$7038.74** | $-2788.51 | $-172.75 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6823.25** | $-3012.98 | $-163.77 | 542 | 47% | $-3464.44 | 25 |
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
| maker_flat | 66 | 0 | 0 | 100% | 2.75¢ |
| maker_sports | 173 | 1 | 0 | 99% | 1.38¢ |

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

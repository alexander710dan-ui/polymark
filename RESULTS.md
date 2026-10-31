# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79470 · Last run: 2026-10-31T02:23:42.959Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11826.71** | $1961.25 | $-134.54 | 63 | 68% | $1748.75 | 17 |
| mid_momentum | **$11407.37** | $830.64 | $576.73 | 278 | 56% | $617.16 | 25 |
| mm_tight | **$11250.6** | $1712.51 | $-461.91 | 521 | 55% | $1503.41 | 17 |
| copy_pro | **$11135.54** | $1244.75 | $-109.21 | 478 | 53% | $394.75 | 25 |
| mm_cheap | **$10934.26** | $551.49 | $382.77 | 103 | 57% | $369.03 | 25 |
| mm_max | **$10429.55** | $432.17 | $-2.62 | 226 | 54% | $223.07 | 1 |
| mm_sports | **$10379.95** | $588.98 | $-209.03 | 616 | 55% | $369.85 | 18 |
| maker_flat | **$10275.27** | $-145.19 | $420.46 | 21 | 48% | $-336.74 | 25 |
| mid_momentum_v2 | **$10182.19** | $-394.54 | $576.73 | 113 | 51% | $-585.36 | 25 |
| mm_cheap_v2 | **$10084.62** | $-298.15 | $382.77 | 120 | 53% | $-488.97 | 25 |
| super | **$10073.72** | $13.42 | $60.3 | 101 | 52% | $-268.48 | 14 |
| mm_strong | **$10056.78** | $-284.5 | $341.28 | 159 | 55% | $-488.45 | 25 |
| fade_longshot | **$9920.19** | $21.44 | $-101.25 | 158 | 95% | $10.7 | 25 |
| conviction | **$9695.4** | $-204.69 | $-99.91 | 2 | 0% | $-102.55 | 1 |
| copy_top | **$9222.83** | $-644.89 | $-132.28 | 494 | 53% | $-1973.46 | 23 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9159.97** | $-794.17 | $-45.86 | 189 | 56% | $-1408.46 | 25 |
| mm_sports_v2 | **$9150.64** | $-640.33 | $-209.03 | 185 | 53% | $-859.46 | 18 |
| mm_slow | **$8979.18** | $-1297.59 | $276.77 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8568.67** | $-1116.99 | $-314.34 | 153 | 58% | $-1209.3 | 25 |
| momentum | **$7306.44** | $-2441.58 | $-251.98 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6917.56** | $-2907.36 | $-175.08 | 495 | 47% | $-3358.82 | 23 |
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
| maker_flat | 46 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 80 | 1 | 0 | 99% | 1.4¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 70665 · Last run: 2026-10-29T15:31:52.812Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10363.88** | $402.24 | $-38.36 | 474 | 53% | $193.14 | 3 |
| maker_sports | **$10347.98** | $469.76 | $-121.78 | 7 | 86% | $278.21 | 5 |
| maker_flat | **$10184.95** | $493 | $-308.05 | 7 | 86% | $301.45 | 17 |
| mid_momentum | **$10138.58** | $275.05 | $-136.47 | 249 | 55% | $61.57 | 18 |
| copy_pro | **$10071.79** | $486.26 | $-414.47 | 434 | 53% | $-363.74 | 25 |
| fade_longshot | **$10056.05** | $80 | $-23.95 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$9843.97** | $-118.65 | $-37.38 | 205 | 53% | $-327.75 | 2 |
| strong_dip | **$9628.73** | $-320.64 | $-50.63 | 135 | 61% | $-412.95 | 7 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| copy_top | **$9524.27** | $-257.56 | $-218.17 | 451 | 53% | $-1586.13 | 15 |
| mm_cheap | **$9448.15** | $-300.77 | $-251.08 | 69 | 52% | $-483.23 | 16 |
| mm_sports | **$9214.91** | $-651.08 | $-134.01 | 560 | 54% | $-870.21 | 6 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$8913.4** | $-950.13 | $-136.47 | 84 | 46% | $-1140.95 | 18 |
| random_control | **$8731.4** | $-1086.59 | $-182.01 | 179 | 56% | $-1700.88 | 25 |
| mm_cheap_v2 | **$8598.51** | $-1150.41 | $-251.08 | 86 | 47% | $-1341.23 | 16 |
| mm_strong | **$8314.39** | $-1440.89 | $-244.72 | 127 | 49% | $-1644.84 | 16 |
| mm_slow | **$8193.03** | $-1672.36 | $-134.61 | 95 | 47% | $-1858.07 | 16 |
| mm_sports_v2 | **$7985.6** | $-1880.39 | $-134.01 | 129 | 48% | $-2099.52 | 6 |
| momentum | **$7340.61** | $-2548.15 | $-111.24 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6355.65** | $-3861.78 | $217.43 | 452 | 46% | $-4216.33 | 15 |
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
| maker_flat | 24 | 0 | 0 | 100% | 2.86¢ |
| maker_sports | 12 | 1 | 0 | 92% | 1.97¢ |

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

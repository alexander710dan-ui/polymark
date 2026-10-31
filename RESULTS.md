# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79382 · Last run: 2026-10-31T02:01:25.614Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11737.61** | $1467.09 | $270.52 | 58 | 66% | $1254.59 | 21 |
| mid_momentum | **$11494.88** | $830.64 | $664.24 | 278 | 56% | $617.16 | 25 |
| mm_tight | **$11261.03** | $1249.92 | $11.11 | 516 | 54% | $1040.82 | 21 |
| copy_pro | **$11230.29** | $1622.66 | $-392.37 | 475 | 53% | $772.66 | 25 |
| mm_cheap | **$11022.03** | $551.49 | $470.54 | 103 | 57% | $369.03 | 25 |
| mm_max | **$10429.66** | $432.17 | $-2.51 | 226 | 54% | $223.07 | 1 |
| maker_flat | **$10290.03** | $-145.19 | $435.22 | 21 | 48% | $-336.74 | 24 |
| mid_momentum_v2 | **$10269.7** | $-394.54 | $664.24 | 113 | 51% | $-585.36 | 25 |
| mm_sports | **$10242.87** | $126.39 | $116.48 | 611 | 55% | $-92.74 | 22 |
| mm_cheap_v2 | **$10172.39** | $-298.15 | $470.54 | 120 | 53% | $-488.97 | 25 |
| mm_strong | **$10097.67** | $-367.39 | $465.06 | 158 | 54% | $-571.34 | 25 |
| fade_longshot | **$9918.3** | $21.44 | $-103.14 | 158 | 95% | $10.7 | 25 |
| super | **$9750.48** | $-318.38 | $68.86 | 99 | 52% | $-600.28 | 16 |
| conviction | **$9711.05** | $-204.69 | $-84.26 | 2 | 0% | $-102.55 | 1 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9176.39** | $-337.49 | $-486.12 | 491 | 53% | $-1666.06 | 24 |
| random_control | **$9174.3** | $-794.17 | $-31.53 | 189 | 56% | $-1408.46 | 25 |
| mm_sports_v2 | **$9013.56** | $-1102.92 | $116.48 | 180 | 52% | $-1322.05 | 22 |
| mm_slow | **$8978.19** | $-1297.59 | $275.78 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8544.11** | $-1116.99 | $-338.9 | 153 | 58% | $-1209.3 | 25 |
| momentum | **$7317.06** | $-2441.58 | $-241.36 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6919.63** | $-3196.75 | $116.38 | 492 | 46% | $-3648.21 | 24 |
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
| maker_flat | 45 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 79 | 1 | 0 | 99% | 1.41¢ |

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

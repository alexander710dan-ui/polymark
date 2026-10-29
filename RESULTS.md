# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 71330 · Last run: 2026-10-29T18:13:24.028Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10424.93** | $485.97 | $-61.04 | 479 | 53% | $276.87 | 5 |
| maker_sports | **$10323.75** | $470.01 | $-146.26 | 14 | 71% | $278.46 | 9 |
| mid_momentum | **$10258.98** | $311 | $-52.02 | 256 | 55% | $97.52 | 21 |
| copy_pro | **$10240.42** | $85.99 | $154.43 | 440 | 53% | $-764.01 | 25 |
| fade_longshot | **$10081.67** | $80 | $1.67 | 151 | 95% | $69.26 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9916.8** | $193 | $-276.2 | 10 | 60% | $1.45 | 18 |
| mm_max | **$9807.37** | $-99.1 | $-93.53 | 207 | 53% | $-308.2 | 2 |
| strong_dip | **$9705.75** | $-297.82 | $3.57 | 138 | 62% | $-390.13 | 10 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9568.6** | $-263.72 | $-167.68 | 76 | 53% | $-446.18 | 18 |
| copy_top | **$9514** | $-667.31 | $181.31 | 455 | 53% | $-1995.88 | 17 |
| mm_sports | **$9216.4** | $-615.13 | $-168.47 | 567 | 54% | $-834.26 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mid_momentum_v2 | **$9033.8** | $-914.18 | $-52.02 | 91 | 47% | $-1105 | 21 |
| random_control | **$8823.26** | $-1189.69 | $12.95 | 180 | 56% | $-1803.98 | 25 |
| mm_cheap_v2 | **$8718.96** | $-1113.36 | $-167.68 | 93 | 47% | $-1304.18 | 18 |
| mm_strong | **$8543.77** | $-1277.75 | $-178.48 | 134 | 50% | $-1481.7 | 18 |
| mm_slow | **$8237.39** | $-1683.97 | $-78.64 | 99 | 47% | $-1869.68 | 15 |
| mm_sports_v2 | **$7987.09** | $-1844.44 | $-168.47 | 136 | 49% | $-2063.57 | 9 |
| momentum | **$7429.35** | $-2548.15 | $-22.5 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6325.79** | $-3406.32 | $-267.89 | 456 | 47% | $-3760.87 | 17 |
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
| maker_flat | 28 | 0 | 0 | 100% | 2.74¢ |
| maker_sports | 23 | 1 | 0 | 96% | 1.82¢ |

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

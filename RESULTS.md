# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 89647 · Last run: 2026-11-03T01:58:23.687Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12643.6** | $2028.21 | $615.39 | 512 | 54% | $1178.21 | 23 |
| maker_sports | **$11230** | $987.79 | $242.21 | 160 | 57% | $775.29 | 21 |
| mid_momentum | **$10773.44** | $524.96 | $248.48 | 306 | 56% | $311.48 | 25 |
| mm_tight | **$10648.65** | $472.22 | $176.43 | 606 | 53% | $263.12 | 17 |
| maker_flat | **$10383.54** | $150.14 | $233.4 | 44 | 50% | $-41.41 | 23 |
| mm_cheap | **$10260.9** | $71.35 | $189.55 | 138 | 54% | $-120.34 | 25 |
| mm_max | **$9858.36** | $-55.4 | $-86.24 | 250 | 53% | $-264.5 | 2 |
| fade_longshot | **$9698.98** | $-25.49 | $-275.53 | 174 | 95% | $-36.23 | 25 |
| conviction | **$9681.15** | $-306.99 | $-11.86 | 3 | 0% | $-204.85 | 1 |
| mm_slow | **$9667.25** | $-1095.07 | $762.32 | 124 | 51% | $-1294.75 | 24 |
| mm_strong | **$9650.99** | $-820.8 | $471.79 | 187 | 53% | $-1024.75 | 25 |
| mid_momentum_v2 | **$9548.26** | $-700.22 | $248.48 | 141 | 50% | $-892.77 | 25 |
| mm_cheap_v2 | **$9411.26** | $-778.29 | $189.55 | 155 | 51% | $-969.98 | 25 |
| mm_sports | **$9346.54** | $-844.98 | $191.52 | 717 | 54% | $-1064.11 | 21 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8957.12** | $-619.91 | $-422.97 | 179 | 60% | $-713.54 | 25 |
| random_control | **$8665.44** | $-899.06 | $-435.5 | 190 | 55% | $-1513.35 | 25 |
| super | **$8635.32** | $-1375.81 | $11.13 | 128 | 50% | $-1657.71 | 5 |
| copy_top | **$8537.85** | $-1431.52 | $-30.63 | 545 | 52% | $-2760.09 | 23 |
| mm_sports_v2 | **$8117.23** | $-2074.29 | $191.52 | 286 | 50% | $-2293.42 | 21 |
| momentum | **$6869.35** | $-2788.51 | $-342.14 | 313 | 65% | $-3276.75 | 25 |
| whale_fade | **$6662.65** | $-3115.83 | $-221.52 | 543 | 47% | $-3567.29 | 24 |
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
| maker_flat | 67 | 0 | 0 | 100% | 2.75¢ |
| maker_sports | 181 | 1 | 0 | 99% | 1.37¢ |

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

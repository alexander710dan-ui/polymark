# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 83069 · Last run: 2026-10-31T22:13:19.926Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11512.46** | $1555.03 | $-42.57 | 487 | 53% | $705.03 | 25 |
| maker_sports | **$11221.33** | $1286.9 | $-65.57 | 87 | 60% | $1074.4 | 8 |
| mid_momentum | **$10877.88** | $778.16 | $99.72 | 291 | 56% | $564.68 | 25 |
| mm_tight | **$10665.14** | $757 | $-91.86 | 542 | 54% | $547.9 | 7 |
| mm_cheap | **$10313** | $486.59 | $-173.59 | 116 | 56% | $294.9 | 25 |
| mm_max | **$10271.99** | $271.77 | $0.22 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10171.56** | $140.79 | $30.77 | 28 | 50% | $-50.76 | 25 |
| fade_longshot | **$9945.47** | $-70.35 | $15.82 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9689.15** | $-306.99 | $-3.86 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9652.7** | $-447.02 | $99.72 | 126 | 51% | $-639.57 | 25 |
| mm_strong | **$9495.83** | $-232.66 | $-271.51 | 168 | 54% | $-436.61 | 25 |
| mm_cheap_v2 | **$9463.36** | $-363.05 | $-173.59 | 133 | 52% | $-554.74 | 25 |
| mm_sports | **$9414.84** | $-496.82 | $-88.34 | 641 | 54% | $-715.95 | 8 |
| copy_top | **$9223.55** | $-756.2 | $-20.25 | 507 | 52% | $-2084.77 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9028.72** | $-794.17 | $-177.11 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8877.47** | $-1007.21 | $-115.32 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8876.78** | $-1022.63 | $-100.59 | 161 | 58% | $-1116.26 | 22 |
| super | **$8787.04** | $-1198.33 | $-14.63 | 118 | 50% | $-1480.23 | 7 |
| mm_sports_v2 | **$8185.53** | $-1726.13 | $-88.34 | 210 | 50% | $-1945.26 | 8 |
| momentum | **$7257.21** | $-2644.98 | $-97.81 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6714** | $-2959.36 | $-326.64 | 508 | 47% | $-3410.82 | 25 |
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
| maker_flat | 53 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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

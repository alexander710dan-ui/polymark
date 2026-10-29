# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72600 · Last run: 2026-10-29T23:13:51.857Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11111.32** | $1116.22 | $-4.9 | 24 | 79% | $924.67 | 12 |
| copy_pro | **$11082.54** | $772.61 | $309.93 | 445 | 53% | $-77.39 | 25 |
| mid_momentum | **$10849.76** | $844.9 | $4.86 | 265 | 57% | $631.42 | 25 |
| mm_tight | **$10803.4** | $775.06 | $28.34 | 485 | 54% | $565.96 | 10 |
| mm_cheap | **$10296.91** | $192.79 | $104.12 | 84 | 56% | $10.33 | 25 |
| mm_max | **$10123.85** | $153.3 | $-29.45 | 210 | 54% | $-55.8 | 2 |
| fade_longshot | **$10025.14** | $89.44 | $-64.3 | 152 | 95% | $78.7 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9981.2** | $-107 | $88.2 | 13 | 46% | $-298.55 | 25 |
| mm_sports | **$9934.55** | $-37.85 | $-27.6 | 577 | 55% | $-256.98 | 12 |
| copy_top | **$9781.58** | $-438.59 | $220.17 | 460 | 53% | $-1767.16 | 24 |
| super | **$9775.4** | $-424.16 | $199.56 | 92 | 51% | $-688.49 | 4 |
| mid_momentum_v2 | **$9624.58** | $-380.28 | $4.86 | 100 | 51% | $-571.1 | 25 |
| mm_cheap_v2 | **$9447.27** | $-656.85 | $104.12 | 101 | 50% | $-847.67 | 25 |
| strong_dip | **$9316.17** | $-437.85 | $-245.98 | 141 | 61% | $-530.16 | 20 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9191.95** | $-950.5 | $142.45 | 142 | 52% | $-1154.45 | 25 |
| mm_slow | **$8863.97** | $-1443.54 | $307.51 | 105 | 50% | $-1629.25 | 25 |
| mm_sports_v2 | **$8705.24** | $-1267.16 | $-27.6 | 146 | 51% | $-1486.29 | 12 |
| random_control | **$8579.16** | $-1190.91 | $-229.93 | 182 | 56% | $-1805.2 | 25 |
| momentum | **$7434.09** | $-2533.86 | $-32.05 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$5837.36** | $-3676.22 | $-486.42 | 461 | 46% | $-4030.77 | 24 |
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
| maker_flat | 38 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 36 | 1 | 0 | 97% | 1.6¢ |

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

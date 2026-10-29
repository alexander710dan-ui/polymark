# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72210 · Last run: 2026-10-29T21:38:43.475Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$10911.21** | $934.41 | $-23.2 | 22 | 77% | $742.86 | 8 |
| mid_momentum | **$10767.93** | $720.43 | $47.5 | 264 | 56% | $506.95 | 25 |
| copy_pro | **$10710.95** | $874.81 | $-163.86 | 444 | 53% | $24.81 | 25 |
| mm_tight | **$10636.71** | $775.06 | $-138.35 | 485 | 54% | $565.96 | 5 |
| fade_longshot | **$10080.61** | $89.44 | $-8.83 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10054.06** | $153.3 | $-99.24 | 210 | 54% | $-55.8 | 1 |
| mm_cheap | **$10050.8** | $68.32 | $-17.52 | 83 | 55% | $-114.14 | 22 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9770.85** | $-107 | $-122.15 | 13 | 46% | $-298.55 | 20 |
| mm_sports | **$9756.42** | $-205.7 | $-37.88 | 575 | 55% | $-424.83 | 8 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mid_momentum_v2 | **$9542.75** | $-504.75 | $47.5 | 99 | 51% | $-695.57 | 25 |
| copy_top | **$9531.69** | $-336.59 | $-131.72 | 459 | 53% | $-1665.16 | 15 |
| strong_dip | **$9478.33** | $-437.85 | $-83.82 | 141 | 61% | $-530.16 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9201.16** | $-781.32 | $-17.52 | 100 | 50% | $-972.14 | 22 |
| mm_strong | **$8845.93** | $-993.88 | $-160.19 | 141 | 52% | $-1197.83 | 20 |
| random_control | **$8751.41** | $-1190.91 | $-57.68 | 182 | 56% | $-1805.2 | 25 |
| mm_sports_v2 | **$8527.11** | $-1435.01 | $-37.88 | 144 | 51% | $-1654.14 | 8 |
| mm_slow | **$8524.7** | $-1486.92 | $11.62 | 104 | 49% | $-1672.63 | 17 |
| momentum | **$7450.93** | $-2533.86 | $-15.21 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6319.11** | $-3817.17 | $136.28 | 460 | 46% | $-4171.72 | 15 |
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
| maker_flat | 33 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 30 | 1 | 0 | 97% | 1.66¢ |

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

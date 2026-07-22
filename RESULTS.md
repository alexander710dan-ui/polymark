# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1001 · Last run: 2026-07-22T18:34:09.953Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 67 | 51 | 76% | $270.38 | 4.04% | $13.24 | 25 | $10359.19 |
| fade_longshot | 47 | 46 | 98% | $107.12 | 2.28% | $97.23 | 25 | $10064.85 |
| strong_dip | 16 | 10 | 63% | $80.01 | 5% | $-12.3 | 23 | $10043.2 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9981.54 |
| mid_momentum | 45 | 28 | 62% | $277.72 | 6.17% | $139.62 | 25 | $9979.22 |
| copy_top | 136 | 69 | 51% | $-93.7 | -0.69% | $-1422.27 | 25 | $9850.47 |
| whale_fade | 136 | 67 | 49% | $-440.47 | -3.24% | $-775.25 | 25 | $9757.43 |
| favorite | 60 | 40 | 67% | $-408.6 | -6.81% | $-472.53 | 25 | $9352.88 |
| late_favorite | 144 | 111 | 77% | $-949.14 | -6.59% | $-989.99 | 25 | $9076.21 |
| copy_pro | 54 | 24 | 44% | $-734 | -8.58% | $-1443.09 | 25 | $8827.26 |
| mean_revert | 71 | 16 | 23% | $-1214.36 | -17.1% | $-2522.81 | 25 | $8821.65 |
| copy_month | 41 | 17 | 41% | $-1522.07 | -37.12% | $-1699.85 | 25 | $8274.76 |
| longshot | 47 | 1 | 2% | $-3291.55 | -70.03% | $-4600 | 25 | $7296.31 |

**Read the 'minus best win' column before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Strategies
- **favorite** — buys the likely side (60–90¢)
- **longshot** — buys cheap lottery tickets (2–10¢). The favorite-longshot bias predicts this loses.
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side). What the leaderboard whales do.
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **mean_revert** — fades ≥8¢ 24h moves
- **late_favorite** — buys 70–93¢ favourites within 2 days of resolution
- **copy_top** — mirrors what the top-10 leaderboard wallets bought in the last 24h (≥$500, ≥70% agreement)
- **copy_pro** — copy trading with everything turned on: efficiency-filtered top-25 wallets, 6h freshness, refuses to chase prices that ran >5¢ past the whales' entry, conviction-scaled stakes ($100–250)
- **copy_month** — copy_top's exact rules, but following the top-10 of the MONTHLY leaderboard (in-form traders)
- **whale_fade** — bets against copy_top's picks (the control for copy_top)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (momentum won 75% of bets and still lost money buying 95¢ sides)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite (mean_revert died buying dying longshots; this only catches falling *leaders*)
- **random_control** — coin flips, the baseline every strategy must beat

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_

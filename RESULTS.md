# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2909 · Last run: 2026-07-24T10:41:22.359Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 166 | 86 | 52% | $563.63 | 3.4% | $-764.94 | 22 | $10658.14 |
| mean_revert | 100 | 25 | 25% | $336.01 | 3.36% | $-1691.65 | 25 | $10376.78 |
| momentum | 93 | 68 | 73% | $58.87 | 0.63% | $-198.27 | 25 | $10355.51 |
| random_control | 44 | 23 | 52% | $-324.62 | -7.38% | $-938.91 | 25 | $10047.26 |
| fade_longshot | 52 | 50 | 96% | $37.5 | 0.72% | $27.61 | 25 | $9999.35 |
| strong_dip | 35 | 19 | 54% | $-390.95 | -11.17% | $-483.26 | 25 | $9599.67 |
| mid_momentum | 80 | 45 | 56% | $-249.79 | -3.12% | $-412.95 | 25 | $9463.66 |
| copy_pro | 119 | 56 | 47% | $-1126.88 | -5.87% | $-1976.88 | 17 | $9434.08 |
| copy_month | 89 | 41 | 46% | $-709.55 | -7.97% | $-1276.22 | 17 | $9333.75 |
| whale_fade | 166 | 80 | 48% | $-735.02 | -4.43% | $-1069.8 | 22 | $9309.56 |
| favorite | 78 | 50 | 64% | $-872.32 | -11.18% | $-936.25 | 25 | $9118.73 |
| longshot | 52 | 2 | 4% | $-1791.55 | -34.45% | $-3691.55 | 25 | $8806.54 |
| late_favorite | 243 | 187 | 77% | $-1402.63 | -5.77% | $-1443.48 | 25 | $8528.42 |

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

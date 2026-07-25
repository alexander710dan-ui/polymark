# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3688 · Last run: 2026-07-25T03:02:47.118Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 178 | 93 | 52% | $1305.26 | 7.33% | $-23.31 | 24 | $11597.56 |
| momentum | 102 | 74 | 73% | $768.94 | 7.54% | $280.7 | 25 | $11104.91 |
| copy_month | 106 | 51 | 48% | $325.83 | 3.07% | $-483.26 | 23 | $10624.78 |
| random_control | 47 | 24 | 51% | $-354.35 | -7.54% | $-968.64 | 25 | $10184.96 |
| copy_pro | 144 | 67 | 47% | $-1087.39 | -4.76% | $-1937.39 | 23 | $10108.84 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $10008.86 |
| mean_revert | 110 | 29 | 26% | $479.58 | 4.36% | $-1548.08 | 25 | $9890.41 |
| mid_momentum | 95 | 54 | 57% | $155.47 | 1.64% | $-58.01 | 25 | $9489.69 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9319.63 |
| favorite | 84 | 55 | 65% | $-759.93 | -9.05% | $-823.86 | 25 | $9178.64 |
| whale_fade | 178 | 85 | 48% | $-908.66 | -5.1% | $-1243.44 | 24 | $8723.92 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8627.39 |
| late_favorite | 294 | 226 | 77% | $-1621.16 | -5.51% | $-1662.01 | 18 | $8455.34 |

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

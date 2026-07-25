# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3548 · Last run: 2026-07-25T00:07:34.953Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 175 | 91 | 52% | $1233.81 | 7.05% | $-94.76 | 25 | $11331.09 |
| momentum | 99 | 72 | 73% | $843.02 | 8.52% | $354.78 | 25 | $11200.43 |
| random_control | 46 | 24 | 52% | $-254.35 | -5.53% | $-868.64 | 25 | $10259.84 |
| copy_month | 101 | 47 | 47% | $105.43 | 1.04% | $-703.66 | 25 | $10099 |
| mean_revert | 108 | 28 | 26% | $452.31 | 4.19% | $-1575.35 | 25 | $10065.73 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $9997.16 |
| mid_momentum | 91 | 52 | 57% | $232.37 | 2.55% | $18.89 | 25 | $9635.19 |
| strong_dip | 44 | 23 | 52% | $-577.96 | -13.14% | $-670.27 | 25 | $9351.95 |
| favorite | 83 | 54 | 65% | $-821.22 | -9.89% | $-885.15 | 25 | $9181.35 |
| whale_fade | 175 | 84 | 48% | $-793.85 | -4.54% | $-1128.63 | 25 | $9133.97 |
| copy_pro | 135 | 61 | 45% | $-1497.68 | -6.97% | $-2347.68 | 25 | $9020.65 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8765.67 |
| late_favorite | 287 | 219 | 76% | $-1791.75 | -6.24% | $-1832.6 | 21 | $8362.4 |

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

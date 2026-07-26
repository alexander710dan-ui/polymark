# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4779 · Last run: 2026-07-26T02:01:10.451Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 198 | 103 | 52% | $940.06 | 4.75% | $-388.51 | 21 | $10803.52 |
| random_control | 54 | 29 | 54% | $-307.72 | -5.7% | $-922.01 | 25 | $10427.39 |
| momentum | 115 | 85 | 74% | $676.29 | 5.88% | $188.05 | 25 | $10418.65 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10074.56 |
| copy_pro | 167 | 81 | 49% | $-486.34 | -1.85% | $-1336.34 | 25 | $9788.31 |
| strong_dip | 47 | 25 | 53% | $-521.32 | -11.09% | $-613.63 | 25 | $9731.48 |
| copy_month | 130 | 60 | 46% | $-403.75 | -3.11% | $-1212.84 | 20 | $9502.61 |
| mid_momentum | 101 | 58 | 57% | $156.75 | 1.55% | $-56.73 | 25 | $9452.69 |
| mean_revert | 120 | 29 | 24% | $-424.26 | -3.54% | $-2451.92 | 25 | $8986.88 |
| favorite | 103 | 68 | 66% | $-930.06 | -9.03% | $-993.99 | 25 | $8905.84 |
| whale_fade | 198 | 94 | 47% | $-938.06 | -4.74% | $-1272.84 | 21 | $8836 |
| late_favorite | 358 | 280 | 78% | $-1158.98 | -3.24% | $-1199.83 | 19 | $8776.35 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7549.85 |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4776 · Last run: 2026-07-26T01:57:27.553Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 197 | 103 | 52% | $1040.06 | 5.28% | $-288.51 | 22 | $10804.02 |
| random_control | 53 | 29 | 55% | $-207.72 | -3.92% | $-822.01 | 25 | $10427.48 |
| momentum | 115 | 85 | 74% | $676.29 | 5.88% | $188.05 | 25 | $10420.24 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10074.02 |
| copy_pro | 166 | 80 | 48% | $-630.46 | -2.41% | $-1480.46 | 25 | $9747.47 |
| strong_dip | 47 | 25 | 53% | $-521.32 | -11.09% | $-613.63 | 25 | $9728.22 |
| copy_month | 129 | 60 | 47% | $-303.75 | -2.35% | $-1112.84 | 21 | $9503.05 |
| mid_momentum | 101 | 58 | 57% | $156.75 | 1.55% | $-56.73 | 25 | $9457.18 |
| mean_revert | 120 | 29 | 24% | $-424.26 | -3.54% | $-2451.92 | 25 | $8999.21 |
| favorite | 103 | 68 | 66% | $-930.06 | -9.03% | $-993.99 | 25 | $8909.38 |
| whale_fade | 197 | 93 | 47% | $-1042.14 | -5.29% | $-1376.92 | 22 | $8835.18 |
| late_favorite | 358 | 280 | 78% | $-1158.98 | -3.24% | $-1199.83 | 19 | $8774.98 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7555.46 |

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

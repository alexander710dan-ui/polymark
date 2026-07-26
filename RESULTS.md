# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4792 · Last run: 2026-07-26T02:17:28.847Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 199 | 103 | 52% | $840.06 | 4.22% | $-488.51 | 20 | $10857.8 |
| momentum | 115 | 85 | 74% | $676.29 | 5.88% | $188.05 | 25 | $10403.55 |
| random_control | 54 | 29 | 54% | $-307.72 | -5.7% | $-922.01 | 25 | $10336.17 |
| fade_longshot | 59 | 57 | 97% | $86.04 | 1.46% | $76.15 | 25 | $10075.66 |
| copy_pro | 168 | 81 | 48% | $-586.34 | -2.22% | $-1436.34 | 25 | $9868.65 |
| strong_dip | 47 | 25 | 53% | $-521.32 | -11.09% | $-613.63 | 25 | $9743.96 |
| copy_month | 131 | 60 | 46% | $-503.75 | -3.85% | $-1312.84 | 19 | $9555.82 |
| mid_momentum | 101 | 58 | 57% | $156.75 | 1.55% | $-56.73 | 25 | $9384.86 |
| mean_revert | 121 | 29 | 24% | $-524.26 | -4.33% | $-2551.92 | 25 | $8979.18 |
| favorite | 104 | 68 | 65% | $-1030.06 | -9.9% | $-1093.99 | 25 | $8917.96 |
| whale_fade | 199 | 95 | 48% | $-833.98 | -4.19% | $-1168.76 | 20 | $8785.88 |
| late_favorite | 360 | 281 | 78% | $-1230.77 | -3.42% | $-1271.62 | 18 | $8775.05 |
| longshot | 59 | 2 | 3% | $-2491.55 | -42.23% | $-4391.55 | 25 | $7543.83 |

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

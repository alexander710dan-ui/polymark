# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4622 · Last run: 2026-07-25T22:44:36.082Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 192 | 100 | 52% | $1086.71 | 5.66% | $-241.86 | 25 | $11070.54 |
| momentum | 111 | 82 | 74% | $752 | 6.77% | $263.76 | 25 | $10672.67 |
| random_control | 52 | 28 | 54% | $-209.76 | -4.03% | $-824.05 | 25 | $10303.1 |
| fade_longshot | 58 | 56 | 97% | $77.34 | 1.33% | $67.45 | 25 | $10062.31 |
| copy_month | 123 | 57 | 46% | $-157.1 | -1.28% | $-966.19 | 25 | $9820.48 |
| copy_pro | 163 | 78 | 48% | $-785.03 | -3.05% | $-1635.03 | 25 | $9735.89 |
| strong_dip | 46 | 25 | 54% | $-517.48 | -11.25% | $-609.79 | 25 | $9613.8 |
| mean_revert | 116 | 29 | 25% | $-120.42 | -1.04% | $-2148.08 | 25 | $9440.1 |
| mid_momentum | 99 | 56 | 57% | $72.89 | 0.74% | $-140.59 | 25 | $9347.58 |
| favorite | 100 | 65 | 65% | $-1022.57 | -10.23% | $-1086.5 | 25 | $9014.83 |
| late_favorite | 346 | 271 | 78% | $-1145.13 | -3.31% | $-1185.98 | 21 | $8688.11 |
| whale_fade | 192 | 91 | 47% | $-1060.52 | -5.52% | $-1395.3 | 25 | $8668.31 |
| longshot | 58 | 2 | 3% | $-2391.55 | -41.23% | $-4291.55 | 25 | $7719.17 |

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

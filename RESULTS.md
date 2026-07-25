# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4347 · Last run: 2026-07-25T17:00:24.937Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 190 | 99 | 52% | $1175.6 | 6.19% | $-152.97 | 25 | $11330.27 |
| momentum | 108 | 79 | 73% | $745.51 | 6.9% | $257.27 | 25 | $10751.83 |
| random_control | 50 | 27 | 54% | $-141.34 | -2.83% | $-755.63 | 25 | $10340.2 |
| copy_month | 119 | 56 | 47% | $104.01 | 0.87% | $-705.08 | 25 | $10184.88 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10054.36 |
| copy_pro | 158 | 74 | 47% | $-1010.48 | -4.04% | $-1860.48 | 25 | $9604.66 |
| strong_dip | 45 | 24 | 53% | $-528.71 | -11.75% | $-621.02 | 25 | $9583.97 |
| mean_revert | 114 | 29 | 25% | $79.58 | 0.7% | $-1948.08 | 25 | $9414.34 |
| mid_momentum | 98 | 55 | 56% | $2.53 | 0.03% | $-210.95 | 25 | $9351.9 |
| favorite | 91 | 60 | 66% | $-812.48 | -8.93% | $-876.41 | 25 | $9146.85 |
| late_favorite | 317 | 247 | 78% | $-1267.56 | -4% | $-1308.41 | 25 | $8596.32 |
| whale_fade | 190 | 90 | 47% | $-985.52 | -5.19% | $-1320.3 | 25 | $8553.35 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $7898.9 |

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

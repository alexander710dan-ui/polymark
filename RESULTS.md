# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 3468 · Last run: 2026-07-24T22:27:26.281Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 173 | 90 | 52% | $1100.48 | 6.36% | $-228.09 | 25 | $11389.5 |
| momentum | 97 | 70 | 72% | $439.42 | 4.53% | $-48.82 | 25 | $11278.2 |
| copy_month | 99 | 46 | 46% | $-27.9 | -0.28% | $-836.99 | 25 | $10221.45 |
| random_control | 45 | 23 | 51% | $-424.62 | -9.44% | $-1038.91 | 25 | $10218.16 |
| mean_revert | 107 | 28 | 26% | $552.31 | 5.16% | $-1475.35 | 25 | $10057.09 |
| fade_longshot | 53 | 51 | 96% | $41.34 | 0.78% | $31.45 | 25 | $9995.05 |
| mid_momentum | 90 | 51 | 57% | $62.1 | 0.69% | $-151.38 | 25 | $9688.04 |
| strong_dip | 43 | 23 | 53% | $-477.96 | -11.12% | $-570.27 | 25 | $9334.56 |
| favorite | 82 | 53 | 65% | $-849.43 | -10.36% | $-913.36 | 25 | $9178.56 |
| whale_fade | 173 | 83 | 48% | $-802.18 | -4.64% | $-1136.96 | 25 | $9160.5 |
| copy_pro | 132 | 60 | 45% | $-1547.68 | -7.35% | $-2397.68 | 25 | $9148.49 |
| longshot | 53 | 2 | 4% | $-1891.55 | -35.69% | $-3791.55 | 25 | $8816.17 |
| late_favorite | 279 | 212 | 76% | $-1853.58 | -6.64% | $-1894.43 | 25 | $8211.3 |

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

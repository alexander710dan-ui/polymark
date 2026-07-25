# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 4526 · Last run: 2026-07-25T20:44:25.196Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 190 | 99 | 52% | $1175.6 | 6.19% | $-152.97 | 25 | $11206.86 |
| momentum | 109 | 80 | 73% | $746.72 | 6.85% | $258.48 | 25 | $10696.37 |
| random_control | 51 | 27 | 53% | $-241.34 | -4.73% | $-855.63 | 25 | $10288.21 |
| fade_longshot | 57 | 55 | 96% | $68.64 | 1.2% | $58.75 | 25 | $10054.2 |
| copy_month | 120 | 57 | 48% | $142.9 | 1.19% | $-666.19 | 25 | $10014.81 |
| copy_pro | 161 | 77 | 48% | $-710.03 | -2.78% | $-1560.03 | 25 | $9833.43 |
| strong_dip | 46 | 25 | 54% | $-517.48 | -11.25% | $-609.79 | 25 | $9607.25 |
| mean_revert | 115 | 29 | 25% | $-20.42 | -0.18% | $-2048.08 | 25 | $9458.52 |
| mid_momentum | 99 | 56 | 57% | $72.89 | 0.74% | $-140.59 | 25 | $9371.69 |
| favorite | 96 | 63 | 66% | $-862.31 | -8.98% | $-926.24 | 25 | $9111.35 |
| late_favorite | 332 | 258 | 78% | $-1380.58 | -4.16% | $-1421.43 | 25 | $8876.18 |
| whale_fade | 190 | 90 | 47% | $-985.52 | -5.19% | $-1320.3 | 25 | $8534.6 |
| longshot | 57 | 2 | 4% | $-2291.55 | -40.2% | $-4191.55 | 25 | $7820.08 |

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

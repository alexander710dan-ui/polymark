# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 296 · Last run: 2026-07-22T03:51:26.634Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 64 | 48 | 75% | $189.76 | 2.97% | $-67.38 | 25 | $10155.69 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10070.58 |
| mid_momentum | 32 | 19 | 59% | $102.8 | 3.21% | $-35.3 | 25 | $10033.71 |
| copy_pro | 30 | 13 | 43% | $-110.4 | -2.21% | $-819.49 | 10 | $10030.44 |
| copy_top | 129 | 67 | 52% | $258.45 | 2% | $-1070.12 | 20 | $9955.7 |
| strong_dip | 4 | 1 | 25% | $-115.16 | -28.79% | $-203.84 | 13 | $9893.15 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9685.43 |
| whale_fade | 129 | 62 | 48% | $-611.01 | -4.74% | $-945.79 | 20 | $9563.49 |
| favorite | 54 | 34 | 63% | $-675.86 | -12.52% | $-737.41 | 25 | $9330.14 |
| late_favorite | 115 | 89 | 77% | $-730.75 | -6.35% | $-771.6 | 19 | $9313.15 |
| mean_revert | 67 | 15 | 22% | $-961.64 | -14.35% | $-2270.09 | 25 | $9012.66 |
| copy_month | 31 | 13 | 42% | $-1108.62 | -35.76% | $-1286.4 | 10 | $8642.17 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7228.47 |

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

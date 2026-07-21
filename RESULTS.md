# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69 · Last run: 2026-07-21T21:34:32.842Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| copy_top | 116 | 63 | 54% | $683.28 | 5.89% | $-645.29 | 24 | $10567.88 |
| copy_pro | 11 | 5 | 45% | $630.83 | 33.2% | $-78.26 | 14 | $10512.69 |
| momentum | 61 | 46 | 75% | $184.96 | 3.03% | $-72.18 | 25 | $10140.53 |
| fade_longshot | 40 | 39 | 98% | $67.77 | 1.69% | $57.88 | 25 | $10059.54 |
| strong_dip | 3 | 1 | 33% | $-111.32 | -37.11% | $-200 | 8 | $9997.96 |
| mid_momentum | 25 | 14 | 56% | $-113.69 | -4.55% | $-240.96 | 25 | $9807.13 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $9674.55 |
| copy_month | 11 | 5 | 45% | $-493.07 | -44.82% | $-557 | 13 | $9455.43 |
| favorite | 50 | 32 | 64% | $-571.3 | -11.43% | $-632.85 | 25 | $9376.14 |
| whale_fade | 116 | 53 | 46% | $-1067.77 | -9.2% | $-1402.55 | 24 | $9157.91 |
| mean_revert | 63 | 14 | 22% | $-1016.19 | -16.13% | $-2324.64 | 25 | $9138.98 |
| late_favorite | 108 | 82 | 76% | $-896.93 | -8.3% | $-937.78 | 14 | $9104.81 |
| longshot | 40 | 1 | 3% | $-2591.55 | -64.79% | $-3900 | 25 | $7393.42 |

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

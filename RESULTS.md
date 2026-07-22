# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 1199 · Last run: 2026-07-22T22:48:11.360Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| mean_revert | 75 | 18 | 24% | $807.42 | 10.77% | $-1220.24 | 25 | $10646.35 |
| momentum | 71 | 54 | 76% | $364.97 | 5.14% | $107.83 | 25 | $10452.38 |
| copy_top | 139 | 70 | 50% | $272.97 | 1.96% | $-1055.6 | 25 | $10419.55 |
| random_control | 39 | 20 | 51% | $-673.26 | -17.26% | $-1287.55 | 25 | $10065.67 |
| fade_longshot | 48 | 46 | 96% | $7.12 | 0.15% | $-2.77 | 25 | $9962.14 |
| whale_fade | 139 | 69 | 50% | $-245.96 | -1.77% | $-580.74 | 25 | $9851.45 |
| mid_momentum | 52 | 32 | 62% | $266.52 | 5.13% | $128.42 | 25 | $9833.36 |
| strong_dip | 22 | 12 | 55% | $-169.7 | -7.71% | $-262.01 | 23 | $9757.66 |
| copy_pro | 65 | 27 | 42% | $-759 | -7.16% | $-1609 | 25 | $9696.64 |
| longshot | 48 | 2 | 4% | $-1391.55 | -28.99% | $-3291.55 | 25 | $9363.26 |
| favorite | 64 | 41 | 64% | $-652.35 | -10.19% | $-716.28 | 25 | $9305.51 |
| late_favorite | 161 | 124 | 77% | $-999.89 | -6.21% | $-1040.74 | 25 | $9055.8 |
| copy_month | 50 | 20 | 40% | $-1305.4 | -26.11% | $-1872.07 | 25 | $9028.66 |

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

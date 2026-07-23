# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 2042 · Last run: 2026-07-23T16:24:45.057Z · Database: `tester/data/polymark.db`

| Strategy | Closed | Wins | Win rate | Realized P&L | ROI (closed) | P&L minus best win | Open | Equity |
|---|---|---|---|---|---|---|---|---|
| momentum | 80 | 59 | 74% | $232.19 | 2.9% | $-24.95 | 25 | $10779.56 |
| copy_top | 150 | 76 | 51% | $210.31 | 1.4% | $-1118.26 | 25 | $10464.22 |
| random_control | 41 | 22 | 54% | $-126.77 | -3.09% | $-741.06 | 25 | $10336.11 |
| whale_fade | 150 | 74 | 49% | $-259.73 | -1.73% | $-594.51 | 25 | $10250.46 |
| longshot | 49 | 2 | 4% | $-1491.55 | -30.44% | $-3391.55 | 25 | $10242.22 |
| mean_revert | 85 | 20 | 24% | $314.53 | 3.7% | $-1713.13 | 25 | $10076.25 |
| mid_momentum | 65 | 38 | 58% | $153.46 | 2.36% | $-9.7 | 25 | $10037.22 |
| fade_longshot | 49 | 47 | 96% | $15.82 | 0.32% | $5.93 | 25 | $9898.28 |
| strong_dip | 32 | 16 | 50% | $-556.4 | -17.39% | $-648.71 | 25 | $9394.8 |
| late_favorite | 195 | 152 | 78% | $-908.8 | -4.66% | $-949.65 | 25 | $9215.65 |
| favorite | 71 | 45 | 63% | $-786.27 | -11.07% | $-850.2 | 25 | $9113.02 |
| copy_month | 68 | 29 | 43% | $-1549.97 | -22.79% | $-2116.64 | 25 | $9040.41 |
| copy_pro | 95 | 41 | 43% | $-2093.56 | -13.46% | $-2943.56 | 25 | $8877.8 |

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

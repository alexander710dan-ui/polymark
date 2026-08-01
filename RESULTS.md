# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21956 · Last run: 2026-08-01T22:02:20.268Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10451.45** | $500.52 | $-49.07 | 176 | 57% | $287.04 | 25 |
| copy_top | **$10446.08** | $338.97 | $107.11 | 344 | 53% | $-989.6 | 18 |
| copy_pro | **$10140.94** | $180.16 | $-39.22 | 327 | 52% | $-669.84 | 25 |
| mm_cheap | **$10062.29** | $10.51 | $51.78 | 4 | 50% | $-127.59 | 25 |
| fade_longshot | **$10033.2** | $117.48 | $-84.28 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9802.32** | $-371.26 | $173.58 | 91 | 59% | $-463.57 | 25 |
| mm_tight | **$9684.33** | $-216.62 | $-99.05 | 145 | 54% | $-419.65 | 22 |
| ai_judge | **$9451.63** | $-487.64 | $-60.73 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9292.69** | $-518.03 | $-189.28 | 167 | 55% | $-721.06 | 25 |
| mm_max | **$9277.38** | $-750.8 | $28.18 | 47 | 47% | $-868.19 | 1 |
| super | **$9227.36** | $-649.65 | $-122.99 | 58 | 43% | $-865.5 | 12 |
| random_control | **$9184.42** | $-340.85 | $-474.73 | 114 | 60% | $-955.14 | 25 |
| mm_slow | **$9015.64** | $-940.49 | $-43.87 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8637.85** | $-782.78 | $-579.37 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8573.19** | $-1131.08 | $-295.73 | 225 | 68% | $-1619.32 | 25 |
| whale_fade | **$6813.68** | $-2888.74 | $-297.58 | 345 | 47% | $-3223.52 | 18 |
| copy_month (retired) | **$9330.68** | $-777.42 | $108.1 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9083.55** | $-1003.53 | $87.08 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8063.04** | $-1837.09 | $-99.87 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5075.07** | $-4691.55 | $-233.38 | 81 | 2% | $-6591.55 | 3 |

**Equity is the only honest headline** — realized P&L alone hides losses sitting in open positions. In this lab unrealized has been negative 97% of the time, so a realized-only view systematically overstates performance.

**Read 'minus best win' before believing any P&L** — a strategy whose profit disappears without its single luckiest trade hasn't proven anything yet.

### Active strategies
- **super** — the best empirical part of every earlier strategy: 30–70¢ only, never in-play, momentum or pregame-whale signal (veto on disagreement), no chasing, conviction-sized stakes ($100–250)
- **mid_momentum** — momentum restricted to 30–70¢ where payoffs are symmetric (frozen as v1, the control)
- **mm_sports** — mid_momentum, sports only (the one refinement walk-forward supports)
- **mm_tight** — mid_momentum, sports + 45–70¢ (walk-forward says the band cut is unjustified; running as the fitted arm)
- **mm_slow** — mid_momentum, only markets resolving in 2+ days
- **mm_strong** — mid_momentum, requires a ≥8¢ move instead of ≥5¢
- **mm_max** — all four refinements at once: sports, 45–70¢, 2+ days, ≥8¢
- **momentum** — buys whichever side moved ≥5¢ in 24h
- **fade_longshot** — sells the lottery tickets (buys the 90–98¢ side)
- **strong_dip** — buys a side knocked down ≥10¢ that is still the favourite
- **copy_top** — mirrors top-10 leaderboard wallets' pregame buys (in-play skipped)
- **copy_pro** — copy trading with all refinements: filtered wallets, 6h freshness, no chasing, conviction stakes
- **whale_fade** — bets against copy_top's picks (its control)
- **ai_judge** — bets when a local model (Ollama on the runner) disagrees with the market by >4¢ after costs; the AI's skill is judged like any other strategy
- **random_control** — coin flips, the baseline every strategy must beat

Retired (history kept, no new bets): longshot, mean_revert, late_favorite, favorite, copy_month — each empirically buried by its own ledger.

_Runs on a 15-minute GitHub Actions schedule; GitHub throttles this in practice to roughly every 1–2 hours. Live view: [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)_

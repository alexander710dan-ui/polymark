# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 77256 · Last run: 2026-10-30T17:25:36.522Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11901.98** | $1807.48 | $94.5 | 467 | 53% | $957.48 | 25 |
| maker_sports | **$11569.52** | $1477.91 | $91.61 | 49 | 67% | $1265.41 | 19 |
| mid_momentum | **$11382.85** | $664 | $718.85 | 275 | 56% | $450.52 | 25 |
| mm_tight | **$11282.39** | $1241.35 | $41.04 | 507 | 54% | $1032.25 | 17 |
| mm_cheap | **$10918.6** | $384.85 | $533.75 | 100 | 57% | $202.39 | 25 |
| maker_flat | **$10578.14** | $-143.67 | $721.81 | 16 | 50% | $-335.22 | 25 |
| mm_max | **$10526.86** | $463.71 | $63.15 | 219 | 54% | $254.61 | 3 |
| mm_sports | **$10316.1** | $277.69 | $38.41 | 604 | 55% | $58.56 | 20 |
| mid_momentum_v2 | **$10157.67** | $-561.18 | $718.85 | 110 | 51% | $-752 | 25 |
| mm_strong | **$10107.63** | $-447.93 | $555.56 | 156 | 54% | $-651.88 | 25 |
| mm_cheap_v2 | **$10068.96** | $-464.79 | $533.75 | 117 | 52% | $-655.61 | 25 |
| fade_longshot | **$10016.53** | $119.56 | $-103.03 | 156 | 96% | $108.82 | 25 |
| copy_top | **$10013.65** | $58.98 | $-45.33 | 484 | 53% | $-1269.59 | 25 |
| super | **$9964.99** | $-117.27 | $82.26 | 96 | 52% | $-399.17 | 5 |
| conviction | **$9900.55** | $-102.55 | $3.1 | 1 | 0% | $0 | 2 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9086.79** | $-951.62 | $38.41 | 173 | 52% | $-1170.75 | 20 |
| mm_slow | **$9020.94** | $-1464.18 | $485.12 | 111 | 50% | $-1649.89 | 25 |
| strong_dip | **$8713.92** | $-810.94 | $-475.14 | 150 | 59% | $-903.25 | 24 |
| random_control | **$8591.49** | $-1304.86 | $-103.65 | 187 | 55% | $-1919.15 | 25 |
| momentum | **$7538.65** | $-2520.34 | $58.99 | 299 | 66% | $-3008.58 | 25 |
| whale_fade | **$5996.67** | $-3770.48 | $-232.85 | 485 | 46% | $-4221.94 | 25 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 41 | 0 | 0 | 100% | 2.6¢ |
| maker_sports | 68 | 1 | 0 | 99% | 1.43¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

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

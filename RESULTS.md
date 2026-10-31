# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81141 · Last run: 2026-10-31T09:22:07.405Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11615.81** | $1290.59 | $325.22 | 482 | 53% | $440.59 | 25 |
| maker_sports | **$11347.46** | $1370.15 | $-22.69 | 78 | 62% | $1157.65 | 6 |
| mid_momentum | **$11184.66** | $826.42 | $358.24 | 286 | 56% | $612.94 | 25 |
| mm_cheap | **$10704** | $535.71 | $168.29 | 111 | 57% | $353.25 | 25 |
| mm_tight | **$10696.43** | $747.96 | $-51.53 | 536 | 54% | $538.86 | 4 |
| mm_max | **$10310.43** | $329.06 | $-18.63 | 227 | 54% | $119.96 | 1 |
| maker_flat | **$10170.6** | $-73.55 | $244.15 | 25 | 48% | $-265.1 | 25 |
| mid_momentum_v2 | **$9959.48** | $-398.76 | $358.24 | 121 | 51% | $-589.58 | 25 |
| fade_longshot | **$9917.47** | $-77.53 | $-5 | 160 | 94% | $-88.27 | 25 |
| mm_cheap_v2 | **$9854.36** | $-313.93 | $168.29 | 128 | 52% | $-504.75 | 25 |
| mm_strong | **$9747.4** | $-322.96 | $70.36 | 166 | 54% | $-526.91 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_sports | **$9585.82** | $-371.57 | $-42.61 | 632 | 55% | $-590.7 | 6 |
| copy_top | **$9502.62** | $-457.95 | $-39.43 | 501 | 53% | $-1786.52 | 25 |
| super | **$9307.57** | $-768.26 | $75.83 | 114 | 51% | $-1050.16 | 3 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9173.78** | $-794.17 | $-32.05 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8986** | $-1097.91 | $83.91 | 115 | 50% | $-1297.59 | 25 |
| strong_dip | **$8801.44** | $-995.2 | $-203.36 | 159 | 58% | $-1088.83 | 21 |
| mm_sports_v2 | **$8356.51** | $-1600.88 | $-42.61 | 201 | 51% | $-1820.01 | 6 |
| momentum | **$7294.82** | $-2644.98 | $-60.2 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6598.65** | $-3078.72 | $-322.63 | 502 | 47% | $-3530.18 | 25 |
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
| maker_flat | 50 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 84 | 1 | 0 | 99% | 1.44¢ |

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

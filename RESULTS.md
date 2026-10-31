# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 81637 · Last run: 2026-10-31T11:52:21.671Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11582.28** | $1472.4 | $109.88 | 484 | 53% | $622.4 | 25 |
| maker_sports | **$11382.32** | $1370.15 | $12.17 | 78 | 62% | $1157.65 | 10 |
| mid_momentum | **$11172.65** | $1018.97 | $153.68 | 287 | 56% | $805.49 | 25 |
| mm_tight | **$10722.47** | $747.96 | $-25.49 | 536 | 54% | $538.86 | 7 |
| mm_cheap | **$10693.75** | $727.4 | $-33.65 | 112 | 57% | $535.71 | 25 |
| mm_max | **$10336.66** | $329.06 | $7.6 | 227 | 54% | $119.96 | 2 |
| maker_flat | **$10160.28** | $102.69 | $57.59 | 26 | 50% | $-88.86 | 25 |
| mid_momentum_v2 | **$9947.47** | $-206.21 | $153.68 | 122 | 52% | $-398.76 | 25 |
| fade_longshot | **$9929.44** | $-77.53 | $6.97 | 160 | 94% | $-88.27 | 25 |
| mm_cheap_v2 | **$9844.11** | $-122.24 | $-33.65 | 129 | 53% | $-313.93 | 25 |
| mm_strong | **$9740.76** | $-130.41 | $-128.83 | 167 | 54% | $-334.36 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_sports | **$9608.35** | $-371.57 | $-20.08 | 632 | 55% | $-590.7 | 10 |
| copy_top | **$9547.33** | $-560.05 | $107.38 | 502 | 53% | $-1888.62 | 25 |
| super | **$9312.54** | $-768.26 | $80.8 | 114 | 51% | $-1050.16 | 6 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9119.31** | $-794.17 | $-86.52 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8964.84** | $-905.36 | $-129.8 | 116 | 51% | $-1105.04 | 25 |
| strong_dip | **$8767.59** | $-1095.92 | $-136.49 | 160 | 58% | $-1189.55 | 21 |
| mm_sports_v2 | **$8379.04** | $-1600.88 | $-20.08 | 201 | 51% | $-1820.01 | 10 |
| momentum | **$7297.14** | $-2644.98 | $-57.88 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6592.55** | $-2949.01 | $-458.44 | 503 | 47% | $-3400.47 | 25 |
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
| maker_flat | 51 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 88 | 1 | 0 | 99% | 1.43¢ |

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

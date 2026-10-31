# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82992 · Last run: 2026-10-31T21:38:16.915Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11680.71** | $1555.03 | $125.68 | 487 | 53% | $705.03 | 25 |
| maker_sports | **$11140.98** | $1386.9 | $-245.92 | 86 | 60% | $1174.4 | 9 |
| mid_momentum | **$10840.92** | $881.56 | $-40.64 | 290 | 56% | $668.08 | 25 |
| mm_tight | **$10590.27** | $860.3 | $-270.03 | 541 | 54% | $651.2 | 8 |
| mm_cheap | **$10281.72** | $589.99 | $-308.27 | 115 | 57% | $398.3 | 25 |
| mm_max | **$10271.88** | $271.77 | $0.11 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10174.9** | $140.79 | $34.11 | 28 | 50% | $-50.76 | 24 |
| fade_longshot | **$9947.14** | $-70.35 | $17.49 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9691.19** | $-306.99 | $-1.82 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9615.74** | $-343.62 | $-40.64 | 125 | 51% | $-536.17 | 25 |
| mm_strong | **$9464.8** | $-232.66 | $-302.54 | 168 | 54% | $-436.61 | 25 |
| mm_cheap_v2 | **$9432.08** | $-259.65 | $-308.27 | 132 | 52% | $-451.34 | 25 |
| mm_sports | **$9339.96** | $-393.52 | $-266.52 | 640 | 55% | $-612.65 | 9 |
| copy_top | **$9268.33** | $-801.66 | $69.99 | 506 | 52% | $-2130.23 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9044.22** | $-794.17 | $-161.61 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8896.78** | $-1022.63 | $-80.59 | 161 | 58% | $-1116.26 | 22 |
| mm_slow | **$8873.46** | $-1007.21 | $-119.33 | 117 | 50% | $-1206.89 | 25 |
| super | **$8708.14** | $-1043.23 | $-248.63 | 117 | 50% | $-1325.13 | 8 |
| mm_sports_v2 | **$8110.65** | $-1622.83 | $-266.52 | 209 | 51% | $-1841.96 | 9 |
| momentum | **$7254.76** | $-2644.98 | $-100.26 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6654.33** | $-2856.01 | $-489.66 | 507 | 47% | $-3307.47 | 25 |
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
| maker_flat | 52 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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

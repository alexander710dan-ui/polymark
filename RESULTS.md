# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82736 · Last run: 2026-10-31T19:43:05.818Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11687.12** | $1555.03 | $132.09 | 487 | 53% | $705.03 | 25 |
| maker_sports | **$11395.32** | $1482.82 | $-87.5 | 83 | 61% | $1270.32 | 11 |
| mid_momentum | **$10939.55** | $984.01 | $-44.46 | 289 | 56% | $770.53 | 25 |
| mm_tight | **$10757.71** | $865.25 | $-107.54 | 539 | 54% | $656.15 | 9 |
| mm_cheap | **$10471.41** | $692.44 | $-221.03 | 114 | 57% | $500.75 | 25 |
| mm_max | **$10271.22** | $271.77 | $-0.55 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10181.41** | $2.69 | $178.72 | 27 | 48% | $-188.86 | 25 |
| fade_longshot | **$9944.7** | $-70.35 | $15.05 | 161 | 94% | $-81.09 | 25 |
| mid_momentum_v2 | **$9714.37** | $-241.17 | $-44.46 | 124 | 52% | $-433.72 | 25 |
| conviction | **$9691.26** | $-306.99 | $-1.75 | 3 | 0% | $-204.85 | 1 |
| mm_cheap_v2 | **$9621.77** | $-157.2 | $-221.03 | 131 | 53% | $-348.89 | 25 |
| mm_sports | **$9595.64** | $-285.62 | $-118.74 | 637 | 55% | $-504.75 | 11 |
| mm_strong | **$9582.89** | $-232.66 | $-184.45 | 168 | 54% | $-436.61 | 25 |
| copy_top | **$9220.28** | $-869.1 | $89.38 | 505 | 52% | $-2197.67 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9061.2** | $-794.17 | $-144.63 | 189 | 56% | $-1408.46 | 25 |
| strong_dip | **$8895.21** | $-1022.63 | $-82.16 | 161 | 58% | $-1116.26 | 22 |
| super | **$8877.74** | $-786.98 | $-335.28 | 116 | 51% | $-1068.88 | 8 |
| mm_slow | **$8876.74** | $-1007.21 | $-116.05 | 117 | 50% | $-1206.89 | 25 |
| mm_sports_v2 | **$8366.33** | $-1514.93 | $-118.74 | 206 | 51% | $-1734.06 | 11 |
| momentum | **$7282.9** | $-2644.98 | $-72.12 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6734.25** | $-2753.11 | $-512.64 | 506 | 47% | $-3204.57 | 25 |
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
| maker_sports | 94 | 1 | 0 | 99% | 1.42¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69506 · Last run: 2026-10-29T11:02:43.041Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10200.3** | $259.9 | $-59.6 | 2 | 100% | $68.35 | 7 |
| mm_tight | **$10198.49** | $309.6 | $-111.11 | 470 | 53% | $100.5 | 2 |
| maker_sports | **$10132.87** | $259.9 | $-127.03 | 2 | 100% | $68.35 | 3 |
| copy_pro | **$10121.21** | $68.12 | $53.09 | 430 | 52% | $-781.88 | 13 |
| fade_longshot | **$10074.86** | $77.06 | $-2.2 | 150 | 95% | $66.32 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$9780.26** | $-218.44 | $-1.3 | 134 | 62% | $-310.75 | 3 |
| mid_momentum | **$9773.56** | $-20.51 | $-205.93 | 243 | 55% | $-233.99 | 13 |
| mm_max | **$9677.29** | $-211.59 | $-111.12 | 201 | 53% | $-420.69 | 2 |
| copy_top | **$9597.72** | $-398.51 | $-3.77 | 450 | 53% | $-1727.08 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9307.06** | $-555.12 | $-137.82 | 64 | 50% | $-732.9 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8922.74** | $-946.64 | $-130.62 | 554 | 54% | $-1165.77 | 4 |
| random_control | **$8762.72** | $-1186 | $-51.28 | 175 | 56% | $-1800.29 | 25 |
| mid_momentum_v2 | **$8548.38** | $-1245.69 | $-205.93 | 78 | 44% | $-1436.51 | 13 |
| mm_cheap_v2 | **$8457.42** | $-1404.76 | $-137.82 | 81 | 44% | $-1595.58 | 10 |
| mm_strong | **$8196.32** | $-1648.32 | $-155.36 | 121 | 47% | $-1852.27 | 10 |
| mm_slow | **$7826.15** | $-1967.92 | $-205.93 | 89 | 45% | $-2153.63 | 13 |
| mm_sports_v2 | **$7693.43** | $-2175.95 | $-130.62 | 123 | 46% | $-2395.08 | 4 |
| momentum | **$7408.02** | $-2548.15 | $-43.83 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6228.01** | $-3759.78 | $-12.21 | 451 | 46% | $-4114.33 | 5 |
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
| maker_flat | 9 | 0 | 2 | 100% | 2.74¢ |
| maker_sports | 5 | 0 | 1 | 100% | 2.14¢ |

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

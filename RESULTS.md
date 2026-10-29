# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69902 · Last run: 2026-10-29T12:34:07.312Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10323.46** | $259.9 | $63.56 | 2 | 100% | $68.35 | 14 |
| maker_sports | **$10318.48** | $259.9 | $58.58 | 2 | 100% | $68.35 | 5 |
| mm_tight | **$10271.44** | $309.6 | $-38.16 | 470 | 53% | $100.5 | 4 |
| copy_pro | **$10227.06** | $68.12 | $158.94 | 430 | 52% | $-781.88 | 18 |
| fade_longshot | **$10078.95** | $77.06 | $1.89 | 150 | 95% | $66.32 | 25 |
| mid_momentum | **$10074.62** | $-20.51 | $95.13 | 243 | 55% | $-233.99 | 19 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$9750.45** | $-218.44 | $-31.11 | 134 | 62% | $-310.75 | 6 |
| mm_max | **$9750.24** | $-211.59 | $-38.17 | 201 | 53% | $-420.69 | 4 |
| copy_top | **$9634.18** | $-398.51 | $32.69 | 450 | 53% | $-1727.08 | 8 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9516.09** | $-555.12 | $71.21 | 64 | 50% | $-732.9 | 14 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$9171.05** | $-946.64 | $117.69 | 554 | 54% | $-1165.77 | 7 |
| mid_momentum_v2 | **$8849.44** | $-1245.69 | $95.13 | 78 | 44% | $-1436.51 | 19 |
| random_control | **$8808.85** | $-1050.8 | $-140.35 | 176 | 56% | $-1665.09 | 25 |
| mm_cheap_v2 | **$8666.45** | $-1404.76 | $71.21 | 81 | 44% | $-1595.58 | 14 |
| mm_strong | **$8434.62** | $-1648.32 | $82.94 | 121 | 47% | $-1852.27 | 16 |
| mm_slow | **$8127.21** | $-1967.92 | $95.13 | 89 | 45% | $-2153.63 | 19 |
| mm_sports_v2 | **$7941.74** | $-2175.95 | $117.69 | 123 | 46% | $-2395.08 | 7 |
| momentum | **$7402.08** | $-2548.15 | $-49.77 | 296 | 65% | $-3036.39 | 25 |
| whale_fade | **$6198.65** | $-3759.78 | $-41.57 | 451 | 46% | $-4114.33 | 8 |
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
| maker_flat | 16 | 0 | 0 | 100% | 2.91¢ |
| maker_sports | 7 | 0 | 2 | 100% | 2.24¢ |

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

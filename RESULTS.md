# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28029 · Last run: 2026-08-04T03:21:27.658Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11186.04** | $1255.91 | $-69.87 | 334 | 57% | $1052.88 | 16 |
| mm_tight | **$10913.38** | $632.21 | $281.17 | 290 | 53% | $429.18 | 12 |
| mm_cheap | **$10473.6** | $904.81 | $-431.21 | 28 | 71% | $727.03 | 25 |
| mid_momentum | **$10398.26** | $679.34 | $-281.08 | 198 | 58% | $465.86 | 25 |
| fade_longshot | **$9968.5** | $47.31 | $-78.81 | 107 | 95% | $36.57 | 25 |
| copy_top | **$9947.64** | $-260.17 | $207.81 | 394 | 52% | $-1588.74 | 22 |
| strong_dip | **$9759.58** | $-463.45 | $223.03 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9747.51** | $-283.72 | $31.23 | 25 | 44% | $-461.5 | 13 |
| copy_pro | **$9636.23** | $-815.83 | $452.06 | 373 | 51% | $-1665.83 | 23 |
| super | **$9593.02** | $-353.9 | $-53.08 | 64 | 47% | $-569.75 | 11 |
| mm_max | **$9582.16** | $-345.24 | $-72.6 | 119 | 52% | $-464.71 | 5 |
| ai_judge | **$9423.98** | $-587.64 | $11.62 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9337.95** | $-653.27 | $-8.78 | 47 | 47% | $-838.98 | 9 |
| mm_slow | **$9100.82** | $-624.29 | $-274.89 | 51 | 51% | $-810 | 25 |
| random_control | **$9019.05** | $-457.3 | $-523.65 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8575.51** | $-791.06 | $-633.43 | 72 | 49% | $-995.01 | 25 |
| momentum | **$8212.37** | $-1163.43 | $-624.2 | 247 | 67% | $-1651.67 | 25 |
| whale_fade | **$7287.45** | $-2172.45 | $-540.1 | 395 | 48% | $-2527 | 22 |
| copy_month (retired) | **$9382.14** | $-730.36 | $112.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9037.97** | $-942.24 | $-19.79 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8306.25** | $-1937.09 | $243.34 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5093.82** | $-4691.55 | $-214.63 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 0 | 60% | 2.96¢ |
| maker_sports | 56 | 27 | 2 | 67% | 1.61¢ |

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

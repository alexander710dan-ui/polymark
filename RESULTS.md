# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30384 · Last run: 2026-08-05T01:11:40.039Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10877.29** | $1257.06 | $-379.77 | 397 | 56% | $1037.93 | 25 |
| mm_tight | **$10769.62** | $1233.57 | $-463.95 | 345 | 54% | $1030.54 | 19 |
| mid_momentum | **$10528.52** | $757.35 | $-228.83 | 203 | 57% | $543.87 | 25 |
| mm_cheap | **$10290.89** | $849.22 | $-558.33 | 33 | 67% | $671.44 | 25 |
| copy_top | **$9987.3** | $-193.36 | $180.66 | 401 | 52% | $-1521.93 | 25 |
| fade_longshot | **$9920.02** | $82.61 | $-162.59 | 113 | 96% | $71.87 | 25 |
| copy_pro | **$9760.77** | $-438.03 | $198.8 | 382 | 52% | $-1288.03 | 25 |
| strong_dip | **$9713.98** | $-426.02 | $140 | 101 | 59% | $-518.33 | 25 |
| super | **$9604.18** | $-592.35 | $196.53 | 69 | 46% | $-808.2 | 15 |
| mm_max | **$9464.37** | $-214.25 | $-321.38 | 150 | 53% | $-381.37 | 9 |
| ai_judge | **$9402.62** | $-587.64 | $-9.74 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9178.86** | $-468.35 | $-352.79 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9086.13** | $-616.54 | $-297.33 | 59 | 42% | $-810.66 | 19 |
| maker_sports | **$9024.62** | $-591.54 | $-383.84 | 99 | 51% | $-794.57 | 17 |
| random_control | **$8890.56** | $-1057.37 | $-52.07 | 135 | 56% | $-1671.66 | 25 |
| mm_strong | **$8675.2** | $-927.32 | $-397.48 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8224.17** | $-1144.31 | $-631.52 | 253 | 67% | $-1632.55 | 25 |
| whale_fade | **$7058.88** | $-2370.75 | $-570.37 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.98** | $-931.5 | $-56.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 78 | 45 | 1 | 63% | 2.96¢ |
| maker_sports | 116 | 71 | 2 | 62% | 1.58¢ |

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

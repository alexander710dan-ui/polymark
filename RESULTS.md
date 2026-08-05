# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30369 · Last run: 2026-08-05T01:03:22.413Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10953.3** | $1358.66 | $-405.36 | 396 | 56% | $1139.53 | 25 |
| mm_tight | **$10884.76** | $1123.45 | $-238.69 | 344 | 54% | $920.42 | 20 |
| mid_momentum | **$10428.84** | $757.35 | $-328.51 | 203 | 57% | $543.87 | 25 |
| mm_cheap | **$10391.17** | $849.22 | $-458.05 | 33 | 67% | $671.44 | 25 |
| copy_pro | **$10154.31** | $-438.03 | $592.34 | 382 | 52% | $-1288.03 | 25 |
| copy_top | **$10123.04** | $-193.36 | $316.4 | 401 | 52% | $-1521.93 | 25 |
| fade_longshot | **$9919.72** | $82.61 | $-162.89 | 113 | 96% | $71.87 | 25 |
| strong_dip | **$9718.36** | $-426.02 | $144.38 | 101 | 59% | $-518.33 | 25 |
| super | **$9630.99** | $-592.35 | $223.34 | 69 | 46% | $-808.2 | 15 |
| mm_max | **$9607.59** | $-324.37 | $-68.04 | 149 | 53% | $-491.49 | 10 |
| ai_judge | **$9402.62** | $-587.64 | $-9.74 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9175.6** | $-468.35 | $-356.05 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9142.27** | $-491.54 | $-366.19 | 98 | 51% | $-694.57 | 17 |
| maker_flat | **$9025.36** | $-616.54 | $-358.1 | 59 | 42% | $-810.66 | 18 |
| random_control | **$8889.66** | $-1057.37 | $-52.97 | 135 | 56% | $-1671.66 | 25 |
| mm_strong | **$8771.78** | $-927.32 | $-300.9 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8218.59** | $-1144.31 | $-637.1 | 253 | 67% | $-1632.55 | 25 |
| whale_fade | **$6942.4** | $-2370.75 | $-686.85 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.98** | $-931.5 | $-56.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 77 | 45 | 2 | 63% | 2.95¢ |
| maker_sports | 115 | 71 | 3 | 62% | 1.59¢ |

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

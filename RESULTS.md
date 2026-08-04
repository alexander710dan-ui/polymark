# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29528 · Last run: 2026-08-04T17:15:32.930Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11158.92** | $1147.97 | $10.95 | 364 | 56% | $944.94 | 23 |
| mm_tight | **$10735.8** | $638.7 | $97.1 | 314 | 54% | $435.67 | 19 |
| mm_cheap | **$10622.33** | $1054.47 | $-432.14 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10552.88** | $862.6 | $-309.72 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10033.25** | $-193.36 | $226.61 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10015.63** | $-609.89 | $625.52 | 379 | 51% | $-1459.89 | 25 |
| fade_longshot | **$9894.44** | $55.61 | $-161.17 | 108 | 95% | $44.87 | 25 |
| super | **$9814.06** | $-439.2 | $253.26 | 68 | 47% | $-655.05 | 12 |
| mm_max | **$9812.65** | $-362.82 | $175.47 | 134 | 52% | $-529.94 | 6 |
| strong_dip | **$9702.29** | $-463.45 | $165.74 | 99 | 60% | $-555.76 | 25 |
| ai_judge | **$9388.17** | $-587.64 | $-24.19 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9352.24** | $-520.62 | $-127.14 | 43 | 42% | $-698.4 | 18 |
| random_control | **$9163** | $-561.85 | $-275.15 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9162.18** | $-468.35 | $-369.47 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$8893.11** | $-720.86 | $-386.03 | 72 | 49% | $-906.57 | 14 |
| mm_strong | **$8708.36** | $-924.82 | $-366.82 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8199.94** | $-1041.81 | $-758.25 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7092.78** | $-2370.75 | $-536.47 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9416.86** | $-730.36 | $147.22 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9004.87** | $-942.24 | $-52.89 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8482.91** | $-1937.09 | $420 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.24** | $-4691.55 | $-204.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 61 | 40 | 1 | 60% | 2.95¢ |
| maker_sports | 86 | 52 | 3 | 62% | 1.54¢ |

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

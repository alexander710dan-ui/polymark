# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29876 · Last run: 2026-08-04T20:29:09.869Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11458.32** | $1437.91 | $20.41 | 380 | 57% | $1218.78 | 25 |
| mm_tight | **$11240.02** | $967.62 | $272.4 | 330 | 54% | $764.59 | 16 |
| mm_cheap | **$10483.07** | $1054.47 | $-571.4 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10383.83** | $862.6 | $-478.77 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10031.23** | $-193.36 | $224.59 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10024.13** | $-588.91 | $613.04 | 381 | 51% | $-1438.91 | 25 |
| fade_longshot | **$9905.41** | $63.25 | $-157.84 | 109 | 95% | $52.51 | 25 |
| mm_max | **$9729** | $-213.47 | $-57.53 | 144 | 53% | $-380.59 | 2 |
| strong_dip | **$9706.23** | $-463.45 | $169.68 | 99 | 60% | $-555.76 | 25 |
| super | **$9673.76** | $-592.35 | $266.11 | 69 | 46% | $-808.2 | 14 |
| ai_judge | **$9401.42** | $-587.64 | $-10.94 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9337.65** | $-640.78 | $-21.57 | 84 | 50% | $-826.49 | 13 |
| maker_flat | **$9142.02** | $-514.08 | $-343.9 | 53 | 43% | $-708.2 | 17 |
| mm_slow | **$9140.37** | $-468.35 | $-391.28 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8998.16** | $-654.21 | $-347.63 | 130 | 57% | $-1268.5 | 25 |
| mm_strong | **$8659.47** | $-924.82 | $-415.71 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8202.42** | $-1041.81 | $-755.77 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7053.25** | $-2370.75 | $-576 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.32** | $-931.5 | $-62.18 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8466.25** | $-1937.09 | $403.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 70 | 42 | 3 | 63% | 2.93¢ |
| maker_sports | 97 | 59 | 5 | 62% | 1.53¢ |

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

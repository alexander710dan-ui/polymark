# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29629 · Last run: 2026-08-04T18:11:38.981Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11472.91** | $1524.54 | $-51.63 | 372 | 57% | $1305.41 | 20 |
| mm_tight | **$10868.18** | $875.3 | $-7.12 | 322 | 54% | $672.27 | 14 |
| mm_cheap | **$10609.25** | $1054.47 | $-445.22 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10520.42** | $862.6 | $-342.18 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10018.96** | $-193.36 | $212.32 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10007.92** | $-609.89 | $617.81 | 379 | 51% | $-1459.89 | 25 |
| fade_longshot | **$9895.74** | $55.61 | $-159.87 | 108 | 95% | $44.87 | 25 |
| super | **$9800.08** | $-439.2 | $239.28 | 68 | 47% | $-655.05 | 12 |
| mm_max | **$9736.29** | $-255.58 | $-8.13 | 138 | 53% | $-422.7 | 4 |
| strong_dip | **$9692.09** | $-463.45 | $155.54 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9549.61** | $-338.8 | $-111.59 | 45 | 44% | $-516.58 | 20 |
| ai_judge | **$9399.2** | $-587.64 | $-13.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9151.27** | $-561.85 | $-286.88 | 128 | 57% | $-1176.14 | 25 |
| maker_sports | **$9144.06** | $-704.71 | $-151.23 | 79 | 49% | $-890.42 | 10 |
| mm_slow | **$9118.98** | $-468.35 | $-412.67 | 53 | 53% | $-654.06 | 25 |
| mm_strong | **$8701.3** | $-924.82 | $-373.88 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8206.21** | $-1041.81 | $-751.98 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7094.47** | $-2370.75 | $-534.78 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9404.36** | $-730.36 | $134.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9005.5** | $-942.24 | $-52.26 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8472.91** | $-1937.09 | $410 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.24** | $-4691.55 | $-204.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 65 | 41 | 1 | 61% | 2.98¢ |
| maker_sports | 89 | 54 | 5 | 62% | 1.58¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28922 · Last run: 2026-08-04T11:38:19.114Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10772.19** | $1129.19 | $-357 | 347 | 56% | $926.16 | 16 |
| mm_cheap | **$10606.75** | $1054.47 | $-447.72 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10472.06** | $862.6 | $-390.54 | 201 | 58% | $649.12 | 25 |
| mm_tight | **$10383.7** | $584.09 | $-200.39 | 301 | 53% | $381.06 | 8 |
| copy_top | **$10048.51** | $-129.92 | $178.43 | 397 | 52% | $-1458.49 | 25 |
| fade_longshot | **$9954.93** | $55.61 | $-100.68 | 108 | 95% | $44.87 | 25 |
| copy_pro | **$9775.34** | $-725.28 | $500.62 | 376 | 51% | $-1575.28 | 25 |
| strong_dip | **$9731.16** | $-463.45 | $194.61 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9660.82** | $-49.02 | $-290.16 | 31 | 48% | $-226.8 | 13 |
| ai_judge | **$9413.9** | $-587.64 | $1.54 | 7 | 14% | $-600 | 2 |
| super | **$9400.75** | $-353.9 | $-245.35 | 64 | 47% | $-569.75 | 15 |
| mm_max | **$9317.11** | $-585.1 | $-97.79 | 125 | 51% | $-704.57 | 1 |
| mm_slow | **$9162.22** | $-468.35 | $-369.43 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9021.41** | $-589.61 | $-388.98 | 57 | 49% | $-775.32 | 10 |
| random_control | **$8964.21** | $-561.85 | $-473.94 | 128 | 57% | $-1176.14 | 25 |
| mm_strong | **$8577.12** | $-920.12 | $-502.76 | 75 | 48% | $-1124.07 | 25 |
| momentum | **$8297.32** | $-1041.81 | $-660.87 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7165.67** | $-2279.45 | $-554.88 | 398 | 47% | $-2634 | 25 |
| copy_month (retired) | **$9396.03** | $-730.36 | $126.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9027.72** | $-942.24 | $-30.04 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8359.58** | $-1937.09 | $296.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5099.03** | $-4691.55 | $-209.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 44 | 30 | 0 | 59% | 3.04¢ |
| maker_sports | 67 | 40 | 2 | 63% | 1.61¢ |

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

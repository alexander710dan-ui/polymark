# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30476 · Last run: 2026-08-05T02:02:53.190Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10810.48** | $1180.28 | $-369.8 | 404 | 56% | $961.15 | 19 |
| mid_momentum | **$10694.59** | $814.23 | $-119.64 | 204 | 57% | $600.75 | 25 |
| mm_tight | **$10649.24** | $1049.88 | $-400.64 | 350 | 54% | $846.85 | 15 |
| mm_cheap | **$10386.79** | $746.87 | $-360.08 | 34 | 65% | $569.09 | 25 |
| copy_pro | **$10175.07** | $-643.53 | $818.6 | 383 | 51% | $-1493.53 | 25 |
| copy_top | **$10070.19** | $-222.82 | $293.01 | 403 | 52% | $-1551.39 | 25 |
| fade_longshot | **$9931.15** | $89.79 | $-158.64 | 114 | 96% | $79.05 | 25 |
| super | **$9750.4** | $-387.2 | $137.6 | 71 | 48% | $-603.05 | 13 |
| strong_dip | **$9595.58** | $-426.02 | $21.6 | 101 | 59% | $-518.33 | 25 |
| mm_max | **$9524.6** | $-473.6 | $-1.8 | 154 | 53% | $-640.72 | 5 |
| ai_judge | **$9390.48** | $-587.64 | $-21.88 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9292.3** | $-774.04 | $66.34 | 64 | 42% | $-968.16 | 15 |
| maker_sports | **$9287.3** | $-597.83 | $-114.87 | 104 | 51% | $-800.86 | 14 |
| mm_slow | **$9202.65** | $-468.35 | $-329 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8921.06** | $-991.45 | $-87.49 | 137 | 56% | $-1605.74 | 25 |
| mm_strong | **$8731.99** | $-1029.67 | $-238.34 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8316.07** | $-1113.4 | $-570.53 | 256 | 68% | $-1601.64 | 25 |
| whale_fade | **$7059.55** | $-2397.18 | $-543.27 | 404 | 48% | $-2751.73 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9010.76** | $-931.5 | $-57.74 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8452.91** | $-1937.09 | $390 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 79 | 45 | 0 | 64% | 2.95¢ |
| maker_sports | 118 | 71 | 1 | 62% | 1.57¢ |

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

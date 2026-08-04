# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29520 · Last run: 2026-08-04T17:10:58.339Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11304.68** | $1210.97 | $93.71 | 362 | 56% | $1007.94 | 25 |
| mm_tight | **$10840.05** | $741.1 | $98.95 | 313 | 54% | $538.07 | 20 |
| mm_cheap | **$10623.29** | $1054.47 | $-431.18 | 30 | 73% | $876.69 | 25 |
| mid_momentum | **$10547.94** | $862.6 | $-314.66 | 201 | 58% | $649.12 | 25 |
| copy_top | **$10029.43** | $-250.24 | $279.67 | 400 | 52% | $-1578.81 | 25 |
| copy_pro | **$10016.08** | $-752.09 | $768.17 | 378 | 51% | $-1602.09 | 25 |
| mm_max | **$9908.15** | $-362.82 | $270.97 | 134 | 52% | $-529.94 | 6 |
| fade_longshot | **$9893.95** | $55.61 | $-161.66 | 108 | 95% | $44.87 | 25 |
| super | **$9813.02** | $-439.2 | $252.22 | 68 | 47% | $-655.05 | 12 |
| strong_dip | **$9706.49** | $-463.45 | $169.94 | 99 | 60% | $-555.76 | 25 |
| ai_judge | **$9394.75** | $-587.64 | $-17.61 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9365.43** | $-520.62 | $-113.95 | 43 | 42% | $-698.4 | 18 |
| random_control | **$9166.13** | $-561.85 | $-272.02 | 128 | 57% | $-1176.14 | 25 |
| mm_slow | **$9157.51** | $-468.35 | $-374.14 | 53 | 53% | $-654.06 | 25 |
| maker_sports | **$9028.82** | $-665.79 | $-305.39 | 70 | 49% | $-851.5 | 16 |
| mm_strong | **$8708.87** | $-924.82 | $-366.31 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8204.32** | $-1041.81 | $-753.87 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7105.88** | $-2267.65 | $-626.47 | 401 | 48% | $-2622.2 | 25 |
| copy_month (retired) | **$9416.86** | $-730.36 | $147.22 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.15** | $-942.24 | $-54.61 | 132 | 69% | $-1006.17 | 4 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5104.24** | $-4691.55 | $-204.21 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 61 | 39 | 2 | 61% | 2.95¢ |
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

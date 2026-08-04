# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27978 · Last run: 2026-08-04T02:53:05.398Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11016.15** | $1609.76 | $-593.61 | 329 | 57% | $1406.73 | 21 |
| mm_tight | **$10905.06** | $667.89 | $237.17 | 286 | 53% | $464.86 | 16 |
| mm_cheap | **$10480** | $846.08 | $-366.08 | 27 | 70% | $668.3 | 25 |
| mid_momentum | **$10302.66** | $732.74 | $-430.08 | 195 | 58% | $519.26 | 25 |
| fade_longshot | **$9974.68** | $39.78 | $-65.1 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9862.48** | $-588.74 | $451.22 | 392 | 52% | $-1917.31 | 23 |
| maker_flat | **$9772.78** | $16.28 | $-243.5 | 22 | 50% | $-161.5 | 14 |
| strong_dip | **$9762.42** | $-463.45 | $225.87 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9691.83** | $-309.56 | $1.39 | 115 | 52% | $-429.03 | 9 |
| super | **$9580.12** | $-353.9 | $-65.98 | 64 | 47% | $-569.75 | 11 |
| copy_pro | **$9541.16** | $-916.05 | $457.21 | 370 | 51% | $-1766.05 | 25 |
| ai_judge | **$9430.65** | $-587.64 | $18.29 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9097.46** | $-810 | $-92.54 | 50 | 50% | $-932.22 | 25 |
| maker_sports | **$9073** | $-253.27 | $-673.73 | 43 | 51% | $-438.98 | 12 |
| random_control | **$9009.56** | $-354.2 | $-636.24 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8762.64** | $-1069.08 | $-168.28 | 70 | 47% | $-1273.03 | 25 |
| momentum | **$8216.28** | $-1278.24 | $-505.48 | 243 | 67% | $-1766.48 | 25 |
| whale_fade | **$7355.09** | $-1968.7 | $-676.21 | 393 | 48% | $-2323.25 | 23 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9042.1** | $-942.24 | $-15.66 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8286.24** | $-1937.09 | $223.33 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5099.03** | $-4691.55 | $-209.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 36 | 25 | 2 | 59% | 2.99¢ |
| maker_sports | 55 | 27 | 3 | 67% | 1.6¢ |

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

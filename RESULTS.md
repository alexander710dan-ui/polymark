# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27960 · Last run: 2026-08-04T02:43:07.905Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11081.84** | $1712.06 | $-630.22 | 328 | 57% | $1509.03 | 21 |
| mm_tight | **$10857.91** | $770.19 | $87.72 | 285 | 54% | $567.16 | 16 |
| mm_cheap | **$10406.32** | $846.08 | $-439.76 | 27 | 70% | $668.3 | 25 |
| mid_momentum | **$10251.85** | $732.74 | $-480.89 | 195 | 58% | $519.26 | 25 |
| fade_longshot | **$9978.58** | $39.78 | $-61.2 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9941.59** | $-588.74 | $530.33 | 392 | 52% | $-1917.31 | 23 |
| maker_flat | **$9795.53** | $116.28 | $-320.75 | 21 | 52% | $-61.5 | 15 |
| strong_dip | **$9774.96** | $-463.45 | $238.41 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9668.05** | $-916.05 | $584.1 | 370 | 51% | $-1766.05 | 25 |
| mm_max | **$9647.19** | $-207.56 | $-145.25 | 114 | 53% | $-327.03 | 9 |
| super | **$9556.83** | $-353.9 | $-89.27 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9439.54** | $-587.64 | $27.18 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9162.89** | $-153.27 | $-683.84 | 42 | 52% | $-338.98 | 13 |
| mm_slow | **$9038.84** | $-810 | $-151.16 | 50 | 50% | $-932.22 | 25 |
| random_control | **$8980.34** | $-354.2 | $-665.46 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8682.57** | $-1069.08 | $-248.35 | 70 | 47% | $-1273.03 | 25 |
| momentum | **$8195.16** | $-1278.24 | $-526.6 | 243 | 67% | $-1766.48 | 25 |
| whale_fade | **$7276.62** | $-1968.7 | $-754.68 | 393 | 48% | $-2323.25 | 23 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9046.8** | $-942.24 | $-10.96 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8259.58** | $-1937.09 | $196.67 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5097.99** | $-4691.55 | $-210.46 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 36 | 24 | 1 | 60% | 2.99¢ |
| maker_sports | 55 | 26 | 3 | 68% | 1.6¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33061 · Last run: 2026-08-06T02:11:10.890Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10437.1** | $787.82 | $-350.72 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10415.99** | $604.41 | $-188.42 | 212 | 57% | $390.93 | 25 |
| mm_tight | **$10348.17** | $295.62 | $52.55 | 417 | 53% | $86.52 | 16 |
| super | **$10262.22** | $-110 | $372.22 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10092.56** | $-185.69 | $278.25 | 421 | 52% | $-1514.26 | 22 |
| fade_longshot | **$9873.1** | $25.97 | $-152.87 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9840.49** | $-120.91 | $-38.6 | 31 | 52% | $-311.73 | 25 |
| mm_cheap_v2 | **$9794.97** | $27.89 | $-232.92 | 34 | 56% | $-162.93 | 24 |
| copy_pro | **$9756.62** | $-929.24 | $685.86 | 399 | 51% | $-1779.24 | 24 |
| mm_sports | **$9748** | $-623.55 | $371.55 | 490 | 54% | $-842.68 | 19 |
| strong_dip | **$9618.01** | $-394.63 | $12.64 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9500.08** | $-581.01 | $81.09 | 184 | 52% | $-790.11 | 7 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9009.78** | $-981.12 | $-9.1 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8797** | $-707.39 | $-495.61 | 61 | 51% | $-893.1 | 25 |
| mm_sports_v2 | **$8475.9** | $-1843.02 | $318.92 | 59 | 41% | $-1969.04 | 18 |
| mm_strong | **$8352.94** | $-1169.83 | $-477.23 | 88 | 47% | $-1373.78 | 24 |
| maker_flat | **$8317.71** | $-1452.92 | $-229.37 | 89 | 40% | $-1647.04 | 20 |
| momentum | **$8084.66** | $-1302.09 | $-613.25 | 266 | 67% | $-1790.33 | 25 |
| maker_sports | **$7625.92** | $-2377.57 | $3.49 | 173 | 47% | $-2580.6 | 11 |
| whale_fade | **$6636.52** | $-2762.63 | $-600.85 | 422 | 47% | $-3117.18 | 22 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 71 | 3 | 61% | 2.95¢ |
| maker_sports | 184 | 117 | 4 | 61% | 1.54¢ |

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

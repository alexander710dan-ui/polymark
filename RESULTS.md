# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31331 · Last run: 2026-08-05T09:58:36.024Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10952.84** | $975.71 | $-22.87 | 362 | 54% | $772.68 | 12 |
| mm_sports | **$10922.17** | $1109.68 | $-187.51 | 419 | 56% | $890.55 | 20 |
| mid_momentum | **$10730.89** | $967.28 | $-236.39 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10491.24** | $887.82 | $-396.58 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10079.3** | $-271.55 | $350.85 | 408 | 52% | $-1600.12 | 25 |
| copy_pro | **$10078.4** | $-578.08 | $656.48 | 388 | 51% | $-1428.08 | 25 |
| fade_longshot | **$9925.37** | $102.17 | $-176.8 | 116 | 96% | $91.43 | 25 |
| super | **$9867.86** | $-425.73 | $293.59 | 73 | 48% | $-641.58 | 11 |
| mm_max | **$9479.86** | $-517.02 | $-3.12 | 160 | 53% | $-684.14 | 2 |
| strong_dip | **$9465.89** | $-528.32 | $-5.79 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9387.06** | $-587.64 | $-25.3 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9182.71** | $-655.39 | $-161.9 | 116 | 51% | $-858.42 | 11 |
| mm_slow | **$9073.2** | $-516.83 | $-409.97 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8952.23** | $-955.81 | $-91.96 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8700.73** | $-876.62 | $-422.65 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8681.04** | $-1017.63 | $-301.33 | 69 | 41% | $-1211.75 | 18 |
| momentum | **$8233.16** | $-1076.77 | $-690.07 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7140.8** | $-2200.96 | $-658.24 | 409 | 48% | $-2555.51 | 25 |
| copy_month (retired) | **$9419.64** | $-730.36 | $150 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.81** | $-931.5 | $-64.69 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 87 | 59 | 3 | 60% | 2.98¢ |
| maker_sports | 127 | 80 | 4 | 61% | 1.59¢ |

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

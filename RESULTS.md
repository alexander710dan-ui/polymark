# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32998 · Last run: 2026-08-06T01:36:06.406Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10470.67** | $787.82 | $-317.15 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10431.51** | $561.03 | $-129.52 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10280.28** | $291.02 | $-10.74 | 414 | 53% | $87.99 | 18 |
| super | **$10145.17** | $-110 | $255.17 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10099.89** | $-180.49 | $280.38 | 419 | 52% | $-1509.06 | 24 |
| mm_cheap_v2 | **$10016.42** | $86.01 | $-69.59 | 32 | 56% | $-104.81 | 24 |
| copy_pro | **$9899.2** | $-723.84 | $623.04 | 398 | 51% | $-1573.84 | 25 |
| mid_momentum_v2 | **$9890.27** | $-62.59 | $-47.14 | 29 | 52% | $-253.41 | 25 |
| fade_longshot | **$9866.97** | $25.97 | $-159 | 123 | 95% | $15.23 | 25 |
| strong_dip | **$9602.86** | $-394.63 | $-2.51 | 105 | 60% | $-486.94 | 25 |
| mm_sports | **$9592.87** | $-606.91 | $199.78 | 485 | 54% | $-826.04 | 23 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_max | **$9281.3** | $-790.11 | $71.41 | 183 | 52% | $-957.23 | 8 |
| random_control | **$9033.05** | $-981.12 | $14.17 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8798.6** | $-750.77 | $-450.63 | 60 | 50% | $-936.48 | 25 |
| maker_flat | **$8459.45** | $-1549 | $8.45 | 88 | 40% | $-1743.12 | 21 |
| mm_strong | **$8363.07** | $-1110.56 | $-526.37 | 86 | 47% | $-1314.51 | 25 |
| mm_sports_v2 | **$8322.17** | $-1869.48 | $191.65 | 54 | 39% | $-1995.5 | 22 |
| momentum | **$8082.96** | $-1345.47 | $-571.57 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7753.37** | $-2337.58 | $90.95 | 169 | 47% | $-2540.61 | 12 |
| whale_fade | **$6690.2** | $-2739.75 | $-570.05 | 420 | 47% | $-3094.3 | 24 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 71 | 3 | 61% | 2.95¢ |
| maker_sports | 181 | 116 | 5 | 61% | 1.55¢ |

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

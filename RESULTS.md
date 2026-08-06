# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33055 · Last run: 2026-08-06T02:07:54.993Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10436.05** | $787.82 | $-351.77 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10419.12** | $561.03 | $-141.91 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10353.9** | $398.22 | $-44.32 | 416 | 53% | $189.12 | 16 |
| super | **$10237.22** | $-110 | $347.22 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10084.28** | $-82.99 | $167.27 | 420 | 52% | $-1411.56 | 23 |
| fade_longshot | **$9872.03** | $25.97 | $-153.94 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9822.35** | $-164.29 | $-13.36 | 30 | 50% | $-355.11 | 25 |
| mm_cheap_v2 | **$9769.02** | $86.01 | $-316.99 | 32 | 56% | $-104.81 | 25 |
| copy_pro | **$9738.04** | $-723.84 | $461.88 | 398 | 51% | $-1573.84 | 25 |
| mm_sports | **$9716.09** | $-580.34 | $296.43 | 488 | 55% | $-799.47 | 20 |
| strong_dip | **$9617.2** | $-394.63 | $11.83 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9522.27** | $-581.01 | $103.28 | 184 | 52% | $-790.11 | 7 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9011.41** | $-981.12 | $-7.47 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8804.61** | $-750.77 | $-444.62 | 60 | 50% | $-936.48 | 25 |
| mm_sports_v2 | **$8444.68** | $-1799.81 | $244.49 | 57 | 40% | $-1925.83 | 19 |
| mm_strong | **$8361.19** | $-1110.56 | $-528.25 | 86 | 47% | $-1314.51 | 25 |
| maker_flat | **$8356.46** | $-1452.92 | $-190.62 | 89 | 40% | $-1647.04 | 20 |
| momentum | **$8080.77** | $-1345.47 | $-573.76 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7605.71** | $-2341.5 | $-52.79 | 171 | 47% | $-2544.53 | 13 |
| whale_fade | **$6648.09** | $-2842.2 | $-509.71 | 421 | 47% | $-3196.75 | 23 |
| copy_month (retired) | **$9412.7** | $-730.36 | $143.06 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 71 | 3 | 61% | 2.95¢ |
| maker_sports | 184 | 117 | 3 | 61% | 1.54¢ |

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

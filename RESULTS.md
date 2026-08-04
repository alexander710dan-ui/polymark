# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 28012 · Last run: 2026-08-04T03:12:01.223Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11042.67** | $1359.06 | $-316.39 | 333 | 57% | $1156.03 | 17 |
| mm_tight | **$10818.89** | $735.36 | $83.53 | 289 | 54% | $532.33 | 13 |
| mm_cheap | **$10469.47** | $904.81 | $-435.34 | 28 | 71% | $727.03 | 25 |
| mid_momentum | **$10379.72** | $529.34 | $-149.62 | 197 | 57% | $315.86 | 25 |
| fade_longshot | **$9971.25** | $39.78 | $-68.53 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9939.58** | $-260.17 | $199.75 | 394 | 52% | $-1588.74 | 22 |
| strong_dip | **$9768.66** | $-463.45 | $232.11 | 99 | 60% | $-555.76 | 25 |
| maker_flat | **$9765.86** | $-183.72 | $-50.42 | 24 | 46% | $-361.5 | 14 |
| mm_max | **$9626.96** | $-242.09 | $-130.95 | 118 | 53% | $-361.56 | 6 |
| copy_pro | **$9618.92** | $-859.73 | $478.65 | 372 | 51% | $-1709.73 | 24 |
| super | **$9592.83** | $-353.9 | $-53.27 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9428.43** | $-587.64 | $16.07 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9171.88** | $-553.27 | $-274.85 | 46 | 48% | $-738.98 | 10 |
| mm_slow | **$9096.3** | $-810 | $-93.7 | 50 | 50% | $-932.22 | 25 |
| random_control | **$9000.84** | $-457.3 | $-541.86 | 127 | 57% | $-1071.59 | 25 |
| mm_strong | **$8621.1** | $-976.77 | $-402.13 | 71 | 48% | $-1180.72 | 25 |
| momentum | **$8198.04** | $-1313.43 | $-488.53 | 246 | 67% | $-1801.67 | 25 |
| whale_fade | **$7286.96** | $-2172.45 | $-540.59 | 395 | 48% | $-2527 | 22 |
| copy_month (retired) | **$9382.14** | $-730.36 | $112.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9040.56** | $-942.24 | $-17.2 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8292.91** | $-1937.09 | $230 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5096.95** | $-4691.55 | $-211.5 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 0 | 60% | 2.96¢ |
| maker_sports | 56 | 27 | 2 | 67% | 1.61¢ |

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

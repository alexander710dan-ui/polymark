# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30429 · Last run: 2026-08-05T01:36:42.149Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10838.68** | $998.01 | $-159.33 | 401 | 56% | $778.88 | 21 |
| mm_tight | **$10645.96** | $1049.88 | $-403.92 | 350 | 54% | $846.85 | 14 |
| mid_momentum | **$10599.14** | $814.23 | $-215.09 | 204 | 57% | $600.75 | 25 |
| mm_cheap | **$10300.26** | $746.87 | $-446.61 | 34 | 65% | $569.09 | 25 |
| copy_top | **$10032.14** | $-296.11 | $328.25 | 402 | 52% | $-1624.68 | 24 |
| fade_longshot | **$9930.13** | $82.61 | $-152.48 | 113 | 96% | $71.87 | 25 |
| copy_pro | **$9779.89** | $-643.53 | $423.42 | 383 | 51% | $-1493.53 | 25 |
| strong_dip | **$9673.33** | $-426.02 | $99.35 | 101 | 59% | $-518.33 | 25 |
| super | **$9663.29** | $-497.14 | $160.43 | 70 | 47% | $-712.99 | 14 |
| mm_max | **$9458.61** | $-473.6 | $-67.79 | 154 | 53% | $-640.72 | 5 |
| ai_judge | **$9392.7** | $-587.64 | $-19.66 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9209.45** | $-468.35 | $-322.2 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9159.42** | $-852.61 | $12.03 | 63 | 41% | $-1046.73 | 16 |
| maker_sports | **$9120.08** | $-737.69 | $-142.23 | 102 | 50% | $-940.72 | 15 |
| random_control | **$8906.78** | $-1025.29 | $-67.93 | 136 | 56% | $-1639.58 | 25 |
| mm_strong | **$8685.86** | $-1029.67 | $-284.47 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8238.08** | $-1113.4 | $-648.52 | 256 | 68% | $-1601.64 | 25 |
| whale_fade | **$7018.92** | $-2294.38 | $-686.7 | 403 | 48% | $-2648.93 | 24 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.94** | $-931.5 | $-56.56 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8446.25** | $-1937.09 | $383.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 79 | 45 | 0 | 64% | 2.95¢ |
| maker_sports | 117 | 71 | 1 | 62% | 1.58¢ |

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

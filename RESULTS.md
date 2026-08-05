# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31727 · Last run: 2026-08-05T13:38:53.826Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11008.22** | $1035.53 | $-27.31 | 365 | 54% | $832.5 | 18 |
| mm_sports | **$10827.37** | $992.62 | $-165.25 | 426 | 56% | $773.49 | 25 |
| mid_momentum | **$10713.51** | $967.28 | $-253.77 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10458.41** | $887.82 | $-429.41 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9946.15** | $109.23 | $-163.08 | 117 | 96% | $98.49 | 25 |
| super | **$9848.11** | $-425.73 | $273.84 | 73 | 48% | $-641.58 | 11 |
| mm_cheap_v2 | **$9793.67** | $0 | $-206.33 | 0 | — | $0 | 22 |
| copy_top | **$9765.26** | $-374.75 | $140.01 | 409 | 52% | $-1703.32 | 25 |
| mm_sports_v2 | **$9682.84** | $-102.1 | $-215.06 | 1 | 0% | $0 | 13 |
| mid_momentum_v2 | **$9637.68** | $-102.1 | $-260.22 | 1 | 0% | $0 | 25 |
| mm_max | **$9547.93** | $-517.02 | $64.95 | 160 | 53% | $-684.14 | 5 |
| copy_pro | **$9540.02** | $-732.88 | $272.9 | 389 | 51% | $-1582.88 | 25 |
| strong_dip | **$9461.53** | $-528.32 | $-10.15 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9382.62** | $-587.64 | $-29.74 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9104.47** | $-516.83 | $-378.7 | 55 | 53% | $-702.54 | 25 |
| maker_sports | **$8874.81** | $-682.5 | $-442.69 | 121 | 51% | $-885.53 | 13 |
| random_control | **$8854.84** | $-1058.61 | $-86.55 | 139 | 56% | $-1672.9 | 25 |
| mm_strong | **$8734.47** | $-876.62 | $-388.91 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8458.73** | $-1458.9 | $-82.37 | 75 | 39% | $-1653.02 | 16 |
| momentum | **$8242.79** | $-1076.77 | $-680.44 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7286.53** | $-2148.86 | $-564.61 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9001.1** | $-931.5 | $-67.4 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8499.58** | $-1937.09 | $436.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 91 | 61 | 1 | 60% | 3.02¢ |
| maker_sports | 134 | 87 | 5 | 61% | 1.6¢ |

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

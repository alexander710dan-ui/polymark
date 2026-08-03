# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26662 · Last run: 2026-08-03T14:40:54.750Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11405.51** | $1236.17 | $169.34 | 272 | 57% | $1033.14 | 22 |
| mm_tight | **$10630.31** | $460.71 | $169.6 | 232 | 53% | $257.68 | 17 |
| mid_momentum | **$10316.14** | $608.28 | $-292.14 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10213.27** | $832.49 | $-619.22 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$10034.46** | $-337.42 | $371.88 | 96 | 60% | $-429.73 | 25 |
| copy_pro | **$9983.59** | $-484.75 | $468.34 | 363 | 51% | $-1334.75 | 25 |
| fade_longshot | **$9967.89** | $34.52 | $-66.63 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9924.88** | $0 | $-75.12 | 0 | — | $0 | 4 |
| maker_sports | **$9904.99** | $0 | $-95.01 | 0 | — | $0 | 2 |
| copy_top | **$9614.59** | $-366.45 | $-18.96 | 382 | 52% | $-1695.02 | 25 |
| super | **$9534.89** | $-445.84 | $-19.27 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9479.12** | $-475.72 | $-45.16 | 77 | 49% | $-593.11 | 9 |
| ai_judge | **$9401.12** | $-487.64 | $-111.24 | 6 | 17% | $-500 | 3 |
| random_control | **$9243.16** | $-310.74 | $-446.1 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8819** | $-821.03 | $-359.97 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8566.7** | $-1233.53 | $-199.77 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8187.63** | $-1339.53 | $-472.84 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7429.75** | $-2216.62 | $-353.63 | 383 | 48% | $-2571.17 | 25 |
| copy_month (retired) | **$9394.57** | $-777.42 | $171.99 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.73** | $-1003.53 | $34.26 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.03** | $-4691.55 | $-213.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 4 | 0 | 6 | 100% | 2.25¢ |
| maker_sports | 2 | 0 | 5 | 100% | 1¢ |

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

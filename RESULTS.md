# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26576 · Last run: 2026-08-03T13:53:05.067Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11476.85** | $1236.17 | $240.68 | 272 | 57% | $1033.14 | 22 |
| mm_tight | **$10673.28** | $460.71 | $212.57 | 232 | 53% | $257.68 | 16 |
| mid_momentum | **$10391.19** | $608.28 | $-217.09 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10224.46** | $832.49 | $-608.03 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$10010.3** | $-337.42 | $347.72 | 96 | 60% | $-429.73 | 25 |
| maker_sports | **$9999.18** | $0 | $-0.82 | 0 | — | $0 | 1 |
| maker_flat | **$9993.9** | $0 | $-6.1 | 0 | — | $0 | 2 |
| copy_pro | **$9978.36** | $-484.75 | $463.11 | 363 | 51% | $-1334.75 | 25 |
| fade_longshot | **$9969.36** | $34.52 | $-65.16 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9625.64** | $-366.45 | $-7.91 | 382 | 52% | $-1695.02 | 25 |
| super | **$9534.94** | $-445.84 | $-19.22 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9455.91** | $-475.72 | $-68.37 | 77 | 49% | $-593.11 | 8 |
| ai_judge | **$9405.56** | $-487.64 | $-106.8 | 6 | 17% | $-500 | 3 |
| random_control | **$9247.03** | $-310.74 | $-442.23 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8886.32** | $-821.03 | $-292.65 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8600.51** | $-1233.53 | $-165.96 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8206.39** | $-1339.53 | $-454.08 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7453.22** | $-2216.62 | $-330.16 | 383 | 48% | $-2571.17 | 25 |
| copy_month (retired) | **$9400.12** | $-777.42 | $177.54 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9032.97** | $-1003.53 | $36.5 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8339.71** | $-1837.09 | $176.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.03** | $-4691.55 | $-213.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 2 | 0 | 5 | 100% | 2.5¢ |
| maker_sports | 1 | 0 | 5 | 100% | 1¢ |

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

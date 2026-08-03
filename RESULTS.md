# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26584 · Last run: 2026-08-03T13:57:31.533Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11488.7** | $1236.17 | $252.53 | 272 | 57% | $1033.14 | 22 |
| mm_tight | **$10678.99** | $460.71 | $218.28 | 232 | 53% | $257.68 | 16 |
| mid_momentum | **$10390.19** | $608.28 | $-218.09 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10231.82** | $832.49 | $-600.67 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$10005.46** | $-337.42 | $342.88 | 96 | 60% | $-429.73 | 25 |
| maker_sports | **$9999.18** | $0 | $-0.82 | 0 | — | $0 | 1 |
| maker_flat | **$9992.74** | $0 | $-7.26 | 0 | — | $0 | 3 |
| copy_pro | **$9986.96** | $-484.75 | $471.71 | 363 | 51% | $-1334.75 | 25 |
| fade_longshot | **$9967.06** | $34.52 | $-67.46 | 105 | 95% | $23.78 | 25 |
| copy_top | **$9625.86** | $-366.45 | $-7.69 | 382 | 52% | $-1695.02 | 25 |
| super | **$9538.3** | $-445.84 | $-15.86 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9455.91** | $-475.72 | $-68.37 | 77 | 49% | $-593.11 | 8 |
| ai_judge | **$9402.23** | $-487.64 | $-110.13 | 6 | 17% | $-500 | 3 |
| random_control | **$9245.95** | $-310.74 | $-443.31 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8878.71** | $-821.03 | $-300.26 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8596.44** | $-1233.53 | $-170.03 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8208.96** | $-1339.53 | $-451.51 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7438.23** | $-2216.62 | $-345.15 | 383 | 48% | $-2571.17 | 25 |
| copy_month (retired) | **$9398.73** | $-777.42 | $176.15 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9031.2** | $-1003.53 | $34.73 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8349.71** | $-1837.09 | $186.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.03** | $-4691.55 | $-213.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 3 | 0 | 4 | 100% | 2.33¢ |
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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27995 · Last run: 2026-08-04T03:02:39.400Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11021.86** | $1460.81 | $-438.95 | 332 | 57% | $1257.78 | 18 |
| mm_tight | **$10810.83** | $837.11 | $-26.28 | 288 | 54% | $634.08 | 14 |
| mm_cheap | **$10476.23** | $846.08 | $-369.85 | 27 | 70% | $668.3 | 25 |
| mid_momentum | **$10339.49** | $529.34 | $-189.85 | 197 | 57% | $315.86 | 25 |
| fade_longshot | **$9971.42** | $39.78 | $-68.36 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9947.4** | $-260.17 | $207.57 | 394 | 52% | $-1588.74 | 21 |
| maker_flat | **$9802.16** | $-83.72 | $-114.12 | 23 | 48% | $-261.5 | 15 |
| strong_dip | **$9761.41** | $-463.45 | $224.86 | 99 | 60% | $-555.76 | 25 |
| copy_pro | **$9624.16** | $-859.73 | $483.89 | 372 | 51% | $-1709.73 | 23 |
| mm_max | **$9602.92** | $-140.34 | $-256.74 | 117 | 53% | $-259.81 | 7 |
| super | **$9585.79** | $-353.9 | $-60.31 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9428.43** | $-587.64 | $16.07 | 7 | 14% | $-600 | 2 |
| maker_sports | **$9181.6** | $-453.27 | $-365.13 | 45 | 49% | $-638.98 | 11 |
| mm_slow | **$9095.57** | $-810 | $-94.43 | 50 | 50% | $-932.22 | 25 |
| random_control | **$9015.73** | $-354.2 | $-630.07 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8637.6** | $-1069.08 | $-293.32 | 70 | 47% | $-1273.03 | 25 |
| momentum | **$8221.41** | $-1211.73 | $-566.86 | 245 | 67% | $-1699.97 | 25 |
| whale_fade | **$7285.01** | $-2172.45 | $-542.54 | 395 | 48% | $-2527 | 21 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9040.8** | $-942.24 | $-16.96 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8292.91** | $-1937.09 | $230 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5094.87** | $-4691.55 | $-213.58 | 81 | 2% | $-6591.55 | 3 |


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

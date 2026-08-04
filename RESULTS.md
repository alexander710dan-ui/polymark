# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27989 · Last run: 2026-08-04T02:59:12.797Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10934.83** | $1562.66 | $-627.83 | 331 | 57% | $1359.63 | 19 |
| mm_tight | **$10853.83** | $754.22 | $99.61 | 287 | 54% | $551.19 | 15 |
| mm_cheap | **$10478.79** | $846.08 | $-367.29 | 27 | 70% | $668.3 | 25 |
| mid_momentum | **$10298.76** | $631.19 | $-332.43 | 196 | 58% | $417.71 | 25 |
| fade_longshot | **$9971.65** | $39.78 | $-68.13 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9924.09** | $-379.64 | $303.73 | 393 | 52% | $-1708.21 | 22 |
| maker_flat | **$9809.16** | $16.28 | $-207.12 | 22 | 50% | $-161.5 | 16 |
| strong_dip | **$9761.48** | $-463.45 | $224.93 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9666.42** | $-223.23 | $-110.35 | 116 | 53% | $-342.7 | 8 |
| copy_pro | **$9604.54** | $-1119.15 | $723.69 | 371 | 51% | $-1969.15 | 24 |
| super | **$9587.26** | $-353.9 | $-58.84 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9428.43** | $-587.64 | $16.07 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9096.4** | $-810 | $-93.6 | 50 | 50% | $-932.22 | 25 |
| maker_sports | **$9048.21** | $-353.27 | $-598.52 | 44 | 50% | $-538.98 | 12 |
| random_control | **$9016.35** | $-354.2 | $-629.45 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8728.16** | $-1069.08 | $-202.76 | 70 | 47% | $-1273.03 | 25 |
| momentum | **$8209.16** | $-1251.13 | $-539.71 | 244 | 67% | $-1739.37 | 25 |
| whale_fade | **$7305.37** | $-2070.25 | $-624.38 | 394 | 48% | $-2424.8 | 22 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9040.8** | $-942.24 | $-16.96 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8292.91** | $-1937.09 | $230 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5099.03** | $-4691.55 | $-209.42 | 81 | 2% | $-6591.55 | 3 |


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

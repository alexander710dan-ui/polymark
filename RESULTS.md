# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34321 · Last run: 2026-08-06T13:52:49.203Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10328.36** | $46.83 | $281.53 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10295.19** | $456.72 | $-161.53 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10264.01** | $583.27 | $-319.26 | 38 | 61% | $405.49 | 25 |
| copy_top | **$10005.03** | $-117.05 | $122.08 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9908.95** | $144.27 | $-235.32 | 444 | 53% | $-64.83 | 20 |
| fade_longshot | **$9860.91** | $25.97 | $-165.06 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9838.42** | $-919.79 | $758.21 | 404 | 51% | $-1769.79 | 25 |
| mm_max | **$9772.85** | $-242.96 | $15.81 | 194 | 53% | $-452.06 | 5 |
| strong_dip | **$9634.88** | $-517.26 | $152.14 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9567.7** | $-217.42 | $-214.88 | 50 | 50% | $-408.24 | 25 |
| mm_cheap_v2 | **$9404.52** | $-424.59 | $-170.89 | 54 | 50% | $-615.41 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9139.51** | $-979.49 | $119 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8905.96** | $-564.1 | $-529.94 | 522 | 55% | $-783.23 | 25 |
| mm_slow | **$8647.38** | $-809.59 | $-543.03 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8351.43** | $-1290.97 | $-357.6 | 96 | 42% | $-1485.09 | 21 |
| mm_strong | **$8227.55** | $-1227.41 | $-545.04 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7930.93** | $-1478.77 | $-590.3 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7694.49** | $-1869.6 | $-435.91 | 92 | 46% | $-2088.73 | 25 |
| maker_sports | **$6777.9** | $-2816.79 | $-405.31 | 196 | 46% | $-3019.82 | 16 |
| whale_fade | **$6695.08** | $-2848.81 | $-456.11 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 117 | 83 | 3 | 59% | 2.91¢ |
| maker_sports | 212 | 133 | 5 | 61% | 1.58¢ |

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

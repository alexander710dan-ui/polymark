# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34099 · Last run: 2026-08-06T11:49:24.813Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10307.25** | $46.83 | $260.42 | 79 | 51% | $-217.5 | 12 |
| mid_momentum | **$10225.1** | $559.07 | $-333.97 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10212.8** | $685.62 | $-472.82 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10006.83** | $-117.05 | $123.88 | 424 | 52% | $-1445.62 | 25 |
| fade_longshot | **$9872.22** | $25.97 | $-153.75 | 123 | 95% | $15.23 | 25 |
| mm_tight | **$9855.54** | $246.52 | $-390.98 | 436 | 53% | $37.42 | 20 |
| strong_dip | **$9637.24** | $-517.26 | $154.5 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9626.88** | $-344.49 | $-28.63 | 193 | 53% | $-553.59 | 2 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mid_momentum_v2 | **$9364.4** | $-188.11 | $-447.49 | 46 | 50% | $-378.93 | 25 |
| mm_cheap_v2 | **$9342.74** | $-335.37 | $-321.89 | 51 | 51% | $-526.19 | 25 |
| copy_pro | **$9341.58** | $-919.79 | $261.37 | 404 | 51% | $-1769.79 | 25 |
| random_control | **$9129.83** | $-1085.22 | $215.05 | 146 | 56% | $-1699.51 | 25 |
| mm_sports | **$9090.09** | $-461.85 | $-448.06 | 514 | 55% | $-680.98 | 24 |
| mm_slow | **$8640.58** | $-809.59 | $-549.83 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8613.21** | $-1090.97 | $-295.82 | 94 | 43% | $-1285.09 | 18 |
| mm_strong | **$8216.68** | $-1227.41 | $-555.91 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7884.65** | $-1376.42 | $-738.93 | 269 | 67% | $-1864.66 | 25 |
| mm_sports_v2 | **$7827.91** | $-1767.35 | $-404.74 | 84 | 45% | $-1986.48 | 22 |
| maker_sports | **$6906.65** | $-2574.37 | $-518.98 | 190 | 47% | $-2777.4 | 13 |
| whale_fade | **$6693.88** | $-2848.81 | $-457.31 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.99** | $-931.5 | $-71.51 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5084.82** | $-4791.55 | $-123.63 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 79 | 3 | 59% | 2.94¢ |
| maker_sports | 203 | 127 | 7 | 62% | 1.55¢ |

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

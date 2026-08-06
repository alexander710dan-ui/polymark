# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33978 · Last run: 2026-08-06T10:41:56.726Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10302.76** | $46.83 | $255.93 | 79 | 51% | $-217.5 | 11 |
| mid_momentum | **$10217.13** | $559.07 | $-341.94 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10216.17** | $685.62 | $-469.45 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10041.63** | $-117.05 | $158.68 | 424 | 52% | $-1445.62 | 22 |
| mm_tight | **$10027.52** | $348.87 | $-321.35 | 435 | 53% | $139.77 | 15 |
| fade_longshot | **$9874.41** | $25.97 | $-151.56 | 123 | 95% | $15.23 | 25 |
| strong_dip | **$9640.66** | $-517.26 | $157.92 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9606.47** | $-344.49 | $-49.04 | 193 | 53% | $-553.59 | 2 |
| copy_pro | **$9523.16** | $-919.79 | $442.95 | 404 | 51% | $-1769.79 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9315.66** | $-233.02 | $-451.32 | 50 | 52% | $-423.84 | 25 |
| mid_momentum_v2 | **$9312.84** | $-188.11 | $-499.05 | 46 | 50% | $-378.93 | 25 |
| mm_sports | **$9233.82** | $-402.88 | $-363.3 | 512 | 55% | $-622.01 | 20 |
| random_control | **$9139.22** | $-1085.22 | $224.44 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8652.1** | $-809.59 | $-538.31 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8636.4** | $-1090.97 | $-272.63 | 94 | 43% | $-1285.09 | 18 |
| mm_strong | **$8191.33** | $-1227.41 | $-581.26 | 93 | 46% | $-1431.36 | 25 |
| mm_sports_v2 | **$7971.64** | $-1708.38 | $-319.98 | 82 | 45% | $-1927.51 | 18 |
| momentum | **$7887.89** | $-1376.42 | $-735.69 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7013.48** | $-2474.37 | $-512.15 | 189 | 47% | $-2677.4 | 8 |
| whale_fade | **$6651.62** | $-2848.81 | $-499.57 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.99** | $-931.5 | $-71.51 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5088.99** | $-4791.55 | $-119.46 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 77 | 3 | 59% | 2.94¢ |
| maker_sports | 197 | 124 | 7 | 61% | 1.55¢ |

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

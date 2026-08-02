# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22379 · Last run: 2026-08-02T01:34:13.955Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_top | **$10554.24** | $362.91 | $191.33 | 349 | 53% | $-965.66 | 23 |
| mid_momentum | **$10460.25** | $611.51 | $-151.26 | 178 | 57% | $398.03 | 25 |
| mm_cheap | **$10165.6** | $157.17 | $8.43 | 9 | 67% | $19.07 | 25 |
| copy_pro | **$10094.92** | $-83.11 | $178.03 | 333 | 52% | $-933.11 | 23 |
| fade_longshot | **$10014.04** | $117.48 | $-103.44 | 102 | 96% | $106.74 | 25 |
| mm_sports | **$10010.52** | $94.23 | $-83.71 | 179 | 57% | $-108.8 | 25 |
| mm_tight | **$9997.71** | $90.53 | $-92.82 | 154 | 55% | $-112.5 | 23 |
| strong_dip | **$9872.94** | $-471.26 | $344.2 | 92 | 59% | $-563.57 | 25 |
| ai_judge | **$9427.23** | $-487.64 | $-85.13 | 6 | 17% | $-500 | 3 |
| super | **$9322.58** | $-649.65 | $-27.77 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9113.77** | $-768.98 | $-117.25 | 49 | 47% | $-886.37 | 6 |
| mm_slow | **$8951.32** | $-940.49 | $-108.19 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$8877.09** | $-540.85 | $-582.06 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8562.73** | $-782.78 | $-654.49 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8345.69** | $-1261.91 | $-392.4 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$6884.08** | $-3030.57 | $-85.35 | 350 | 47% | $-3365.35 | 23 |
| copy_month (retired) | **$9334.62** | $-777.42 | $112.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9069.78** | $-1003.53 | $73.31 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8140.09** | $-1837.09 | $-22.82 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5074.03** | $-4691.55 | $-234.42 | 81 | 2% | $-6591.55 | 3 |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22473 · Last run: 2026-08-02T02:21:07.394Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10481.05** | $611.51 | $-130.46 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10279.09** | $208.23 | $70.86 | 354 | 53% | $-1120.34 | 18 |
| mm_sports | **$10197.18** | $360.69 | $-163.51 | 181 | 57% | $157.66 | 25 |
| copy_pro | **$10101.64** | $-116.44 | $218.08 | 336 | 51% | $-966.44 | 24 |
| mm_cheap | **$10018.36** | $200.03 | $-181.67 | 10 | 70% | $61.93 | 25 |
| mm_tight | **$9991.13** | $356.99 | $-365.86 | 156 | 55% | $153.96 | 22 |
| fade_longshot | **$9967.03** | $117.48 | $-150.45 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9921.62** | $-471.26 | $392.88 | 92 | 59% | $-563.57 | 25 |
| super | **$9594.81** | $-649.65 | $244.46 | 58 | 43% | $-865.5 | 13 |
| ai_judge | **$9421.72** | $-487.64 | $-90.64 | 6 | 17% | $-500 | 3 |
| mm_max | **$9171.37** | $-768.98 | $-59.65 | 49 | 47% | $-886.37 | 7 |
| random_control | **$9069.02** | $-423.46 | $-507.52 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8985.7** | $-940.49 | $-73.81 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8529.33** | $-782.78 | $-687.89 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8294.25** | $-1261.91 | $-443.84 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$7073.55** | $-2819.65 | $-106.8 | 355 | 47% | $-3154.43 | 18 |
| copy_month (retired) | **$9367.89** | $-777.42 | $145.31 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9046.34** | $-1003.53 | $49.87 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8250.22** | $-1837.09 | $87.31 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5081.32** | $-4691.55 | $-227.13 | 81 | 2% | $-6591.55 | 3 |

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

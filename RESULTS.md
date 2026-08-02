# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22435 · Last run: 2026-08-02T02:02:10.654Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10505.35** | $611.51 | $-106.16 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10424.04** | $399.9 | $24.14 | 350 | 53% | $-928.67 | 22 |
| mm_sports | **$10180.05** | $182.91 | $-2.86 | 180 | 57% | $-20.12 | 25 |
| mm_cheap | **$10169.17** | $200.03 | $-30.86 | 10 | 70% | $61.93 | 25 |
| fade_longshot | **$10020.98** | $117.48 | $-96.5 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$10004.19** | $-83.11 | $87.3 | 333 | 52% | $-933.11 | 24 |
| mm_tight | **$9993.23** | $179.21 | $-185.98 | 155 | 55% | $-23.82 | 23 |
| strong_dip | **$9884.41** | $-471.26 | $355.67 | 92 | 59% | $-563.57 | 25 |
| super | **$9529.33** | $-649.65 | $178.98 | 58 | 43% | $-865.5 | 13 |
| ai_judge | **$9446.63** | $-487.64 | $-65.73 | 6 | 17% | $-500 | 3 |
| mm_max | **$9150.34** | $-768.98 | $-80.68 | 49 | 47% | $-886.37 | 7 |
| mm_slow | **$9038.67** | $-940.49 | $-20.84 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$9015.54** | $-540.85 | $-443.61 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8569.12** | $-782.78 | $-648.1 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8435.47** | $-1261.91 | $-302.62 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$6873.43** | $-3130.57 | $4 | 351 | 46% | $-3465.35 | 22 |
| copy_month (retired) | **$9334.62** | $-777.42 | $112.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9077.45** | $-1003.53 | $80.98 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8093.42** | $-1837.09 | $-69.49 | 145 | 26% | $-3864.75 | 2 |
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

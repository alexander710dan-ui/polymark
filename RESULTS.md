# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22314 · Last run: 2026-08-02T01:01:33.115Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10489.19** | $611.51 | $-122.32 | 178 | 57% | $398.03 | 25 |
| copy_top | **$10439.97** | $298.98 | $140.99 | 348 | 53% | $-1029.59 | 23 |
| mm_cheap | **$10206.21** | $157.17 | $49.04 | 9 | 67% | $19.07 | 25 |
| fade_longshot | **$10020.55** | $117.48 | $-96.93 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$10006.61** | $-144.4 | $151.01 | 332 | 52% | $-994.4 | 24 |
| mm_tight | **$9970.73** | $90.53 | $-119.8 | 154 | 55% | $-112.5 | 21 |
| mm_sports | **$9869.6** | $94.23 | $-224.63 | 179 | 57% | $-108.8 | 24 |
| strong_dip | **$9859.9** | $-471.26 | $331.16 | 92 | 59% | $-563.57 | 25 |
| ai_judge | **$9433.17** | $-487.64 | $-79.19 | 6 | 17% | $-500 | 3 |
| super | **$9356.09** | $-649.65 | $5.74 | 58 | 43% | $-865.5 | 13 |
| mm_max | **$9265.12** | $-768.98 | $34.1 | 49 | 47% | $-886.37 | 4 |
| mm_slow | **$8973.44** | $-940.49 | $-86.07 | 43 | 47% | $-1062.71 | 25 |
| random_control | **$8843.61** | $-540.85 | $-615.54 | 116 | 59% | $-1155.14 | 25 |
| mm_strong | **$8572.58** | $-782.78 | $-644.64 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8395.04** | $-1261.91 | $-343.05 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$7055.04** | $-2930.57 | $-14.39 | 349 | 47% | $-3265.35 | 23 |
| copy_month (retired) | **$9323.44** | $-777.42 | $100.86 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9072.64** | $-1003.53 | $76.17 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8123.55** | $-1837.09 | $-39.36 | 145 | 26% | $-3864.75 | 2 |
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

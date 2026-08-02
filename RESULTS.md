# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22480 · Last run: 2026-08-02T02:24:49.806Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10483.17** | $611.51 | $-128.34 | 178 | 57% | $398.03 | 25 |
| mm_sports | **$10240.78** | $360.69 | $-119.91 | 181 | 57% | $157.66 | 25 |
| copy_top | **$10238.81** | $208.23 | $30.58 | 354 | 53% | $-1120.34 | 18 |
| copy_pro | **$10087.43** | $-116.44 | $203.87 | 336 | 51% | $-966.44 | 24 |
| mm_tight | **$9988.49** | $356.99 | $-368.5 | 156 | 55% | $153.96 | 22 |
| mm_cheap | **$9987.7** | $200.03 | $-212.33 | 10 | 70% | $61.93 | 25 |
| fade_longshot | **$9955.98** | $117.48 | $-161.5 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9939.05** | $-471.26 | $410.31 | 92 | 59% | $-563.57 | 25 |
| super | **$9655.8** | $-649.65 | $305.45 | 58 | 43% | $-865.5 | 13 |
| ai_judge | **$9422.06** | $-487.64 | $-90.3 | 6 | 17% | $-500 | 3 |
| mm_max | **$9149.12** | $-768.98 | $-81.9 | 49 | 47% | $-886.37 | 7 |
| random_control | **$9054.52** | $-423.46 | $-522.02 | 117 | 59% | $-1037.75 | 25 |
| mm_slow | **$8990.4** | $-940.49 | $-69.11 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8519.17** | $-782.78 | $-698.05 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8283.29** | $-1261.91 | $-454.8 | 229 | 67% | $-1750.15 | 25 |
| whale_fade | **$7108.52** | $-2819.65 | $-71.83 | 355 | 47% | $-3154.43 | 18 |
| copy_month (retired) | **$9390.25** | $-777.42 | $167.67 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9047.09** | $-1003.53 | $50.62 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8246.63** | $-1837.09 | $83.72 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5082.37** | $-4691.55 | $-226.08 | 81 | 2% | $-6591.55 | 3 |

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

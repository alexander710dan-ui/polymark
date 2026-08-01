# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22115 · Last run: 2026-08-01T23:21:55.593Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10506.02** | $564.45 | $-58.43 | 177 | 57% | $350.97 | 25 |
| copy_top | **$10293.19** | $335.05 | $-41.86 | 346 | 53% | $-993.52 | 21 |
| mm_cheap | **$10183.68** | $28.29 | $155.39 | 7 | 57% | $-109.81 | 25 |
| fade_longshot | **$10028.19** | $117.48 | $-89.29 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9959.01** | $130.16 | $-171.15 | 329 | 52% | $-719.84 | 25 |
| strong_dip | **$9822.27** | $-471.26 | $293.53 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9593.92** | $-74.09 | $-331.99 | 149 | 54% | $-277.12 | 21 |
| mm_sports | **$9511.1** | $-317.45 | $-171.45 | 175 | 56% | $-520.48 | 22 |
| ai_judge | **$9452.06** | $-487.64 | $-60.3 | 6 | 17% | $-500 | 3 |
| mm_max | **$9231.93** | $-750.8 | $-17.27 | 47 | 47% | $-868.19 | 2 |
| super | **$9229.51** | $-649.65 | $-120.84 | 58 | 43% | $-865.5 | 13 |
| random_control | **$9055.15** | $-440.85 | $-504 | 115 | 59% | $-1055.14 | 25 |
| mm_slow | **$9012.97** | $-940.49 | $-46.54 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8571.74** | $-782.78 | $-645.48 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8492.07** | $-1161.91 | $-346.02 | 228 | 68% | $-1650.15 | 25 |
| whale_fade | **$6890.27** | $-2919.25 | $-190.48 | 347 | 47% | $-3254.03 | 21 |
| copy_month (retired) | **$9312.33** | $-777.42 | $89.75 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9082.64** | $-1003.53 | $86.17 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8066.88** | $-1837.09 | $-96.03 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5075.07** | $-4691.55 | $-233.38 | 81 | 2% | $-6591.55 | 3 |

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

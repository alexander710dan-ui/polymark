# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22099 · Last run: 2026-08-01T23:14:01.368Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10457.11** | $564.45 | $-107.34 | 177 | 57% | $350.97 | 25 |
| copy_top | **$10350.22** | $335.05 | $15.17 | 346 | 53% | $-993.52 | 20 |
| copy_pro | **$10157.02** | $130.16 | $26.86 | 329 | 52% | $-719.84 | 25 |
| mm_cheap | **$10050.2** | $28.29 | $21.91 | 7 | 57% | $-109.81 | 25 |
| fade_longshot | **$10030.58** | $117.48 | $-86.9 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9830.96** | $-471.26 | $302.22 | 92 | 59% | $-563.57 | 25 |
| mm_tight | **$9527.86** | $-74.09 | $-398.05 | 149 | 54% | $-277.12 | 21 |
| ai_judge | **$9452.74** | $-487.64 | $-59.62 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9362.37** | $-364.51 | $-273.12 | 174 | 56% | $-567.54 | 23 |
| mm_max | **$9274.66** | $-750.8 | $25.46 | 47 | 47% | $-868.19 | 2 |
| super | **$9224.02** | $-649.65 | $-126.33 | 58 | 43% | $-865.5 | 13 |
| random_control | **$9026.88** | $-440.85 | $-532.27 | 115 | 59% | $-1055.14 | 25 |
| mm_slow | **$8996.74** | $-940.49 | $-62.77 | 43 | 47% | $-1062.71 | 25 |
| mm_strong | **$8559.44** | $-782.78 | $-657.78 | 59 | 47% | $-986.73 | 25 |
| momentum | **$8520.94** | $-1161.91 | $-317.15 | 228 | 68% | $-1650.15 | 25 |
| whale_fade | **$6876.92** | $-2919.25 | $-203.83 | 347 | 47% | $-3254.03 | 20 |
| copy_month (retired) | **$9309.85** | $-777.42 | $87.27 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9084.14** | $-1003.53 | $87.67 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8059.71** | $-1837.09 | $-103.2 | 145 | 26% | $-3864.75 | 2 |
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

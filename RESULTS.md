# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 21650 · Last run: 2026-08-01T19:28:47.818Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10438.18** | $504.07 | $-65.89 | 322 | 52% | $-345.93 | 25 |
| mid_momentum | **$10425.8** | $274.8 | $151 | 174 | 56% | $61.32 | 25 |
| copy_top | **$10392.97** | $438.97 | $-46 | 343 | 53% | $-889.6 | 16 |
| mm_cheap | **$10061.18** | $-27.59 | $88.77 | 2 | 50% | $-100 | 25 |
| fade_longshot | **$10027.78** | $117.48 | $-89.7 | 102 | 96% | $106.74 | 25 |
| mm_tight | **$9808.61** | $-255.3 | $63.91 | 141 | 54% | $-458.33 | 15 |
| strong_dip | **$9738.55** | $-171.26 | $-90.19 | 89 | 61% | $-263.57 | 25 |
| ai_judge | **$9464.32** | $-487.64 | $-48.04 | 6 | 17% | $-500 | 3 |
| mm_sports | **$9450.93** | $-556.71 | $7.64 | 163 | 55% | $-759.74 | 19 |
| random_control | **$9427.81** | $-190.93 | $-381.26 | 110 | 60% | $-805.22 | 25 |
| mm_max | **$9249.11** | $-839.48 | $88.59 | 46 | 46% | $-956.87 | 1 |
| super | **$9151.28** | $-649.65 | $-199.07 | 58 | 43% | $-865.5 | 12 |
| mm_slow | **$9039.43** | $-1029.17 | $68.6 | 42 | 45% | $-1151.39 | 25 |
| momentum | **$8767.15** | $-1209.62 | $-23.23 | 222 | 67% | $-1697.86 | 25 |
| mm_strong | **$8692.13** | $-871.46 | $-436.41 | 58 | 47% | $-1075.41 | 25 |
| whale_fade | **$6899.89** | $-2977.42 | $-122.69 | 344 | 47% | $-3312.2 | 16 |
| copy_month (retired) | **$9288.5** | $-777.42 | $65.92 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9088.28** | $-1003.53 | $91.81 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8033.94** | $-1837.09 | $-128.97 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5078.2** | $-4691.55 | $-230.25 | 81 | 2% | $-6591.55 | 3 |

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

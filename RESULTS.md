# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24267 · Last run: 2026-08-02T17:21:51.703Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10749.49** | $683.91 | $65.58 | 223 | 57% | $480.88 | 17 |
| mid_momentum | **$10428.75** | $630.98 | $-202.23 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10355.63** | $511.61 | $-155.98 | 192 | 55% | $308.58 | 14 |
| copy_top | **$10186.85** | $50.53 | $136.32 | 368 | 52% | $-1278.04 | 23 |
| mm_cheap | **$10138.18** | $704.44 | $-566.26 | 21 | 71% | $526.66 | 25 |
| copy_pro | **$9995.23** | $-392.45 | $387.68 | 353 | 51% | $-1242.45 | 25 |
| strong_dip | **$9978.89** | $-393.8 | $372.69 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9962.35** | $117.48 | $-155.13 | 102 | 96% | $106.74 | 25 |
| super | **$9698.82** | $-245.84 | $-55.34 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9405.73** | $-487.64 | $-106.63 | 6 | 17% | $-500 | 3 |
| mm_max | **$9361.58** | $-613.77 | $-24.65 | 59 | 51% | $-731.16 | 3 |
| random_control | **$9229.22** | $-310.74 | $-460.04 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8917.41** | $-882.32 | $-200.27 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8644.58** | $-933.53 | $-421.89 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8244.11** | $-1139.53 | $-616.36 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7291.4** | $-2198.76 | $-509.84 | 369 | 47% | $-2553.31 | 23 |
| copy_month (retired) | **$9387.62** | $-777.42 | $165.04 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.99** | $-1003.53 | $45.52 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8293.04** | $-1837.09 | $130.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5118.24** | $-4691.55 | $-190.21 | 81 | 2% | $-6591.55 | 3 |

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

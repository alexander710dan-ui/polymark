# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24804 · Last run: 2026-08-02T22:04:26.022Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10921.99** | $839.81 | $82.18 | 242 | 57% | $636.78 | 20 |
| copy_pro | **$10881.34** | $-261.58 | $1142.92 | 356 | 51% | $-1111.58 | 25 |
| mid_momentum | **$10535.42** | $630.98 | $-95.56 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10289.91** | $81.11 | $208.8 | 373 | 52% | $-1247.46 | 21 |
| mm_tight | **$10286.1** | $328.09 | $-41.99 | 207 | 54% | $125.06 | 15 |
| mm_cheap | **$10222.77** | $704.44 | $-481.67 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9959.4** | $-393.8 | $353.2 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9915.23** | $117.48 | $-202.25 | 102 | 96% | $106.74 | 25 |
| super | **$9797.44** | $-245.84 | $43.28 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9522.62** | $-432.27 | $-45.11 | 65 | 54% | $-549.66 | 6 |
| ai_judge | **$9406.25** | $-487.64 | $-106.11 | 6 | 17% | $-500 | 3 |
| random_control | **$9312.14** | $-310.74 | $-377.12 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8886.15** | $-882.32 | $-231.53 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8625.31** | $-933.53 | $-441.16 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8198.42** | $-1139.53 | $-662.05 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7032.24** | $-2308.61 | $-659.15 | 374 | 47% | $-2663.16 | 21 |
| copy_month (retired) | **$9390.25** | $-777.42 | $167.67 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.91** | $-1003.53 | $31.44 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8363.3** | $-1837.09 | $200.39 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5110.16** | $-4691.55 | $-198.29 | 81 | 2% | $-6591.55 | 3 |

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

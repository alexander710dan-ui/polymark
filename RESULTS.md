# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24814 · Last run: 2026-08-02T22:09:26.154Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10944.31** | $839.81 | $104.5 | 242 | 57% | $636.78 | 20 |
| copy_pro | **$10878.02** | $-261.58 | $1139.6 | 356 | 51% | $-1111.58 | 25 |
| mid_momentum | **$10535.74** | $630.98 | $-95.24 | 181 | 57% | $417.5 | 25 |
| mm_tight | **$10305.91** | $328.09 | $-22.18 | 207 | 54% | $125.06 | 15 |
| copy_top | **$10285.57** | $81.11 | $204.46 | 373 | 52% | $-1247.46 | 21 |
| mm_cheap | **$10214.07** | $704.44 | $-490.37 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9955.25** | $-393.8 | $349.05 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9915.11** | $117.48 | $-202.37 | 102 | 96% | $106.74 | 25 |
| super | **$9790.92** | $-245.84 | $36.76 | 62 | 47% | $-461.69 | 11 |
| mm_max | **$9540.51** | $-432.27 | $-27.22 | 65 | 54% | $-549.66 | 6 |
| ai_judge | **$9406.25** | $-487.64 | $-106.11 | 6 | 17% | $-500 | 3 |
| random_control | **$9318.24** | $-310.74 | $-371.02 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8892.16** | $-882.32 | $-225.52 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8637.26** | $-933.53 | $-429.21 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8199.56** | $-1139.53 | $-660.91 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7039.73** | $-2308.61 | $-651.66 | 374 | 47% | $-2663.16 | 21 |
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

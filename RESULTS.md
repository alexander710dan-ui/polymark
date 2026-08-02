# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 23172 · Last run: 2026-08-02T08:11:04.523Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10581.33** | $630.98 | $-49.65 | 181 | 57% | $417.5 | 25 |
| mm_sports | **$10515.83** | $515.79 | $0.04 | 205 | 58% | $312.76 | 6 |
| mm_tight | **$10366.8** | $367.52 | $-0.72 | 177 | 55% | $164.49 | 5 |
| mm_cheap | **$10229.81** | $704.44 | $-474.63 | 21 | 71% | $526.66 | 25 |
| copy_top | **$10205.54** | $33.14 | $172.4 | 366 | 52% | $-1295.43 | 18 |
| copy_pro | **$10039.66** | $-406.82 | $446.48 | 349 | 51% | $-1256.82 | 25 |
| fade_longshot | **$9925.16** | $117.48 | $-192.32 | 102 | 96% | $106.74 | 25 |
| strong_dip | **$9866.42** | $-393.8 | $260.22 | 94 | 60% | $-486.11 | 25 |
| super | **$9819.12** | $-245.84 | $64.96 | 62 | 47% | $-461.69 | 10 |
| ai_judge | **$9392.32** | $-487.64 | $-120.04 | 6 | 17% | $-500 | 3 |
| mm_max | **$9337.95** | $-660.83 | $-1.22 | 58 | 50% | $-778.22 | 1 |
| random_control | **$8958.14** | $-665.29 | $-376.57 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8915.27** | $-882.32 | $-202.41 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8620.37** | $-933.53 | $-446.1 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8202.19** | $-1139.53 | $-658.28 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7161.93** | $-2453.31 | $-384.76 | 367 | 47% | $-2788.09 | 18 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9028.48** | $-1003.53 | $32.01 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8356.37** | $-1837.09 | $193.46 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.28** | $-4691.55 | $-203.17 | 81 | 2% | $-6591.55 | 3 |

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

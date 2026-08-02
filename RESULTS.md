# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22616 · Last run: 2026-08-02T03:32:49.278Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10381.46** | $658.57 | $-277.11 | 179 | 58% | $445.09 | 25 |
| mm_sports | **$10156.16** | $325.55 | $-169.39 | 193 | 57% | $122.52 | 13 |
| mm_tight | **$10108.2** | $215.13 | $-106.93 | 167 | 54% | $12.1 | 11 |
| copy_top | **$10056.27** | $-90.32 | $146.59 | 361 | 52% | $-1418.89 | 19 |
| mm_cheap | **$10020.6** | $522.9 | $-502.3 | 14 | 71% | $345.12 | 25 |
| strong_dip | **$9954.92** | $-393.8 | $348.72 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9940.65** | $117.48 | $-176.83 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9818.9** | $-218.71 | $37.61 | 342 | 51% | $-1068.71 | 21 |
| super | **$9762.76** | $-472.29 | $235.05 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9399.45** | $-487.64 | $-112.91 | 6 | 17% | $-500 | 3 |
| mm_max | **$9320.57** | $-764.49 | $85.06 | 54 | 48% | $-881.88 | 4 |
| random_control | **$9008.75** | $-523.46 | $-467.79 | 118 | 58% | $-1137.75 | 25 |
| mm_slow | **$8842.47** | $-851.81 | $-305.72 | 44 | 48% | $-974.03 | 25 |
| mm_strong | **$8578.35** | $-982.78 | $-438.87 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8096.93** | $-1173.23 | $-729.84 | 230 | 67% | $-1661.47 | 25 |
| whale_fade | **$7308.02** | $-2557.22 | $-134.76 | 362 | 47% | $-2892 | 19 |
| copy_month (retired) | **$9398.66** | $-777.42 | $176.08 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9035.4** | $-1003.53 | $38.93 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8313.17** | $-1837.09 | $150.26 | 145 | 26% | $-3864.75 | 2 |
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

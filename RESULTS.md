# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 24128 · Last run: 2026-08-02T16:12:19.179Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10770.29** | $719.46 | $50.83 | 218 | 58% | $516.43 | 20 |
| mm_tight | **$10549.14** | $494.22 | $54.92 | 189 | 55% | $291.19 | 15 |
| mid_momentum | **$10431.48** | $630.98 | $-199.5 | 181 | 57% | $417.5 | 25 |
| copy_top | **$10173.25** | $150.53 | $22.72 | 367 | 52% | $-1178.04 | 23 |
| mm_cheap | **$10129.6** | $704.44 | $-574.84 | 21 | 71% | $526.66 | 25 |
| strong_dip | **$9989.98** | $-393.8 | $383.78 | 94 | 60% | $-486.11 | 25 |
| copy_pro | **$9980.88** | $-192.45 | $173.33 | 352 | 51% | $-1042.45 | 25 |
| fade_longshot | **$9964.29** | $117.48 | $-153.19 | 102 | 96% | $106.74 | 25 |
| super | **$9685.38** | $-245.84 | $-68.78 | 62 | 47% | $-461.69 | 11 |
| ai_judge | **$9405.73** | $-487.64 | $-106.63 | 6 | 17% | $-500 | 3 |
| mm_max | **$9398.78** | $-613.77 | $12.55 | 59 | 51% | $-731.16 | 2 |
| random_control | **$9243.76** | $-665.29 | $-90.95 | 123 | 58% | $-1279.58 | 25 |
| mm_slow | **$8903.24** | $-882.32 | $-214.44 | 46 | 48% | $-1004.54 | 25 |
| mm_strong | **$8648.72** | $-933.53 | $-417.75 | 62 | 47% | $-1137.48 | 25 |
| momentum | **$8250.26** | $-1139.53 | $-610.21 | 233 | 67% | $-1627.77 | 25 |
| whale_fade | **$7350.06** | $-2553.31 | $-96.63 | 368 | 47% | $-2888.09 | 23 |
| copy_month (retired) | **$9384.85** | $-777.42 | $162.27 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9041.99** | $-1003.53 | $45.52 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8293.04** | $-1837.09 | $130.13 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5113.28** | $-4691.55 | $-195.17 | 81 | 2% | $-6591.55 | 3 |

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

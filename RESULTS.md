# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 22687 · Last run: 2026-08-02T04:08:25.309Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mid_momentum | **$10452.64** | $558.57 | $-105.93 | 180 | 57% | $345.09 | 25 |
| mm_sports | **$10227.53** | $489.65 | $-262.12 | 198 | 58% | $286.62 | 8 |
| copy_top | **$10192.42** | $-190.32 | $382.74 | 362 | 52% | $-1518.89 | 18 |
| mm_cheap | **$10074.75** | $472.02 | $-397.27 | 18 | 67% | $294.24 | 25 |
| mm_tight | **$10065.65** | $317.71 | $-252.06 | 170 | 55% | $114.68 | 8 |
| strong_dip | **$9954.96** | $-393.8 | $348.76 | 94 | 60% | $-486.11 | 25 |
| fade_longshot | **$9943.79** | $117.48 | $-173.69 | 102 | 96% | $106.74 | 25 |
| copy_pro | **$9918.99** | $-459.98 | $378.97 | 345 | 51% | $-1309.98 | 18 |
| super | **$9790.46** | $-472.29 | $262.75 | 59 | 44% | $-688.14 | 12 |
| ai_judge | **$9406.03** | $-487.64 | $-106.33 | 6 | 17% | $-500 | 3 |
| mm_max | **$9323.58** | $-764.49 | $88.07 | 56 | 48% | $-881.88 | 2 |
| random_control | **$9041.92** | $-723.46 | $-234.62 | 120 | 58% | $-1337.75 | 25 |
| mm_slow | **$8906.09** | $-951.81 | $-142.1 | 45 | 47% | $-1074.03 | 25 |
| mm_strong | **$8610.2** | $-982.78 | $-407.02 | 61 | 46% | $-1186.73 | 25 |
| momentum | **$8188.23** | $-1273.23 | $-538.54 | 231 | 67% | $-1761.47 | 25 |
| whale_fade | **$7200.67** | $-2413.32 | $-386.01 | 363 | 47% | $-2748.1 | 18 |
| copy_month (retired) | **$9401.44** | $-777.42 | $178.86 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9034.87** | $-1003.53 | $38.4 | 131 | 69% | $-1067.46 | 5 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8316.5** | $-1837.09 | $153.59 | 145 | 26% | $-3864.75 | 2 |
| longshot (retired) | **$5091.74** | $-4691.55 | $-216.71 | 81 | 2% | $-6591.55 | 3 |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32820 · Last run: 2026-08-05T23:57:07.100Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10486.88** | $787.82 | $-300.94 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10400.5** | $561.03 | $-160.53 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10242.04** | $837.78 | $-595.74 | 404 | 54% | $634.75 | 20 |
| mm_cheap_v2 | **$9876.59** | $134.51 | $-257.92 | 28 | 57% | $-56.31 | 25 |
| copy_top | **$9876.44** | $-386.57 | $263.01 | 417 | 52% | $-1715.14 | 25 |
| fade_longshot | **$9849.21** | $25.97 | $-176.76 | 123 | 95% | $15.23 | 25 |
| super | **$9837.97** | $-306.37 | $144.34 | 74 | 49% | $-522.22 | 15 |
| copy_pro | **$9705.09** | $-797.13 | $502.22 | 397 | 51% | $-1647.13 | 25 |
| mid_momentum_v2 | **$9615.14** | $-115.6 | $-269.26 | 26 | 50% | $-306.42 | 25 |
| strong_dip | **$9575.81** | $-394.63 | $-29.56 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9354.59** | $-494.85 | $-150.56 | 176 | 53% | $-661.97 | 8 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9152.26** | $-306.95 | $-540.79 | 474 | 55% | $-526.08 | 25 |
| random_control | **$9030.08** | $-1100.59 | $130.67 | 144 | 56% | $-1714.88 | 25 |
| mm_slow | **$8729.52** | $-750.77 | $-519.71 | 60 | 50% | $-936.48 | 25 |
| maker_flat | **$8459.6** | $-1349 | $-191.4 | 86 | 41% | $-1543.12 | 20 |
| mm_strong | **$8335.97** | $-1110.56 | $-553.47 | 86 | 47% | $-1314.51 | 25 |
| momentum | **$8029.33** | $-1345.47 | $-625.2 | 265 | 67% | $-1833.71 | 25 |
| mm_sports_v2 | **$7934.04** | $-1467.57 | $-598.39 | 42 | 38% | $-1593.59 | 25 |
| maker_sports | **$7451.8** | $-1916.33 | $-631.87 | 158 | 47% | $-2119.36 | 19 |
| whale_fade | **$6866.66** | $-2534.9 | $-598.44 | 418 | 47% | $-2889.45 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.44** | $-931.5 | $-68.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5117.49** | $-4791.55 | $-90.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 106 | 68 | 3 | 61% | 2.97¢ |
| maker_sports | 177 | 111 | 6 | 61% | 1.55¢ |

These post passively at the bid instead of crossing to the ask. Unfilled orders are counted — a strategy that only fills when it is about to be wrong (adverse selection) will show a high fill rate with poor results.

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

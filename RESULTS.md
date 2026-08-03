# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27257 · Last run: 2026-08-03T20:11:56.669Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11850.52** | $1859.84 | $-9.32 | 292 | 58% | $1656.81 | 24 |
| mm_tight | **$10981.7** | $858.02 | $123.68 | 252 | 54% | $654.99 | 20 |
| mm_cheap | **$10404.06** | $832.49 | $-428.43 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10388.91** | $565.77 | $-176.86 | 189 | 57% | $352.29 | 25 |
| strong_dip | **$9992.51** | $-337.42 | $329.93 | 96 | 60% | $-429.73 | 25 |
| maker_sports | **$9954.04** | $175.28 | $-221.24 | 12 | 58% | $48.01 | 12 |
| fade_longshot | **$9953.91** | $34.52 | $-80.61 | 105 | 95% | $23.78 | 25 |
| mm_max | **$9917.86** | $-56.38 | $-25.76 | 90 | 52% | $-175.85 | 14 |
| maker_flat | **$9888.17** | $96.03 | $-207.86 | 9 | 56% | $-31.24 | 8 |
| super | **$9653.37** | $-445.84 | $99.21 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9609.01** | $-834.75 | $443.76 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9447.08** | $-766.45 | $213.53 | 386 | 51% | $-2095.02 | 24 |
| ai_judge | **$9408.81** | $-487.64 | $-103.55 | 6 | 17% | $-500 | 3 |
| random_control | **$9283.29** | $-310.74 | $-405.97 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8981.29** | $-821.03 | $-197.68 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8810.12** | $-1021.38 | $-168.5 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8172.8** | $-1389.71 | $-437.49 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7781.96** | $-1505.86 | $-712.18 | 387 | 48% | $-1860.41 | 24 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.19** | $-1003.53 | $33.72 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8353.04** | $-1837.09 | $190.13 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5107.28** | $-4691.55 | $-201.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 17 | 17 | 3 | 50% | 2.76¢ |
| maker_sports | 24 | 14 | 4 | 63% | 1.87¢ |

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

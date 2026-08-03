# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27142 · Last run: 2026-08-03T19:08:00.027Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11582.64** | $1588.89 | $-6.25 | 289 | 57% | $1385.86 | 23 |
| mm_tight | **$10710.05** | $587.07 | $122.98 | 249 | 53% | $384.04 | 18 |
| mm_cheap | **$10390.86** | $832.49 | $-441.63 | 24 | 71% | $654.71 | 25 |
| mid_momentum | **$10323.78** | $506.38 | $-182.6 | 188 | 57% | $292.9 | 25 |
| maker_flat | **$9994.64** | $-118.5 | $113.14 | 7 | 43% | $-245.77 | 8 |
| strong_dip | **$9975.96** | $-337.42 | $313.38 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9957.4** | $34.52 | $-77.12 | 105 | 95% | $23.78 | 25 |
| maker_sports | **$9877.82** | $10.83 | $-133.01 | 10 | 50% | $-116.44 | 8 |
| mm_max | **$9805.89** | $-327.33 | $133.22 | 87 | 51% | $-444.72 | 12 |
| super | **$9629.67** | $-445.84 | $75.51 | 63 | 46% | $-661.69 | 12 |
| copy_pro | **$9585.99** | $-834.75 | $420.74 | 365 | 51% | $-1684.75 | 25 |
| copy_top | **$9472.58** | $-666.45 | $139.03 | 385 | 51% | $-1995.02 | 25 |
| ai_judge | **$9409.92** | $-487.64 | $-102.44 | 6 | 17% | $-500 | 3 |
| random_control | **$9295.53** | $-310.74 | $-393.73 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$9003.12** | $-821.03 | $-175.85 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8727.36** | $-1140.85 | $-131.79 | 67 | 46% | $-1344.8 | 25 |
| momentum | **$8170.2** | $-1389.71 | $-440.09 | 237 | 67% | $-1877.95 | 25 |
| whale_fade | **$7787.37** | $-1683.64 | $-528.99 | 386 | 48% | $-2038.19 | 25 |
| copy_month (retired) | **$9390.4** | $-777.42 | $167.82 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9030.48** | $-1003.53 | $34.01 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8349.71** | $-1837.09 | $186.8 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.28** | $-4691.55 | $-207.17 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 15 | 15 | 4 | 50% | 2.67¢ |
| maker_sports | 18 | 10 | 5 | 64% | 1.78¢ |

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

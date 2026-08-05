# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32468 · Last run: 2026-08-05T20:41:17.549Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10962.02** | $981.05 | $-19.03 | 393 | 54% | $778.02 | 15 |
| mid_momentum | **$10610.72** | $867.28 | $-256.56 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10521.12** | $887.82 | $-366.7 | 35 | 66% | $710.04 | 25 |
| mm_cheap_v2 | **$10265.45** | $-212.92 | $478.37 | 16 | 50% | $-324.84 | 25 |
| mid_momentum_v2 | **$10076.99** | $-221.85 | $298.84 | 18 | 50% | $-333.77 | 25 |
| mm_sports | **$10002.56** | $249.63 | $-247.07 | 461 | 55% | $30.5 | 19 |
| super | **$9999.72** | $-425.73 | $425.45 | 73 | 48% | $-641.58 | 12 |
| fade_longshot | **$9902.16** | $123.32 | $-221.16 | 121 | 96% | $112.58 | 25 |
| copy_top | **$9810.96** | $-542.13 | $353.09 | 413 | 52% | $-1870.7 | 25 |
| mm_max | **$9763.6** | $-169.83 | $-66.57 | 170 | 54% | $-336.95 | 4 |
| copy_pro | **$9516.11** | $-1348.73 | $864.84 | 393 | 51% | $-2198.73 | 25 |
| strong_dip | **$9505.16** | $-482.76 | $-12.08 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9356.12** | $-587.64 | $-56.24 | 7 | 14% | $-600 | 2 |
| random_control | **$8976.72** | $-1000.59 | $-22.69 | 143 | 57% | $-1614.88 | 25 |
| mm_slow | **$8946.56** | $-444.42 | $-609.02 | 56 | 54% | $-630.13 | 25 |
| maker_flat | **$8812.99** | $-1130.82 | $-56.19 | 82 | 41% | $-1324.94 | 17 |
| mm_sports_v2 | **$8756.22** | $-990.61 | $-253.17 | 28 | 39% | $-1116.63 | 19 |
| mm_strong | **$8665.96** | $-804.21 | $-529.83 | 82 | 49% | $-1008.16 | 25 |
| maker_sports | **$8312.72** | $-1365.21 | $-322.07 | 147 | 49% | $-1568.24 | 13 |
| momentum | **$8206.35** | $-1059.12 | $-734.53 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7012.65** | $-2225.04 | $-762.31 | 414 | 48% | $-2579.59 | 25 |
| copy_month (retired) | **$9409.92** | $-730.36 | $140.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8997.31** | $-931.5 | $-71.19 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 66 | 3 | 60% | 2.99¢ |
| maker_sports | 160 | 103 | 2 | 61% | 1.6¢ |

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

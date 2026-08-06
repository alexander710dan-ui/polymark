# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34669 · Last run: 2026-08-06T17:19:35.602Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_flat | **$10263.02** | $-11.32 | $274.34 | 2 | 50% | $-100 | 12 |
| maker_sports | **$10231.61** | $-7.69 | $239.3 | 2 | 50% | $-100 | 20 |
| mm_cheap | **$10110.65** | $640.15 | $-529.5 | 39 | 62% | $462.37 | 25 |
| mid_momentum | **$10104.88** | $513.6 | $-408.72 | 217 | 56% | $300.12 | 25 |
| super | **$10053.55** | $46.83 | $6.72 | 79 | 51% | $-217.5 | 14 |
| mm_tight | **$10037.4** | $108.22 | $-70.82 | 460 | 53% | $-100.88 | 21 |
| fade_longshot | **$9890.59** | $25.97 | $-135.38 | 123 | 95% | $15.23 | 25 |
| copy_top | **$9809.37** | $-219.6 | $28.97 | 425 | 52% | $-1548.17 | 25 |
| copy_pro | **$9693.35** | $-706.11 | $399.46 | 406 | 51% | $-1556.11 | 25 |
| strong_dip | **$9678.79** | $-517.26 | $196.05 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9619.27** | $-276.89 | $-103.84 | 199 | 53% | $-485.99 | 3 |
| mid_momentum_v2 | **$9542.21** | $54.41 | $-512.2 | 54 | 54% | $-136.41 | 25 |
| mm_cheap_v2 | **$9388.54** | $-312.04 | $-299.42 | 58 | 52% | $-502.86 | 25 |
| ai_judge | **$9367.83** | $-587.64 | $-44.53 | 7 | 14% | $-600 | 2 |
| random_control | **$9086.26** | $-979.49 | $65.75 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8958.32** | $-1050.9 | $9.22 | 541 | 54% | $-1270.03 | 24 |
| mm_slow | **$8566.32** | $-809.59 | $-624.09 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8196.26** | $-1127.15 | $-676.59 | 95 | 47% | $-1331.1 | 25 |
| momentum | **$7832.08** | $-1421.89 | $-746.03 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7759.55** | $-2275.82 | $35.37 | 111 | 45% | $-2494.95 | 23 |
| whale_fade | **$6858.11** | $-2758.9 | $-382.99 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9006.88** | $-931.5 | $-61.62 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8165.11** | $-1590.97 | $-243.92 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6625.71** | $-3301.72 | $-72.57 | 210 | 45% | $-3504.75 | 7 |
| longshot (retired) | **$5076.41** | $-4791.55 | $-132.04 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 14 | 0 | 0 | 100% | 3.09¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 22 | 0 | 0 | 100% | 1.36¢ |
| maker_sports_badsim | 217 | 138 | 0 | 61% | 1.59¢ |

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

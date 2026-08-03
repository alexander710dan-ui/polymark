# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 26797 · Last run: 2026-08-03T15:56:01.587Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11263.65** | $977.53 | $286.12 | 276 | 56% | $774.5 | 25 |
| mm_tight | **$10558.26** | $299.82 | $258.44 | 235 | 52% | $96.79 | 23 |
| mid_momentum | **$10374.08** | $608.28 | $-234.2 | 187 | 57% | $394.8 | 25 |
| mm_cheap | **$10303.91** | $832.49 | $-528.58 | 24 | 71% | $654.71 | 25 |
| strong_dip | **$9979.11** | $-337.42 | $316.53 | 96 | 60% | $-429.73 | 25 |
| fade_longshot | **$9958.64** | $34.52 | $-75.88 | 105 | 95% | $23.78 | 25 |
| maker_flat | **$9906.33** | $-100 | $6.33 | 1 | 0% | $0 | 7 |
| copy_pro | **$9890.79** | $-684.75 | $575.54 | 364 | 51% | $-1534.75 | 25 |
| maker_sports | **$9790.22** | $-100 | $-109.78 | 1 | 0% | $0 | 9 |
| copy_top | **$9625.3** | $-466.45 | $91.75 | 383 | 51% | $-1795.02 | 25 |
| super | **$9563.55** | $-445.84 | $9.39 | 63 | 46% | $-661.69 | 12 |
| mm_max | **$9529.01** | $-411.05 | $-59.94 | 78 | 50% | $-528.44 | 14 |
| ai_judge | **$9393.34** | $-487.64 | $-119.02 | 6 | 17% | $-500 | 3 |
| random_control | **$9264.92** | $-310.74 | $-424.34 | 124 | 58% | $-925.03 | 25 |
| mm_slow | **$8942.89** | $-821.03 | $-236.08 | 47 | 49% | $-943.25 | 25 |
| mm_strong | **$8577.95** | $-1233.53 | $-188.52 | 65 | 45% | $-1437.48 | 25 |
| momentum | **$8201.3** | $-1339.53 | $-459.17 | 235 | 67% | $-1827.77 | 25 |
| whale_fade | **$7440.74** | $-1899.95 | $-659.31 | 384 | 48% | $-2254.5 | 25 |
| copy_month (retired) | **$9395.96** | $-777.42 | $173.38 | 163 | 47% | $-1586.51 | 2 |
| favorite (retired) | **$9027.15** | $-1003.53 | $30.68 | 131 | 69% | $-1067.46 | 5 |
| mean_revert (retired) | **$8376.37** | $-1837.09 | $213.46 | 145 | 26% | $-3864.75 | 2 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5102.32** | $-4691.55 | $-206.13 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 8 | 4 | 6 | 67% | 2.75¢ |
| maker_sports | 10 | 5 | 4 | 67% | 2¢ |

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

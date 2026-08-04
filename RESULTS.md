# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27729 · Last run: 2026-08-04T00:34:32.321Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$11820.08** | $1705.89 | $114.19 | 312 | 57% | $1502.86 | 25 |
| mm_tight | **$11176.33** | $748.44 | $427.89 | 270 | 54% | $545.41 | 20 |
| mid_momentum | **$10351.71** | $780.44 | $-428.73 | 193 | 58% | $566.96 | 25 |
| mm_cheap | **$10327.32** | $893.78 | $-566.46 | 25 | 72% | $716 | 25 |
| maker_flat | **$10047.2** | $52.38 | $-5.18 | 14 | 50% | $-125.4 | 17 |
| mm_max | **$10007.05** | $-35.77 | $42.82 | 103 | 53% | $-155.24 | 13 |
| fade_longshot | **$9971.97** | $39.78 | $-67.81 | 106 | 95% | $29.04 | 25 |
| strong_dip | **$9900.41** | $-361.15 | $261.56 | 98 | 60% | $-453.46 | 25 |
| copy_top | **$9638.41** | $-716.01 | $354.42 | 391 | 51% | $-2044.58 | 23 |
| super | **$9604.7** | $-353.9 | $-41.4 | 64 | 47% | $-569.75 | 11 |
| maker_sports | **$9560.03** | $-248.72 | $-191.25 | 28 | 46% | $-434.43 | 14 |
| ai_judge | **$9430.65** | $-587.64 | $18.29 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9348.11** | $-916.05 | $264.16 | 370 | 51% | $-1766.05 | 24 |
| random_control | **$9098.77** | $-249.45 | $-651.78 | 125 | 58% | $-863.74 | 25 |
| mm_slow | **$8928.22** | $-762.3 | $-309.48 | 48 | 50% | $-884.52 | 25 |
| mm_strong | **$8751.45** | $-1021.38 | $-227.17 | 68 | 47% | $-1225.33 | 25 |
| momentum | **$8311.98** | $-1208.17 | $-479.85 | 241 | 67% | $-1696.41 | 25 |
| whale_fade | **$7469.19** | $-1868.7 | $-662.11 | 392 | 48% | $-2223.25 | 23 |
| copy_month (retired) | **$9384.92** | $-730.36 | $115.28 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9042.04** | $-942.24 | $-15.72 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8286.24** | $-1937.09 | $223.33 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5103.12** | $-4691.55 | $-205.33 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 31 | 21 | 5 | 60% | 3.11¢ |
| maker_sports | 42 | 23 | 5 | 65% | 1.67¢ |

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

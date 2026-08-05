# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31796 · Last run: 2026-08-05T14:17:29.398Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10952.2** | $1087.66 | $-135.46 | 370 | 54% | $884.63 | 15 |
| mid_momentum | **$10772.79** | $967.28 | $-194.49 | 206 | 58% | $753.8 | 25 |
| mm_sports | **$10772.71** | $1133.36 | $-360.65 | 432 | 56% | $914.23 | 21 |
| mm_cheap | **$10540.33** | $887.82 | $-347.49 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9921.49** | $109.23 | $-187.74 | 117 | 96% | $98.49 | 25 |
| super | **$9914.69** | $-425.73 | $340.42 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9894.93** | $47.6 | $-152.67 | 1 | 100% | $0 | 25 |
| copy_top | **$9830** | $-374.75 | $204.75 | 409 | 52% | $-1703.32 | 25 |
| mid_momentum_v2 | **$9670.46** | $-54.5 | $-275.04 | 2 | 50% | $-102.1 | 25 |
| mm_max | **$9641.43** | $-469.42 | $110.85 | 161 | 53% | $-636.54 | 4 |
| mm_sports_v2 | **$9637.75** | $-54.5 | $-307.75 | 2 | 50% | $-102.1 | 14 |
| copy_pro | **$9438.77** | $-732.88 | $171.65 | 389 | 51% | $-1582.88 | 25 |
| strong_dip | **$9426.37** | $-528.32 | $-45.31 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9384.84** | $-587.64 | $-27.52 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9143.95** | $-516.83 | $-339.22 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8823.7** | $-1058.61 | $-117.69 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8816.01** | $-744.4 | $-439.59 | 124 | 51% | $-947.43 | 12 |
| mm_strong | **$8787.91** | $-876.62 | $-335.47 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8540.51** | $-1458.9 | $-0.59 | 75 | 39% | $-1653.02 | 17 |
| momentum | **$8218.35** | $-1076.77 | $-704.88 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7268.58** | $-2148.86 | $-582.56 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.27** | $-931.5 | $-66.23 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 92 | 61 | 1 | 60% | 3.03¢ |
| maker_sports | 136 | 88 | 3 | 61% | 1.59¢ |

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

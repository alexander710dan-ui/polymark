# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31779 · Last run: 2026-08-05T14:07:46.654Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10951.27** | $1190.16 | $-238.89 | 369 | 54% | $987.13 | 16 |
| mm_sports | **$10779.65** | $1181.41 | $-401.76 | 430 | 56% | $962.28 | 23 |
| mid_momentum | **$10720.85** | $967.28 | $-246.43 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10491.92** | $887.82 | $-395.9 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9940.37** | $109.23 | $-168.86 | 117 | 96% | $98.49 | 25 |
| super | **$9836.13** | $-425.73 | $261.86 | 73 | 48% | $-641.58 | 12 |
| mm_cheap_v2 | **$9835.92** | $47.6 | $-211.68 | 1 | 100% | $0 | 24 |
| copy_top | **$9788.04** | $-374.75 | $162.79 | 409 | 52% | $-1703.32 | 25 |
| mm_sports_v2 | **$9640.36** | $-54.5 | $-305.14 | 2 | 50% | $-102.1 | 14 |
| mid_momentum_v2 | **$9622.76** | $-54.5 | $-322.74 | 2 | 50% | $-102.1 | 25 |
| mm_max | **$9602.43** | $-469.42 | $71.85 | 161 | 53% | $-636.54 | 4 |
| strong_dip | **$9453.78** | $-528.32 | $-17.9 | 102 | 59% | $-620.63 | 25 |
| copy_pro | **$9395.91** | $-732.88 | $128.79 | 389 | 51% | $-1582.88 | 25 |
| ai_judge | **$9384.84** | $-587.64 | $-27.52 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9113.01** | $-516.83 | $-370.16 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8839.15** | $-1058.61 | $-102.24 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8819.89** | $-644.4 | $-535.71 | 123 | 51% | $-847.43 | 13 |
| mm_strong | **$8751.96** | $-876.62 | $-371.42 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8505.7** | $-1458.9 | $-35.4 | 75 | 39% | $-1653.02 | 16 |
| momentum | **$8238.56** | $-1076.77 | $-684.67 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7276.47** | $-2148.86 | $-574.67 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.27** | $-931.5 | $-66.23 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 91 | 61 | 2 | 60% | 3.02¢ |
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

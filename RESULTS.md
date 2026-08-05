# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31748 · Last run: 2026-08-05T13:50:39.678Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10876.12** | $1202.6 | $-326.48 | 367 | 54% | $999.57 | 18 |
| mm_sports | **$10728.42** | $1159.69 | $-431.27 | 428 | 56% | $940.56 | 25 |
| mid_momentum | **$10721.14** | $967.28 | $-246.14 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10479.72** | $887.82 | $-408.1 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9937.84** | $109.23 | $-171.39 | 117 | 96% | $98.49 | 25 |
| super | **$9836.63** | $-425.73 | $262.36 | 73 | 48% | $-641.58 | 11 |
| copy_top | **$9750.96** | $-374.75 | $125.71 | 409 | 52% | $-1703.32 | 25 |
| mm_cheap_v2 | **$9729.53** | $47.6 | $-318.07 | 1 | 100% | $0 | 24 |
| mm_sports_v2 | **$9588.54** | $-54.5 | $-356.96 | 2 | 50% | $-102.1 | 14 |
| mid_momentum_v2 | **$9570.9** | $-54.5 | $-374.6 | 2 | 50% | $-102.1 | 25 |
| copy_pro | **$9472.16** | $-732.88 | $205.04 | 389 | 51% | $-1582.88 | 25 |
| mm_max | **$9467.64** | $-469.42 | $-62.94 | 161 | 53% | $-636.54 | 4 |
| strong_dip | **$9452.86** | $-528.32 | $-18.82 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9390.31** | $-587.64 | $-22.05 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9114.15** | $-516.83 | $-369.02 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8869.89** | $-1058.61 | $-71.5 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8753.18** | $-682.5 | $-564.32 | 121 | 51% | $-885.53 | 14 |
| mm_strong | **$8749.2** | $-876.62 | $-374.18 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8505.72** | $-1458.9 | $-35.38 | 75 | 39% | $-1653.02 | 16 |
| momentum | **$8243.8** | $-1076.77 | $-679.43 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7321.47** | $-2148.86 | $-529.67 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.96** | $-931.5 | $-68.54 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8499.58** | $-1937.09 | $436.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.49** | $-4791.55 | $-102.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 91 | 61 | 2 | 60% | 3.02¢ |
| maker_sports | 135 | 87 | 5 | 61% | 1.6¢ |

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

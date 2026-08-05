# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30584 · Last run: 2026-08-05T03:02:58.223Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10992.62** | $819.18 | $173.44 | 413 | 56% | $600.05 | 11 |
| mm_tight | **$10857.27** | $758.45 | $98.82 | 357 | 54% | $555.42 | 8 |
| mid_momentum | **$10785.48** | $915.76 | $-130.28 | 205 | 58% | $702.28 | 25 |
| copy_pro | **$10489.35** | $-534.88 | $1024.23 | 385 | 51% | $-1384.88 | 23 |
| mm_cheap | **$10460.41** | $887.82 | $-427.41 | 35 | 66% | $710.04 | 25 |
| copy_top | **$10087.73** | $-67.5 | $155.23 | 406 | 52% | $-1396.07 | 22 |
| fade_longshot | **$9904.41** | $92.73 | $-188.32 | 115 | 96% | $81.99 | 25 |
| super | **$9801** | $-591.5 | $392.5 | 72 | 47% | $-807.35 | 12 |
| mm_max | **$9641.77** | $-488.01 | $129.78 | 158 | 53% | $-655.13 | 2 |
| strong_dip | **$9512.13** | $-528.32 | $40.45 | 102 | 59% | $-620.63 | 24 |
| maker_sports | **$9423.67** | $-695.97 | $119.64 | 111 | 50% | $-899 | 7 |
| ai_judge | **$9395.86** | $-587.64 | $-16.5 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9371.03** | $-617.63 | $-11.34 | 65 | 43% | $-811.75 | 16 |
| mm_slow | **$9139.8** | $-468.35 | $-391.85 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9016.16** | $-955.81 | $-28.03 | 138 | 57% | $-1570.1 | 25 |
| mm_strong | **$8774.79** | $-928.14 | $-297.07 | 80 | 48% | $-1132.09 | 25 |
| momentum | **$8307.03** | $-998.83 | $-694.14 | 258 | 68% | $-1487.07 | 25 |
| whale_fade | **$7315.98** | $-2477.11 | $-206.91 | 407 | 47% | $-2831.66 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.2** | $-931.5 | $-65.3 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8482.91** | $-1937.09 | $420 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 45 | 3 | 64% | 2.94¢ |
| maker_sports | 118 | 72 | 0 | 62% | 1.57¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30576 · Last run: 2026-08-05T02:58:31.072Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10943.65** | $881.83 | $61.82 | 410 | 56% | $662.7 | 14 |
| mm_tight | **$10859.74** | $719.3 | $140.44 | 355 | 54% | $516.27 | 10 |
| mid_momentum | **$10790.77** | $814.23 | $-23.46 | 204 | 57% | $600.75 | 25 |
| copy_pro | **$10504.12** | $-796.75 | $1300.87 | 384 | 51% | $-1646.75 | 24 |
| mm_cheap | **$10466.97** | $746.87 | $-279.9 | 34 | 65% | $569.09 | 25 |
| copy_top | **$10112.17** | $-242.08 | $354.25 | 405 | 52% | $-1570.65 | 23 |
| fade_longshot | **$9906** | $92.73 | $-186.73 | 115 | 96% | $81.99 | 25 |
| super | **$9807.73** | $-591.5 | $399.23 | 72 | 47% | $-807.35 | 12 |
| mm_max | **$9644.54** | $-496.33 | $140.87 | 156 | 53% | $-663.45 | 4 |
| strong_dip | **$9515.02** | $-426.02 | $-58.96 | 101 | 59% | $-518.33 | 25 |
| maker_sports | **$9451.16** | $-745.97 | $197.13 | 109 | 50% | $-949 | 9 |
| ai_judge | **$9395.86** | $-587.64 | $-16.5 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9357.99** | $-774.04 | $132.03 | 64 | 42% | $-968.16 | 17 |
| mm_slow | **$9136.42** | $-468.35 | $-395.23 | 53 | 53% | $-654.06 | 25 |
| random_control | **$9007.72** | $-991.45 | $-0.83 | 137 | 56% | $-1605.74 | 25 |
| mm_strong | **$8776.39** | $-1029.67 | $-193.94 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8318.15** | $-1100.36 | $-581.49 | 257 | 68% | $-1588.6 | 25 |
| whale_fade | **$7277.9** | $-2375.36 | $-346.74 | 406 | 48% | $-2729.91 | 23 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.2** | $-931.5 | $-65.3 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8482.91** | $-1937.09 | $420 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 81 | 45 | 2 | 64% | 2.94¢ |
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

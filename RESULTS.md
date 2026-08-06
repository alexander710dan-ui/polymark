# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34533 · Last run: 2026-08-06T16:13:02.319Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10306.65** | $46.83 | $259.82 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10259.44** | $513.6 | $-254.16 | 217 | 56% | $300.12 | 25 |
| mm_cheap | **$10234.43** | $640.15 | $-405.72 | 39 | 62% | $462.37 | 25 |
| maker_flat | **$10105.07** | $-11.32 | $116.39 | 2 | 50% | $-100 | 10 |
| maker_sports | **$10082.71** | $-7.69 | $90.4 | 2 | 50% | $-100 | 13 |
| mm_tight | **$10039.14** | $-164.88 | $204.02 | 457 | 53% | $-373.98 | 19 |
| copy_top | **$9988.75** | $-219.6 | $208.35 | 425 | 52% | $-1548.17 | 25 |
| fade_longshot | **$9884.08** | $25.97 | $-141.89 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9777** | $-706.11 | $483.11 | 406 | 51% | $-1556.11 | 25 |
| mid_momentum_v2 | **$9736.52** | $-117.16 | $-146.32 | 52 | 52% | $-307.98 | 25 |
| mm_max | **$9709.7** | $-276.89 | $-13.41 | 199 | 53% | $-485.99 | 3 |
| strong_dip | **$9655.3** | $-517.26 | $172.56 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9571.72** | $-426.73 | $-1.55 | 57 | 51% | $-617.55 | 25 |
| ai_judge | **$9377.15** | $-587.64 | $-35.21 | 7 | 14% | $-600 | 2 |
| random_control | **$9101.43** | $-979.49 | $80.92 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8893.98** | $-1116.1 | $10.08 | 538 | 54% | $-1335.23 | 22 |
| mm_slow | **$8599.67** | $-809.59 | $-590.74 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8282.56** | $-1184.03 | $-533.41 | 94 | 47% | $-1387.98 | 25 |
| momentum | **$7951.08** | $-1421.89 | $-627.03 | 271 | 67% | $-1910.13 | 25 |
| mm_sports_v2 | **$7714.21** | $-2341.02 | $55.23 | 108 | 44% | $-2560.15 | 21 |
| whale_fade | **$6725.16** | $-2758.9 | $-515.94 | 426 | 47% | $-3113.45 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9004.06** | $-931.5 | $-64.44 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$8187.08** | $-1590.97 | $-221.95 | 99 | 40% | $-1785.09 | 19 |
| maker_sports_badsim (retired) | **$6788.52** | $-3334.28 | $122.8 | 208 | 45% | $-3537.31 | 9 |
| longshot (retired) | **$5081.7** | $-4791.55 | $-126.75 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 12 | 0 | 0 | 100% | 2.85¢ |
| maker_flat_badsim | 118 | 85 | 0 | 58% | 2.9¢ |
| maker_sports | 15 | 0 | 0 | 100% | 1.4¢ |
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

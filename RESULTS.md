# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30541 · Last run: 2026-08-05T02:39:03.455Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10848.73** | $872.18 | $-23.45 | 407 | 56% | $653.05 | 17 |
| mid_momentum | **$10801.83** | $814.23 | $-12.4 | 204 | 57% | $600.75 | 25 |
| mm_tight | **$10797.93** | $741.88 | $56.05 | 353 | 54% | $538.85 | 12 |
| mm_cheap | **$10513.97** | $746.87 | $-232.9 | 34 | 65% | $569.09 | 25 |
| copy_pro | **$10305.92** | $-643.53 | $949.45 | 383 | 51% | $-1493.53 | 25 |
| copy_top | **$10232.38** | $-139.93 | $372.31 | 404 | 52% | $-1468.5 | 24 |
| super | **$9918.7** | $-387.2 | $305.9 | 71 | 48% | $-603.05 | 13 |
| fade_longshot | **$9895.12** | $92.73 | $-197.61 | 115 | 96% | $81.99 | 25 |
| mm_max | **$9609.74** | $-575.9 | $185.64 | 155 | 52% | $-743.02 | 5 |
| strong_dip | **$9507.41** | $-426.02 | $-66.57 | 101 | 59% | $-518.33 | 25 |
| maker_sports | **$9451.03** | $-897.83 | $348.86 | 107 | 50% | $-1100.86 | 11 |
| ai_judge | **$9387.06** | $-587.64 | $-25.3 | 7 | 14% | $-600 | 2 |
| maker_flat | **$9345.72** | $-774.04 | $119.76 | 64 | 42% | $-968.16 | 17 |
| mm_slow | **$9163.83** | $-468.35 | $-367.82 | 53 | 53% | $-654.06 | 25 |
| random_control | **$8966.44** | $-991.45 | $-42.11 | 137 | 56% | $-1605.74 | 25 |
| mm_strong | **$8781.79** | $-1029.67 | $-188.54 | 79 | 47% | $-1233.62 | 25 |
| momentum | **$8318.03** | $-1100.36 | $-581.61 | 257 | 68% | $-1588.6 | 25 |
| whale_fade | **$7014.16** | $-2499.83 | $-486.01 | 405 | 47% | $-2854.38 | 24 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9003.75** | $-931.5 | $-64.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8486.25** | $-1937.09 | $423.34 | 146 | 25% | $-3964.75 | 1 |
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

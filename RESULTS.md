# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 32255 · Last run: 2026-08-05T18:42:16.047Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10835.39** | $1137.56 | $-302.17 | 385 | 55% | $934.53 | 18 |
| mid_momentum | **$10647.22** | $867.28 | $-220.06 | 207 | 57% | $653.8 | 25 |
| mm_cheap | **$10493.22** | $887.82 | $-394.6 | 35 | 66% | $710.04 | 25 |
| mm_sports | **$10305.73** | $736.62 | $-430.89 | 450 | 56% | $517.49 | 24 |
| fade_longshot | **$9942.65** | $118.35 | $-175.7 | 119 | 96% | $107.61 | 25 |
| super | **$9882.87** | $-425.73 | $308.6 | 73 | 48% | $-641.58 | 12 |
| mm_max | **$9817.06** | $-209.11 | $26.17 | 167 | 54% | $-376.23 | 5 |
| copy_top | **$9686.11** | $-472.32 | $158.43 | 411 | 52% | $-1800.89 | 25 |
| mm_cheap_v2 | **$9596.16** | $-140.86 | $-262.98 | 12 | 50% | $-252.78 | 25 |
| mid_momentum_v2 | **$9594.43** | $-351.45 | $-54.12 | 14 | 43% | $-463.37 | 25 |
| strong_dip | **$9498.76** | $-482.76 | $-18.48 | 103 | 59% | $-575.07 | 25 |
| ai_judge | **$9368.26** | $-587.64 | $-44.1 | 7 | 14% | $-600 | 2 |
| copy_pro | **$9191.57** | $-1348.73 | $540.3 | 393 | 51% | $-2198.73 | 25 |
| mm_sports_v2 | **$9024.92** | $-501.04 | $-474.04 | 17 | 41% | $-627.06 | 24 |
| mm_slow | **$9020.17** | $-516.83 | $-463 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8971.74** | $-1012.4 | $-15.86 | 142 | 56% | $-1626.69 | 25 |
| mm_strong | **$8710.01** | $-876.62 | $-413.37 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8632.66** | $-1234.9 | $-132.44 | 81 | 41% | $-1429.02 | 18 |
| maker_sports | **$8483.85** | $-1213.83 | $-302.32 | 137 | 49% | $-1416.86 | 17 |
| momentum | **$8207.58** | $-1059.12 | $-733.3 | 261 | 68% | $-1547.36 | 25 |
| whale_fade | **$7226.26** | $-2155.23 | $-618.51 | 412 | 48% | $-2509.78 | 25 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8999.3** | $-931.5 | $-69.2 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5105.66** | $-4791.55 | $-102.79 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 99 | 63 | 3 | 61% | 2.99¢ |
| maker_sports | 154 | 99 | 5 | 61% | 1.61¢ |

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

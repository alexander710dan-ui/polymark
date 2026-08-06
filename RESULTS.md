# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34376 · Last run: 2026-08-06T14:23:29.588Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10334.55** | $46.83 | $287.72 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10307.13** | $456.72 | $-149.59 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10276.36** | $583.27 | $-306.91 | 38 | 61% | $405.49 | 25 |
| copy_top | **$10004.77** | $-117.05 | $121.82 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9892.64** | $203.66 | $-311.02 | 445 | 53% | $-5.44 | 21 |
| fade_longshot | **$9856.18** | $25.97 | $-169.79 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9830.77** | $-919.79 | $750.56 | 404 | 51% | $-1769.79 | 25 |
| mm_max | **$9768.6** | $-242.96 | $11.56 | 194 | 53% | $-452.06 | 5 |
| strong_dip | **$9625.69** | $-517.26 | $142.95 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9558.82** | $-217.42 | $-223.76 | 50 | 50% | $-408.24 | 25 |
| ai_judge | **$9386.89** | $-587.64 | $-25.47 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9383.91** | $-424.59 | $-191.5 | 54 | 50% | $-615.41 | 25 |
| random_control | **$9151.29** | $-979.49 | $130.78 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8907.11** | $-606.86 | $-486.03 | 524 | 55% | $-825.99 | 25 |
| mm_slow | **$8651.06** | $-809.59 | $-539.35 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8348.83** | $-1290.97 | $-360.2 | 96 | 42% | $-1485.09 | 22 |
| mm_strong | **$8237.8** | $-1227.41 | $-534.79 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7935.44** | $-1478.77 | $-585.79 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7729.09** | $-1912.26 | $-358.65 | 94 | 46% | $-2131.39 | 25 |
| maker_sports | **$6814.84** | $-2916.79 | $-268.37 | 197 | 46% | $-3119.82 | 16 |
| whale_fade | **$6736.89** | $-2848.81 | $-414.3 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8993.59** | $-931.5 | $-74.91 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 118 | 83 | 2 | 59% | 2.9¢ |
| maker_sports | 213 | 134 | 6 | 61% | 1.58¢ |

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

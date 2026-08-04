# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 29922 · Last run: 2026-08-04T20:54:45.955Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$11497.07** | $1130.23 | $366.84 | 332 | 55% | $927.2 | 16 |
| mm_sports | **$11410.39** | $1234.66 | $175.73 | 382 | 56% | $1015.53 | 25 |
| mid_momentum | **$10391.92** | $862.6 | $-470.68 | 201 | 58% | $649.12 | 25 |
| mm_cheap | **$10383.25** | $1054.47 | $-671.22 | 30 | 73% | $876.69 | 25 |
| copy_top | **$10030** | $-193.36 | $223.36 | 401 | 52% | $-1521.93 | 25 |
| copy_pro | **$10017.26** | $-588.91 | $606.17 | 381 | 51% | $-1438.91 | 25 |
| fade_longshot | **$9904.17** | $63.25 | $-159.08 | 109 | 95% | $52.51 | 25 |
| mm_max | **$9880.51** | $-213.47 | $93.98 | 144 | 53% | $-380.59 | 2 |
| super | **$9715.27** | $-592.35 | $307.62 | 69 | 46% | $-808.2 | 14 |
| strong_dip | **$9706.16** | $-463.45 | $169.61 | 99 | 60% | $-555.76 | 25 |
| maker_sports | **$9472.93** | $-740.78 | $213.71 | 85 | 49% | $-926.49 | 13 |
| ai_judge | **$9393.73** | $-587.64 | $-18.63 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9126.71** | $-468.35 | $-404.94 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9078.63** | $-514.08 | $-407.29 | 53 | 43% | $-708.2 | 18 |
| random_control | **$8984.11** | $-654.21 | $-361.68 | 130 | 57% | $-1268.5 | 25 |
| mm_strong | **$8641.08** | $-924.82 | $-434.1 | 77 | 48% | $-1128.77 | 25 |
| momentum | **$8199.09** | $-1041.81 | $-759.1 | 251 | 68% | $-1530.05 | 25 |
| whale_fade | **$7048.99** | $-2370.75 | $-580.26 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9407.14** | $-730.36 | $137.5 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9007.28** | $-931.5 | $-61.22 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8466.25** | $-1937.09 | $403.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5091.57** | $-4791.55 | $-116.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 71 | 42 | 2 | 63% | 2.94¢ |
| maker_sports | 98 | 60 | 6 | 62% | 1.52¢ |

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

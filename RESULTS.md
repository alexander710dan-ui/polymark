# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33972 · Last run: 2026-08-06T10:38:42.764Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10302.76** | $46.83 | $255.93 | 79 | 51% | $-217.5 | 11 |
| mm_cheap | **$10213.44** | $685.62 | $-472.18 | 37 | 62% | $507.84 | 25 |
| mid_momentum | **$10212.8** | $559.07 | $-346.27 | 215 | 56% | $345.59 | 25 |
| copy_top | **$10043.19** | $-117.05 | $160.24 | 424 | 52% | $-1445.62 | 22 |
| mm_tight | **$10016.23** | $348.87 | $-332.64 | 435 | 53% | $139.77 | 14 |
| fade_longshot | **$9874.47** | $25.97 | $-151.5 | 123 | 95% | $15.23 | 25 |
| strong_dip | **$9643.75** | $-517.26 | $161.01 | 108 | 59% | $-609.57 | 25 |
| mm_max | **$9594.22** | $-344.49 | $-61.29 | 193 | 53% | $-553.59 | 2 |
| copy_pro | **$9529.48** | $-919.79 | $449.27 | 404 | 51% | $-1769.79 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| mm_cheap_v2 | **$9314.77** | $-233.02 | $-452.21 | 50 | 52% | $-423.84 | 25 |
| mid_momentum_v2 | **$9293.85** | $-188.11 | $-518.04 | 46 | 50% | $-378.93 | 25 |
| mm_sports | **$9227.75** | $-402.88 | $-369.37 | 512 | 55% | $-622.01 | 19 |
| random_control | **$9139.27** | $-1085.22 | $224.49 | 146 | 56% | $-1699.51 | 25 |
| maker_flat | **$8648.06** | $-1090.97 | $-260.97 | 94 | 43% | $-1285.09 | 18 |
| mm_slow | **$8646.44** | $-809.59 | $-543.97 | 62 | 50% | $-995.3 | 25 |
| mm_strong | **$8184.68** | $-1227.41 | $-587.91 | 93 | 46% | $-1431.36 | 25 |
| mm_sports_v2 | **$7965.57** | $-1708.38 | $-326.05 | 82 | 45% | $-1927.51 | 17 |
| momentum | **$7884.87** | $-1376.42 | $-738.71 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7007.8** | $-2474.37 | $-517.83 | 189 | 47% | $-2677.4 | 8 |
| whale_fade | **$6654.7** | $-2848.81 | $-496.49 | 425 | 47% | $-3203.36 | 22 |
| copy_month (retired) | **$9421.03** | $-730.36 | $151.39 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.99** | $-931.5 | $-71.51 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5088.99** | $-4791.55 | $-119.46 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 112 | 77 | 3 | 59% | 2.94¢ |
| maker_sports | 197 | 124 | 6 | 61% | 1.55¢ |

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

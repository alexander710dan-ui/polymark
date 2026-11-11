# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80679 · Last run: 2026-11-11T19:32:20.135Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$12983.62** | $3136.03 | $-152.41 | 325 | 58% | $2891.2 | 20 |
| copy_pro | **$12385.24** | $2469.41 | $-84.17 | 532 | 55% | $1619.41 | 3 |
| mm_tight | **$12293.14** | $2514.54 | $-221.4 | 746 | 55% | $2295.41 | 12 |
| mm_cheap | **$12209.96** | $1864.31 | $345.65 | 208 | 57% | $1644.49 | 25 |
| mid_momentum | **$11752.91** | $1316.5 | $436.41 | 367 | 56% | $1096.68 | 25 |
| mm_cheap_v2 | **$11360.32** | $1014.67 | $345.65 | 225 | 55% | $794.85 | 25 |
| maker_flat | **$10656.39** | $539.01 | $117.38 | 105 | 50% | $344.89 | 17 |
| mid_momentum_v2 | **$10527.73** | $91.32 | $436.41 | 202 | 52% | $-128.5 | 25 |
| mm_max | **$10526.52** | $412.09 | $114.43 | 299 | 54% | $202.99 | 2 |
| mm_sports | **$10343.26** | $554.87 | $-211.61 | 890 | 55% | $335.74 | 20 |
| fade_longshot | **$9864.63** | $-151.76 | $16.39 | 228 | 94% | $-162.5 | 25 |
| mm_slow | **$9696.37** | $-232.49 | $-71.14 | 183 | 52% | $-451.62 | 24 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9537.28** | $-572.67 | $109.95 | 283 | 53% | $-791.8 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9113.95** | $-674.44 | $-211.61 | 459 | 53% | $-893.57 | 20 |
| strong_dip | **$8611.03** | $-1445.44 | $56.47 | 245 | 58% | $-1539.07 | 21 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8376.77** | $-1470.79 | $-152.44 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7540.75** | $-2427.27 | $-31.98 | 241 | 54% | $-3041.56 | 25 |
| momentum | **$7511.86** | $-2617.23 | $129.09 | 361 | 66% | $-3105.47 | 25 |
| whale_fade | **$5981.3** | $-4244.08 | $225.38 | 563 | 46% | $-4695.54 | 4 |
| copy_month (retired) | **$9447.42** | $-552.58 | $0 | 165 | 48% | $-1361.67 | 0 |
| favorite (retired) | **$9001.19** | $-998.81 | $0 | 136 | 69% | $-1062.74 | 0 |
| mean_revert (retired) | **$8629.58** | $-1370.42 | $0 | 147 | 26% | $-3398.08 | 0 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| maker_flat_badsim (retired) | **$7579.22** | $-2420.78 | $0 | 118 | 38% | $-2614.9 | 0 |
| maker_sports_badsim (retired) | **$6470.48** | $-3529.52 | $0 | 216 | 45% | $-3732.55 | 0 |
| longshot (retired) | **$5008.45** | $-4991.55 | $0 | 84 | 2% | $-6891.55 | 0 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 122 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 345 | 1 | 0 | 100% | 1.38¢ |

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

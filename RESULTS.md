# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79496 · Last run: 2026-11-11T05:01:13.142Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$13053.5** | $2864.52 | $188.98 | 283 | 59% | $2619.69 | 15 |
| copy_pro | **$12385.08** | $2469.41 | $-84.33 | 532 | 55% | $1619.41 | 3 |
| mm_cheap | **$12123.02** | $1846.09 | $276.93 | 193 | 58% | $1626.27 | 22 |
| mm_tight | **$12118.4** | $1990.49 | $127.91 | 711 | 54% | $1771.36 | 12 |
| mid_momentum | **$11748.79** | $1400.23 | $348.56 | 359 | 56% | $1180.41 | 25 |
| mm_cheap_v2 | **$11273.38** | $996.45 | $276.93 | 210 | 55% | $776.63 | 22 |
| maker_flat | **$10638.88** | $637.84 | $1.04 | 95 | 52% | $443.72 | 15 |
| mid_momentum_v2 | **$10523.61** | $175.05 | $348.56 | 194 | 52% | $-44.77 | 25 |
| mm_sports | **$10444.42** | $302.3 | $142.12 | 847 | 55% | $83.17 | 15 |
| mm_max | **$10263.29** | $263.29 | $0 | 293 | 54% | $54.19 | 0 |
| fade_longshot | **$9926.06** | $-95.44 | $21.5 | 219 | 95% | $-106.18 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_strong | **$9512.21** | $-504.36 | $16.57 | 263 | 53% | $-723.49 | 20 |
| mm_slow | **$9412.76** | $-454.77 | $-132.47 | 177 | 52% | $-673.9 | 15 |
| mm_sports_v2 | **$9215.11** | $-927.01 | $142.12 | 416 | 53% | $-1146.14 | 15 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8793.87** | $-1140.41 | $-65.72 | 231 | 58% | $-1234.04 | 15 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8377.1** | $-1470.79 | $-152.11 | 564 | 53% | $-2799.36 | 4 |
| random_control | **$7717.28** | $-2250 | $-32.72 | 237 | 54% | $-2864.29 | 25 |
| momentum | **$7632.47** | $-2656.88 | $289.35 | 349 | 66% | $-3145.12 | 25 |
| whale_fade | **$6008.64** | $-4244.08 | $252.72 | 563 | 46% | $-4695.54 | 4 |
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
| maker_flat | 110 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 298 | 1 | 0 | 100% | 1.31¢ |

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

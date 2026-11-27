# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 108051 · Last run: 2026-11-27T01:03:37.334Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$16056.4** | $6153.97 | $-97.57 | 1191 | 56% | $5909.14 | 14 |
| maker_flat | **$12344.11** | $1630.07 | $714.04 | 193 | 54% | $1435.95 | 24 |
| copy_pro | **$12165.4** | $2165.4 | $0 | 535 | 55% | $1315.4 | 0 |
| mid_momentum | **$11939.45** | $1615.34 | $324.11 | 522 | 55% | $1395.52 | 25 |
| mm_cheap | **$11416.44** | $1229.24 | $187.2 | 402 | 53% | $1009.42 | 25 |
| mid_momentum_v2 | **$10714.27** | $390.16 | $324.11 | 357 | 52% | $170.34 | 25 |
| mm_cheap_v2 | **$10566.8** | $379.6 | $187.2 | 419 | 52% | $159.78 | 25 |
| mm_max | **$10154.8** | $153.44 | $1.36 | 545 | 55% | $-55.66 | 2 |
| mm_slow | **$9969.01** | $-70.8 | $39.81 | 247 | 53% | $-289.93 | 25 |
| fade_longshot | **$9816.04** | $-232.03 | $48.07 | 255 | 94% | $-242.77 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| random_control | **$9259.6** | $-787.41 | $47.01 | 293 | 52% | $-2810.3 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$8966.02** | $-1147.21 | $113.23 | 495 | 52% | $-1366.34 | 25 |
| mm_tight | **$8595.34** | $-1281.37 | $-123.29 | 1517 | 52% | $-1500.5 | 13 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| mm_sports | **$8522.36** | $-1346.93 | $-130.71 | 1794 | 54% | $-1570.26 | 14 |
| strong_dip | **$8515.98** | $-1708.99 | $224.97 | 325 | 56% | $-1802.62 | 25 |
| copy_top | **$8224.8** | $-1775.2 | $0 | 568 | 52% | $-3103.77 | 0 |
| momentum | **$7587.41** | $-2551.21 | $138.62 | 405 | 65% | $-3039.45 | 25 |
| mm_sports_v2 | **$7293.05** | $-2576.24 | $-130.71 | 1363 | 53% | $-2799.57 | 14 |
| whale_fade | **$6070.6** | $-3929.4 | $0 | 567 | 47% | $-4380.86 | 0 |
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
| maker_flat | 217 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 1205 | 10 | 0 | 99% | 1.39¢ |

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

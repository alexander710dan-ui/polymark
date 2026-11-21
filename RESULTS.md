# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 96988 · Last run: 2026-11-21T05:40:56.024Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$16273.19** | $6558.1 | $-284.91 | 883 | 58% | $6313.27 | 10 |
| copy_pro | **$12165.4** | $2165.4 | $0 | 535 | 55% | $1315.4 | 0 |
| mm_tight | **$11904.81** | $2305.24 | $-400.43 | 1256 | 53% | $2086.11 | 8 |
| maker_flat | **$11289.45** | $1071.33 | $218.12 | 186 | 53% | $877.21 | 25 |
| mid_momentum | **$11166.99** | $1259.35 | $-92.36 | 510 | 55% | $1039.53 | 25 |
| mm_cheap | **$10443.46** | $618.55 | $-175.09 | 390 | 52% | $398.73 | 25 |
| mm_max | **$10389.74** | $396.47 | $-6.73 | 472 | 55% | $187.37 | 1 |
| mm_sports | **$10357.91** | $680.3 | $-322.39 | 1474 | 54% | $456.97 | 10 |
| mid_momentum_v2 | **$9941.81** | $34.17 | $-92.36 | 345 | 52% | $-185.65 | 25 |
| fade_longshot | **$9939.4** | $-89.19 | $28.59 | 242 | 95% | $-99.93 | 25 |
| mm_cheap_v2 | **$9593.82** | $-231.09 | $-175.09 | 407 | 51% | $-450.91 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports_v2 | **$9128.6** | $-549.01 | $-322.39 | 1043 | 53% | $-772.34 | 10 |
| mm_slow | **$9104.48** | $-493.16 | $-402.36 | 244 | 52% | $-712.29 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| strong_dip | **$8563.89** | $-1735.06 | $298.95 | 319 | 56% | $-1828.69 | 25 |
| copy_top | **$8224.8** | $-1775.2 | $0 | 568 | 52% | $-3103.77 | 0 |
| mm_strong | **$8143.77** | $-1671.3 | $-184.93 | 483 | 51% | $-1890.43 | 25 |
| momentum | **$7671.07** | $-2357.92 | $28.99 | 402 | 66% | $-2846.16 | 25 |
| whale_fade | **$6070.6** | $-3929.4 | $0 | 567 | 47% | $-4380.86 | 0 |
| random_control | **$5980.17** | $-3877.41 | $-142.42 | 283 | 52% | $-4491.7 | 25 |
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
| maker_flat | 211 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 893 | 9 | 0 | 99% | 1.42¢ |

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

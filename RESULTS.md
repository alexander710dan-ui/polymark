# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79442 · Last run: 2026-10-31T02:16:27.860Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11825.97** | $1552.28 | $273.69 | 59 | 66% | $1339.78 | 21 |
| mid_momentum | **$11401.63** | $830.64 | $570.99 | 278 | 56% | $617.16 | 25 |
| mm_tight | **$11262.13** | $1329.49 | $-67.36 | 517 | 54% | $1120.39 | 21 |
| copy_pro | **$11208.04** | $1622.66 | $-414.62 | 475 | 53% | $772.66 | 25 |
| mm_cheap | **$10928.92** | $551.49 | $377.43 | 103 | 57% | $369.03 | 25 |
| mm_max | **$10429.44** | $432.17 | $-2.73 | 226 | 54% | $223.07 | 1 |
| mm_sports | **$10319.41** | $205.96 | $113.45 | 612 | 55% | $-13.17 | 22 |
| maker_flat | **$10271.89** | $-145.19 | $417.08 | 21 | 48% | $-336.74 | 25 |
| mid_momentum_v2 | **$10176.45** | $-394.54 | $570.99 | 113 | 51% | $-585.36 | 25 |
| mm_cheap_v2 | **$10079.28** | $-298.15 | $377.43 | 120 | 53% | $-488.97 | 25 |
| mm_strong | **$10055.31** | $-367.39 | $422.7 | 158 | 54% | $-571.34 | 25 |
| fade_longshot | **$9919.94** | $21.44 | $-101.5 | 158 | 95% | $10.7 | 25 |
| super | **$9848.03** | $-159.24 | $7.27 | 100 | 52% | $-441.14 | 15 |
| conviction | **$9695.4** | $-204.69 | $-99.91 | 2 | 0% | $-102.55 | 1 |
| copy_top | **$9304.91** | $-337.49 | $-357.6 | 491 | 53% | $-1666.06 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9171.36** | $-794.17 | $-34.47 | 189 | 56% | $-1408.46 | 25 |
| mm_sports_v2 | **$9090.1** | $-1023.35 | $113.45 | 181 | 52% | $-1242.48 | 22 |
| mm_slow | **$8977.72** | $-1297.59 | $275.31 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8567.64** | $-1116.99 | $-315.37 | 153 | 58% | $-1209.3 | 25 |
| momentum | **$7302.43** | $-2441.58 | $-255.99 | 301 | 65% | $-2929.82 | 25 |
| whale_fade | **$6855.19** | $-3196.75 | $51.94 | 492 | 46% | $-3648.21 | 24 |
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
| maker_flat | 46 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 80 | 1 | 0 | 99% | 1.4¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 93092 · Last run: 2026-11-04T22:11:00.882Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12445.65** | $2625.78 | $-180.13 | 527 | 55% | $1775.78 | 8 |
| mm_cheap | **$11910.56** | $1557.97 | $352.59 | 158 | 57% | $1338.15 | 25 |
| mid_momentum | **$11747.23** | $1340.65 | $406.58 | 332 | 56% | $1120.83 | 25 |
| mm_tight | **$11629.04** | $1167.92 | $461.12 | 666 | 54% | $948.79 | 19 |
| maker_sports | **$11622.67** | $886.88 | $735.79 | 232 | 56% | $653.55 | 17 |
| maker_flat | **$11372.91** | $670.47 | $702.44 | 74 | 53% | $476.35 | 21 |
| mm_cheap_v2 | **$11060.92** | $708.33 | $352.59 | 175 | 54% | $488.51 | 25 |
| mid_momentum_v2 | **$10522.05** | $115.47 | $406.58 | 167 | 51% | $-104.35 | 25 |
| mm_max | **$10409.09** | $35.47 | $373.62 | 278 | 53% | $-173.63 | 6 |
| mm_slow | **$9927.81** | $-274.4 | $202.21 | 152 | 53% | $-483.5 | 25 |
| fade_longshot | **$9918.81** | $-125.48 | $44.29 | 192 | 94% | $-136.22 | 25 |
| mm_strong | **$9844.69** | $-432.55 | $277.24 | 229 | 53% | $-636.5 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9396.64** | $-1258.14 | $654.78 | 792 | 54% | $-1477.27 | 22 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8733.36** | $-1062.44 | $-204.2 | 208 | 58% | $-1156.07 | 25 |
| super | **$8574.36** | $-1425.64 | $0 | 133 | 50% | $-1707.54 | 0 |
| copy_top | **$8382.71** | $-1396.72 | $-220.57 | 560 | 53% | $-2725.29 | 8 |
| mm_sports_v2 | **$8167.33** | $-2487.45 | $654.78 | 361 | 51% | $-2706.58 | 22 |
| random_control | **$7678.91** | $-1664.07 | $-657.02 | 212 | 54% | $-2278.36 | 25 |
| momentum | **$7645.12** | $-2229.75 | $-125.13 | 331 | 66% | $-2717.99 | 25 |
| whale_fade | **$6472.24** | $-3723.04 | $195.28 | 557 | 47% | $-4174.5 | 10 |
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
| maker_flat | 95 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 249 | 1 | 2 | 100% | 1.3¢ |

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

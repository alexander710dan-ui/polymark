# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 82886 · Last run: 2026-10-31T20:50:46.566Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11676.95** | $1555.03 | $121.92 | 487 | 53% | $705.03 | 25 |
| maker_sports | **$11183.39** | $1486.9 | $-303.51 | 85 | 61% | $1274.4 | 10 |
| mid_momentum | **$10884.19** | $881.56 | $2.63 | 290 | 56% | $668.08 | 25 |
| mm_tight | **$10627.06** | $860.3 | $-233.24 | 541 | 54% | $651.2 | 8 |
| mm_cheap | **$10354.11** | $589.99 | $-235.88 | 115 | 57% | $398.3 | 25 |
| mm_max | **$10271.77** | $271.77 | $0 | 229 | 54% | $62.67 | 1 |
| maker_flat | **$10203.19** | $140.79 | $62.4 | 28 | 50% | $-50.76 | 24 |
| fade_longshot | **$9947.11** | $-70.35 | $17.46 | 161 | 94% | $-81.09 | 25 |
| conviction | **$9689.52** | $-306.99 | $-3.49 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9659.01** | $-343.62 | $2.63 | 125 | 51% | $-536.17 | 25 |
| mm_strong | **$9536.78** | $-232.66 | $-230.56 | 168 | 54% | $-436.61 | 25 |
| mm_cheap_v2 | **$9504.47** | $-259.65 | $-235.88 | 132 | 52% | $-451.34 | 25 |
| mm_sports | **$9383.96** | $-290.57 | $-325.47 | 639 | 55% | $-509.7 | 10 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9195.82** | $-801.66 | $-2.52 | 506 | 52% | $-2130.23 | 25 |
| random_control | **$9034.51** | $-794.17 | $-171.32 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8887.06** | $-1007.21 | $-105.73 | 117 | 50% | $-1206.89 | 25 |
| strong_dip | **$8882.82** | $-1022.63 | $-94.55 | 161 | 58% | $-1116.26 | 22 |
| super | **$8758.6** | $-1043.23 | $-198.17 | 117 | 50% | $-1325.13 | 7 |
| mm_sports_v2 | **$8154.65** | $-1519.88 | $-325.47 | 208 | 51% | $-1739.01 | 10 |
| momentum | **$7262.15** | $-2644.98 | $-92.87 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6728.68** | $-2856.01 | $-415.31 | 507 | 47% | $-3307.47 | 25 |
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
| maker_flat | 52 | 0 | 0 | 100% | 2.63¢ |
| maker_sports | 95 | 1 | 0 | 99% | 1.41¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79642 · Last run: 2026-10-31T03:07:26.632Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11494.18** | $1583.27 | $-89.09 | 72 | 64% | $1370.77 | 9 |
| copy_pro | **$11186.78** | $987.05 | $199.73 | 480 | 53% | $137.05 | 25 |
| mid_momentum | **$11173.09** | $855.85 | $317.24 | 282 | 56% | $642.37 | 25 |
| mm_tight | **$10844.33** | $1154.37 | $-310.04 | 530 | 54% | $945.27 | 9 |
| mm_cheap | **$10694.91** | $576.7 | $118.21 | 107 | 57% | $394.24 | 23 |
| mm_max | **$10438.52** | $432.17 | $6.35 | 226 | 54% | $223.07 | 2 |
| maker_flat | **$10290.11** | $-152.88 | $442.99 | 23 | 48% | $-344.43 | 25 |
| mm_sports | **$10004.05** | $78.44 | $-74.39 | 626 | 55% | $-140.69 | 9 |
| mid_momentum_v2 | **$9947.91** | $-369.33 | $317.24 | 117 | 51% | $-560.15 | 25 |
| fade_longshot | **$9922.41** | $-78.68 | $1.09 | 159 | 94% | $-89.42 | 25 |
| mm_strong | **$9883.15** | $-419.53 | $302.68 | 164 | 54% | $-623.48 | 22 |
| mm_cheap_v2 | **$9845.27** | $-272.94 | $118.21 | 124 | 52% | $-463.76 | 23 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| super | **$9380.03** | $-686.57 | $66.6 | 110 | 51% | $-968.47 | 7 |
| copy_top | **$9306.94** | $-764.51 | $71.45 | 497 | 53% | $-2093.08 | 23 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9168.69** | $-794.17 | $-37.14 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8978.67** | $-1297.59 | $276.26 | 114 | 50% | $-1483.3 | 25 |
| mm_sports_v2 | **$8774.74** | $-1150.87 | $-74.39 | 195 | 52% | $-1370 | 9 |
| strong_dip | **$8721.91** | $-952.56 | $-325.53 | 157 | 59% | $-1046.19 | 22 |
| momentum | **$7301.23** | $-2644.98 | $-53.79 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6834.55** | $-2866 | $-299.45 | 498 | 47% | $-3317.46 | 23 |
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
| maker_flat | 48 | 0 | 0 | 100% | 2.68¢ |
| maker_sports | 81 | 1 | 0 | 99% | 1.45¢ |

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

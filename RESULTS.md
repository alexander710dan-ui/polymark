# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72413 · Last run: 2026-10-29T22:28:48.463Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$10963.86** | $772.61 | $191.25 | 445 | 53% | $-77.39 | 25 |
| maker_sports | **$10955.04** | $1066.97 | $-111.93 | 23 | 78% | $875.42 | 11 |
| mid_momentum | **$10627.25** | $844.9 | $-217.65 | 265 | 57% | $631.42 | 25 |
| mm_tight | **$10621.14** | $775.06 | $-153.92 | 485 | 54% | $565.96 | 8 |
| fade_longshot | **$10073.83** | $89.44 | $-15.61 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10071.77** | $153.3 | $-81.53 | 210 | 54% | $-55.8 | 2 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_cheap | **$9944.48** | $192.79 | $-248.31 | 84 | 56% | $10.33 | 25 |
| mm_sports | **$9787.84** | $-81.23 | $-130.93 | 576 | 55% | $-300.36 | 11 |
| maker_flat | **$9729.12** | $-107 | $-163.88 | 13 | 46% | $-298.55 | 22 |
| copy_top | **$9653.63** | $-438.59 | $92.22 | 460 | 53% | $-1767.16 | 23 |
| strong_dip | **$9574.97** | $-437.85 | $12.82 | 141 | 61% | $-530.16 | 16 |
| super | **$9566.82** | $-424.16 | $-9.02 | 92 | 51% | $-688.49 | 4 |
| mid_momentum_v2 | **$9402.07** | $-380.28 | $-217.65 | 100 | 51% | $-571.1 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9094.84** | $-656.85 | $-248.31 | 101 | 50% | $-847.67 | 25 |
| mm_strong | **$8792.26** | $-993.88 | $-213.86 | 141 | 52% | $-1197.83 | 25 |
| random_control | **$8654.41** | $-1190.91 | $-154.68 | 182 | 56% | $-1805.2 | 25 |
| mm_slow | **$8577.75** | $-1486.92 | $64.67 | 104 | 49% | $-1672.63 | 22 |
| mm_sports_v2 | **$8558.53** | $-1310.54 | $-130.93 | 145 | 51% | $-1529.67 | 11 |
| momentum | **$7409.17** | $-2533.86 | $-56.97 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6085.73** | $-3676.22 | $-238.05 | 461 | 46% | $-4030.77 | 23 |
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
| maker_flat | 35 | 0 | 0 | 100% | 2.64¢ |
| maker_sports | 34 | 1 | 0 | 97% | 1.61¢ |

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

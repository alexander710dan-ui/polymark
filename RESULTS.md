# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 69221 · Last run: 2026-10-29T09:57:37.163Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10195.15** | $141.75 | $53.4 | 469 | 53% | $-67.35 | 2 |
| copy_pro | **$10152.62** | $68.12 | $84.5 | 430 | 52% | $-781.88 | 9 |
| maker_flat | **$10086.25** | $0 | $86.25 | 0 | — | $0 | 5 |
| maker_sports | **$10072.54** | $0 | $72.54 | 0 | — | $0 | 2 |
| fade_longshot | **$10060.35** | $65.33 | $-4.98 | 148 | 95% | $54.59 | 25 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$9810.37** | $-117.06 | $-72.57 | 133 | 62% | $-209.37 | 3 |
| mid_momentum | **$9802.3** | $-249.04 | $51.34 | 241 | 54% | $-462.52 | 9 |
| mm_max | **$9671.46** | $-379.44 | $50.9 | 200 | 53% | $-588.54 | 2 |
| copy_top | **$9597.72** | $-398.51 | $-3.77 | 450 | 53% | $-1727.08 | 5 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mm_cheap | **$9334.02** | $-715.18 | $49.2 | 63 | 49% | $-892.96 | 6 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_sports | **$8878.23** | $-1175.17 | $53.4 | 552 | 54% | $-1394.3 | 3 |
| random_control | **$8768.06** | $-1066.63 | $-165.31 | 172 | 56% | $-1680.92 | 25 |
| mid_momentum_v2 | **$8577.12** | $-1474.22 | $51.34 | 76 | 42% | $-1665.04 | 9 |
| mm_cheap_v2 | **$8484.38** | $-1564.82 | $49.2 | 80 | 44% | $-1755.64 | 6 |
| mm_strong | **$8168.53** | $-1876.85 | $45.38 | 119 | 46% | $-2080.8 | 7 |
| mm_slow | **$7854.89** | $-2196.45 | $51.34 | 87 | 44% | $-2382.16 | 9 |
| mm_sports_v2 | **$7648.92** | $-2404.48 | $53.4 | 121 | 45% | $-2623.61 | 3 |
| momentum | **$7433.27** | $-2447.35 | $-119.38 | 295 | 65% | $-2935.59 | 25 |
| whale_fade | **$6228.01** | $-3759.78 | $-12.21 | 451 | 46% | $-4114.33 | 5 |
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
| maker_flat | 5 | 0 | 1 | 100% | 3.32¢ |
| maker_sports | 2 | 0 | 1 | 100% | 3.3¢ |

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

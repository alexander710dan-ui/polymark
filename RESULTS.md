# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 91535 · Last run: 2026-11-04T07:29:15.275Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$12484.53** | $2368.14 | $116.39 | 519 | 55% | $1518.14 | 16 |
| mm_cheap | **$11787.88** | $1181.79 | $606.09 | 152 | 56% | $961.97 | 20 |
| mid_momentum | **$11621.53** | $1213 | $408.53 | 325 | 56% | $993.18 | 23 |
| maker_sports | **$11497.82** | $974.11 | $523.71 | 229 | 56% | $740.78 | 8 |
| maker_flat | **$11490.87** | $497.44 | $993.43 | 64 | 52% | $303.32 | 18 |
| mm_tight | **$11329.99** | $1000.21 | $329.78 | 664 | 54% | $781.08 | 8 |
| mm_cheap_v2 | **$10938.24** | $332.15 | $606.09 | 169 | 53% | $112.33 | 20 |
| mid_momentum_v2 | **$10396.35** | $-12.18 | $408.53 | 160 | 51% | $-232 | 23 |
| mm_max | **$10203.1** | $-132.24 | $335.34 | 276 | 53% | $-341.34 | 6 |
| mm_slow | **$10021.19** | $-381.45 | $402.64 | 146 | 52% | $-590.55 | 24 |
| mm_strong | **$9965.04** | $-494.51 | $459.55 | 222 | 53% | $-698.46 | 21 |
| fade_longshot | **$9884.46** | $-184.38 | $68.84 | 183 | 94% | $-195.12 | 25 |
| conviction | **$9591.76** | $-408.24 | $0 | 4 | 0% | $-306.99 | 0 |
| mm_sports | **$9308.37** | $-1159.82 | $468.19 | 789 | 54% | $-1378.95 | 9 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| strong_dip | **$8709.91** | $-985.57 | $-304.52 | 204 | 58% | $-1079.2 | 22 |
| super | **$8577.21** | $-1572.64 | $149.85 | 132 | 50% | $-1854.54 | 1 |
| copy_top | **$8446.66** | $-1452.83 | $-100.51 | 552 | 52% | $-2781.4 | 16 |
| mm_sports_v2 | **$8079.06** | $-2389.13 | $468.19 | 358 | 51% | $-2608.26 | 9 |
| random_control | **$7871.22** | $-1466.83 | $-661.95 | 198 | 54% | $-2081.12 | 25 |
| momentum | **$7517.93** | $-2316.54 | $-165.53 | 319 | 65% | $-2804.78 | 25 |
| whale_fade | **$7052.43** | $-3250.73 | $303.16 | 549 | 47% | $-3702.19 | 18 |
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
| maker_flat | 82 | 0 | 0 | 100% | 2.66¢ |
| maker_sports | 237 | 1 | 0 | 100% | 1.32¢ |

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

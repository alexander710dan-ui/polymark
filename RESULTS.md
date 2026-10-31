# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 80910 · Last run: 2026-10-31T08:27:02.432Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11528.13** | $1290.59 | $237.54 | 482 | 53% | $440.59 | 25 |
| maker_sports | **$11345.36** | $1370.15 | $-24.79 | 78 | 62% | $1157.65 | 4 |
| mid_momentum | **$11189.34** | $826.42 | $362.92 | 286 | 56% | $612.94 | 25 |
| mm_cheap | **$10719.81** | $535.71 | $184.1 | 111 | 57% | $353.25 | 25 |
| mm_tight | **$10697.7** | $747.96 | $-50.26 | 536 | 54% | $538.86 | 4 |
| mm_max | **$10309.78** | $329.06 | $-19.28 | 227 | 54% | $119.96 | 1 |
| maker_flat | **$10188.16** | $-73.55 | $261.71 | 25 | 48% | $-265.1 | 25 |
| mid_momentum_v2 | **$9964.16** | $-398.76 | $362.92 | 121 | 51% | $-589.58 | 25 |
| fade_longshot | **$9916.05** | $-77.53 | $-6.42 | 160 | 94% | $-88.27 | 25 |
| mm_cheap_v2 | **$9870.17** | $-313.93 | $184.1 | 128 | 52% | $-504.75 | 25 |
| mm_strong | **$9753.74** | $-322.96 | $76.7 | 166 | 54% | $-526.91 | 25 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| mm_sports | **$9586.95** | $-371.57 | $-41.48 | 632 | 55% | $-590.7 | 4 |
| copy_top | **$9552.9** | $-457.95 | $10.85 | 501 | 53% | $-1786.52 | 25 |
| super | **$9306.88** | $-768.26 | $75.14 | 114 | 51% | $-1050.16 | 3 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| random_control | **$9177.6** | $-794.17 | $-28.23 | 189 | 56% | $-1408.46 | 25 |
| mm_slow | **$8985.65** | $-1097.91 | $83.56 | 115 | 50% | $-1297.59 | 25 |
| strong_dip | **$8803.75** | $-995.2 | $-201.05 | 159 | 58% | $-1088.83 | 21 |
| mm_sports_v2 | **$8357.64** | $-1600.88 | $-41.48 | 201 | 51% | $-1820.01 | 4 |
| momentum | **$7294.38** | $-2644.98 | $-60.64 | 303 | 65% | $-3133.22 | 25 |
| whale_fade | **$6532.37** | $-3078.72 | $-388.91 | 502 | 47% | $-3530.18 | 25 |
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
| maker_flat | 50 | 0 | 0 | 100% | 2.65¢ |
| maker_sports | 82 | 1 | 0 | 99% | 1.45¢ |

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

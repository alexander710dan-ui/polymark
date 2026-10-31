# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 79486 · Last run: 2026-10-31T02:27:52.995Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$11849.9** | $1743.07 | $106.83 | 67 | 66% | $1530.57 | 13 |
| mid_momentum | **$11410.5** | $728.34 | $682.16 | 279 | 56% | $514.86 | 25 |
| mm_tight | **$11252.81** | $1481.58 | $-228.77 | 525 | 54% | $1272.48 | 13 |
| copy_pro | **$11104.07** | $1142.45 | $-38.38 | 479 | 53% | $292.45 | 24 |
| mm_cheap | **$10937.44** | $449.19 | $488.25 | 104 | 57% | $266.73 | 25 |
| mm_max | **$10430.86** | $432.17 | $-1.31 | 226 | 54% | $223.07 | 1 |
| mm_sports | **$10361.26** | $358.05 | $3.21 | 620 | 55% | $138.92 | 14 |
| maker_flat | **$10272.58** | $-245.19 | $517.77 | 22 | 45% | $-436.74 | 24 |
| mid_momentum_v2 | **$10185.32** | $-496.84 | $682.16 | 114 | 51% | $-687.66 | 25 |
| mm_cheap_v2 | **$10087.8** | $-400.45 | $488.25 | 121 | 52% | $-591.27 | 25 |
| mm_strong | **$10046.79** | $-489.05 | $535.84 | 161 | 54% | $-693 | 24 |
| fade_longshot | **$9918.28** | $21.44 | $-103.16 | 158 | 95% | $10.7 | 25 |
| super | **$9709.81** | $-259.46 | $-30.73 | 106 | 52% | $-541.36 | 9 |
| conviction | **$9693.01** | $-306.99 | $0 | 3 | 0% | $-204.85 | 0 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| copy_top | **$9208.64** | $-747.19 | $-44.17 | 495 | 53% | $-2075.76 | 23 |
| random_control | **$9159.97** | $-794.17 | $-45.86 | 189 | 56% | $-1408.46 | 25 |
| mm_sports_v2 | **$9131.95** | $-871.26 | $3.21 | 189 | 52% | $-1090.39 | 14 |
| mm_slow | **$8976.59** | $-1297.59 | $274.18 | 114 | 50% | $-1483.3 | 25 |
| strong_dip | **$8576.41** | $-1116.99 | $-306.6 | 153 | 58% | $-1209.3 | 25 |
| momentum | **$7303.93** | $-2543.63 | $-152.44 | 302 | 65% | $-3031.87 | 25 |
| whale_fade | **$6906.86** | $-2797.24 | $-295.9 | 496 | 47% | $-3248.7 | 23 |
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

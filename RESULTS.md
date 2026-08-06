# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33011 · Last run: 2026-08-06T01:43:26.669Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10475.46** | $787.82 | $-312.36 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10441.53** | $561.03 | $-119.5 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10356.39** | $398.22 | $-41.83 | 416 | 53% | $189.12 | 16 |
| super | **$10150.88** | $-110 | $260.88 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10105.93** | $-82.99 | $188.92 | 420 | 52% | $-1411.56 | 23 |
| mid_momentum_v2 | **$9993.45** | $-164.29 | $157.74 | 30 | 50% | $-355.11 | 25 |
| mm_cheap_v2 | **$9972.17** | $86.01 | $-113.84 | 32 | 56% | $-104.81 | 25 |
| copy_pro | **$9864.18** | $-723.84 | $588.02 | 398 | 51% | $-1573.84 | 25 |
| fade_longshot | **$9863.55** | $25.97 | $-162.42 | 123 | 95% | $15.23 | 25 |
| mm_sports | **$9740.39** | $-632.44 | $372.83 | 487 | 54% | $-851.57 | 21 |
| strong_dip | **$9596.77** | $-394.63 | $-8.6 | 105 | 60% | $-486.94 | 25 |
| mm_max | **$9399.52** | $-581.01 | $-19.47 | 184 | 52% | $-790.11 | 7 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| random_control | **$9003.51** | $-981.12 | $-15.37 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8809.89** | $-750.77 | $-439.34 | 60 | 50% | $-936.48 | 25 |
| mm_sports_v2 | **$8469.66** | $-1851.91 | $321.57 | 56 | 39% | $-1977.93 | 20 |
| maker_flat | **$8443.04** | $-1452.92 | $-104.04 | 89 | 40% | $-1647.04 | 20 |
| mm_strong | **$8374.16** | $-1110.56 | $-515.28 | 86 | 47% | $-1314.51 | 25 |
| momentum | **$8079.03** | $-1345.47 | $-575.5 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7775.85** | $-2341.5 | $117.35 | 171 | 47% | $-2544.53 | 10 |
| whale_fade | **$6674.85** | $-2842.2 | $-482.95 | 421 | 47% | $-3196.75 | 23 |
| copy_month (retired) | **$9411.31** | $-730.36 | $141.67 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9000.14** | $-931.5 | $-68.36 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8519.58** | $-1937.09 | $456.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5113.49** | $-4791.55 | $-94.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 109 | 71 | 3 | 61% | 2.95¢ |
| maker_sports | 181 | 116 | 5 | 61% | 1.55¢ |

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

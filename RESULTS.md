# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 30407 · Last run: 2026-08-05T01:24:32.304Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10897.88** | $1100.36 | $-202.48 | 400 | 56% | $881.23 | 22 |
| mm_tight | **$10752.59** | $1152.38 | $-399.79 | 349 | 54% | $949.35 | 15 |
| mid_momentum | **$10576.22** | $757.35 | $-181.13 | 203 | 57% | $543.87 | 25 |
| mm_cheap | **$10273.15** | $849.22 | $-576.07 | 33 | 67% | $671.44 | 25 |
| copy_top | **$10041.68** | $-193.36 | $235.04 | 401 | 52% | $-1521.93 | 25 |
| fade_longshot | **$9929.82** | $82.61 | $-152.79 | 113 | 96% | $71.87 | 25 |
| strong_dip | **$9690.3** | $-426.02 | $116.32 | 101 | 59% | $-518.33 | 25 |
| super | **$9688.72** | $-592.35 | $281.07 | 69 | 46% | $-808.2 | 15 |
| copy_pro | **$9604.65** | $-438.03 | $42.68 | 382 | 52% | $-1288.03 | 25 |
| mm_max | **$9408.31** | $-371.25 | $-220.44 | 153 | 53% | $-538.37 | 6 |
| ai_judge | **$9402.62** | $-587.64 | $-9.74 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9210.72** | $-468.35 | $-320.93 | 53 | 53% | $-654.06 | 25 |
| maker_flat | **$9086.94** | $-816.54 | $-96.52 | 61 | 41% | $-1010.66 | 18 |
| maker_sports | **$9064.7** | $-637.69 | $-297.61 | 101 | 50% | $-840.72 | 16 |
| random_control | **$8890.76** | $-1025.29 | $-83.95 | 136 | 56% | $-1639.58 | 25 |
| mm_strong | **$8683.04** | $-927.32 | $-389.64 | 78 | 47% | $-1131.27 | 25 |
| momentum | **$8238.62** | $-1127.69 | $-633.69 | 255 | 67% | $-1615.93 | 25 |
| whale_fade | **$6989.01** | $-2370.75 | $-640.24 | 402 | 48% | $-2725.3 | 25 |
| copy_month (retired) | **$9415.48** | $-730.36 | $145.84 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9011.98** | $-931.5 | $-56.52 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8439.58** | $-1937.09 | $376.67 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5095.57** | $-4791.55 | $-112.88 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 79 | 45 | 0 | 64% | 2.95¢ |
| maker_sports | 117 | 71 | 1 | 62% | 1.58¢ |

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

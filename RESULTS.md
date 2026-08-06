# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33008 · Last run: 2026-08-06T01:41:42.396Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_cheap | **$10475.25** | $787.82 | $-312.57 | 36 | 64% | $610.04 | 25 |
| mid_momentum | **$10444.82** | $561.03 | $-116.21 | 211 | 56% | $347.55 | 25 |
| mm_tight | **$10246.29** | $398.22 | $-151.93 | 416 | 53% | $189.12 | 16 |
| super | **$10151.58** | $-110 | $261.58 | 76 | 50% | $-325.85 | 14 |
| copy_top | **$10102.47** | $-82.99 | $185.46 | 420 | 52% | $-1411.56 | 23 |
| mm_cheap_v2 | **$9971.99** | $86.01 | $-114.02 | 32 | 56% | $-104.81 | 25 |
| copy_pro | **$9881.42** | $-723.84 | $605.26 | 398 | 51% | $-1573.84 | 25 |
| mid_momentum_v2 | **$9881.38** | $-164.29 | $45.67 | 30 | 50% | $-355.11 | 25 |
| fade_longshot | **$9863.39** | $25.97 | $-162.58 | 123 | 95% | $15.23 | 25 |
| mm_sports | **$9629.05** | $-632.44 | $261.49 | 487 | 54% | $-851.57 | 21 |
| strong_dip | **$9596** | $-394.63 | $-9.37 | 105 | 60% | $-486.94 | 25 |
| ai_judge | **$9352.87** | $-587.64 | $-59.49 | 7 | 14% | $-600 | 2 |
| mm_max | **$9310.66** | $-581.01 | $-108.33 | 184 | 52% | $-790.11 | 7 |
| random_control | **$8993.88** | $-981.12 | $-25 | 145 | 57% | $-1595.41 | 25 |
| mm_slow | **$8813.02** | $-750.77 | $-436.21 | 60 | 50% | $-936.48 | 25 |
| maker_flat | **$8441.83** | $-1452.92 | $-105.25 | 89 | 40% | $-1647.04 | 20 |
| mm_strong | **$8377.79** | $-1110.56 | $-511.65 | 86 | 47% | $-1314.51 | 25 |
| mm_sports_v2 | **$8359.57** | $-1851.91 | $211.48 | 56 | 39% | $-1977.93 | 20 |
| momentum | **$8078.22** | $-1345.47 | $-576.31 | 265 | 67% | $-1833.71 | 25 |
| maker_sports | **$7767.69** | $-2341.5 | $109.19 | 171 | 47% | $-2544.53 | 10 |
| whale_fade | **$6685.38** | $-2842.2 | $-472.42 | 421 | 47% | $-3196.75 | 23 |
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

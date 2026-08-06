# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 33551 · Last run: 2026-08-06T06:44:13.510Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10411.96** | $431.69 | $-19.73 | 430 | 53% | $222.59 | 7 |
| mm_cheap | **$10347.29** | $685.62 | $-338.33 | 37 | 62% | $507.84 | 25 |
| mid_momentum | **$10339.71** | $559.07 | $-219.36 | 215 | 56% | $345.59 | 25 |
| super | **$10333.94** | $46.83 | $287.11 | 79 | 51% | $-217.5 | 11 |
| copy_top | **$10117.13** | $-117.05 | $234.18 | 424 | 52% | $-1445.62 | 20 |
| fade_longshot | **$9860.08** | $25.97 | $-165.89 | 123 | 95% | $15.23 | 25 |
| mid_momentum_v2 | **$9788.79** | $50.78 | $-261.99 | 42 | 52% | $-140.04 | 24 |
| mm_cheap_v2 | **$9740.06** | $26.36 | $-286.3 | 46 | 54% | $-164.46 | 20 |
| mm_sports | **$9729.46** | $-218.44 | $-52.1 | 506 | 55% | $-437.57 | 8 |
| copy_pro | **$9720.8** | $-816.24 | $537.04 | 403 | 51% | $-1666.24 | 24 |
| mm_max | **$9655.51** | $-344.49 | $0 | 193 | 53% | $-553.59 | 0 |
| strong_dip | **$9566.06** | $-596.83 | $162.89 | 107 | 59% | $-689.14 | 25 |
| ai_judge | **$9366.03** | $-587.64 | $-46.33 | 7 | 14% | $-600 | 2 |
| random_control | **$9029.76** | $-1085.22 | $114.98 | 146 | 56% | $-1699.51 | 25 |
| maker_flat | **$8666.48** | $-1090.97 | $-242.55 | 94 | 43% | $-1285.09 | 17 |
| mm_slow | **$8652.94** | $-809.59 | $-537.47 | 62 | 50% | $-995.3 | 25 |
| mm_sports_v2 | **$8463.26** | $-1523.94 | $-12.8 | 76 | 45% | $-1743.07 | 6 |
| mm_strong | **$8297.37** | $-1125.11 | $-577.52 | 92 | 47% | $-1329.06 | 25 |
| momentum | **$7986.72** | $-1376.42 | $-636.86 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$7736.16** | $-2266.68 | $2.84 | 185 | 48% | $-2469.71 | 5 |
| whale_fade | **$6615.5** | $-2848.81 | $-535.69 | 425 | 47% | $-3203.36 | 20 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.75** | $-931.5 | $-71.75 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.32** | $-4791.55 | $-107.13 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 111 | 76 | 0 | 59% | 2.95¢ |
| maker_sports | 190 | 121 | 0 | 61% | 1.55¢ |

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

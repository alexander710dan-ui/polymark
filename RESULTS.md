# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34380 · Last run: 2026-08-06T14:25:30.512Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10337.29** | $46.83 | $290.46 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10303.85** | $456.72 | $-152.87 | 216 | 56% | $243.24 | 25 |
| mm_cheap | **$10277.65** | $583.27 | $-305.62 | 38 | 61% | $405.49 | 25 |
| copy_top | **$10008.6** | $-117.05 | $125.65 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9987.54** | $101.51 | $-113.97 | 446 | 53% | $-107.59 | 21 |
| mm_max | **$9857.68** | $-242.96 | $100.64 | 194 | 53% | $-452.06 | 5 |
| fade_longshot | **$9857.18** | $25.97 | $-168.79 | 123 | 95% | $15.23 | 25 |
| copy_pro | **$9833.08** | $-919.79 | $752.87 | 404 | 51% | $-1769.79 | 25 |
| mid_momentum_v2 | **$9639.13** | $-217.42 | $-143.45 | 50 | 50% | $-408.24 | 25 |
| strong_dip | **$9627.09** | $-517.26 | $144.35 | 108 | 59% | $-609.57 | 25 |
| mm_cheap_v2 | **$9466.09** | $-424.59 | $-109.32 | 54 | 50% | $-615.41 | 25 |
| ai_judge | **$9379.2** | $-587.64 | $-33.16 | 7 | 14% | $-600 | 2 |
| random_control | **$9144.99** | $-979.49 | $124.48 | 147 | 56% | $-1593.78 | 25 |
| mm_sports | **$8862.63** | $-709.01 | $-428.36 | 525 | 54% | $-928.14 | 25 |
| mm_slow | **$8651.14** | $-809.59 | $-539.27 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8372.02** | $-1290.97 | $-337.01 | 96 | 42% | $-1485.09 | 22 |
| mm_strong | **$8236.28** | $-1227.41 | $-536.31 | 93 | 46% | $-1431.36 | 25 |
| momentum | **$7928.65** | $-1478.77 | $-592.58 | 270 | 67% | $-1967.01 | 25 |
| mm_sports_v2 | **$7694.2** | $-2014.41 | $-291.39 | 95 | 45% | $-2233.54 | 25 |
| maker_sports | **$6819.55** | $-2916.79 | $-263.66 | 197 | 46% | $-3119.82 | 18 |
| whale_fade | **$6724.46** | $-2848.81 | $-426.73 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8994.73** | $-931.5 | $-73.77 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8532.91** | $-1937.09 | $470 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5082.74** | $-4791.55 | $-125.71 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 118 | 83 | 2 | 59% | 2.9¢ |
| maker_sports | 215 | 135 | 4 | 61% | 1.59¢ |

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

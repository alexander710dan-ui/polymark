# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 34155 · Last run: 2026-08-06T12:20:19.314Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| super | **$10377.25** | $46.83 | $330.42 | 79 | 51% | $-217.5 | 13 |
| mid_momentum | **$10280.99** | $559.07 | $-278.08 | 215 | 56% | $345.59 | 25 |
| mm_cheap | **$10253.88** | $685.62 | $-431.74 | 37 | 62% | $507.84 | 25 |
| copy_top | **$10060.93** | $-117.05 | $177.98 | 424 | 52% | $-1445.62 | 25 |
| mm_tight | **$9933.8** | $506.12 | $-572.32 | 439 | 54% | $297.02 | 19 |
| fade_longshot | **$9849.97** | $25.97 | $-176 | 123 | 95% | $15.23 | 25 |
| mm_max | **$9757.02** | $-242.96 | $-0.02 | 194 | 53% | $-452.06 | 2 |
| strong_dip | **$9602.73** | $-517.26 | $119.99 | 108 | 59% | $-609.57 | 25 |
| mid_momentum_v2 | **$9580.11** | $-52.91 | $-366.98 | 47 | 51% | $-243.73 | 25 |
| copy_pro | **$9520.97** | $-919.79 | $440.76 | 404 | 51% | $-1769.79 | 25 |
| mm_cheap_v2 | **$9402.84** | $-220.68 | $-376.48 | 52 | 52% | $-411.5 | 25 |
| ai_judge | **$9381.42** | $-587.64 | $-30.94 | 7 | 14% | $-600 | 2 |
| mm_sports | **$9133.59** | $-202.25 | $-664.16 | 517 | 55% | $-421.38 | 24 |
| random_control | **$9129.32** | $-1085.22 | $214.54 | 146 | 56% | $-1699.51 | 25 |
| mm_slow | **$8677.74** | $-809.59 | $-512.67 | 62 | 50% | $-995.3 | 25 |
| maker_flat | **$8582.61** | $-1190.97 | $-226.42 | 95 | 42% | $-1385.09 | 18 |
| mm_strong | **$8263.88** | $-1227.41 | $-508.71 | 93 | 46% | $-1431.36 | 25 |
| mm_sports_v2 | **$7872.03** | $-1507.75 | $-620.22 | 87 | 47% | $-1726.88 | 22 |
| momentum | **$7859.67** | $-1376.42 | $-763.91 | 269 | 67% | $-1864.66 | 25 |
| maker_sports | **$6924.76** | $-2466.04 | $-609.2 | 191 | 47% | $-2669.07 | 16 |
| whale_fade | **$6706.17** | $-2848.81 | $-445.02 | 425 | 47% | $-3203.36 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$8996.44** | $-931.5 | $-72.06 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8526.25** | $-1937.09 | $463.34 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5083.78** | $-4791.55 | $-124.67 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 113 | 81 | 3 | 58% | 2.93¢ |
| maker_sports | 207 | 128 | 5 | 62% | 1.57¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 31742 · Last run: 2026-08-05T13:47:26.125Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_tight | **$10895.53** | $1083.13 | $-187.6 | 366 | 54% | $880.1 | 18 |
| mm_sports | **$10738.41** | $1040.22 | $-301.81 | 427 | 56% | $821.09 | 25 |
| mid_momentum | **$10713.99** | $967.28 | $-253.29 | 206 | 58% | $753.8 | 25 |
| mm_cheap | **$10472.93** | $887.82 | $-414.89 | 35 | 66% | $710.04 | 25 |
| fade_longshot | **$9943.72** | $109.23 | $-165.51 | 117 | 96% | $98.49 | 25 |
| super | **$9864.4** | $-425.73 | $290.13 | 73 | 48% | $-641.58 | 11 |
| copy_top | **$9783.72** | $-374.75 | $158.47 | 409 | 52% | $-1703.32 | 25 |
| mm_cheap_v2 | **$9737.82** | $47.6 | $-309.78 | 1 | 100% | $0 | 23 |
| mm_sports_v2 | **$9594.33** | $-54.5 | $-351.17 | 2 | 50% | $-102.1 | 14 |
| mid_momentum_v2 | **$9566.16** | $-54.5 | $-379.34 | 2 | 50% | $-102.1 | 25 |
| copy_pro | **$9556.61** | $-732.88 | $289.49 | 389 | 51% | $-1582.88 | 25 |
| mm_max | **$9483.36** | $-469.42 | $-47.22 | 161 | 53% | $-636.54 | 4 |
| strong_dip | **$9458.05** | $-528.32 | $-13.63 | 102 | 59% | $-620.63 | 25 |
| ai_judge | **$9384.84** | $-587.64 | $-27.52 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9104.68** | $-516.83 | $-378.49 | 55 | 53% | $-702.54 | 25 |
| random_control | **$8834.95** | $-1058.61 | $-106.44 | 139 | 56% | $-1672.9 | 25 |
| maker_sports | **$8753.18** | $-682.5 | $-564.32 | 121 | 51% | $-885.53 | 14 |
| mm_strong | **$8731.35** | $-876.62 | $-392.03 | 81 | 48% | $-1080.57 | 25 |
| maker_flat | **$8492.48** | $-1458.9 | $-48.62 | 75 | 39% | $-1653.02 | 16 |
| momentum | **$8235.88** | $-1076.77 | $-687.35 | 260 | 68% | $-1565.01 | 25 |
| whale_fade | **$7278.33** | $-2148.86 | $-572.81 | 410 | 48% | $-2503.41 | 25 |
| copy_month (retired) | **$9418.25** | $-730.36 | $148.61 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9002.27** | $-931.5 | $-66.23 | 133 | 69% | $-995.43 | 3 |
| mean_revert (retired) | **$8492.91** | $-1937.09 | $430 | 146 | 25% | $-3964.75 | 1 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| longshot (retired) | **$5101.49** | $-4791.55 | $-106.96 | 82 | 2% | $-6691.55 | 2 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 91 | 61 | 1 | 60% | 3.02¢ |
| maker_sports | 135 | 87 | 5 | 61% | 1.6¢ |

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

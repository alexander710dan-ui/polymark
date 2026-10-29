# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72261 · Last run: 2026-10-29T21:51:01.156Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$10943.71** | $934.41 | $9.3 | 22 | 77% | $742.86 | 9 |
| mid_momentum | **$10826.34** | $720.43 | $105.91 | 264 | 56% | $506.95 | 25 |
| copy_pro | **$10746.87** | $874.81 | $-127.94 | 444 | 53% | $24.81 | 25 |
| mm_tight | **$10678.8** | $775.06 | $-96.26 | 485 | 54% | $565.96 | 6 |
| mm_cheap | **$10104.28** | $68.32 | $35.96 | 83 | 55% | $-114.14 | 24 |
| fade_longshot | **$10067.41** | $89.44 | $-22.03 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10055.1** | $153.3 | $-98.2 | 210 | 54% | $-55.8 | 2 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9788.03** | $-107 | $-104.97 | 13 | 46% | $-298.55 | 20 |
| mm_sports | **$9786.26** | $-205.7 | $-8.04 | 575 | 55% | $-424.83 | 9 |
| mid_momentum_v2 | **$9601.16** | $-504.75 | $105.91 | 99 | 51% | $-695.57 | 25 |
| super | **$9573.4** | $-424.16 | $-2.44 | 92 | 51% | $-688.49 | 1 |
| copy_top | **$9531.26** | $-438.59 | $-30.15 | 460 | 53% | $-1767.16 | 15 |
| strong_dip | **$9433.92** | $-437.85 | $-128.23 | 141 | 61% | $-530.16 | 15 |
| mm_cheap_v2 | **$9254.64** | $-781.32 | $35.96 | 100 | 50% | $-972.14 | 24 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$8902.86** | $-993.88 | $-103.26 | 141 | 52% | $-1197.83 | 22 |
| random_control | **$8742.79** | $-1190.91 | $-66.3 | 182 | 56% | $-1805.2 | 25 |
| mm_sports_v2 | **$8556.95** | $-1435.01 | $-8.04 | 144 | 51% | $-1654.14 | 9 |
| mm_slow | **$8547.35** | $-1486.92 | $34.27 | 104 | 49% | $-1672.63 | 20 |
| momentum | **$7450.52** | $-2533.86 | $-15.62 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6312.35** | $-3676.22 | $-11.43 | 461 | 46% | $-4030.77 | 15 |
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
| maker_flat | 33 | 0 | 0 | 100% | 2.62¢ |
| maker_sports | 31 | 1 | 0 | 97% | 1.64¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 72157 · Last run: 2026-10-29T21:26:12.484Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| maker_sports | **$10861.37** | $934.41 | $-73.04 | 22 | 77% | $742.86 | 7 |
| mid_momentum | **$10735.23** | $720.43 | $14.8 | 264 | 56% | $506.95 | 24 |
| copy_pro | **$10702.87** | $874.81 | $-171.94 | 444 | 53% | $24.81 | 25 |
| mm_tight | **$10677** | $775.06 | $-98.06 | 485 | 54% | $565.96 | 4 |
| fade_longshot | **$10072.84** | $89.44 | $-16.6 | 152 | 95% | $78.7 | 25 |
| mm_max | **$10054.06** | $153.3 | $-99.24 | 210 | 54% | $-55.8 | 1 |
| mm_cheap | **$10017.04** | $68.32 | $-51.28 | 83 | 55% | $-114.14 | 21 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$9753.03** | $-7 | $-239.97 | 12 | 50% | $-198.55 | 20 |
| mm_sports | **$9709.55** | $-205.7 | $-84.75 | 575 | 55% | $-424.83 | 7 |
| super | **$9575.84** | $-424.16 | $0 | 92 | 51% | $-688.49 | 0 |
| mid_momentum_v2 | **$9510.05** | $-504.75 | $14.8 | 99 | 51% | $-695.57 | 24 |
| copy_top | **$9490.07** | $-336.59 | $-173.34 | 459 | 53% | $-1665.16 | 15 |
| strong_dip | **$9440.26** | $-437.85 | $-121.89 | 141 | 61% | $-530.16 | 12 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_cheap_v2 | **$9167.4** | $-781.32 | $-51.28 | 100 | 50% | $-972.14 | 21 |
| mm_strong | **$8893.45** | $-993.88 | $-112.67 | 141 | 52% | $-1197.83 | 20 |
| random_control | **$8786.18** | $-1190.91 | $-22.91 | 182 | 56% | $-1805.2 | 25 |
| mm_slow | **$8505.31** | $-1486.92 | $-7.77 | 104 | 49% | $-1672.63 | 17 |
| mm_sports_v2 | **$8480.24** | $-1435.01 | $-84.75 | 144 | 51% | $-1654.14 | 7 |
| momentum | **$7427.74** | $-2533.86 | $-38.4 | 297 | 65% | $-3022.1 | 25 |
| whale_fade | **$6393.43** | $-3817.17 | $210.6 | 460 | 46% | $-4171.72 | 15 |
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
| maker_flat | 32 | 0 | 1 | 100% | 2.64¢ |
| maker_sports | 29 | 1 | 0 | 97% | 1.69¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 87272 · Last run: 2026-11-02T05:03:37.288Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| copy_pro | **$11437.36** | $1271.67 | $165.69 | 502 | 54% | $421.67 | 25 |
| maker_sports | **$11144.28** | $1152.72 | $-8.44 | 121 | 58% | $940.22 | 3 |
| mid_momentum | **$10700.94** | $652.37 | $48.57 | 300 | 56% | $438.89 | 25 |
| maker_flat | **$10543** | $426.17 | $116.83 | 30 | 53% | $234.62 | 25 |
| mm_tight | **$10512.01** | $547.73 | $-35.72 | 568 | 54% | $338.63 | 4 |
| mm_max | **$10294.2** | $289.41 | $4.79 | 232 | 54% | $80.31 | 2 |
| mm_cheap | **$10069.35** | $170.12 | $-100.77 | 130 | 55% | $-21.57 | 25 |
| fade_longshot | **$10008.1** | $-39.09 | $47.19 | 170 | 95% | $-49.83 | 25 |
| conviction | **$9677.51** | $-306.99 | $-15.5 | 3 | 0% | $-204.85 | 1 |
| mid_momentum_v2 | **$9475.76** | $-572.81 | $48.57 | 135 | 50% | $-765.36 | 25 |
| mm_cheap_v2 | **$9219.71** | $-679.52 | $-100.77 | 147 | 51% | $-871.21 | 25 |
| ai_judge | **$9212.36** | $-787.64 | $0 | 9 | 11% | $-800 | 0 |
| mm_strong | **$9202.16** | $-553.3 | $-244.54 | 176 | 53% | $-757.25 | 25 |
| mm_sports | **$9180.34** | $-795.33 | $-24.33 | 675 | 54% | $-1014.46 | 4 |
| strong_dip | **$9112.75** | $-880.35 | $-6.9 | 163 | 59% | $-973.98 | 25 |
| random_control | **$8956.17** | $-899.06 | $-144.77 | 190 | 55% | $-1513.35 | 25 |
| mm_slow | **$8698.63** | $-1007.21 | $-294.16 | 117 | 50% | $-1206.89 | 25 |
| copy_top | **$8548.33** | $-1422.56 | $-29.11 | 533 | 52% | $-2751.13 | 25 |
| super | **$8416.12** | $-1714.78 | $130.9 | 126 | 49% | $-1996.68 | 3 |
| mm_sports_v2 | **$7951.03** | $-2024.64 | $-24.33 | 244 | 51% | $-2243.77 | 4 |
| momentum | **$7168.98** | $-2734.26 | $-96.76 | 307 | 65% | $-3222.5 | 25 |
| whale_fade | **$6876.99** | $-2752.11 | $-370.9 | 534 | 47% | $-3203.57 | 25 |
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
| maker_flat | 55 | 0 | 0 | 100% | 2.61¢ |
| maker_sports | 124 | 1 | 1 | 99% | 1.4¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 27991 · Last run: 2026-08-04T03:00:26.001Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| mm_sports | **$10967.48** | $1460.81 | $-493.33 | 332 | 57% | $1257.78 | 18 |
| mm_tight | **$10880.37** | $837.11 | $43.26 | 288 | 54% | $634.08 | 14 |
| mm_cheap | **$10478.93** | $846.08 | $-367.15 | 27 | 70% | $668.3 | 25 |
| mid_momentum | **$10342.14** | $529.34 | $-187.2 | 197 | 57% | $315.86 | 25 |
| fade_longshot | **$9971.65** | $39.78 | $-68.13 | 106 | 95% | $29.04 | 25 |
| copy_top | **$9917.85** | $-260.17 | $178.02 | 394 | 52% | $-1588.74 | 21 |
| maker_flat | **$9842.12** | $-83.72 | $-74.16 | 23 | 48% | $-261.5 | 15 |
| strong_dip | **$9761.41** | $-463.45 | $224.86 | 99 | 60% | $-555.76 | 25 |
| mm_max | **$9692.96** | $-140.34 | $-166.7 | 117 | 53% | $-259.81 | 7 |
| copy_pro | **$9591.57** | $-859.73 | $451.3 | 372 | 51% | $-1709.73 | 23 |
| super | **$9587.26** | $-353.9 | $-58.84 | 64 | 47% | $-569.75 | 11 |
| ai_judge | **$9428.43** | $-587.64 | $16.07 | 7 | 14% | $-600 | 2 |
| mm_slow | **$9096.55** | $-810 | $-93.45 | 50 | 50% | $-932.22 | 25 |
| maker_sports | **$9084.19** | $-453.27 | $-462.54 | 45 | 49% | $-638.98 | 11 |
| random_control | **$9016.35** | $-354.2 | $-629.45 | 126 | 58% | $-968.49 | 25 |
| mm_strong | **$8728.16** | $-1069.08 | $-202.76 | 70 | 47% | $-1273.03 | 25 |
| momentum | **$8207.78** | $-1211.73 | $-580.49 | 245 | 67% | $-1699.97 | 25 |
| whale_fade | **$7306.61** | $-2172.45 | $-520.94 | 395 | 48% | $-2527 | 21 |
| copy_month (retired) | **$9379.36** | $-730.36 | $109.72 | 164 | 48% | $-1539.45 | 1 |
| favorite (retired) | **$9040.8** | $-942.24 | $-16.96 | 132 | 69% | $-1006.17 | 4 |
| late_favorite (retired) | **$8338.09** | $-1661.91 | $0 | 409 | 78% | $-1703.96 | 0 |
| mean_revert (retired) | **$8292.91** | $-1937.09 | $230 | 146 | 25% | $-3964.75 | 1 |
| longshot (retired) | **$5099.03** | $-4691.55 | $-209.42 | 81 | 2% | $-6591.55 | 3 |


### Patient (maker) execution

| Strategy | Filled | Expired | Pending | Fill rate | Spread saved per fill |
|---|---|---|---|---|---|
| maker_flat | 38 | 25 | 0 | 60% | 2.96¢ |
| maker_sports | 56 | 27 | 2 | 67% | 1.61¢ |

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

# Polymark paper-trading results

**Fake money.** Read-only Polymarket public data; no wallet, no real orders. Each strategy starts with a simulated $10,000 and bets $100 per position on markets resolving within 45 days.

Ticks: 316 · Last run: 2026-08-08T08:31:22.801Z · Database: `tester/data/polymark.db`

| Strategy | **Equity** | Realized | Unrealized | Closed | Win rate | Minus best win | Open |
|---|---|---|---|---|---|---|---|
| fade_longshot | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| momentum | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| super | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| copy_top | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| whale_fade | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| copy_pro | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_tight | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_sports | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_slow | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_strong | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_max | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_cheap | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| strong_dip | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| ai_judge | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| random_control | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| conviction | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_sports_v2 | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mid_momentum_v2 | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| mm_cheap_v2 | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_sports | **$10000** | $0 | $0 | 0 | — | $0 | 0 |
| maker_flat | **$10000** | $0 | $0 | 0 | — | $0 | 0 |


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

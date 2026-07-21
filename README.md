# Polymark — prediction-market strategy lab

Two parts, both **fake money only** — no wallet, no keys, no real orders, ever.

## 1. Web prototype (`index.html`)

A prediction-market analysis desk: scores markets 0–100 on six transparent signal
categories (probability gap, smart-trader flow, evidence, market quality, sentiment
divergence, timing), suggests YES / NO / no-trade, and paper-trades against
hand-authored demo data with enforced risk controls.

**Run it:** open `index.html` in a browser. No build, no server, no dependencies.

All market and trader data in the web prototype is fictional. The scoring engine
(`js/strategy.js`) is the real deliverable — pure functions, testable in Node.

## 2. Live paper-trading tester (`tester/`)

A zero-dependency Node script that bets fake money on **real, live Polymarket
markets** (read-only public API) with six competing strategies, and books every
position and outcome into SQLite:

| Strategy | Rule |
|---|---|
| favorite | buy the likely side (60–90¢) |
| longshot | buy cheap lottery tickets (2–10¢) |
| fade_longshot | sell the lottery tickets (buy 90–98¢ side) |
| momentum | buy the side that moved ≥5¢ in 24h |
| mean_revert | fade ≥8¢ 24h moves |
| late_favorite | buy 70–93¢ favourites within 2 days of resolution |
| copy_top | mirror the top-10 leaderboard wallets' buys from the last 24h |
| copy_pro | copy trading, max features: filtered wallets, 6h freshness, no chasing, conviction-sized stakes |
| copy_month | copy_top's rules on the monthly leaderboard's top-10 |
| whale_fade | bet against copy_top's picks (control) |
| mid_momentum | momentum, but only at 30–70¢ where payoffs are symmetric |
| strong_dip | buy sides knocked down ≥10¢ that are still favourites |
| random_control | coin flips — the baseline |

**Run it:** requires Node ≥ 23.4 (built-in `node:sqlite`).

```
node tester/index.js tick     # settle resolved bets, open new ones
node tester/index.js report   # print stats, write RESULTS.md
node tester/index.js reset    # wipe the database
```

A GitHub Actions cron runs a tick every ~15 minutes and commits the updated
database, [RESULTS.md](RESULTS.md) and a JSON feed back to the repo, so the
experiment accumulates outcome data on its own.

**Live scoreboard:** [alexander710dan-ui.github.io/polymark/live.html](https://alexander710dan-ui.github.io/polymark/live.html)

## Honest limits

- Entries are simulated at the quoted ask; real fills would have slippage.
- Paper results, even on live prices, prove strategy *shape*, not deployable edge.
- The tester bets mechanically — it does not use the web prototype's full scoring
  engine yet. Comparing the six baselines is step one; wiring the engine to live
  data is the step after.

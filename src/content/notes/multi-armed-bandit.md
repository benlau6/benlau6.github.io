---
title: Multi-armed Bandit
publishDate: 2024-11-15
---

# Multi-armed Bandit

The problem is to choose k out of n items in each time step t so that the reward is maximized, with the ability to explore potential high-reward items and exploit the known high-reward items.

Must read [A Multi-Armed Bandit Framework for Recommendations at Netflix | Netflix](https://www.youtube.com/watch?v=kY-BCNHd_dM) - The task is to provide personalized homepage for each member. The goal is to quickly help members find content they'd like to watch. The risk is that members may lose interest and abandon the service. The challenge is the need to serve enormous 117M+ members. Another task is the billboard recommendation for each movie. The goal is to recommend a single relevant title to each member at the right time and respond quickly to member feedback.

## Components

- Arms: The items/actions to choose from
- Reward: The feedback from the user
- Policy: The strategy to choose the arms
- Regret: The difference between the reward of the best arm and the reward of the chosen arm

## Exploration vs Exploitation

The best long-term strategy may involve short-term sacrifices.

- Exploration: Explore different options to learn more about them
- Exploitation: Exploit the best known options to maximize the reward

## Principles of exploration

- Naive exploration: Add a noise to the greedy policy, i.e. epsilon-greedy
- Optimism in the face of uncertainty: Prefer actions with uncertain values, i.e. upper confidence bound (UCB)
- Probability matching: Select the actions according to the drawn probabilities, i.e. Thompson sampling

## Contextual Bandit

There are two bandit types: context-free bandit or contextual bandit. The context-free bandit is based entirely on historical data, which is usually for general recommendation without considering individuals or any other context. On the other hand, the contextual bandit is based on the current context, i.e. the current state of the environment, e.g. user, product, or some other features, which is usually for personalized recommendation.

### Contextual Bandit vs Recommendation System

- Contextual bandits are well poised to handle 10-100 arms - when you have thousands, use a recommendation system [ref](https://www.geteppo.com/blog/contextual-bandit-algorithms-vs-recommendation-systems)
- If you’re facing a cold start problem, you’ll be better served by a contextual bandit
- If we need to make many decisions for each user, maybe a recommendation system is best. If only a few times, contextual bandits will work great.
- For the biggest problems (and biggest opportunities), a recommendation system may be warranted. For everything else, there’s contextual bandits.

## Thompson Sampling

It is a Bayesan learning method. In the case of website article recommendation, there are n articles we want to show on the front page, and we want to estimate the conversion rate of them, such that we could prioritize the articles. With Thompson sampling, we assume the conversion rates of n articles follow beta distribution independently. We then sample n random number from the beta distributions, and pick top-k articles with the highest sampled values to show. With users interactions and assuming conjugate priors, we could update the posterior distribution real quick using the result of listing, i.e. the clicks.

The beta distribution represents our current certainty about the conversion probabilities, and as we collect more data the variance of these decreases. If we are not certain that how an article performs, i.e. low mean with high variance, it would be chosen if the sampled data points are high due to high variance, and the corresponding result from users will give more evidences, which lower the variance. Eventually, an article that we know it is certainly bad, i.e. narrow distribution with low mean and variance, will almost never be chosen over better one. At the end, it picks the best same options almost every time.

Note that instead of streaming and updating the bandit in real-time, we could aggregate data daily and update in a batch.

### Resources

- [A tutorial of Thompson sampling](https://web.stanford.edu/~bvr/pubs/TS_Tutorial.pdf): Must read
- [An interactive look at Thompson sampling](https://everyday-data-science.tigyog.app/a-b-testing)
- [Bayesian Statistics : A/B Testing, Thompson sampling of multi-armed bandits, Recommendation Engines and more from Big Consulting](https://franciscormendes.github.io/2024/07/19/bayesian-statistics/)
- [Thompson Sampling for Contextual bandits](https://gdmarmerola.github.io/ts-for-contextual-bandits/)
- [A penguin fish-recommender systems using multi-armed bandits pt. 1](https://sebastiancallh.github.io/post/multi-armed-bandits-and-penguins/)
- [Recommendation Systems • Multi-Armed Bandits](https://vinija.ai/recsys/multi-armed-bandit/)

## Case Studies

- [Bujak & Rusiecki: How we personalized onet.pl with multi-armed bandits | PyData Warsaw 2019](https://www.youtube.com/watch?v=Loe3D37UHlI)
- [Multi-Armed Bandits and the Stitch Fix Experimentation Platform](https://multithreaded.stitchfix.com/blog/2020/08/05/bandits/)
- [Bandito, a Multi-Armed Bandit Tool for Content Testing](https://web.archive.org/web/20161013134841/https://developer.washingtonpost.com/pb/blog/post/2016/02/08/bandito-a-multi-armed-bandit-tool-for-content-testing/)
- [Google@Multi-armed bandit experiments](https://web.archive.org/web/20160629020545/https://support.google.com/analytics/answer/2844870?hl=en)
- [Uber, airbnb, Spotify, ebay@ Personalizing Explainable Recommendations with Multi-objective Contextual Bandits](https://www.youtube.com/watch?v=KoMKgNeUX4k)
- [Trends in Recommendation & Personalization at Netflix](https://www.youtube.com/watch?v=IByC2keY3vo)

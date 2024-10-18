---
title: MCMC
publishDate: 2024-10-03
---

# MCMC

It is a method to sample from a probability distribution, which is often intractable to compute. The idea is to construct a Markov chain that has the desired distribution as its equilibrium distribution. The chain is then run for a long time, and samples are collected from the chain.

## Visualizations

- [MCMC demo](https://chi-feng.github.io/mcmc-demo/)
- [HMC demo](https://chi-feng.github.io/mcmc-demo/app.html)
- [No-U-Turn demo](https://chi-feng.github.io/mcmc-demo/app.html?algorithm=NaiveNUTS&target=banana)

## Hamiltonian Monte Carlo (HMC)

## Why don't use GPU for MCMC?

Whenever we think GPU acceleration we think matrix multiplication. Bayesian inference can be done by either variational inference or MCMC. Variational inference is easily parallelizable, but it is sometimes problematic on the result, while MCMC is fundamentally sequential, apart from running multiple sequences at once, it is not possible to be parallelized for now, but it is asymptotic exact solution to any posterior distribution, so still being the golden standard for doing Bayesian. [discussion](https://www.reddit.com/r/MachineLearning/comments/csu5c9/comment/exha8vz/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) There are some studies about parallelization, but no breakthrough yet. [embarrassingly parallelization](https://arxiv.org/abs/1311.4780) However, theoretically, a critical part of Bayesian inference, i.e. Gaussian processes, can be parallelized and be benefited from GPU acceleration a lot because the time complexity is $O(n^3)$, which come from matrix inversion. [discusison](https://www.reddit.com/r/MachineLearning/comments/csu5c9/comment/exhx15s/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

### Readings

- [忘記物理也要搞懂的 Hamiltonian Monte Carlo (HMC) 筆記](https://bobondemon.github.io/2022/05/07/Hamiltonian-Monte-Carlo/)
- [Hamiltonian Monte Carlo Explained](https://arogozhnikov.github.io/2016/12/19/markov_chain_monte_carlo.html)
- [Hamiltonian Monte Carlo](https://bjlkeng.io/posts/hamiltonian-monte-carlo/)
- [A Conceptual Introduction to Hamiltonian Monte Carlo](https://arxiv.org/pdf/1701.02434)
- [HMC Visualizations](https://chi-feng.github.io/mcmc-demo/app.html)

## Readings

- [How to sample using MCMC from a posterior distribution in general?](https://stats.stackexchange.com/questions/73629/how-to-sample-using-mcmc-from-a-posterior-distribution-in-general)
- [MCMC sampling for dummies](https://twiecki.io/blog/2015/11/10/mcmc-sampling/)
- [Chapter 17 Introduction to MCMC Simulation](https://bookdown.org/kevin_davisross/bayesian-reasoning-and-methods/mcmc.html)

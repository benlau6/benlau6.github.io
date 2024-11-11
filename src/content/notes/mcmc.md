---
title: MCMC
publishDate: 2024-10-03
---

# MCMC

It is a sampling algorithm. It samples from probability distributions based on constructing a Markov chain that has the desired distribution as its equilibrium distribution. And it is asymptotically exact. Different MCMC algorithms, such as Metropolis-Hastings, Gibbs sampling, Hamiltonian Monte Carlo, etc., are using different strategies to construct a nice Markov chain.

MCMC can be used to sample from any probability distribution. Mostly we use it to sample from the intractable posterior distribution for the purpose of Inference.

The General Idea for the algorithm is to start with some random probability distribution and gradually move towards desired probability distribution.

We could do it by initiate a Markov chain with a random probability distribution over states, gradually move in the chain converging towards stationary distribution, apply some condition (Detailed Balance Sheet) that ensures this stationary distribution resembles desired probability distribution.

## Readings

- [A Gentle Introduction to Markov Chain Monte Carlo for Probability](https://machinelearningmastery.com/markov-chain-monte-carlo-for-probability/)
- [MCMC: A (very) Beginnner’s Guide](https://prappleizer.github.io/Tutorials/MCMC/MCMC_Tutorial.html)
- [MCMC Algorithms in one page](https://m-clark.github.io/docs/ld_mcmc/index_onepage.html)

## Monte Carlo Sampling

Example: If we are asked to calculate the area under the curve for the given curve in the below image, it might require integrating over complex analytical formula. However using the Monte Carlo method, we will randomly generate red dots (more dots for more accuracy) in the rectangle and calculate the ratio of dots falling under the curve w.r.t dots falling in the entire rectangle — the ratio will provide us with the area, given the area of the rectangle. [ref](https://towardsdatascience.com/monte-carlo-markov-chain-mcmc-explained-94e3a6c8de11)

Say we have Expectation (s) to estimate, this could be a highly complex integral or even intractable to estimate— using the Monte Carlo method we resort to approximate such quantities by averaging over samples.

Monte Carlo methods typically assume that we can efficiently draw samples from the target distribution, however doing so is not always possible. It may be intractable for high-dimensional probabilistic models. That we can't even sample from the distribution. In such cases, we make use of Markov chains to efficiently sample from an intractable probability distribution.

## Markov Chain

Applying the Markov chain update repeatedly corresponds to multiplying by the matrix A repeatedly. In other words, we can think of the process as exponentiating the matrix A. (Goodfellow et. al., 2016)

The matrix A has special structure because each of its columns represents a probability distribution. Such matrices are called stochastic matrices. If there is a non-zero probability of transitioning from any state x to any other state x' for some power t, then the Perron-Frobenius theorem guarantees that the largest eigenvalue is real and equal to 1. Over time, we can see that all of the eigenvalues are exponentiated.

This process causes all of the eigenvalues that are not equal to 1 to decay to zero. Under some additional mild condition, A is guaranteed to have only one eigenvector with eigenvalue 1. The process thus converges to a stationary distribution, sometimes also called the equilibrium distribution.

This condition guarantees that once we have reached the stationary distribution, repeated applications of the transition sampling procedure do not change the distribution over the states of all the various Markov chains.

## MCMC revisited

Combining these two methods, Markov Chain and Monte Carlo, allows random sampling of high-dimensional probability distributions that honors the probabilistic dependence between samples by constructing a Markov Chain that comprise the Monte Carlo sample. [ref](https://machinelearningmastery.com/markov-chain-monte-carlo-for-probability/)

MCMC algorithms are sensitive to their starting point, and often require a warm-up phase or burn-in phase to move in towards a fruitful part of the search space, after which prior samples can be discarded and useful samples can be collected.

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

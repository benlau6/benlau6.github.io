---
title: Bayesian Inference
publishDate: 2024-11-16
---

# Bayesian Inference

- Maximum a posteriori estimation (MAP): It is like MLE, but with a prior.
- Laplace approximation: This involves constructing a Taylor series of the target posterior, but retaining only the terms of quadratic order and using those to construct a multivariate normal approximation.
- [MCMC](mcmc.md): It is a sampling algorithm. It samples from probability distributions based on constructing a Markov chain that has the desired distribution as its equilibrium distribution.
- [Variational inference](https://www.pymc.io/projects/examples/en/latest/variational_inference/variational_api_quickstart.html): It is a method from machine learning that approximates probability densities through optimization. It first posit a family of densities and then to find the member of that family which is close to the target. Closeness is measured by Kullback-Leibler divergence. It is done by minimizing the KL divergence. However, log likelihood of true distribution is fixed, so minimizing KL divergence is equivalent to maximizing the evidence lower bound (ELBO) of the posterior distribution.

## What is the loss function in Bayesian Inference?

It depends on the inference methods. It does not necessary need a loss function.

In Maximum a posteriori estimation (MAP), it is the likelihood. It is achieved by maximizing a likelihood function so that, under the assumed statistical model and priors, the observed data is most probable. This is equivalent to minimizing the negative log likelihood.

In Variational inference, it is the KL divergence, and hence the ELBO because minimizing the KL divergence is equivalent to maximizing the ELBO.

In MCMC, we are not attempting to optimize anything. Instead, we are attempting to estimate a density function - but not by estimating in some optimal manner a small number of parameters, instead by generating a lot of random numbers from the density function and going from there. So MCMC is really a random number generation technique, not an optimization technique. [ref](https://stats.stackexchange.com/a/78884)

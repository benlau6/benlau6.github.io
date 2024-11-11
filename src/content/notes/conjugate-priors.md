---
title: Conjugate Priors
publishDate: 2024-10-11
---

# Conjugate Priors

## Introduction

Firstly, let me remind you of the Bayes' theorem:

$$
\begin{aligned}
P(\theta|D) &= \frac{P(D|\theta)P(\theta)}{P(D)}\\
&= \frac{\text{likelihood} \times \text{prior}}{\text{marginal}}\\
P(\text{Hypothesis}|\text{Evidence})&= \frac{\text{P(E|H)} \times \text{P(H)}}{\text{P(E)}}
\end{aligned}
$$

In Bayesian theory, if given a likelihood function whose posterior distribution is in the same probability distribution family as the prior distribution, the prior and posterior are then called conjugate distributions with respect to that likelihood function and the prior is called a conjugate prior for the likelihood function. [wiki](https://en.wikipedia.org/wiki/Conjugate_prior)

But why conjugate priors? Because they simplify the calculation and interpretation of the posterior distribution and the updates by giving a closed-form expression for the posterior, i.e. getting rid of intractable integrals.

One more fantastic property of conjugate priors is that if the likelihood function belongs to the exponential family, then a conjugate prior is guaranteed to exist, often also in the exponential family.

Using conjugate priors, the prior predictive distribution of an exponential family distribution can be determined analytically. Despite the analytical tractability of such distribution, they are in themselves usually not members of the exponential family, e.g. Student's t distribution, beta-binomial distribution. [ref](https://gregorygundersen.com/blog/2020/08/19/bernoulli-beta/)

Moreover, when a conjugate prior is being used, The posterior distribution belongs to the same family as the prior predictive distribution, and is determined simply by plugging the updated hyperparameters for the posterior distribution of the parameters into the formula for the prior predictive distribution.

## Examples

### Beta distribution for discrete data

To demonstrate the power of conjugate priors, let's see the Bernoulli distribution and its conjugate prior, the beta distribution.

When $x_i\sim \text{Bernoulli}(p)$, and $p$ is unknown, if a conjugate prior $p\sim \text{Beta}(\alpha, \beta)$ is selected, the posterior distribution of $p$ has a closed form, which is also a beta distribution:

$$
p|x\sim \text{Beta}(\alpha + \sum^n_{i=1} x_i, \beta + n - \sum^n_{i=1} x_i)
$$

where $x_i$ is the outcome of being success or not, $n$ is the number of trials, while $\alpha$ and $\beta$ can be interpreted as the number of successes and failures before the experiment.

By defining

$$
\begin{aligned}
\alpha' &=\alpha + \sum^n_{i=1} x_i\\
\beta' &= \beta + n - \sum^n_{i=1} x_i
\end{aligned}
$$

Denoting the parameter from $p$ to $\theta$ to avoid ambiguity, the posterior predictive distribution of the next outcome $\tilde{x}=1$ can be calculated as

$$
\begin{aligned}
p(\tilde{x}=1|x)&=\int p(\tilde{x}=1|\theta)p(\theta|x)d\theta\\
&=\int \theta(\theta|\alpha', \beta')d\theta\\
&=E[\theta|\alpha', \beta']\\

\end{aligned}
$$

Note that $p(\tilde{x}=1|\theta)$ is the likelihood function of the Bernoulli distribution, so it is just $\theta$.

Since this integral is just the expectation of the posterior distribution, given that mean of any Beta distribution is

$$\mu=\frac{\alpha}{\alpha+\beta}$$

we have the posterior predictive distribution of $\tilde{x}=1$ as

$$
p(\tilde{x}=1|x)=\frac{\alpha'}{\alpha'+\beta'}
$$

Since it is binary, we have

$$
p(\tilde{x}=0|x)=\frac{\beta'}{\alpha'+\beta'}
$$

And therefore

$$
p(\tilde{x}|x)=\frac{\alpha'}{\alpha'+\beta'}I(\tilde{x}=1)+\frac{\beta'}{\alpha'+\beta'}I(\tilde{x}=0)
$$

So mean of the posterior predictive distribution is

$$
E[\tilde{x}|x]=\int^1_0 \tilde{x}p(\tilde{x}|x)d\tilde{x}=\frac{\alpha'}{\alpha'+\beta'}
$$

which is the same as the posterior mean of $p$.

[detailed proof](https://gregorygundersen.com/blog/2020/08/19/bernoulli-beta/)

[another proof with application](https://mattmotoki.github.io/blog/posts/beta-target-encoding.html)

To see a practical usage, see Beta target encoding at [#Use cases](#use-cases).

Similar procedures can be applied to other exponential family distributions, such as Poisson distribution with Gamma prior, Gaussian distribution with Gaussian prior on mean or inverse gamma prior on variance, etc. [discussion on Gaussian](https://stats.stackexchange.com/a/232861) [proof of Gaussian](https://gregorygundersen.com/blog/2019/04/04/bayesian-gaussian/) [Table of conjugate distributions Wiki](https://en.wikipedia.org/wiki/Conjugate_prior)

## Use cases of the posterior and posterior predictive distributions

- [Beta target encoding on Bernoulli target response](https://mattmotoki.github.io/blog/posts/beta-target-encoding.html)
  - it is a interesting application because the target response is not binary, but probability instead. However, the same procedure of estimating Bernoulli distribution with Beta prior was still applied, by treating the target response as the parameter of the Bernoulli distribution. In this way, $\alpha$ and $\beta$ were estimated, but not observed directly, but the same analogy applied. Moreover, because it is just coming from the beta distribution, we can use statistics other than mean, such as median, mode, etc. to estimate the target response.
  - estimating the posterior distributions of the target response (probability) for each category in each categorical variable, kinda like one hot encoding but substituting the posterior statistics of the target response, and without sparse matrix.
- Kalman filter
- Hypothesis testing
- Parameter estimation
- Uncertainty quantification, maybe for decision making
- Model selection
- Forecasting

## Let's say I get a posterior distribution by imposing conjugate prior to the likelihood function, how to update it?

We could just update the parameters of the prior distribution by using the parameters from posterior distribution, i.e. use the posterior distributions as the prior distributions for the next inference, especially if conjugate priors are being used. [pymc updating priors](https://www.pymc.io/projects/examples/en/latest/howto/updating_priors.html)

## It plays a great role in online learning

The latency of online learning has to be quick. Conjugate priors give the corresponding posteriors in closed form which provide tractability that lead to instantaneous update. [Thompson sampling](multi-armed-bandit.md#thompson-sampling) is one of the example.

However, sometimes it would be more efficient and without losing much accuracy to update the model daily instead of updating it every time a new data point comes in. This way, we can use any inference method to update the model.

## But what if conjugate priors cannot be used?

[Other Bayesian inference methods](bayesian-inference.md) could help, such as Laplace approximation, MCMC, Variational inference.

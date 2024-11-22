---
title: Survival Analysis
publishDate: 2024-11-24
---

# Survival Analysis

Survival analysis is for analyzing the expected duration of time until one or more events happen. It is used to model time-to-event data, which is a measure of the time between a specific start and end point. The event of interest is often death, but it can be any other event such as the occurrence of a disease, the failure of a machine, or the occurrence of a specific behavior. So it is also called time-to-event analysis.

The major problem in survival analysis is that the data is often censored. Censoring occurs when the event of interest has not occurred for some subjects at the time the data are analyzed. There are three types of censoring:

- Right censoring: the event of interest has not occurred by the time the data are analyzed.
- Left censoring: the event of interest has occurred before the study began.
- Interval censoring: the event of interest occurs between two time points.

The survival function is defined as the probability that the event of interest has not occurred by time t. The survival function is denoted by $S(t)=Pr(Y\geq y)=1-F(y)$, and the probability density function is denoted by $f(t)$. The hazard function is defined as the instantaneous rate of failure at time t, given that the subject has survived up to time t. The hazard function is denoted by $h(t)=\frac{f(y)}{S(y)}$.

R. Rois (2017) plotted great examples of hazard functions [here](https://www.semanticscholar.org/paper/Nonparametric-Tests-for-Change-Points-in-Hazard-in-Rois/752fc67d89c018bd16d065bdd794943b182fa64e/figure/0). It shows that it is possible to have different trends of hazard functions in different stages of a human.

For uncensored observation, the likelihood is just the probability density distribution $f(y_i)$, but for censored observation, the likelihood is the survival function $S(y_i)$. So the full likelihood is:

$$
L = \prod_{i=1}^{n} f(y_i)^{\delta_i} S(y_i)^{1-\delta_i}
$$

and the log-likelihood function is

$$
\begin{aligned}
l &= \sum_{i=1}^{n} [\delta_i ln f(y_i) + (1-\delta_i) ln S(y_i)]
&= \sum_{i=1}^{n} [\delta_i ln h(y_i) + ln S(y_i)]
\end{aligned}
$$

## Choice of Distribution

> The simplest model for a survival time Y is the exponential distribution. However, the hazard function does not depend on y, so the probability of failure in the time interval $[y, y+\delta y]$ is not related to how long the subject has already survived. This "lack of memory" property may be a limitation because, in practice, the probability of failure often increases with time. In such situations an accelerated failure time model, such as the Weibull distribution, may be more appropriate. (Dobson and Barnett, An Introduction to Generalized Linear Models, 2018, p.227)

The Weibull distribution is the only distribution for survival time data that has the properties of accelerated failure times and proportional hazards. However the biological applicability of this model may be limited by the fact that the hazard function is monotonic, i.e. either decreasing or increasing.

The log-logistic distribution is another commonly used AFT model. It exhibits a non-monotonic hazard function which increases at early times and decreases at later times. It is somewhat similar in shape to the log-normal distribution but it has heavier tails. Moreover, the cumulative distribution function has a simple closed form, which becomes important computationally when fitting data with censoring.

Any distribution on a multiplicatively closed group, such as the positive real numbers, is suitable for an AFT model. Other distributions include the log-normal, gamma, and inverse Gaussian distributions. [wiki](https://en.wikipedia.org/wiki/Accelerated_failure_time_model)

Note that poisson regression creates proportional hazards models, one class of survival analysis.

## XGBoost with AFT model

Usually, the survival model is of the following form:

$$
ln Y = \beta X + \sigma Z
$$

where

- $Y$ is the survival time
- $Z$ is a random variable with a known probability distribution, whose common choices are the normal distribution, the logistic distribution, and the extreme distribution. It represents the noise that pulls the prediction $\beta X$ away from the true log label $ln Y$.
- $\sigma$ is a parameter that scales the size of $Z$.
- it is a generalized form of a linear regression model.

To allow for the possibility of non-linear relationships and interactions between the features, we can use a tree-based model, such as XGBoost, to substitute the generalized form of the linear regression model. That i;

$$
ln Y = f(X) + \sigma Z
$$

where $f(X)$ represents the output from a tree-based model. Since $Z$ is a random variable, we have a likelihood defined for the expression. So the goal for XGBoost is to maximize the log likelihood by fitting a good function $f(X)$. In practice, it is simply setting the `objective` parameter to `survival:aft` and `eval_metric` to `aft-nloglik`, so that the log likelihood for the AFT model would be maximized by actually minimizing the negative log likelihood. [XGBoost tutorial](https://xgboost.readthedocs.io/en/latest/tutorials/aft_survival_analysis.html) [XGBoost with AFT paper](https://arxiv.org/pdf/2006.04920)

Note that there are multiple predefined `aft_loss_distribution` in XGBoost library, which are `normal`, `logistic`, and `extreme`. Since the response variable is actually the log of the survival time $ln Y$, the `normal` distribution for error is actually log-normal distribution for Y, while the `logistic` distribution for error is actually log-logistic distribution for Y.

## XGBSE

- [xgbse: Improving XGBoost for Survival Analysis](https://towardsdatascience.com/xgbse-improving-xgboost-for-survival-analysis-393d47f1384a)
- [How XGBSE works](https://loft-br.github.io/xgboost-survival-embeddings/how_xgbse_works.html)

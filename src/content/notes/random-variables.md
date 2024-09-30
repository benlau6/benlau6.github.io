---
title: Random Variables
publishDate: 2024-09-24
---

# Random Variables

- $Cov[X,Y] = E[(X-E[X])(Y-E[Y])]$ = $E[XY] - E[X]E[Y]$
  - if $X$ and $Y$ are independent, then $Cov[X,Y] = 0$
  - if $X$ and $Y$ are identical, then $Cov[X,Y] = E[X^2] - E[X]^2 = Var[X]$
- $Var[X+Y] = Var[X] + Var[Y] + 2Cov[X,Y]$

## When is a random variable iid?

IID means independent and identically distributed

Independent implies that [knowing one value tells us nothing new about other value](https://stats.stackexchange.com/questions/259357/what-is-implied-by-i-i-d) (variables are uncorrelated and have no statistical dependence on one another.)

Identically distributed means that they can be characterized by the same probability distribution. So they are "of the same kind" in terms of their probabilistic behavior.

Independent stochastic variables can have different probability distributions, while IID variables must have the same underlying probability distribution.

If data in a time series are independent, they are just noise

Counter examples:

1. sampling without replacement
2. time series (except random processes), e.g. seasonal / trend components
3. Height and weight

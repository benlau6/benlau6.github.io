---
title: Central Limit Theorem
publishDate: 2024-09-20
---

# Central Limit Theorem

## When does Central Limit Theorem not hold?

When its conditions are not met

1. random variables must be iid (can be weakened in some variants)
2. finite variance
3. sample size should be large enough (>=30 as a rule of thumb)

## Why we always use Normal Distribution?

> First, many distributions we wish to model are truly close to being normal distributions. The central limit theorem shows that the sum of many independent random variables is approximately normally distributed. This means that in practice, many complicated systems can be modeled successfully as normally distributed noise, even if the system can be decomposed into parts with more structured behavior.
>
> Second, out of all possible probability distributions with the same variance, the normal distribution encodes the maximum amount of uncertainty over the real numbers. We can thus think of the normal distribution as being the one that inserts the least amount of prior knowledge into a model.
>
> -- from: Deep Learning 3.9.3

[剖析深度學習 (1)：為什麼Normal Distribution這麼好用？](https://ycc.idv.tw/deep-dl_1.html#anchor)

## Acknowledgements

- [3Blue1Brown](https://www.youtube.com/watch?v=zeJD6dqJ5lo)
- [Seeing Theory](https://seeing-theory.brown.edu/probability-distributions/index.html)

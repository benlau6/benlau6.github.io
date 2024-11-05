---
title: Hypothesis Testing
publishDate: 2024-09-20
---

# Hypothesis Testing

Important to know [p-values](p-values.md) and [confidence intervals](confidence-intervals.md) before diving into hypothesis testing.

## One liners

- Type I error is rejecting a true null hypothesis, i.e. false positive. While Type II error is failing to reject a false null hypothesis, i.e. false negative.
- P-value is the type I error, while power is 1 - type II error. So power is the probability of rejecting a false null hypothesis, i.e. true positive.

## Types of statistical tests

![Types of tests](https://www.statsols.com/hs-fs/hubfs/Master-Images/Blog-Images/2019/what-statistical-test-to-use/What-statistical-test-to-use.png?width=733&name=What-statistical-test-to-use.png)

- chi-square of goodness-of-fit test tests whether your data is as expected.
- z-test tests whether the means of two groups are significantly different from each other when the sample size is large, and the population standard deviation is known.
- t-test tests whether the means of two groups are significantly different from each other, applicable for small sample size or unknown population standard deviation.
- F-test tests whether the variances of two or more groups are significantly different from each other.
- ANOVA tests whether the means of two or more groups are significantly different from each other.
  - it uses F-test to check if there's a change in means of the dependent variable due to at least one factor level.
  - One-way ANOVA with two factor levels is the same as t-test
- MANOVA is used when there are multiple dependent variables, i.e. non-neglectable covariance between dependent variables.

### Readings

- [Types of Statistical Tests](https://www.statsols.com/articles/types-of-statistical-tests)
- [Handbook of biological statistics](http://www.biostathandbook.com/testchoice.html)

## Multiple comparisons

- When you perform multiple hypothesis tests, the probability of making a Type I error increases. So, you need to adjust the p-value.
- Bonferroni correction: divide the alpha value by the number of comparisons.

## Bayesian

- Two approaches
  - Estimation-based testing: check whether the point of interest is in credible interval
  - Comparison-based testing: Bayesian model comparison in the form of Bayes factors between the models constructed by null and alternative hypotheses

### Readings

- [Bayesian hypothesis testing](https://michael-franke.github.io/intro-data-analysis/ch-03-07-hypothesis-testing-Bayes.html)
- [Bayesian Hypothesis Testing with PyMC](https://austinrochford.com/posts/2013-05-17-bayesian-hypothesis-testing-with-pymc.html)
- [Bayesian Estimation Supersedes the T-Test](https://www.pymc.io/projects/examples/en/latest/case_studies/BEST.html)

## How many experiments does it take to get a statistically significant result?

Just one, but the method, documentation, control, and execution must be flawless.

## With a large enough sample size, everything is significant

There are differences between statistical significant and practical significant. With a large sample size that usually obtained in modern days, a statistical significant test might be meaningless because even a tiny difference would be caught given enormous evidence. Here comes the importance of effect size, which deals with practical significance.

## How to combine multiple experiments on the same hypothesis?

- [Meta-analysis@Nature](https://www.nature.com/articles/s41598-021-86465-y) for combining results from multiple studies on the same hypothesis.
  - it usually apply on effect size instead of p-value
  - [Bayesian meta-analysis](https://www.niss.org/sites/default/files/Ghosh-NISS-2011-talk4in1.pdf)
- Multiple testing for adjusting false positive rate, i.e. p-value, when testing multiple hypotheses.
- What if I have multiple experiments on the same hypothesis from the same study, setting, and dataset? Seems not a multiple testing problem, nor a meta-analysis problem. It is more like a bootstrapping, but the experiments are actually performed, while bootstrapping is simulating the experiments hypothetically.

## How to test proportions?

- [Inference for a single proportion - Introduction to Modern Statistics](https://openintro-ims.netlify.app/inference-one-prop)

## Significance vs Coefficient

It is not true in general that an insignificant variable has no effect on the response. A variable can be insignificant because the sample size is too low or the random variation too large to find a clear significant effect even if an effect in fact exists, or because it is correlated with other variables and the data cannot know how much of the effect of the correlated variables belongs to what individual variable. Insignificance only means that the data don't provide evidence of an effect; it doesn't mean that such an effect cannot exist.

The coefficient of an insignificant variable can in principle still be interpreted if it is appropriately expressed that any interpretation is unreliable due to random variation and that there is no conclusive evidence that the variable has any effect at all. Chances are however that in most situations the interpretation of such a coefficient is not of much interest, as it comes with too much uncertainty.

What makes more sense is to interpret a confidence interval for the coefficient, as this also expresses the uncertainty.

## It is unnecessary to do so in Bayesian setting

> Bayesian is simply the application of probability theory, you can do anything with it, including NHST. If you have access to Bayesian methods, why would you want to do NHST when you can do so much more with your data and knowledge? [discussion](https://www.reddit.com/r/statistics/comments/149xnr9/comment/jo7mu6o/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

> What's the point of doing NHST with Bayesian analysis? You have all the distributions right there - you can just look at what the results are. And you don't have to worry about all those weird paradoxes about multiple comparisons and p-values.

> Here’s the thing: NHST gives you the likelihood of obtaining your statistic under the assumption that the null hypothesis is true. If your Bayesian results indicate that the null hypothesis is itself unlikely to be true, it’s useless knowing how probable your result is under such improbable conditions.

### Readings

- [Are large data sets inappropriate for hypothesis testing?](https://stats.stackexchange.com/questions/2516/are-large-data-sets-inappropriate-for-hypothesis-testing)
- [Hypothesis testing when sample sizes are extremely large](https://www.reddit.com/r/statistics/comments/10ywamd/q_hypothesis_testing_when_sample_sizes_are/)

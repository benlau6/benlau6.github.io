---
title: Hypothesis Testing
publishDate: 2024-09-20
---

# Hypothesis Testing

Important to know [p-values](/p-values.md) and [confidence intervals](/confidence_intervals.md) before diving into hypothesis testing.

## One liners

- Type I error is rejecting a true null hypothesis, i.e. false positive. While Type II error is failing to reject a false null hypothesis, i.e. false negative.

## Types of statistical tests

![Types of tests](https://www.statsols.com/hs-fs/hubfs/Master-Images/Blog-Images/2019/what-statistical-test-to-use/What-statistical-test-to-use.png?width=733&name=What-statistical-test-to-use.png)

- chi-square of goodness-of-fit test tests whether your data is as expected.
- z-test tests whether the means of two groups are significantly different from each other when the sample size is large.
- t-test tests whether the means of two groups are significantly different from each other.
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

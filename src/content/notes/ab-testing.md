---
title: A/B Testing
publishDate: 2024-11-11
---

# A/B Testing

## Resources

- [udemy | Bayesian Machine Learning in Python: A/B Testing](https://www.udemy.com/course/bayesian-machine-learning-in-python-ab-testing/?couponCode=24T2MT111824)
- [udemy | A/B Testing and Experimentation for Beginners](https://www.udemy.com/course/ab-testing-and-experimentation-for-websites-and-marketing/?couponCode=24T2MT111824)
- [udemy | Coding for A/B testing: Run more AB tests, find more winners](https://www.udemy.com/course/abtesting/?couponCode=LETSLEARNNOW)
- [Selecting the best artwork for videos through A/B testing](https://netflixtechblog.com/selecting-the-best-artwork-for-videos-through-a-b-testing-f6155c4595f6)

## Introduction

The idea is to test the behaviour change between two groups. If confidence intervals of the metrics of the treatment group and the control group do not overlap, we can conclude that the treatment group is better than the control group. Or if the confidence interval of the cumulative treatment effects does not overlap with 0, we can conclude that the treatment has a significant effect. We could use the following methods:

- t-test
- Regression discontinuity: point comparison, only for immediate effect
- Difference-in-differences: aggregate the effects
- Bayesian Structural Time Series (Causal Impact): aggregate the effects, isolate some latent factors, e.g. seasonality, trend, etc.

In Bayesian AB testing, we can use the posterior distribution to calculate the probability of the treatment group being better than the control group by just calculating the proxy equation on each pair of samples from the posterior distributions and take an average [source](https://towardsdatascience.com/bayesian-a-b-testing-in-pymc3-54dceb87af74). E.g. `(blue_button_conversion_rate_samples > red).mean()`.

References:

- [Bayesian A/B Testing](https://towardsdatascience.com/bayesian-a-b-testing-in-pymc3-54dceb87af74)
- [Introduction to Bayesian A/B Testing](https://www.pymc.io/projects/examples/en/latest/causal_inference/bayesian_ab_testing_introduction.html)
- [Microsoft Experimentation Platform Publications](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/publications/)

## Typical steps

1. Define the metrics - could be retention, conversion, etc. or could be a proxy metric, e.g. adding 7 friends in first 10 days.
2. Determine the sample size by stating false positive rate, true positive rate, base line, and effect size - should be done by [online calculator](https://www.evanmiller.org/ab-testing/sample-size.html)
   - False positive rate: Type I error rate, significance level, alpha, e.g. 0.05
   - True positive rate: 1 - Type II error rate, 1 - FNR, power, recall, e.g. 0.8
   - Base line: the current metric, e.g. 0.1 conversion rate
   - Effect size: the minimum detectable effect, magnitude of the difference, e.g. 0.02, considering it gives practical significance
3. Randomize the experiment correctly - avoid imbalance in the treatment and control groups, maybe use stratified sampling.

## Notes

1. Do not peak into the data before the experiment ends.
2. Do not stop the experiment early.
3. Adjust for multiple comparisons - Bonferroni correction, Holm-Bonferroni correction, etc.
4. Statistical significance does not equal to practical significance.

### Readings

- [Crash Course On A/B Testing For Product Managers](https://www.reddit.com/r/ProductManagement/comments/1g0pe04/crash_course_on_ab_testing_for_product_managers/)
- [Find the Key to Your App’s Growth Without an Army of Data Scientists](https://amplitude.com/blog/find-the-key-to-your-apps-growth-without-an-army-of-data-scientists) -Facebook successfully used "adding 7 friends in first 10 days" as a proxy metric to predict user retention after 2 month.

## Readings

- [Statistical Challenges in Online Controlled Experiments: A Review of A/B Testing Methodology](https://www.tandfonline.com/doi/full/10.1080/00031305.2023.2257237#abstract)
- [Bayesian inference at scale: Running A/B tests with millions of observations](https://www.pymc-labs.com/blog-posts/bayesian-inference-at-scale-running-ab-tests-with-millions-of-observations/)
- [Bayesian Statistics : A/B Testing, Thompson sampling of multi-armed bandits, Recommendation Engines and more from Big Consulting](https://franciscormendes.github.io/2024/07/19/bayesian-statistics/)

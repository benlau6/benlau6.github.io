---
title: Confidence Intervals
publishDate: 2024-09-20
---

# Confidence Intervals

It is an interval which is expected to typically contain the parameter being estimated (the true parameter is fixed). More specifically, given a confidence level, a CI is a **random** interval which contains the parameter being estimated x% of the time. The confidence level represents the long-run proportion of CIs that theoretically contain the true value of the parameter. For example, out of all intervals computed at the 95% level, 95% of them should contain the parameter's true value.

When applying standard statistical procedures, there will often be standard ways of constructing confidence intervals. These will have been devised so as to meet certain desirable properties, which will hold given that the assumptions on which the procedure relies are true. These desirable properties may be described as: validity, optimality, and invariance.

Interpretation

- There's a 95% probability that this range contains the true value of $\theta$.
- The confidence interval can be expressed in terms of a long-run frequency in repeated samples (or in resampling): "Were this procedure to be repeated on numerous samples, the proportion of calculated 95% confidence intervals that encompassed the true value of the population parameter would tend toward 95%."
- The confidence interval can be expressed in terms of probability with respect to a single theoretical (yet to be realized) sample: "There is a 95% probability that the 95% confidence interval calculated from a given future sample will cover the true value of the population parameter." This essentially reframes the "repeated samples" interpretation as a probability rather than a frequency.
- The confidence interval can be expressed in terms of statistical significance, e.g.: "The 95% confidence interval represents values that are not statistically significantly different from the point estimate at the .05 level."
- [summary in a reddit post](https://www.reddit.com/r/statisticsmemes/comments/ssl5dq/comment/hxorqvb/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- We are 95% confident that this confidence interval captures the true population parameter. [ref](https://evalf21.classes.andrewheiss.com/resource/bayes/#confidence-intervals-vs-credible-intervals)

Common Misinterpretations

- It is often misinterpreted [1](https://doi.org/10.1007%2Fs10654-016-0149-3) [2](https://doi.org/10.3758/s13423-015-0947-8) [3](https://doi.org/10.3758/s13423-013-0572-3)
- A 95% confidence level does not mean that for a given realized interval there is a 95% probability that the population parameter lies within the interval (i.e., a 95% probability that the interval covers the population parameter). According to the frequentist interpretation, once an interval is calculated, this interval either covers the parameter value or it does not; it is no longer a matter of probability. The 95% probability relates to the reliability of the estimation procedure, not to a specific calculated interval.
  - Neyman: "It will be noticed that in the above description, the probability statements refer to the problems of estimation with which the statistician will be concerned in the future. In fact, I have repeatedly stated that the frequency of correct results will tend to α. Consider now the case when a sample is already drawn, and the calculations have given [particular limits]. Can we say that in this particular case the probability of the true value [falling between these limits] is equal to α? The answer is obviously in the negative. The parameter is an unknown constant, and no probability statement concerning its value may be made..."
- A 95% confidence level does not mean that 95% of the sample data lie within the confidence interval.
- A 95% confidence level does not mean that there is a 95% probability of the parameter estimate from a repeat of the experiment falling within the confidence interval computed from a given experiment.

[StatQuest](https://www.youtube.com/watch?v=TqOeMYtOc1w)

- Construction (One of the ways to construct a confidence interval, which is by bootstrapping)
  - construct a sample of the sample by randomly sampling the sample with replacement
  - construct the sample 100 times repeatedly and get the sample means
    - A sample mean is an estimate of the "true"(population) mean
  - A 95% confidence interval is just an interval that covers 95% of the sample means
    - DUe to it, we know that anything outside of it occurs less than 5% of the time
    - i.e. p-value of anything outside of the confidence interval is < 0.05, i.e. signifiantly different
  - Confidence intervals are statistical tests performed visually
    - If confidence intervals of two groups do not overlap, then the difference is significant
    - However, if they overlap, there is still a chance that the means are significantly different from each other, a t-test is needed

## Confidence intervals vs Prediction intervals

[discussion](https://stats.stackexchange.com/questions/16493/difference-between-confidence-intervals-and-prediction-intervals/16496#16496)

The prediction interval gives an interval estimate of a random variable, while a confidence interval provides an interval estimate of a parameter. One is a prediction of a future observation, and the other is a predicted mean response. The difference between a prediction interval and a confidence interval is the standard error. The difference between the two is conceptually as large as the difference between the standard deviation of a variable and the standard error of its mean.

The standard error for a confidence interval on the mean takes into account the uncertainty due to sampling. The line you computed from your sample will be different from the line that would have been computed if you had the entire population, the standard error takes this uncertainty into account.

The standard error for a prediction interval on an individual observation takes into account the uncertainty due to sampling like above, but also takes into account the variability of the individuals around the predicted mean. The standard error for the prediction interval will be wider than for the confidence interval and hence the prediction interval will be wider than the confidence interval.

Confidence intervals tell you about how well you have determined the mean. Assume that the data really are randomly sampled from a Gaussian distribution. If you do this many times, and calculate a confidence interval of the mean from each sample, you'd expect about 95 % of those intervals to include the true value of the population mean. The key point is that the confidence interval tells you about the likely location of the true population parameter.

Prediction intervals tell you where you can expect to see the next data point sampled. Assume that the data really are randomly sampled from a Gaussian distribution. Collect a sample of data and calculate a prediction interval. Then sample one more value from the population. If you do this many times, you'd expect that next value to lie within that prediction interval in 95% of the samples.The key point is that the prediction interval tells you about the distribution of values, not the uncertainty in determining the population mean.

Prediction intervals must account for both the uncertainty in knowing the value of the population mean, plus data scatter. So a prediction interval is always wider than a confidence interval.

Note: A prediction interval does not make sense for a categorical outcome (you could do a prediction set rather than an interval, but most of the time it would probably not be very informative). [ref](https://stats.stackexchange.com/questions/56895/do-the-predictions-of-a-random-forest-model-have-a-prediction-interval)

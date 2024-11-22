---
title: Loss Functions
publishDate: 2024-11-24
---

# Loss Functions

## Related notes

- [GLM loss functions](generalized-linear-models.md#loss-functions)
- [Mathematical optimization](mathematical-optimization.md)
- [Regularization](regularization.md)
- [Distributions loss functions](distributions.md#loss-distributions)

## Selecting a loss function

- [wiki](https://en.wikipedia.org/wiki/Loss_function#Selecting_a_loss_function)

## Knowledge-based loss functions

Knowledge-based loss functions, also called a hybrid loss functions, combines domain specific knowledge with traditional label-based loss, such as the MSE loss.

- [Knowledge Informed Machine Learning using a Weibull-based Loss Function](https://arxiv.org/abs/2201.01769): integrate the external knowledge into the loss function, then use the loss function in the training of any models. This knowledge-based loss function acts as a constraint on the machine learner during its training. In the paper, a Weibull-based loss function is used.
  - The Weibull loss is simply $\frac{1}{n} \sum^n_{i=1}(F(t_i)-F(\hat{t}_i))^2$
  - The loss function could be Weibull loss only, or combining it with any traditional loss such as MSE loss.
  - We need to learn and estimate the parameters of Weibull distribution before using it as a loss. It could be learnt from the same dataset or other similar dataset that possess similar data generating process.
  - In the PRONOSTIA dataset, common failures signatures are not observable due to the excessive loading. It is reasonable to assume that the dataset carries much less useful information in each of its runs than a comparable dataset from a real-world application.
  - The lower information density in the dataset makes the training of machine learning models more challenging. Thus, the machine learning models must rely on others sources of knowledge during training. In the case of author's experiment, the knowledge derives from the introduction of the Weibull-based loss function. As such, the Weibull-based loss functions consistently outperform the traditional loss functions in author's experiments.

## Deriving loss functions

- [Loss function in for gamma objective function in regression in XGBoost?](https://stats.stackexchange.com/questions/484555/loss-function-in-for-gamma-objective-function-in-regression-in-xgboost)
- [How does GBM work with a Poisson loss fonction]()
- [Poisson Maximum likelihood-based parameter estimation](https://en.wikipedia.org/wiki/Poisson_regression#Maximum_likelihood-based_parameter_estimation)

### Distributions can be used as loss functions

Doordash uses Beta distribution as the loss function of a delivery time prediction model, while Walmart uses Tweedie distribution as the loss function of a sales forecasting model. These application customized loss function bring great success. Check [Loss distributions note](distributions.md#loss-distributions) for more information.

Note that we might need to specify the parameters in advanced. We could make a educated guess or learn it from similar dataset or from historical records. However, we might not need to specify all the parameters because the parameters would form a functional relationship of mean and variance. Thus we could use the mean and some defined parameters to derive the rest of the parameters. For example, we could use $\theta$ and mean to derive the k of a gamma distribution. We could also use the mean to directly estimate the $\lambda$ of a Poisson distribution. [Knowledge Informed Machine Learning using a Weibull-based Loss Function](https://arxiv.org/abs/2201.01769)

Following are some common loss distributions:

- [Loss function in for gamma objective function in regression in XGBoost?](https://stats.stackexchange.com/questions/484555/loss-function-in-for-gamma-objective-function-in-regression-in-xgboost)
- [sklearn | Mean Poisson, Gamma, and Tweedie deviances](https://scikit-learn.org/stable/modules/model_evaluation.html#mean-tweedie-deviance)
- [Tweedie regression derivation](https://sathesant.medium.com/tweedie-loss-function-395d96883f0b)
- [skscope | gamma regression](https://skscope.readthedocs.io/en/0.1.7/gallery/GeneralizedLinearModels/gamma-regression.html)
- [Tweedie loss@lightGBM](https://github.com/microsoft/LightGBM/blob/1c27a15e42f0076492fcc966b9dbcf9da6042823/src/objective/regression_objective.hpp#L666)
- [Tweedie metric@lightGBM](https://github.com/microsoft/LightGBM/blob/1c27a15e42f0076492fcc966b9dbcf9da6042823/src/metric/regression_metric.hpp#L300-L318)

### Poisson loss

From negative log-likelihood of Poisson distribution derived from its probability density function, we have [wiki ref](https://en.wikipedia.org/wiki/Poisson_regression#Maximum_likelihood-based_parameter_estimation)

$$
L(y, \hat{y}) = \frac{1}{n} \sum^n_{i=1} (\hat{y_i} - y_i \log(\hat{y_i}))
$$

Since we can have any regression model of the form

$$
\hat{y_i} = f(x_i)
$$

For example, in the case of GLM, we have $\hat{Y}= exp(\beta X) + \epsilon$. Tree-based models would also produce prediction in the form $\hat{y_i}=f(x_i)$. So the we could use negative log-likelihood of any distribution that resembles the conditional distribution of Y|X as long as we could find the gradient of the loss function. (Terven et al., Loss Functions and Metrics in Deep Learning, 2024, p.10)

### Why log probability is mostly used in loss function?

> Shannon quantified information from probability by using the log function after axiomatizing the properties of information. Between others, that the function is
>
> - additive (the information of two independent events should be the sum of the information),
> - symmetric (equal probability events should carry equal information),
> - continuous,
> - monotonic, and
> - normalized in that perfectly certain events do not have information.
>
> The only function that obeys the axioms is the negative log. In information theory there exist such odd beasts as the expected information of a distribution, and even the information of a distribution given another distribution. One would call the first the entropy, and the second the cross entropy. [discussion](https://www.reddit.com/r/MachineLearning/comments/1gnrpfe/d_log_probability_and_information_theory/)

> First of all, because the logarithm function is monotonously increasing, log-probability preserves the order of probability. In this context log-probability can be thought of as rescaling our range from $[0,1]$ to $[-inf, 0]$ or $[0,inf]$ for the negative log . In information theory, the negative log of the probability is the “information content” of the random variable. It can be thought of as how surprised we should be to see a random variable take on a certain value. [information content](https://en.m.wikipedia.org/wiki/Information_content)

> The connection is that this minimizes the KL divergence between model and data. And the KL divergence measures the distance between two distributions based on information theory.

> "information" in information theory refers to something more specific than what you have in mind I think -- it has to do with communication in a noisy environment (it also applies to other things, but that's because this concept is so fundamental).
>
> Specifically, when you take the negative log likelihood of your prediction, what you're taking a point estimate of (based on your sample) is the cross-entropy of the true distribution and your model's estimate of the distribution.
>
> One interpretation of this quantity would be something like 'if I sent a message using an encoding scheme that yielded a probability distribution X, but you assumed it was X_hat from your model, how many bits would it take for you to decode it?'
>
> You can also look at the cross entropy two other ways (where p_hat is the probability of example x given the model):
>
> - H(X ; X_hat) = H(X) + KL(X || X_hat) -- another information theoretical perspective -- cross entropy is the entropy of X plus the KL divergence between X and X_hat from the model; get the model better and cross-entropy gets smaller
> - log L(X | p_hat) = 1 / N \* sum(log p_hat(x)])= -H(X; X_hat) -- minimizing the cross-entropy is the same thing as maximizing the log-likelihood of the model given the dataset -- and recall the log is monotonic so this is also the same thing as making a maximum likelihood estimate

### Why sometimes we don't use evaluation metrics in the lost function?

Sometimes the loss function is not the evaluation [metrics](metrics.md) we use. Most likely in classification problem, where usually we use cross-entropy in cost function, but recall, precision, etc. in evaluation metrics. Since some cost function is differentiable, and easier to optimize, while some evaluation metrics are more interpretable, meaningful but non-differentiable, or difficult to optimize. Despite sometimes they are different, they should always be closely related. So choosing a relevant pair of cost function and metric is essential. [discussion](https://stats.stackexchange.com/questions/379264/why-do-we-use-loss-functions-to-estimate-a-model-instead-of-evaluation-metrics-l) [loss function and metrics in deep learning paper](https://arxiv.org/pdf/2307.02694)

### Why log loss is used in logistic regression?

The hypothesis is a nonlinear function $\hat{Y} = (1+e^{-Z})^{-1}$. If we use MSE as the cost function, it will give a non-convex function, that when we optimize it by gradient descent, it will struggle to find the global minima. Moreover, in classification problems, target values are either 0 or 1, so the loss would always be in between 0 and 1, which can make it very difficult to compute on such high precision floating numbers. On the other hand, log loss uses log corrected probabilities based on truth labels, whose cost function is a convex function, the outputs extends beyond 1, and it penalizes much harder for incorrect prediction. [Log Loss vs. Mean Squared Error in logistic regression](https://www.analyticsvidhya.com/blog/2020/11/binary-cross-entropy-aka-log-loss-the-cost-function-used-in-logistic-regression/)

Moreover, Log Loss heavily penalises classifiers that are confident about an incorrect classification. For example, if for a particular observation, the classifier assigns a very small probability to the correct class then the corresponding contribution to the Log Loss will be very large indeed. [ref](https://www.r-bloggers.com/2015/12/making-sense-of-logarithmic-loss/)

### Can cross entropy be used in regression models?

Cross-entropy, Kullback-Leibler divergence (KLD) are natural choices for predicting probabilities, which have computational advantages. [ref](https://stats.stackexchange.com/a/412971)

Yes and no. [ref](https://stats.stackexchange.com/a/215484)

> Cross entropy is defined on probability distributions, not single values. The reason it works for classification is that classifier output is (often) a probability distribution over class labels. For example, the outputs of logistic/softmax functions are interpreted as probabilities. The observed class label is also treated as a probability distribution: the empirical distribution (where the probability is 1 for the observed class and 0 for the others).
>
> The concept of cross entropy applies equally well to continuous distributions. But, it can't be used for regression models that output a point estimate (e.g. the conditional mean) but not a full probability distribution. If you had a model that gave the full conditional distribution (probability of output given input), you could use cross entropy as a loss function.
>
> Just considering a single observed input/output pair (x,y), p would be the empirical conditional distribution (a delta function over the observed output value), and q would be the modeled conditional distribution (probability of output given input). In this case, the cross entropy reduces to −logq(y∣x). Summing over data points, this is just the negative log likelihood!

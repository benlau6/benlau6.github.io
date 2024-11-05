---
title: Mathematical Optimization
publishDate: 2024-09-24
---

# Mathematical Optimization

It is the process of finding global maxima or minima of an objective function given a set of constraints. It is widely used in machine learning, statistics, and operations research. For example, minimizing the loss function in a neural network, maximizing the likelihood function in statistics, or minimizing the cost function in linear programming. Gradient descent is the most common optimization algorithm to deal with these problems. But there are much more.

A cost function or a loss function is just an objective function that wants to be minimized. It is a function that measures the difference between the actual value and the predicted value, i.e. the residual errors. The optimization problem is to find the parameters that minimize the cost function.

## How to construct a objective function, or loss function?

Some [metrics](metrics.md) might be used as the objective function, but not all of them. Then [regularization](regularization.md) term might be added to the objective function to prevent overfitting. [Introduction to Loss Functions](https://www.datarobot.com/blog/introduction-to-loss-functions/)

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

## How to solve

- Greedy algorithms
- Simplex method for linear programming
- Gradient descent for non-linear optimization
- [Branch and bound](http://web.tecnico.ulisboa.pt/mcasquilho/compute/_linpro/TaylorB_module_c.pdf) - normally used for integer programming, which partitions the feasible solution space
  into smaller subsets of solutions.
- Genetic algorithms - heuristic search algorithms that solve constrained and unconstrained optimization problems using the concepts of natural selection such as mutation, crossover, and selection.

## Gradient Descent

Gradient descent is a optimization algorithm to find the parameters that minimize the cost function associated with a model, and a cost function calculates the errors between actual and predicted values.

It works by taking gradient of the cost function. It gets the direction and equation of minimizing the error with respect to each parameters. Then set a arbitrary initial values for each parameter, plug them to the partial differentiated equations. Get a new value, and loop the process until the improvement is small enough to be neglected.

However, when the learning rate is too high, the algorithm may diverge and result in oscillating iteration in cost function. On the other hand, when the learning rate is too low, the algorithm may take too long to converge.

Moreover, it is not a universal solution for all optimization problems. It may get stuck in local minima, or saddle points, where the gradient is zero but it is not a minimum. It is inapplicable when the cost function is not convex, for example, L1 regularization, because the gradient of the norm does not exist at 0. In this case, subgradient descent can be used.

When the same method is applied to maximize the cost function, it is called gradient ascent.

### Vanishing and Exploding Gradient Problem

It was a big problem in training deep neural networks during backpropagation. While training, gradients will be passed from the end layers to the start layers, and they would be multiplied and tend to get smaller if they are too small, or tend to get bigger if they are too big. Vanishing gradient problem occurs when the gradients are too small for the earlier layers, meaning that those weights cannot be updated, while exploding gradient problem occurs when the gradients are too big, causing the weights to be updated too much, resulting in divergence. [AIML.com What is the vanishing and exploding gradient problem, an dhow are they typically addressed?](https://aiml.com/what-do-you-mean-by-vanishing-and-exploding-gradient-problem-and-how-are-they-typically-addressed/) [The Challenge of Vanishing/Exploding Gradients in Deep Neural Networks](https://www.analyticsvidhya.com/blog/2021/06/the-challenge-of-vanishing-exploding-gradients-in-deep-neural-networks/)

Vanishing gradient problem usually happens when the activation function is not chosen properly, or the weights are initialized poorly. The most common solution is to use ReLU activation function, which is hard to saturate, instead of sigmoid or tanh activation functions. [examples](https://machinelearningmastery.com/how-to-fix-vanishing-gradients-using-the-rectified-linear-activation-function/)

Exploding gradient problem can be solved by using gradient clipping, which is to clip the gradients to a certain threshold, so that they won't be too big. Or weight regularization could be used by applying a L1 or L2 penalty to the loss function [A Gentle Introduction to Exploding Gradients in Neural Networks](https://machinelearningmastery.com/exploding-gradients-in-neural-networks/)

## Jacobian and Hessian

- The first derivative of a scalar-valued function is a vector, which is called the gradient.
- Jacobian is the matrix of all first-order partial derivatives of a vector-valued function. It helps to see how each output of a system changes when the inputs are tweaked.
- Hessian is the matrix of all second-order partial derivatives of a scalar-valued function, i.e. the Jacobian of the gradient. It helps to see how the gradient changes when the inputs are tweaked.
- Higher derivatives and vector functions lead to tensors

## Hyperparameter tuning (optimization) methods

- Grid search: Exhaustively search all possible combinations of hyperparameters. It works great for fast algorithms, e.g. random forests, but not for slow algorithms, e.g. neural networks, gradient boosting.
- Random search: Randomly search the hyperparameters
- Bayesian optimization: It is best-suited for optimization over continuous domains of less than 20 dimensions. It works by constructing a posterior distribution of functions (Gaussian process) that best describes the objective function. As the number of observations grows, the posterior distribution improves, and the algorithm becomes more certain of which regions in parameter space are worth exploring and which are not. [github](https://github.com/bayesian-optimization/BayesianOptimization) [paper](https://arxiv.org/abs/1807.02811)

## Bayesian optimization

The most common method is to use [Gaussian processes](gaussian-processes.md) in method called kriging. It has found prominent use in machine learning problems, for optimizing hyperparameter values. [wiki](https://en.wikipedia.org/wiki/Bayesian_optimization)

## Linear programming

Three components to define:

- Objective function
- Decision variables
- Constraints

## Applications

### Vehicle Routing Problem

- [A quadratically constrained mixed-integer non-linear programming model for multiple sink distributions](https://www.sciencedirect.com/science/article/pii/S2405844024145598)

### Budget allocation

- [Budget Allocation with PyMC-Marketing](https://www.pymc-marketing.io/en/stable/notebooks/mmm/mmm_budget_allocation_example.html#example-use-cases)

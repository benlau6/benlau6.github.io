---
title: Mathematical Optimization
publishDate: 2024-09-24
---

# Mathematical Optimization

It is the process of finding global maxima or minima of an objective function given a set of constraints. It is widely used in machine learning, statistics, and operations research. For example, minimizing the loss function in a neural network, maximizing the likelihood function in statistics, or minimizing the cost function in linear programming. Gradient descent is the most common optimization algorithm to deal with these problems. But there are much more.

A cost function or a loss function is just an objective function that wants to be minimized. It is a function that measures the difference between the actual value and the predicted value, i.e. the residual errors. The optimization problem is to find the parameters that minimize the cost function.

## How to solve

- Greedy algorithms
- Simplex method for linear programming
- Gradient descent for non-linear optimization
- [Branch and bound](http://web.tecnico.ulisboa.pt/mcasquilho/compute/_linpro/TaylorB_module_c.pdf) - normally used for integer programming, which partitions the feasible solution space
  into smaller subsets of solutions.
- Genetic algorithms - heuristic search algorithms that solve constrained and unconstrained optimization problems using the concepts of natural selection such as mutation, crossover, and selection.

## Gradient Descent

Gradient descent is a optimization algorithm to find the parameters that minimize the cost function associated with a model, and a cost function calculates the errors between actual and predicted values.

It works by taking gradient of the cost function. It gets the direction and equation of minimizing the error with respect to each parameters. Then set a arbitrary initial values for each parameter, plug them to the partial differentiated equation. Get a new value, and loop the process until the error is small enough to be accepted.

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

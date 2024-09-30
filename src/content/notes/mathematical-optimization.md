---
title: Mathematical Optimization
publishDate: 2024-09-24
---

# Mathematical Optimization

## How to solve

- Greedy algorithms
- Simplex method for linear programming
- Gradient descent for non-linear optimization
- [Branch and bound](http://web.tecnico.ulisboa.pt/mcasquilho/compute/_linpro/TaylorB_module_c.pdf) - normally used for integer programming, which partitions the feasible solution space
  into smaller subsets of solutions.
- Genetic algorithms - heuristic search algorithms that solve constrained and unconstrained optimization problems using the concepts of natural selection such as mutation, crossover, and selection.

## Gradient Descent

When the learning rate is too high, the algorithm may diverge and result in oscillating iteration in cost function.

### Vanishing and Exploding Gradient Problem

It was a big problem in training deep neural networks during backpropagation. While training, gradients will be passed from the end layers to the start layers, and they would be multiplied and tend to get smaller if they are too small, or tend to get bigger if they are too big. Vanishing gradient problem occurs when the gradients are too small for the earlier layers, meaning that those weights cannot be updated, while exploding gradient problem occurs when the gradients are too big, causing the weights to be updated too much, resulting in divergence. [AIML.com What is the vanishing and exploding gradient problem, an dhow are they typically addressed?](https://aiml.com/what-do-you-mean-by-vanishing-and-exploding-gradient-problem-and-how-are-they-typically-addressed/) [The Challenge of Vanishing/Exploding Gradients in Deep Neural Networks](https://www.analyticsvidhya.com/blog/2021/06/the-challenge-of-vanishing-exploding-gradients-in-deep-neural-networks/)

Vanishing gradient problem usually happens when the activation function is not chosen properly, or the weights are initialized poorly. The most common solution is to use ReLU activation function, which is hard to saturate, instead of sigmoid or tanh activation functions. [examples](https://machinelearningmastery.com/how-to-fix-vanishing-gradients-using-the-rectified-linear-activation-function/)

Exploding gradient problem can be solved by using gradient clipping, which is to clip the gradients to a certain threshold, so that they won't be too big. Or weight regularization could be used by applying a L1 or L2 penalty to the loss function [A Gentle Introduction to Exploding Gradients in Neural Networks](https://machinelearningmastery.com/exploding-gradients-in-neural-networks/)

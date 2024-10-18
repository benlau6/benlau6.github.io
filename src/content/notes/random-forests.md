---
title: Random Forests
publishDate: 2024-09-20
---

# Random Forests

## Definition

It uses [decision trees](decision-trees.md) as building blocks, each of which constructed very deep and hence with high variance, it then averages them to reduce variance. It also utilizes the [bootstrapping](bootstrapping.md) and randomization to decorrelate the trees. It involves three key steps, which are data sampling, parallel training, and aggregation. Its key benefit is to reduce variance, and improve accuracy due to ensemble learning. [ref](https://www.analyticsvidhya.com/blog/2023/01/ensemble-learning-methods-bagging-boosting-and-stacking/)

## Randomization

In order to benefit from averaging, the individual trees should not be too correlated. This is achieved by injecting some randomness into the tree-growing process, which could be achieved in two ways.

1. Bootstrap: each tree is grown to a bootstrap resampled training data set.
2. Split-variable randomization: each time a split is to be performed, the search for the split variable is limited to a random subset of m of the p variables. Typically, m is set to $\sqrt{p}$ or $p/3$. When m=p, it is called bagging, a.k.a. Boostrap Aggregating. With m=1, the split variable is completely random, so all variables get a chance. This will decorrelate the trees the most, but can create bias, somewhat similar to that in ridge regression.

## Algorithm

1. Define $m$ and $B$
2. For $b=1,2,...,B$:
   1. Draw a bootstrap sample of size n from the training data n times.
   2. Grow a regression tree $\hat{r}_b(x)$ using the bootstrapped data, sampling m of the p features at random prior to making each split.
   3. Save the tree and bootstrap sampling frequencies.
3. Compute the random-forest fit at any prediction point $x_0$ as the average $\hat{r}_{rf}(x_0)= \frac{1}{B} \sum^B_{b=1} \hat{r}_b(x_0)$
4. Compute the OOB$_i$ error (Out-of-Bag error) for each response observation $y_i$ in the training data by using the fit $\hat{r}_{rf}^{(-i)}(x_i)$, where the superscript $(-i)$ indicates that the $i$th observation is excluded from the bootstrap sample used to fit the $b$th tree. The overall OOB error is the average of these OOB$_i$. Since it only excludes one observation in each tree, it delivers cross-validated error estimates at virtually no extra cost.

> Note: If the response type is quantitative, we would fit a regression tree. If it is binary or multilevel qualitative, we would fit a classification tree.

## Another interpretation of the algorithm

It has been described as adaptive nearest-neighbor estimators, adaptive in that they select predictors. A k-nearest-neighbor estimate finds the k training observations closest in feature space to the target point $x_0$, and averages their responses. Each tree in the random forest drills down by recursive partitioning to pure terminal nodes, often consisting of a single observation. Hence, when evaluating the prediction from each tree, $\hat{r}_b(x_0) = y_l$ for some $l$, and for many of the trees this could be the same $l$. From the whole collection of B trees, the number of distinct $l$s can be fairly small. Since the partitioning that reaches the terminal nodes involves only a subset of the predictors, the neighborhoods so defined are adaptive.

## Variance Estimation

We can use similar idea of algorithm's step 4 to estimate the variance of a random-forest prediction, using the jackknife variance estimator.

## Interpretation

We can use variable-importance plots to assess the relative importance of variables that are included in the ensemble.

## Technical details on averaging trees

- A maximal-depth tree splits every node until it is pure, meaning all the responses are the same. For very large $n$ this might be unrasonable; in practice, one can put a lower bound on the minimum count in a terminal node.
- In the case of a classification tree, there are at least two strategies at the averaging stage: using a plurality vote on classifications made by each tree or averaging the class probabilities.

## Readings

- [Chapter 4. Resonance: Bootstrap & Random Forests](https://dataanalyticsbook.info/chapter-4.-resonance-bootstrap-random-forests.html)

## References

- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.

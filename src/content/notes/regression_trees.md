---
title: "Regression Trees"
publishDate: "2024-09-19"
---

# Regression Trees

## Definition

It uses a simple but intuitively appealing technique to form a [regression surface](/regression.md): recursive partitioning, which is used to fit a piecewise constant surface $\hat{r}(x)$ over the domain $\mathcal{X}$. It is totally nonparametric (Efron and Hastie, 2021).

## Use cases

It is easy to interpret, but on the other hand, also easy to overinterpret, with a reputation for being unstable in practice, i.e. bad for explanation. Discontinuous regression surfaces disqualify them for estimation. So their principal use in what follows will be as key parts of prediction algorithms.

It is used as a foundation to form random forest and boosting (Ensembles of trees)

- [Random forest](/random_forests.md): Grow many deep regression trees to randomized versions of the training data, and average them. The randomization could be bootstrap sampling and/or subsampling of the observations or variables.
  - The basic mechanism is variance reduction by averaging. Each deep tree has a high variance.
- [Boosting](/boosting.md): Repeatedly grow shallow trees to the residuals, and hence build up an additive model consisting of a sum of trees.
  - The basic mechanism is bias reduction. It might also include some variance reduction in different methods.

>Note: Boosting and [Random Forests](/random_forests.md) provide a terrific benchmark for how well a traditional parametrized model is performing: if they does much better, then the model is not doing well, with an indicator that probably some important interactions are missing.

## Common method to split tree

Suppose at step $k$ of the algorithm, group$_k$ of $N_k$ cases remains to be split, those cases having mean $m_k$ and sum of squares $s^2_k$. Dividing group$_k$ into group$_{k, left}$ and group$_{k, right}$ preoduces means $m_{k,left}$ and $m_{k,right}$ and corresponding sums of squares $s^2_{k,left}$ and $s^2_{k,right}$. The algorithm proceeds by choosing the splitting variable $X_k$ and the threshold $t_k$ to minimize the sum of squares of the two groups. In other words, it splits group$_k$ into two groups that are as different from each other as possible.

## The most important techniques to know

### How deep to grow the tree (when to stop splitting)

Uses cross-validation estimates of prediction error to determine when to stop splitting. If group$_k$ is not to be further divided, it becomes terminal node $R_k$, with prediction value $\hat{y}_{R_k} = m_k$.

### How much to prune it back

## Good and bad properties

Good properties:

- Trees automatically select variables; only variables used in defining splits are in the model.
- Tree-growing algorithms scale well to large n; growing a tree is a divide-and-conquer operation.
- It handle mixed features (quantitative/qualitative) seamlessly, and can handle missing data.
- Small trees are easy to interpret.

Bad properties:

- Large trees are hard to interpret.
- Generally don't have good predictive performance.

## References

- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.
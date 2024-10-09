---
title: Decision Trees
publishDate: 2024-09-20
---

# Decision Trees

## Definition

It uses a simple but intuitively appealing technique to form a [regression surface](regression.md): recursive partitioning, which is used to fit a piecewise constant surface $\hat{r}(x)$ over the domain $\mathcal{X}$. It is totally nonparametric (Efron and Hastie, 2021).

## Use cases

It is easy to interpret, but on the other hand, also easy to overinterpret, with a reputation for being unstable in practice, i.e. bad for explanation. Discontinuous regression surfaces disqualify them for estimation. So their principal use in what follows will be as key parts of prediction algorithms.

It is used as a foundation to form random forest and boosting (Ensembles of trees)

- [Random forest](random-forests.md): Grow many deep regression trees to randomized versions of the training data, and average them. The randomization could be bootstrap sampling and/or subsampling of the observations or variables.
  - The basic mechanism is variance reduction by averaging. Each deep tree has a high variance.
- [Boosting](boosting.md): Repeatedly grow shallow trees to the residuals, and hence build up an additive model consisting of a sum of trees.
  - The basic mechanism is bias reduction. It might also include some variance reduction in different methods.
- Explanatory analysis: [feature importances](https://mlcourse.ai/book/topic05/topic5_part3_feature_importance.html) could be easily extracted from the tree structure.

> Note: Boosting and [Random Forests](random-forests.md) provide a terrific benchmark for how well a traditional parametrized model is performing: if they does much better, then the model is not doing well, with an indicator that probably some important interactions are missing.

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

## Feature importances in decision trees are tricky

Standard feature importances simply tell you which features were more useful when building the model. They are not to be interpreted as a direct dependence between predictor and target.

1. They are completely useless if the model has bad predictive power.
2. They are strongly influenced by correlated features.
3. They are biased towards numerical and high cardinality features.

However, permutation importances are computed on validation stage, and therefore solve first overfitting issue. Moreover, as they are computed on a metric of your choice, they are easier to interpret and can in some sense be seen as a "strength coefficient", since they answer the question: "How much does the performance of my model degrade if I shuffle this predictor?". [ref](https://stats.stackexchange.com/questions/450703/is-feature-importance-in-random-forest-useless)

Nevertheless, features that are deemed of low importance for a bad model could be very important for a good model. it is always important to evaluate the predictive power of a model prior to interpreting feature importances. Permutation importance does not reflect to the intrinsic predictive value of a feature by itself but how important this feature is for a particular model. [ref](https://scikit-learn.org/stable/modules/permutation_importance.html)

The second issue still exists in a way that when two features are correlated and one of the features is permuted, the model still has access to the latter through its correlated feature. This results in a lower reported importance value for both features, though they might actually be important. For example, if two features both strongly related to the target, they will always end up with a feature importance score of about 0.5 each, whereas one would expect that both should score something close to one. One way to handle the issue is to cluster features that are correlated and only keep one feature from each cluster, or simply remove upper triangle of correlation matrix based on a threshold, or use `SelectKBest` with `f_regression` from `sklearn`. [ref](https://scikit-learn.org/stable/modules/permutation_importance.html#misleading-values-on-strongly-correlated-features) [clustering notes](clustering.md/#Hierarchical-clustering-can-improve-interpretability)

## Sometimes it outperforms neural networks

- [Why do tree-based models still outperform deep learning on typical tabular data?](https://openreview.net/forum?id=Fp7__phQszn)
- [TABULAR DATA: DEEP LEARNING IS NOT ALL YOU NEED](https://arxiv.org/pdf/2106.03253)

## References

- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.

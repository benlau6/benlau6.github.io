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

## It is the best tool for tabular data, even better than deep learning

- [Why do tree-based models still outperform deep learning on typical tabular data?](https://openreview.net/forum?id=Fp7__phQszn)
- [TABULAR DATA: DEEP LEARNING IS NOT ALL YOU NEED](https://arxiv.org/pdf/2106.03253)

## It inherently includes interaction terms

It is believed that tree-based models consider variables sequentially, which makes them handy for considering interactions without specifying them. Interactions that are useful for prediction will be easily picked up with a large enough forest, so there's no real need to include an explicit interaction term. [example](https://stats.stackexchange.com/a/157674) However, if you believe that the interaction is important, you could manually create the interaction term because an engineered feature will make it easier for the model to discover relationships in the data. Apart from general believe, there is a article stating that interactions are masked by marignal effects and interactions cannot be differentiated form marginal effects, such that variable importance measures are unable to detect them as interactions. [paper](https://doi.org/10.1186/s12859-016-0995-8) [XGBoost tutorials](https://xgboost.readthedocs.io/en/latest/tutorials/feature_interaction_constraint.html) [discussion on feature engineering in tree-model](https://stats.stackexchange.com/questions/300254/does-feature-engineering-matter-when-doing-random-forest-or-gradient-boosting)

## It is robust to outliers and feature scales

Decision trees divide the feature space into regions, and it divide the features one by one into left and right. Therefore it only cares the ordering of the values, so it will not be affected by the scale of the features, and it is also robust to outliers.

However, it is not the case for the target variable. So all the feature engineering techniques that usually required for the target variable are still needed.

## It performs poorly on extrapolation

It is not good at extrapolation, i.e. predicting outside the range of the training data. It is because the tree-based models are piecewise constant approximation, and they can't predict outside the range of the training data. However, it is often possible to reformulate the problem to avoid extrapolation through feature engineering, e.g. including lagged features, differencing, and using multi-output targets.

## How to get predictions with uncertainty

[confidence intervals vs prediction intervals](confidence-intervals.md#confidence-intervals-vs-prediction-intervals)

### Confidence intervals

- Bootstrapping
- [Confidence Intervals for Random Forests: The Jackknife and the Infinitesimal Jackknife](https://www.jmlr.org/papers/volume15/wager14a/wager14a.pdf) [implementation]()

### Prediction intervals

- Fit two more models using [Quantile regressor forest](https://medium.com/walmartglobaltech/adding-prediction-intervals-to-tree-based-models-8ea53814a4b9) with quantile loss and alpha 0.025 and 0.975, and use the predictions as the lower and upper bounds of the confidence interval.

## How to handle missing values

- [LightGBM discusison](https://github.com/microsoft/LightGBM/issues/2921)
- [XGBoost discussion](https://datascience.stackexchange.com/questions/15305/how-does-xgboost-learn-what-are-the-inputs-for-missing-values)
- [Handling Missing Values with Random Forest](https://www.analyticsvidhya.com/blog/2022/05/handling-missing-values-with-random-forest/)

## References

- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.

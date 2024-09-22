---
title: Boosting
publishDate: 2024-09-20
---

# Boosting

## Definition

It is a general method for building a complex prediction model using simple building components.

The "smallness" of the tree limits the interaction order of the model (e.g. a tree with only two splits involves at most two variables). The number of terms $B$ and the shrinkage parameter $\epsilon$ are both tuning parameters that control the rate of learning (and hence overfitting), and need to be set, for example by cross-validation.

In words this algorithm performs a search in the space of trees for the one most correlated with the residual, and then moves the fitted function $F^b$ a small amount in that direction—a process known as forward-stagewise fitting. One can paraphrase this simple algorithm in the context of linear regression, where in step 2(ii) the space of small trees is replaced by linear functions (P.320).

In other words, in the original case of binary classification problems, it is a means for improving the performance of "weak learners". This was achieved through resampling training points, giving more weight to those which had been misclassified, to produce a new classifier that would boost the performance in previously problematic areas of feature space. This process is repeated, generating a stream of classifiers, which are ultimately combined through voting to produce the final classifier (P.333).

## Key one-liners

- Boosting is fundamentally sequential, which cannot be parallelized. However, if all features were truly uncorrelated, then we could probably boost multiple features in parallel at a time, but in practice there's often quite a bit of correlation between features [Question: Parallel boosting? #519](https://github.com/interpretml/interpret/issues/519)[The Impossibility of Parallelizing Boosting](https://arxiv.org/pdf/2301.09627).
- Boosting: More sensitive to noisy data and outliers, as the focus on misclassified instances might lead to overfitting on these instances [Bagging v/s Boosting](https://medium.com/@roshmitadey/bagging-v-s-boosting-be765c970fd1).

## Algorithms

### Regression boosting

> In its simplest form (regression) boosting amounts to the following simple iteration (Efron and Hastie, 2021):

1. Initialize $b=0$ and $F^0(x) := 0$
2. For $b=1,2,...,B$:
   1. compute the residuals $r_i=y_i-F^{b-1}(x_i), i=1,...,n;$
   2. fit a small [regression tree](/regression_trees.md) to the observations $(x_i, r_i)^n_1$, which we can think of as estimating a function $g^b(x)$; and
   3. update $F^b(x) = F^{b-1}(x) + \epsilon g^b(x)$.

### Gradient Boosting with squared-error loss

1. Given a training sample $d=(X,y)$. Fix the number of steps B, the shrinkage factor $\epsilon$ and the tree depth $d$. Set the initial fit $\hat{G}_0 \equiv 0$, and the residual vector $r=y$.
2. For $b=1,2,...,B$:
   1. Fit a regression tree $\tilde{g}_b$ to the data $(X,r)$, grown best-first to depth $d$.
   2. Update the fitted model with a shrunken version of $\tilde{g}_b$: $\hat{G}_b = \hat{G}_{b-1} + \hat{g}_b$ with $\hat{g}_b = \epsilon \tilde{g}_b$.
   3. Update the residuals: $r_i = r_i - \hat{g}_b(x_i)$, $i=1,...,n$.
3. Return the sequence of fitted functions $\hat{G}_b$, $b=1,...,B$.

### Generalized Boosting by forward-stagewise fitting

> Note: $L$ is the loss function, such as negative log-likelihood for Bernoulli responses, or squared-error for Gaussian responses.

1. Define the class of functions $g(x;\gamma)$. Start with $\hat{G}_0(x) =0$, and set $B$ and the shrinkage parameter $\epsilon>0$.
2. For $b=1,...,B$ repeat the following steps:
   1. Solve $\hat{\gamma}_b = \underset{\gamma}{\mathrm{arg\,min}}\sum^n_{i=1}L(y_i, \hat{G}_{b-1}(x_i)+g(x_i;\gamma))$.
   2. Update $\hat{G}_b(x) = \hat{G}_{b-1}(x) + \hat{g}_b(x)$, with $\hat{g}_b(x) = \epsilon g(x;\hat{\gamma}_b)$.
3. Return the sequence $\hat{G}_b(x)$, $b=1,...,B$.

### Gradient Boosting

> Note: It is the most popular version of boosting.

---

> Note 2: It is quite general, can be used with any differentiable loss function.

---

> Idea: To solve 2(i) of the above generalized boosting, perform functional gradient descent on the loss function, in the n-dimensional space of the fitted vector. Since we want to be able to evaluate our new function everywhere, not just at the n original values $x_i$, once the negative gradient vector has been computed, it is approximated by a depth-$d$ tree (which can be evaluated everywhere). Taking a step of length $\epsilon$ down the gradient amounts to adding $\epsilon$ times the tree to the current function.

1. Start with $\hat{G}_0(x) =0$, and set $B$ and the shrinkage parameter $\epsilon>0$.
2. For $b=1,...,B$ repeat the following steps:
   1. Compute the pointwise negative gradient of the loss function at the current fit:
      $$
      r_i = -\left.\frac{\partial L(y_i, \lambda_i)}{\partial \lambda_i}\right\vert_{\lambda_i=\hat{G}_{b-1}(x_i)}, \,i=1,...,n
      $$
   2. Approximate the negative gradient by a depth-$d$ tree by solving
      $$\underset{\gamma}{\mathrm{minimize}}\sum^n_{i=1}(r_i-g(x_i;\gamma))^2$$
   3. Update $\hat{G}_b(x) = \hat{G}_{b-1}(x) + \hat{g}_b(x)$, with $\hat{g}_b(x) = \epsilon g(x;\hat{\gamma}_b)$
3. Return the sequence $\hat{G}_b(x)$, $b=1,...,B$.

## Hyperparameters

Tuning is important for boosting.

### Tree depth $d$

- the right choice depends on the data
- $d=1$ might underfit, while $d=7$ might overfit.
- it controls the interaction order of the model.
  - In general, boosting with $d=k$ leads to a $(k-1)$th-order interaction model.
  - A (k-1)th order interaction is also known as a k-way interaction. order-one interaction model has two-way interaction, and an order-zero model is additive.
  - $d=2$ fits a two-way interaction model, each tree involves at most two variables.
  - $d=1$ means each tree consists of a single split.

When the case is $d=1$

$\mathcal{B}_j \subseteq \mathcal{B} = {1,2,...,B}$ are the indices of the trees that made the single split using variable $j$, for $j=1,...,p$. These $B_j$ are disjoint, and some $B_j$ can be empty, and $\bigcup^p_{j=1} \mathcal{B}_j = \mathcal{B}$. Then we can write

$$
\hat{G}_B(x) = \sum^B_{b=1} \hat{g}_b(x)
= \sum^p_{j=1} \sum_{b \in \mathcal{B}_j} \hat{g}_b(x)
= \sum^p_{j=1} \hat{f}_j(x_j)
$$

Hence boosted stumps (those single splits) fits an additive model, but in a fully adaptive way, that it selects variables, and also selects howmuch action to devote to each variable.

### Shrinkage parameter $\epsilon$

- It controls the rate at which boosting fits, and hence overfits, the data.
- Small shrinkage parameter leads to a slow learning rate, so it can take many trees to adequately fit the data.
  - But it fits smoother, take much longer to overfit, and hence are less sensitive to the stopping point B.
- Because of it, many of the trees could be similar to each other.

## Relationship with other methods

Boosting is a general nonparametric function-fitting algorithm, and shares attributes with a variety of existing methods.

### Difference between Boosting and Random Forest

- Boosting is different in a fundamental way. The trees in a [random forest](/random_forests.md) are identically distributed, the same (random) treatment is repeatedly applied to the same data. With boosting, on the other hand, each tree is trying to amend errors made by the ensemble of previously grown trees.
- Unlike random forests, a boosted regression model can overfit if `B` is too large.
- Boosting often slightly outperforms a random forest, but careful tuning is needed, which requires considerable extra work, with time-costly rounds of cross-validation, whereas random forests are almost automatic.

### Compared with Generalized Additive Models (GAMs)

- Boosting fits additive, low-order interaction models by a forward stagewise strategy. GAMs are a predecessor, a semi-parametric approach toward nonlinear function fitting, with $\lambda(x)$ being the natural parameter in an exponential family, has the form

$$
\lambda(x) = \sum^p_{j=1} f_j(x_j)
$$

- The attraction of a GAM is that the components are interpretable and can be visualized.

### Compared with the Lasso

- Due to shrinkage, many of the trees could be similar to each other. Lasso could be used as a post-processor to select a subset of these trees, reweight them, and hence produce a prediction model with far fewer trees with comparable accuracy.
- However, it would introduce a new tuning parameter, which is critical to be selected correctly for the performance of the model.

## References

- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.
- [mlcourse.ai](https://mlcourse.ai/book/index.html)

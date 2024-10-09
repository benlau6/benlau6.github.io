---
title: Classification
publishDate: 2024-10-12
---

# Classification

## How to modify cost function?

For binary classification, binary cross entropy is used. It is the negative log likelihood of the Bernoulli distribution. It is a convex function, so it is easy to optimize. It is also a good choice for imbalanced datasets. It is also called log loss. It is defined as:

$$
\text{Binary cross entropy} = -\frac{1}{N}\sum_{i=1}^{N}y_i\log(\hat{p}_i) + (1-y_i)\log(1-\hat{p}_i)
$$

where $y_i$ is the true label, and $p_i$ is the predicted probability of the positive class. It is a convex function, so it is easy to optimize. It is also a good choice for imbalanced datasets, where we could put more weight on the minority class.

Similar idea extends to multi-class classification, which is called categorical cross entropy, with a slight change in the formula:

$$
\text{Categorical cross entropy} = -\frac{1}{N}\sum_{i=1}^{N}\sum_{c=1}^{C}y_{i,c}\log(\hat{p}_{i,c})
$$

Sometimes $y_{i,c}$ could be replaced by $p_{i,c}$, which is the true probability of the class.

## How to evaluate a classification model?

- Confusion matrix: A table showing the number of true positives, true negatives, false positives, and false negatives.
- Accuracy: The proportion of true results, most intuitive but can be misleading.
- Precision: The proportion of true positives among all positive predictions.
- Recall: The proportion of true positives among all actual positives.
- F1 score: The harmonic mean of precision and recall.
- ROC-AUC plot: It plots TPR against FPR under varying thresholds. Which allows us to select the best model based on what we needs. It has one interpretation in terms of the concordance statistic, which is the probability that a randomly chosen positive instance is ranked higher than a randomly chosen negative instance in terms of predicted risk. So AUC is all about rank ordering the predictions, telling how well your prediction discriminates between the two classes. [ref](https://andrewpwheeler.com/2021/05/12/roc-and-calibration-plots-for-binary-predictions-in-python/)
  - Most of the time we are only interested in the far left side of the ROC curve, i.e. how well we can identify high risk cases without a ton of false positives.
- Calibration plot: It plots the fractions of positives given each bin of predicted probability against the predicted probability, which is a graphical equivalent of the Hosmer-Lemeshow test, which assesses whether or not the observed event rates match expected event rates in subgroups of the population. It is great for production models, as it tells you how well your model is calibrated. A degraded calibration curve tells you that the model is at risk of making poor decisions, e.g. data drift, before the predictive performance starts to degrade. It can be plotted even if the response variable is not probabilities. `CalibratedClassifierCV` in sklearn can be used to calibrate the probabilities of a model, which maps the output of the classifier to a calibrated probaiblity in \[0, 1\].

## Modeling probabilities is better than discrete outcomes in classification

When performing classification you often want not only to predict the class label, but also obtain a probability of the respective label. This probability gives you some kind of confidence on the prediction. Some models can give you poor estimates of the class probabilities and some even do not support probability prediction. Calibration curve is a great measurement. [sklearn probability calibration](https://scikit-learn.org/stable/modules/calibration.html)

Logistic regression is more likely to return well calibrated predictions by itself as it has a canonical link function for its loss, i.e. the logit-link for the Log loss. In the unpenalized case, this leads to the so-called balance property.

Random forest is a relatively bad classifier because they will give not peaks near both ends, i.e. probabilities close to 0 or 1 are very rare. Niculescu-Mizil and Caruana said "variance in the underlying base models will bias predictions that should be near zero or one away from these values. Because predictions are restricted to the interval [0,1], errors caused by variance tend to be one-sided near zero and one. For example, if a model should predict p = 0 for a case, the only way bagging can achieve this is if all bagged trees predict zero. If we add noise to the trees that bagging is averaging over, this noise will cause some trees to predict values larger than 0 for this case, thus moving the average prediction of the bagged ensemble away from 0. We observe this effect most strongly with random forests because the base-level trees trained with random forests have relatively high variance due to feature subsetting."

## Logistic regression

Logistic regression gives us a linear classifier. The decision boundary separating the two predicted classes is the solution of $\beta_0 + X\beta = 0$, which is a point if x is one dimensional, a line if it is two dimensional, etc. [ref](https://www.stat.cmu.edu/~cshalizi/uADA/12/lectures/ch12.pdf).

Logistic regression not only says where the boundary between the classes is, but also says (via Eq. 12.5) that the class probabilities depend on distance from the boundary, in a particular way, and that they go towards the extremes (0 and 1) more rapidly when $\beta$ is larger. It’s these statements about probabilities which make logistic regression more than just a classifier. It makes stronger, more detailed predictions, and can be fit in a different way; but those strong predictions could be wrong.

It is just a modeling choice. We begin by positing the model, to get something to work with, and we end by checking whether it really does match the data, or whether it has systematic flaws.

## Logistic regression vs Beta regression

Logistic regression is used to model a binary variable where the regression value gives the probability of the variable being one, while Beta regression can be used to model a continuous variable from 0 to 1. i.e. It can be used to quantify the uncertainty or any rates. e.g. conversion rates, click-through rates, etc.

Moreover, beta distribution can be used as a [conjugate prior](conjugate-priors.md) to regularize the logistic regression model, whose likelihood is Bernoulli.

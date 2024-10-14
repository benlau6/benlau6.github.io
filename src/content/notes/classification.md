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

### Readings

- [Information theory of cross entropy](https://ycc.idv.tw/deep-dl_2.html)
- [A Gentle Introduction to Cross-Entropy for Machine Learning](https://machinelearningmastery.com/cross-entropy-for-machine-learning/)

## Evaluation

- Confusion matrix: A table showing the number of true positives, true negatives, false positives, and false negatives.
- Accuracy: The proportion of true results, most intuitive but can be misleading.
- Precision: The proportion of true positives among all positive predictions.
- Recall: The proportion of true positives among all actual positives.
- F1 score: The harmonic mean of precision and recall.
- ROC-AUC plot: It plots TPR against FPR under varying thresholds. Which allows us to select the best model based on what we needs. It has one interpretation in terms of the concordance statistic, which is the probability that a randomly chosen positive instance is ranked higher than a randomly chosen negative instance in terms of predicted risk. So AUC is all about rank ordering the predictions, telling how well your prediction discriminates between the two classes. [ref](https://andrewpwheeler.com/2021/05/12/roc-and-calibration-plots-for-binary-predictions-in-python/)
  - Most of the time we are only interested in the far left side of the ROC curve, i.e. how well we can identify high risk cases without a ton of false positives.
- Calibration plot: It plots the fractions of positives given each bin of predicted probability against the predicted probability, which is a graphical equivalent of the Hosmer-Lemeshow test, which assesses whether or not the observed event rates match expected event rates in subgroups of the population. It is great for production models, as it tells you how well your model is calibrated. A degraded calibration curve tells you that the model is at risk of making poor decisions, e.g. data drift, before the predictive performance starts to degrade. It can be plotted even if the response variable is not probabilities. `CalibratedClassifierCV` in sklearn can be used to calibrate the probabilities of a model, which maps the output of the classifier to a calibrated probability in \[0, 1\].

## Logistic regression

In a binary target case, even though only the actual binary outcome 0 or 1 is observed, a underlying latent continuous variable could be assumed to represent the probability of getting 1. The logistic function is used in such case for mapping the continuous variable to the binary outcome.

### Readings

- [Standford notes on logistic regression](https://web.stanford.edu/~jurafsky/slp3/5.pdf)
- [Hypothesis, cost function, regularization, and optimization of logistic regression](https://towardsdatascience.com/optimization-loss-function-under-the-hood-part-ii-d20a239cde11)

### Is logistic regression a regression or a classification?

[Is logistic regression a regression? It has been a regression since its birth — and is used this way every day.](https://medium.com/@r.clin.res/is-logistic-regression-a-regression-46dcce4945dd)

- [Why is it Logistic Regression and not Classifier?](https://www.kaggle.com/discussions/questions-and-answers/159426#2068008)

### Logistic classifier

In machine learning field, normally, we want a linear classifier from logistic regression. The decision boundary separating the two predicted classes is the solution of $\beta_0 + X\beta = 0$, which is a point if x is one dimensional, a line if it is two dimensional, etc. [ref](https://www.stat.cmu.edu/~cshalizi/uADA/12/lectures/ch12.pdf).

Logistic classifier not only says where the boundary between the classes is, but also says (via Eq. 12.5) that the class probabilities depend on distance from the boundary, in a particular way, and that they go towards the extremes (0 and 1) more rapidly when $\beta$ is larger. It’s these statements about probabilities which make logistic regression more than just a classifier. It makes stronger, more detailed predictions, and can be fit in a different way; but those strong predictions could be wrong.

It is just a modeling choice. We begin by positing the model, to get something to work with, and we end by checking whether it really does match the data, or whether it has systematic flaws.

## Logistic regression vs Beta regression

Logistic regression is used to model a binary variable or proportions of successes, while Beta regression is used to model a continuous bounded variable from 0 to 1. i.e. It can be used to quantify the uncertainty or any rates. e.g. conversion rates, click-through rates, etc. Sometimes beta regression can be extended to any continuous bounded variable by simple transformation, e.g. modeling $y_i \in (-1, 1)$ by taking $\frac{x_i+1}{2}$. [discussion](https://stats.stackexchange.com/questions/253744/regression-bounded-between-1-and-1/253746#253746)

Moreover, beta distribution can be used as a [conjugate prior](conjugate-priors.md) to regularize the logistic regression model, whose likelihood is Bernoulli.

## It is likely to suffer from imbalanced data

[Notes on imbalanced data](imbalanced-data.md)

## Modeling binary data or proportions

A binary response can be seen as ungrouped binary data, which refers to a single observation, while a proportion response can be seen as grouped binary data, which refers to a group of observations, i.e. aggregation.

When performing classification you often want not only to predict the class label, but also obtain a probability of the respective label. This probability gives you some kind of confidence on the prediction. Some models can give you poor estimates of the class probabilities and some even do not support probability prediction. Calibration curve is a great measurement. [sklearn probability calibration](https://scikit-learn.org/stable/modules/calibration.html)

Logistic regression is more likely to return well calibrated predictions by itself as it has a canonical link function for its loss, i.e. the logit-link for the Log loss. In the unpenalized case, this leads to the so-called balance property.

Random forest is a relatively bad classifier because they will give not peaks near both ends, i.e. probabilities close to 0 or 1 are very rare. Niculescu-Mizil and Caruana said "variance in the underlying base models will bias predictions that should be near zero or one away from these values. Because predictions are restricted to the interval [0,1], errors caused by variance tend to be one-sided near zero and one. For example, if a model should predict p = 0 for a case, the only way bagging can achieve this is if all bagged trees predict zero. If we add noise to the trees that bagging is averaging over, this noise will cause some trees to predict values larger than 0 for this case, thus moving the average prediction of the bagged ensemble away from 0. We observe this effect most strongly with random forests because the base-level trees trained with random forests have relatively high variance due to feature subsetting."

[discussion](https://stats.stackexchange.com/questions/312119/reduce-classification-probability-threshold/312124#312124)

### Probability modeling, i.e. proportions, is preferred most of the time

All the quotes are drawn from [Classification vs Prediction](https://hbiostat.org/blog/post/classification/index.html), which is a masterpiece.

> Classification involves a forced-choice premature decision, and is often misused in machine learning applications, because classification combines prediction and decision making and usurps the decision maker in specifying costs of wrong decisions. While probability modeling involves the quantification of tendencies and usually addresses the real project goals. > The classification rule must be reformulated if costs/utilities or sampling criteria change. Predictions are separate from decisions and can be used by any decision maker.

> It is important to think about what classification really implies. Classification is in effect a decision. Optimum decisions require making full use of available data, developing predictions, and applying a loss/utility/cost function to make a decision that, for example, minimizes expected loss or maximizes expected utility. Different end users have different utility functions. In risk assessment this leads to their having different risk thresholds for action. Classification assumes that every user has the same utility function and that the utility function implied by the classification system is that utility function.

> Classification is a forced choice. In marketing where the advertising budget is fixed, analysts generally know better than to try to classify a potential customer as someone to ignore or someone to spend resources on. Instead, they model probabilities and create a lift curve, whereby potential customers are sorted in decreasing order of estimated probability of purchasing a product. To get the “biggest bang for the buck”, the marketer who can afford to advertise to n persons picks the n highest-probability customers as targets. This is rational, and classification is not needed here.

"At any rate, if binary classification is needed, it must be done at the point of care when all utilities are known, not in a data analysis.", i.e. predicting a binary response by classification cannot give a picture of how the risk evolves, while predicting a proportion response by probability time series modeling allows the decision makers to make decisions based on their time points of care.

> When close calls are possible, or when there is inherent randomness to the outcomes, probability estimates are called for. One beauty of probabilities is that they are their own error measures. If the probability of disease is 0.1 and the current decision is not to treat the patient, the probability of this being an error is by definition 0.1. A probability of 0.4 may lead the physician to run another lab test or do a biopsy. When the signal:noise ratio is small, classification is usually not a good goal; there one must model tendencies, i.e., probabilities.

> Whether engaging in credit risk scoring, weather forecasting, climate forecasting, marketing, diagnosis a patient’s disease, or estimating a patient’s prognosis, I do not want to use a classification method. I want risk estimates with credible intervals or confidence intervals. My opinion is that machine learning classifiers are best used in mechanistic high signal:noise ratio situations, and that probability models should be used in most other situations.

> This is related to a subtle point that has been lost on many analysts. Complex machine learning algorithms, which allow for complexities such as high-order interactions, require an enormous amount of data unless the signal:noise ratio is high, another reason for reserving some machine learning techniques for such situations. Regression models which capitalize on additivity assumptions (when they are true, and this is approximately true is much of the time) can yield accurate probability models without having massive datasets. And when the outcome variable being predicted has more than two levels, a single regression model fit can be used to obtain all kinds of interesting quantities, e.g., predicted mean, quantiles, exceedance probabilities, and instantaneous hazard rates.

### Classifier is really bad in dealing with highly imbalanced sample

> A special problem with classifiers illustrates an important issue. Users of machine classifiers know that a highly imbalanced sample with regard to a binary outcome variable Y results in a strange classifier. For example, if the sample has 1000 diseased patients and 1,000,000 non-diseased patients, the best classifier may classify everyone as non-diseased; you will be correct 0.999 of the time. For this reason the odd practice of subsampling the controls is used in an attempt to balance the frequencies and get some variation that will lead to sensible looking classifiers (users of regression models would never exclude good data to get an answer). Then they have to, in some ill-defined way, construct the classifier to make up for biasing the sample. It is simply the case that a classifier trained to a 1/2 prevalence situation will not be applicable to a population with a 1/1000 prevalence. The classifier would have to be re-trained on the new sample, and the patterns detected may change greatly. Logistic regression on the other hand elegantly handles this situation by either (1) having as predictors the variables that made the prevalence so low, or (2) recalibrating the intercept (only) for another dataset with much higher prevalence. Classifiers’ extreme dependence on prevalence may be enough to make some researchers always use probability estimators like logistic regression instead. One could go so far as to say that classifiers should not be used at all when there is little variation in the outcome variable (prevalence is near 0 or 1), and that only tendencies (probabilities) should be modeled.

> A probability threshold to select individuals for a given treatment implies certain misclassification costs and should be determined using clinical considerations.8 If we use a probability threshold of 0.1 to classify individuals as high risk and suggest a specific treatment, this means that we accept to treat up to 10 individuals in order to treat 1 individual with the event: we accept up to 9 false positives, or unnecessary treatments, per true positive.9–11 As Birch and colleagues write, models should be able to accommodate differing attitudes regarding misclassification costs.12 The problem then shifts from class imbalance to probability calibration: the model’s probability estimates should be reliable in order to make optimal decisions. This raises the question how class imbalance methods affect calibration. [The harm of class imbalance corrections for risk prediction models: illustration and simulation using logistic regression](https://doi.org/10.1093/jamia/ocac093)

### So when a binary response is appropriate?

> When are forced choices appropriate? I think that one needs to consider whether the problem is mechanistic or stochastic/probabilistic. Machine learning advocates often want to apply methods made for the former to problems where biologic variation, sampling variability, and measurement errors exist. It may be best to apply classification techniques instead just to high signal:noise ratio situations such as those in which there there is a known gold standard and one can replicate the experiment and get almost the same result each time. An example is pattern recognition - visual, sound, chemical composition, etc. If one creates an optical character recognition algorithm, the algorithm can be trained by exposing it to any number of replicates of attempts to classify an image as the letters A, B, … The user of such a classifier may not have time to consider whether any of the classifications were “close calls.” And the signal:noise ratio is extremely high. In addition, there is a single “right” answer for each character. This situation is primarily mechanistic or non-stochastic. Contrast that with forecasting death or disease where two patients with identical known characteristics can easily have different outcomes.

### Why not combine binary data and proportions?

In forecasting, predicting binary data is a [bottom-up approach](https://otexts.com/fpp3/single-level.html#the-bottom-up-approach), while predicting proportions is a [top-down approach](https://otexts.com/fpp3/single-level.html#top-down-approaches). Sometimes combining those responses, i.e. a middle out approach, returning a set of coherent forecasts, would give the most accurate reconciled forecasts. This approach is also called [Forecast reconciliation](https://otexts.com/fpp3/reconciliation.html).

### Readings

- [Damage Caused by Classification Accuracy and Other Discontinuous Improper Accuracy Scoring Rules](https://www.fharrell.com/post/class-damage/)

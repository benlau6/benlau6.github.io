---
title: Feature Engineering
publishDate: 2024-10-01
---

# Feature Engineering

## Note

- Never apply feature engineering on test data to avoid data leakage.
  - e.g. to impute missing values in test data, use the median of the training data.

## Methods other than one-hot encoding

Why? Because one-hot encoding increases the dimensionality and the sparsity of the data, which most of models don't like. A large company serving millions of users might have millions of categories, so applying one-hot encoding might be infeasible.

Following methods are empirically proven to be useful in Kaggle competitions.

- Target encoding: convert categories to their mean target value, but sensitive to outliers
  - It is somehow leaking information from the fact that it is using the target value, so adding random noise to the target value is a good practice
  - Leave-one-out encoding: target encoding with the target value of the current row excluded, and apply random Gaussian noise to every target value by tuning sigma
  - Beta encoding: target encoding, but also with , and apply beta distribution
  - statistics other than mean, e.g. mode, median, variance, skewness, kurtosis might be used
  - It could be applied to important features instead of the target
- Frequency encoding: convert categories to their frequency, but may make categories with the same frequency indistinguishable
- Embedding (Cat2Vec): Train a very simple neural network to predict the target value by the categorical feature, and use the output of the hidden layer as the new feature. [ref](https://www.reddit.com/r/datascience/comments/1ayhbxb/comment/krv5bb7/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

[Other categorical encoders on github](https://github.com/scikit-learn-contrib/category_encoders)

### Why not dummy encoding?

A 2-element feature vector is enough to provide a unique mapping for a vocabulary of size 3, and this is called dummy coding. Since it is a more compact representation, it is preferred in statistical models that perform better when the inputs are linearly independent.

However, modern machine learning algorithms don't require their inputs to be linearly independent, and use methods such as L1 regularization to prune redundant inputs. Moreover, the additional degree of freedom allows the framework to transparently handle a missing input or any unknown vocabularies in production as all zeros (Lakshmanan, 2020). Therefore, many machine learning frameworks often support only one-hot encoding.

Note that if we use linear regression, we should avoid one-hot encoding because it would introduce multicollinearity, which would make the model unstable.

## Think twice before applying log transformation

For 1 though you don’t just log transform just cause the histogram is skewed. Its about the conditional distribution for Y|X, not the marginal.

And for the Xs in a regression its not even about the distribution at all, its about linearity/functional form. Its perfectly possible for X ro be non-normal but linearly related to Y or normal but nonlinearly related and then you may consider transforming (by something, not necessarily log but that’s one) to make it linear. [discussion](https://www.reddit.com/r/datascience/comments/vceaxx/comment/icdzjlh/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

## Common techniques

- Feature crosses: combine two or more features to create a new feature, which is useful for capturing interactions between features.
- Bucketing through histogram equalization: create bins based on quantiles, which would usually guarantee to create uniform distribution, except for repeated values in quantiles. After that, we removed the skewness and therefore can be applied scaling methods.
- Cyclical features: convert cyclical features, e.g. time, day of the week, month, to sine and cosine functions, so that the distance at the boundary is close to 0, i.e. Monday is close to Sunday. However, it is not necessary for tree-based models since they only consider a single feature at a time.
- Aggregation: We can group a noisy feature, e.g. rare or sparse, by bin, or group a noisy feature by another categorical feature, such that the aggregated feature is stable and less noisy.
- Log transformation on skewed data: it is useful when the data is right-skewed, i.e. the right tail is longer than the left tail.
- Log transformation on small changes: small changes in the natural log of a variable are directly interpretable as percentage changes, to a very close approximation, i.e. $log(1+r) \approx r$. [ref](https://people.duke.edu/~rnau/411log.htm)
- [forecasting feature engineering](forecasting.md#feature-engineering)
- TF-IDF is a good feature extraction technique for spam detection involving text data. It extracts important words from spam emails that are frequently occurring in spams but not in non-spams, which could then be used as one-hot encoded features to train a model. TF is the term frequency which measures how frequently a term is used in a document, while IDF is the inverse document frequency which measures how many documents use the term, i.e. measuring how important a term is. And the final scores are TF multiplying by IDF. The higher it is, the important it is to a document compared to other documents. [機器學習應用-「垃圾訊息偵測」與「TF-IDF介紹」(含範例程式)](https://chih-sheng-huang821.medium.com/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%87%89%E7%94%A8-%E5%9E%83%E5%9C%BE%E8%A8%8A%E6%81%AF%E5%81%B5%E6%B8%AC-%E8%88%87-tf-idf%E4%BB%8B%E7%B4%B9-%E5%90%AB%E7%AF%84%E4%BE%8B%E7%A8%8B%E5%BC%8F-2cddc7f7b2c5) [TF-IDF/Term Frequency Technique: Easiest explanation for Text classification in NLP using Python (Chatbot training on words)](https://medium.com/analytics-vidhya/tf-idf-term-frequency-technique-easiest-explanation-for-text-classification-in-nlp-with-code-8ca3912e58c3)

## Why normalization?

It is useful for models that are sensitive to the scale of the input features, which are:

1. distance-based models, e.g. k-NN, PCA
2. gradient descent-based models, e.g. neural networks, logistic regression
3. regularized models, e.g. lasso regression

It is useful for distance-based models to avoid some variables of high magnitude being dominating. While it helps gradient descent-based models converge faster. And it avoids regularization penalty disproportionally applied to features with larger scales. It also helps interpretability, e.g. the coefficients of linear regression would be directly comparable since they are on the same scale. However, it is not necessary for tree-based models since they are invariant to monotonic transformations of the input features, what they care about is the order of the values, not the scale. [ref](https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html#)

Note that normalization is different from standardization. Normalization scales the data into a fixed range, e.g. [0, 1], while standardization scales the data to have a mean of 0 and a standard deviation of 1. Min-max scaling is a common normalization technique, which would be sensitive to the outliers, while z-score normalization, i.e. standardization, is a common standardization technique, which would be less sensitive to the outliers.

## Examples

- [sklearn@Preprocessing](https://scikit-learn.org/stable/auto_examples/preprocessing/index.html)

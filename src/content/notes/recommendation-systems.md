---
title: Recommendation Systems
publishDate: 2024-09-20
---

# Recommendation Systems

## Content-based filtering

Recommend items based on the similarity of the content of the items.

If there are categories or tags on items, we could turn these into one-hot encoding using `pd.crosstab` and calculate the Jaccard similarity between item tags to evaluate the intersection over union of word sets.

If there are no categories or tags, but we have the content or summary of the items, we could use NLP techniques, e.g. TF-IDF to extract the document vectors, then calculate the cosine similarity between item tags to evaluate the angle between document vectors.

## Collaborative filtering

Recommend items based on the similarity of the users who have interacted with the items.

### Memory-based

- User-based: Similar characteristics of users
- Item-based: People who purchased this also purchased that, note that it is different from content-based filtering as it does not consider the content of the items, but only the user behaviors related to the items, such as buy, view, like, etc.

### Model-based

- Matrix Factorization: due to sparsity of the user-item matrix, we can use matrix factorization to reduce the dimensionality of the matrix and find the latent factors that represent the users and items, which are so much easier for computation. However, it will lead to information loss, and decrease in interpretability. Note that the number of latent factors is a essential hyperparameter to tune. We need to consider the tradeoff of information and computation cost, and the risk of overfitting.
- KNN regression: in case of unknown ratings of items, we can use KNN regression to predict the ratings based on the known ratings of the nearest neighbors.

## Model selection

Simplicity over complexity. Most of the time, we don't need advanced models to achieve good results, a miss-use of advanced models may even lead to poor results due to data sparsity, cold start problem and overfitting. Sometimes best-seller list or hand-crafted ranking list may be the best recommendation system, especially for new platforms with limited data.

## Correlation algorithms

- Pearson correlation: Good for ratings because it will normalize the ratings of users by subtracting the mean ratings of each items.
- cosine similarity: Good for high-dimensional or sparse data, defined over vectors
- Jaccard similarity: Good for low-dimensional or dense data, defined over sets

For asymmetric binary vectors, i.e. sets, or one hot encoding, to consider the difference between Jaccard similarity and cosine similarity:

$$
J(A, B) = \frac{|A \cap B|}{|A \cup B|}
$$

$$
C(A, B) = \frac{|A \cap B|}{\sqrt{|A| \cdot |B|}}
$$

We can see that the cosine similarity does not consider the intersection in the denominator, while the Jaccard similarity does. More intersections will lead to higher Jaccard similarity, but not necessarily higher cosine similarity. So if we are interested in the intersection of sets, e.g. common categories, we should use Jaccard similarity. However, if we are interested in the semantic meaning of documents, i.e. non-binary case, e.g. comparing summaries of two products, we should use cosine similarity, and Jaccard similarity is not even applicable for this case.

## Data sparsity

Users will only rate a few items which are most favored or disfavored, most of the items are not rated because users have no strong feelings about them. This leads to a sparse user-item matrix, which makes it hard to find the similarity between users or items. Sometimes calculating similarity requires imputation of missing values. As mentioned of skewness of ratings, we might impute the missing values by the mean instead of 0, or by KNN regression. But KNN still suffers from the sparsity problem, which performs poorly when the sparsity is high. In this case, we might consider matrix factorization.

## Cold start problem

It exists in the collaborative filtering, and can be categorized into two types:

- User cold start: new users with no interaction history
  - starting page, onboarding, user survey, etc. to collect user information through multiple choice questions, interested items, topics, etc.
- Item cold start: new items with no interaction history

## Exploration and Exploitation

Maximizing the profit might lead to long-term loss, because it will exploit the current best items, but ignore the potential best items. So we need to balance the exploration and exploitation, even if it leads to short-term loss compared to recommend the best profitable item. To achieve this, we could use Thompson sampling, multi-armed bandit, etc, or we could add the exploration term to the objective function, which rewards the model for exploring new items.

## User journey

1. Seeing the link to the website
2. Visit
3. Search for items
4. View a item
5. Add to cart / Save for later
6. Purchase / Order
7. Finish the payment
8. Review

## Evaluation

### Methods

- [A/B testing](causal-inference.md#ab-testing) to check confidence intervals of the metrics of the treatment group and the control group, or the cumulative treatment effects.
  - t-test
  - Regression discontinuity: point comparison, only for immediate effect
  - Difference-in-differences: aggregate the effects
  - Bayesian Structural Time Series (Causal Impact): aggregate the effects, isolate some latent factors, e.g. seasonality, trend, etc.

### Metrics

User perspective for insights on user engagement, especially if the business often sees conversions after multiple interactions:

- Conversion rate: number of purchases per user
- Click-through rate: number of clicks per user

Session perspective for insights into immediate conversion effectiveness, ideal for businesses where conversions typically happen in a single session:

- Session duration: the time spent on the platform per session
- Conversion rate: the percentage of purchases per session
- Click-through rate: the number of clicks per session

Item perspective for insights into immediate conversion effectiveness, ideal for businesses where conversions typically happen in a single recommendation, e.g. you show an ads, and you want the user to click on it without hesitation:

- Conversion rate: number of purchases per recommended item
- Click-through rate: number of clicks per recommended item

## Time horizon

It depends on the business, i.e. how long the user journey is, or how frequently a conversion happens, e.g. for news recommendation, the time window should be short, e.g. 1 day, while for e-commerce, the time window could be longer, e.g. 1 week.

## Readings

- [深入淺出常用推薦系統演算法](https://chriskang028.medium.com/%E6%B7%B1%E5%85%A5%E6%B7%BA%E5%87%BA%E5%B8%B8%E7%94%A8%E6%8E%A8%E8%96%A6%E7%B3%BB%E7%B5%B1%E6%BC%94%E7%AE%97%E6%B3%95-recommendation-system-42f2437e3e9a)
- [利用「個體經濟模型」設計與評估新聞推薦系統](https://taweihuang.hpd.io/2020/07/01/personalization-microecon/)

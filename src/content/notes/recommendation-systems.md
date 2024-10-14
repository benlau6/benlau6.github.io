---
title: Recommendation Systems
publishDate: 2024-09-20
updatedDate: 2024-10-17
---

# Recommendation Systems

## Readings

- [System Design for Recommendations and Search](https://eugeneyan.com/writing/system-design-for-discovery/)
- [Patterns for Personalization in Recommendations and Search](https://eugeneyan.com/writing/patterns-for-personalization/)
- [Bandits for Recommender Systems](https://eugeneyan.com/writing/bandits/)
- [Lecture 41 — Overview of Recommender Systems | Stanford University](https://www.youtube.com/watch?v=1JRrCEgiyHM&list=PLLssT5z_DsK9JDLcT8T62VtzwyW9LNepV&index=43)
- [21. Recommender Systems | d2l.ai](https://d2l.ai/chapter_recommender-systems/index.html)

## User journey

1. Seeing the link to the website
2. Visit
3. Search for items
4. View a item
5. Add to cart / Save for later
6. Purchase / Order
7. Finish the payment
8. Review

## Identifying the business objectives and data in hand

Identifying the business objectives to use this framework is not obvious: The technical goal is to suggest the most suitable items to users. There are many business objectives could lead to this way, e.g. increase user engagement, user retention, user satisfaction, user conversion, user click-through rate, or decrease user churn etc. When the objective comes to personalization, recommendation system might be the key tool to achieve this goal.

A recommendation system not only solves a classification task, it also solves a ranking task. It returns a list of sorted items that might be interesting to a specific user. So it also needs interaction result of a pair of user id and item id, and we need lots of these rows. [ref](https://www.evidentlyai.com/ranking-metrics/evaluating-recommender-systems)

### Use thumbs system, don't use stars system

At 2017, Facebook and Netflix had done A/B tests of the five-star system against a thumbs up/down system, and found that the simpler thumbs system collected twice as many ratings, since the Likert scale forced the users to think too much. So if you cannot give a strong incentive for users to rate items, you should use the thumbs system. [ref](https://gibsonbiddle.medium.com/a-brief-history-of-netflix-personalization-1f2debf010a1)

### Not only the choices can be personalized, but also the content

Look at Netflix, the thumbnails are personalized based on the user's behavior, e.g. the user's favorite actor, genre, etc. So when considering recommendation systems, we might also think of personalized visuals, e.g. thumbnails, titles, descriptions, etc.

## Content-based filtering

Recommend items based on the similarity of the content of the items. It suffers less from the cold start problem, because it only needs item profiles, maybe some tags, and a specific user interaction to some categories, but no interactions from other users are required. [google course](https://developers.google.com/machine-learning/recommendation/content-based/basics) [blog](https://redfield.ai/content-based-recommendation/)

For example, if a user likes comedy, another comedy is recommended.

### Vector space model

We can create vectors for items based on the content of the items, and the interaction history of the users to those content.

If there are categories or tags on items, we could turn these into one-hot encoding using `pd.crosstab` and calculate the Jaccard similarity between item tags to evaluate the intersection over union of word sets.

If there are no categories or tags, but we have the content or summary of the items, we could use NLP techniques, e.g. TF-IDF to extract the document vectors, then calculate the cosine similarity between item tags to evaluate the angle between document vectors.

### Classification model

> Ranking can be modeled as a learning-to-rank or classification task, with the latter being more commonly seen. If deep learning is applied, the final output layer is either a softmax over a catalog of items, or a sigmoid predicting the likelihood of user interaction (e.g., click, purchase) for each user-item pair.

> However, In general, softmax of catalog implies a fixed set of output items. Thus, whenever new items are added to the catalog, you'll have to change the output layer and retrain the model. In addition, training with a large softmax layer is time-consuming. Though several techniques could be used to improve this. On the other hand, sigmoid of user-item pair can work with any number of items, as well as new items (provided the item embeddings are available). That said, it requires one prediction for each user-item pair and could be costly if many there are many pairs. (Contrast this with the softmax approach where you only need to predict once to get probabilities for all items). So Youtube use softmax instead of sigmoid. [ref](https://github.com/eugeneyan/eugeneyan-comments/issues/44#issuecomment-872654515)

User profiles could also be used as features in this setting, which could act as a pooling or generalization effect that benefits new users with no interaction history.

For example, Google used deep neural networks for Youtube recommendations, which treated [recommendation as classification](https://static.googleusercontent.com/media/research.google.com/zh-TW//pubs/archive/45530.pdf).

### Regression model

In small sample size, we could first classify users into groups, then calculate rate of interaction of each group to each item, or each group of item, then use regression to predict the interaction rate of a new user to a new item, which would make it more robust to avoid the problem of low signal to noise ratio from the small sample size.

## Collaborative filtering

Recommend items based on the similarity of the users who have interacted with the items, aka training on embeddings. In this framework, we don't need user profiles or item profiles, we only need the user-item interaction matrix. The interactions could be explicit, e.g. ratings, or implicit, e.g. clicks, views, etc. But it suffers from the cold start problem that a new user or a new item has no interaction history.

For example, if user A is similar to user B and user B likes a certain video, then this video is recommended to user A.

By training different embeddings, we can provide different recommendations based on the context, e.g users similar to you also like, items similar to items you like, etc.

### Memory-based

Memory-based CF systems work with recorded values from item-item or user-user interactions assuming no model. Search is done based on similarities and nearest neighbours algorithms. For example, find the users that are the closest to user A and suggest items purchased by them. [ref](https://neptune.ai/blog/recommender-systems-metrics)

- User-based: Similar behaviors of users
- Item-based: People who purchased this also purchased that, note that it is different from content-based filtering as it does not consider the content of the items, but only the user behaviors related to the items, such as buy, view, like, etc.

### Model-based

Model-based approaches assume a generative model that explains user-item interactions and makes new predictions. They make use of matrix factorization algorithms that decompose the sparse user-item matrix into a product of two matrices: user-factor and item-factor. Recently, a lot of methods are being researched in the area of model-based RS. For example association rules, clustering algorithms, deep neural networks, etc.

- KNN regression: in case of unknown ratings of items, we can use KNN regression to predict the ratings based on the known ratings of the nearest neighbors.
- Matrix Factorization: due to sparsity of the user-item matrix, we can use matrix factorization to reduce the dimensionality of the matrix and find the latent factors that represent the users and items, which are so much easier for computation. However, it will lead to information loss, and decrease in interpretability. Note that the number of latent factors is a essential hyperparameter to tune. We need to consider the tradeoff of information and computation cost, and the risk of overfitting.

#### Matrix Factorization

- [Welcome to the Matrix Factorization Jungle](https://nuit-blanche.blogspot.com/2011/08/current-jungle-in-matrix-factorization.html)
- [Welcome to The Advanced Matrix Factorization Jungle](http://web.archive.org/web/20230321160024/https://sites.google.com/site/igorcarron2/matrixfactorizations)
- [Welcome to The Advanced Matrix Factorization Jungle Backup](https://www.52cs.com/archives/606)

## Data sparsity

Users will only rate a few items which are most favored or disfavored, most of the items are not rated because users have no strong feelings about them. This leads to a sparse user-item matrix, which makes it hard to find the similarity between users or items. Sometimes calculating similarity requires imputation of missing values. As mentioned of skewness of ratings, we might impute the missing values by the mean instead of 0, or by KNN regression. But KNN still suffers from the sparsity problem, which performs poorly when the sparsity is high. In this case, we might consider matrix factorization.

## Cold start problem

It exists in the collaborative filtering, and can be categorized into two types:

- User cold start: new users with no interaction history
  - starting page, onboarding, user survey, etc. to collect user information through multiple choice questions, interested items, topics, etc.
- Item cold start: new items with no interaction history

Here is an [example](https://making.lyst.com/lightfm/docs/examples/hybrid_crossvalidated.html) of LightFM to solve the item cold start problem on recommending StackExchange questions.

Here is another [example](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/gunawardana09__unified_approac_build_hybrid_recom_system.pdf) of Microsoft to solve the cold-start problem by a unified Boltzmann machines, which are probailistic models that combine collaborative and content information in a coherent manner.

## Exploration and Exploitation

Maximizing the profit might lead to long-term loss, because it will exploit the current best items, but ignore the potential best items. In the long run, those recommendations might be boring and repetitive. So we need to balance the exploration and exploitation, even if it leads to short-term loss compared to recommend the best profitable item. To achieve this, we could use Thompson sampling, multi-armed bandit, etc, or we could add the exploration term to the objective function, which rewards the model for exploring new items.

## Model selection

Simplicity over complexity. Since 2007 Netflix Price, after 16 years of research Netflix had improved the recommendation system recall only 4%. Most of the time, we don't need advanced models to achieve good results, a miss-use of advanced models may even lead to poor results due to data sparsity, cold start problem and overfitting. Sometimes best-seller list or hand-crafted ranking list may be the best recommendation system, especially for new platforms with limited data and development time. [a history of netflix recommendation systems](https://gibsonbiddle.medium.com/a-brief-history-of-netflix-personalization-1f2debf010a1)

### Logistic Regression vs recommendation system

- [Logistic regression vs Recommendor system discussion](https://stats.stackexchange.com/questions/418477/logistic-regression-vs-recommendor-system)
- [Identifying machine learning techniques for classification of target advertising](https://www.sciencedirect.com/science/article/pii/S2405959520301090?ref=pdf_download&fr=RR-2&rr=8d357575bd9207a9)

- [Machine Learning Approaches for Learning Analytics: Collaborative Filtering Or Regression With Experts?](http://ml4ed.cc/attachments/LeeLCCS.pdf)
- [A comparative study: classification vs. user-based collaborative filtering for clinical prediction](https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-016-0261-9)
- [Spotify used logistic loss for implicit matrix factorization in the context of music recommendations using play counts](https://stats.stackexchange.com/a/125351)
- [A Music Recommendation System Based on logistic regression and eXtreme Gradient Boosting](https://haoyetiancoder.github.io/papers/tian2019a.pdf)

## Evaluation

### Readings

- [10 metrics](https://www.evidentlyai.com/ranking-metrics/evaluating-recommender-systems)
- [neptune.ai on metrics](https://neptune.ai/blog/recommender-systems-metrics)

### Similarity metrics

- Pearson correlation coefficient: Good for ratings because it will normalize the ratings of users by subtracting the mean ratings of each items.
- Cosine similarity: Good for high-dimensional or sparse data, defined over vectors
- Jaccard similarity: Good for low-dimensional or dense data, defined over sets

For asymmetric binary vectors, i.e. sets, or one hot encoding, to consider the difference between Jaccard similarity and cosine similarity:

$$
J(A, B) = \frac{|A \cap B|}{|A \cup B|}
$$

$$
C(A, B) = \frac{|A \cap B|}{\sqrt{|A| \cdot |B|}}
$$

We can see that the cosine similarity does not consider the intersection in the denominator, while the Jaccard similarity does. More intersections will lead to higher Jaccard similarity, but not necessarily higher cosine similarity. So if we are interested in the intersection of sets, e.g. common categories, we should use Jaccard similarity. However, if we are interested in the semantic meaning of documents, i.e. non-binary case, e.g. comparing summaries of two products, we should use cosine similarity, and Jaccard similarity is not even applicable for this case.

### Predictive metrics

They indicates the relevance of the recommended item to the user, could be calculated from interactions, e.g. clicks, views, purchases, etc. Note that they are usually bad, and ranking metrics are usually better, because recommendation is usually a ranked list, not single item.

- graded relevance score: regression [metrics](metrics.md)
- binary relevance label: classification metrics

#### Precision at K

It measures the proportion of relevant items among top K recommended items. It is easy to interpret. However, it has no rank awareness, and it is sensitive to the number of relevant items, that averaging the precision at K across all users might not be a good idea, and it is impossible to reach perfect precision when the K is larger than the total number of relevant items in the dataset. The highest precision at ten when there is only 3 total relevant items could be stuck at 30%.

#### Recall at K

It measures the coverage of relevant items in the top K, the denominator for this is the number of all relevant items, while the denominator for precision is K. Recall at K works well for applications with only a few relevant items, for example, in topic-specific information retrieval. You might expect the system to be able to return all relevant items in the search results, even at the cost of Precision. However, it also has no rank awareness, and it is also sensitive to the number of relevant items, that if the total number of relevant items is larger than K, the recall can never reach 1. When it is much larger, it could never reach 0.1. And it requires knowing the number of all relevant items, which is often impossible, that we don't know the true relevance score for items the user did not see. [details on precision at K and recall at K](https://www.evidentlyai.com/ranking-metrics/precision-recall-at-k) - F-score at K: Precision focuses on how accurate the system is when it recommends items, while recall emphasizes capturing all relevant items, even if it means recommending some irrelevant ones. F Beta score combines them to provide a balanced assessment, with a Beta parameter let us to control the balance.

### Ranking metrics

Most recommendations and ranking scenarios involve lots of items. The users can't feasibly interact with all of them. You can't obtain enough actual labels.

- Mean Reciprocal Rank (MRR) calculates the average of the reciprocal ranks of the first relevant item, i.e. how soon you can find the first relevant item. If the first relevant items takes the third place, then the RR equals 1/3. MRR is calculated by taking average of all users or queries. However, it solely focuses on the first relevant item, and disregards all the rest.
- Mean Average Precision (MAP) at K measures the average precision across different recall levels for a ranked list. It heavily rewards correct recommendations at the top of the list, but it might be hard to communicate. ![calculation](https://cdn.prod.website-files.com/660ef16a9e0687d9cc27474a/662c43274f595f388968dd6e_65777082ed049fa9c7ac63fe_ranking_evalutions14.png)
- Hit rate at K measures the share of users that get at least one relevant recommendation in the top K, which is a binary score for each user, then be averaged across all users.
- Normalized Discounted Cumulative Gain (NDCG) at K is complicated, even I cannot understand it in 2 minutes, it would be so hard to interpret to a layman, so just skip it.

### Behavioral metrics

Metrics can go beyond accuracy and evaluate other important qualities of a recommender system

- Diversity evaluates the variety of items recommended to users, which could be measured by the intra-list diversity, i.e. averaging cosine distance between pairs of items inside the list.
- Novelty evaluates how unique or unusual the recommended items are, which could be computed as the negative logarithm of the probability of encountering a given item in a training set, i.e. the surprise in information theory. High novelty corresponds to long-tail items that few users interacted with, while low novelty corresponds to popular items. It reflects the system's ability to recommend items that are not well-known in the dataset.
- Serendipity evaluates the unexpectedness of the recommended items, which could be measured by dissimilarity between successfully recommended items and a user's historical preferences via cosine distance. It is different from novelty that it is only about the specific user that the system is recommending to, while novelty is about the general population.
- Popularity bias evaluates the tendency of the system to recommend popular items, indicating a lack of personalization. There are many ways to calculate this, one of which could be calculated by average overlap between the items in the lists.

### Business metrics

- Revenue
- Click-through rate (CTR)
- Conversion rate
- User engagement metrics, e.g. session duration, bounce rate (the percentage of users who leave after only viewing one page or item), etc.

### Perspective

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

### Time horizon

It depends on the business, i.e. how long the user journey is, or how frequently a conversion happens, e.g. for news recommendation, the time window should be short, e.g. 1 day, while for e-commerce, the time window could be longer, e.g. 1 week.

## Evaluation after deployment

### Methods

- [A/B testing](causal-inference.md#ab-testing) to check confidence intervals of the metrics of the treatment group and the control group, or the cumulative treatment effects.
  - t-test
  - Regression discontinuity: point comparison, only for immediate effect
  - Difference-in-differences: aggregate the effects
  - Bayesian Structural Time Series (Causal Impact): aggregate the effects, isolate some latent factors, e.g. seasonality, trend, etc.

## Linking back to traditional statistics

- PCA is a kind of matrix factorization. [ref](https://math.stackexchange.com/questions/3869/what-is-the-intuitive-relationship-between-svd-and-pca)

## Readings

- [深入淺出常用推薦系統演算法](https://chriskang028.medium.com/%E6%B7%B1%E5%85%A5%E6%B7%BA%E5%87%BA%E5%B8%B8%E7%94%A8%E6%8E%A8%E8%96%A6%E7%B3%BB%E7%B5%B1%E6%BC%94%E7%AE%97%E6%B3%95-recommendation-system-42f2437e3e9a)
- [利用「個體經濟模型」設計與評估新聞推薦系統](https://taweihuang.hpd.io/2020/07/01/personalization-microecon/)
- [Introduction to Recommender systems@thingsolver](https://thingsolver.com/blog/introduction-to-recommender-systems/)
- [Introduction to Recommendation systems@Google](https://developers.google.com/machine-learning/recommendation)

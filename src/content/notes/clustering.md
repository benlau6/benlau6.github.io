---
title: Clustering
publishDate: 2024-09-30
---

# Clustering

Interpretation of the clusters is the key objective. We can use summary statistical to describe the clusters, or use tree-based model to refit the predicted clusters given the features, and look at the tree splits to interpret the clusters. [ref](https://www.linkedin.com/advice/3/what-best-way-interpret-clustering-algorithm-results-5xjxe)

## Evaluation

- [Silhouette analysis@sklearn](https://scikit-learn.org/1.5/auto_examples/cluster/plot_kmeans_silhouette_analysis.html)
- [Clustering performance evaluation sklearn](https://scikit-learn.org/stable/modules/clustering.html#clustering-performance-evaluation)
- Leave some data out, add the data afterwards, is the model robust?
- Randomly subset your data and bootstrap to verify your clustering is stable
- Check for any cluster tendencies in the first place before clustering: [Hopkins statistic](https://en.m.wikipedia.org/wiki/Hopkins_statistic) [python package](https://github.com/lachhebo/pyclustertend)

## Methods

### DBSCAN does clustering and outlier flagging at the same time

[discussion](https://www.reddit.com/r/datascience/comments/u5kkw6/comment/i531akr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

It first defines two parameters: `eps` and `min_samples`. `eps` is the radius from point A to search for any other point, i.e. maximum distance between two samples for one to be considered as in the neighborhood of the other. `min_samples` is the number of samples in a neighborhood for a point to be considered as a core point.

DBSCAN will starts from an arbitrary point, check if there are at least `min_samples` points within `eps` distance to the origin, if yes, expand the cluster by adding all points to the cluster, and pick an unvisited point within the cluster to repeat the process. Loop until all points in the cluster are visited. Then move to the next arbitrary point, and repeat the process.

If the cluster has more than `min_samples`, the origin point is considered as a core point. If a point is not a core point but is within `eps` distance to a core point, it is considered as a border point. If a point is not a core point and is not within `eps` distance to a core point, it is considered as an outlier.

### K-means

[Analytics Vidhya | An Introduction to K-Means Clustering](https://www.analyticsvidhya.com/blog/2019/08/comprehensive-guide-k-means-clustering/)

Typically, it uses the Euclidean distance, which may not be suitable for all data types.

Steps:

1. Decide the number of clusters k
2. Randomly pick k points to place the initial centroids
3. Assign each data point to the nearest centroid
4. After all data points are assigned, recalculate the centroids of the clusters by taking the mean of all data points in each cluster
5. Repeat assigning and recalculating until the centroids do not change significantly or the maximum number of iterations is reached

As a result, it would:

- Grouping similar data points together
- Minimizing the distance between the data points and the centroid
- Maximizing the distance between the centroids

#### K-means is an application of Expectation-Maximisation

#### K-means is not KNN

KNN and K-means are often confused. KNN is a classification algorithm which takes K nearest neighbors and then estimates the class of the unknown by its neighbors. K-means is where K centroids are calculated and then the points are tied to whatever centroid they're closest to and then labeled.

### k-prototype works well with mixed data types including categorical variables

### Hierarchical clustering

[Analyhtics Vidhy@What is Hierarchical Clustering in Python?](https://www.analyticsvidhya.com/blog/2019/05/beginners-guide-hierarchical-clustering/)

It tells you pairwise, what two things are most similar in each step. It does not need to pre-specify number of clusters, but it is computationally expensive. It is not suitable for large datasets. However, it provides a visual representation of the clusters in a dendrogram.

It can identify nested clusters, meaning it can find clusters within them. This is useful for datasets with a natural hierarchical structure (e.g., taxonomy of biological species).

It also offers flexibility in distance metrics (e.g., Euclidean, Manhattan) and linkage criteria (e.g., single, complete, average). This flexibility can improve clustering performance on different types of data.

It could be agglomerative or divisive. The former is bottom-up and the latter is top-down. Agglomerative starts with each data point as a cluster and then merges the closest clusters until a stopping criterion is met. Divisive starts with all data points in one cluster and then splits the cluster until a stopping criterion is met.

We could apply hierarchical clustering to data points by measuring the distance between them, if the rows are data points. We could also apply it to features by measuring the distance between them, if we turn the rows into features by using correlation matrix, and turning the correlation into distance by $d_{ij}=1-abs(\rho_{ij})$. [sklearn implementation](https://scikit-learn.org/stable/auto_examples/inspection/plot_permutation_importance_multicollinear.html#handling)

#### It can improve interpretability

- Handle permutation importance multicollinearity? [sklearn example](https://scikit-learn.org/stable/auto_examples/inspection/plot_permutation_importance_multicollinear.html#handling-multicollinear-features) Spoiler alert: seems like it makes no difference from just removing highly correlated features.
  - The problem is that the importances of highly correlated features would be largely underestimated since they contribute similar predictive powers with similar data adjustments. In short, hierarchical clustering groups any pair of highly correlated features into a node that could be further grouped, and keeps grouping until a threshold is reached. While grouping, one out of two features would be removed. At the end of grouping, only the features with lowest correlation would be kept. This way, the importances of the features could be reported accurately.
  - How does it differ from just removing highly correlated features based on a correlation threshold? Removing all the features with correlation $>0.56$ in the upper triangle of correlation matrix gives similar results to hierarchical clustering. So maybe just simply removing highly correlated features is enough? [code](https://gist.github.com/benlau6/54d0dabaabe9cdf3d1a9b5cee8577a32)
- Handle observational causal inference multicollinearity [airbnb paper](https://airbnb.tech/wp-content/uploads/sites/19/2023/12/31.KDD-Paper-Hierarchical-Clustering-As-a-Solution-to-Multicollinearity-%E2%80%93-Marketing-Application-as-an-Example.pdf)
  - "While common solutions such as shrinkage estimators, principal component regressions, and partial linear regression are helpful in prediction problems, a crucial limitation hinders their applicability to causal inference problems -— they cannot provide the original causal relationships."

## Industries

- [Customer Segmentation with RFM Analysis and Clustering Algorithms.](https://pub.aimind.so/customer-segmentation-with-rfm-analysis-and-clustering-algorithms-ceadb3c4ad46) - Create RFM scores using quantiles on recency, frequency, and monetary value respectively, concatenating them instead of adding, and then cluster them using RFM without scores with KMeans. As a result, clustering helps us to segment customers into groups where as RFM scoring helps us to interpret the clusters.
- [How often you get to use unsupervised ML models? What is your go to model?](https://www.reddit.com/r/datascience/comments/u5kkw6/how_often_you_get_to_use_unsupervised_ml_models/)
- [Has anyone here been successful applying clustering algorithms on real data?](https://www.reddit.com/r/statistics/comments/hw8sfo/d_has_anyone_here_been_successful_applying/)
- [Has Anyone Actually Used Clustering to Solve an Industry Problem?](https://www.reddit.com/r/datascience/comments/hqfvp4/has_anyone_actually_used_clustering_to_solve_an/)
  - Yes. I had to categorize new products based on a set of features so that we could accurately price it for the market.
  - Also a retail data scientist, we've clustered transactions to understand customer motivations too.
  - Clustered to learn important member features, characterize target populations for a new health program.
  - In IT Ops we cluster tickets so we can identify common problems and find opportunities for automation.
  - Recsys, I approach those as a combo of clustering, then regression. First you cluster your current data, then you regress new samples to fit then in your clusters. Recommend stuff according to the cluster. I'm currently implementing a system like this for music recommendation. Using agglomerative clustering and random forest regression.
  - Had a project to determine the location that would minimize the shipping distance from a distribution center to stores in its region. Clustering is great for that.
  - Yeah, it's one of the most important/bang-for-buck tools. I use it extensively in recommendation systems, and clustering made the difference between a non-viable product and a viable-product for us.
    - We use clustering as a form of lossy compression to summarize large usage histories.
      - The typical single-user-vector approach from collaborative filtering didn't work for us because of what our problem-space looks like. Not viable.
      - Looking at a user as a collection of N weighted item vectors, one per item that they ever interacted with worked perfectly, but it's too expensive. Not viable.
      - Clustering is used to summarize a large history to a much smaller set of virtual item vectors that provide higher-resolution information about the user, but which don't scale boundlessly as the usage histories get larger.
  - Clustering for topic detection, which powers an internal knowledge base. Clustering to understand ‘user activity profiles’ (eg content producer, curator, lurker, etc). Cluster centroids were used to map each user to the closest cluster and then this is used as a feature for the recommended system.

[Customer Segmentation - Mixed Data Types](https://www.reddit.com/r/datascience/comments/1gjij6n/customer_segmentation_mixed_data_types/)

> When working with mixed data types for unsupervised learning, I’ve found that using models like k-prototypes (which handles both categorical and numerical data) or Gower distance (a measure that works well for mixed data) can be effective for clustering. Preprocessing is crucial; I typically standardize numerical features and encode categorical variables using methods like one-hot encoding or label encoding, depending on the model.
>
> For more nuanced approaches, some practitioners run separate cluster analyses for categorical and numerical variables, then combine the results using ensemble methods or apply dimensionality reduction techniques (e.g., PCA for numerical data, MCA for categorical data) before clustering.
>
> In terms of adding value, using ML for customer segmentation has allowed my team to uncover unexpected customer personas that didn't surface with RFM analysis alone. These insights have led to more personalized, behavior-based marketing strategies, improving customer engagement and conversion rates. [ref](https://www.reddit.com/r/datascience/comments/1gjij6n/comment/lve6wyd/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

> It’s more informative to do the clustering on rfm features and then look to see what demographic stratifications there are in the clusters after the fact

> I would create the segments with RFM first then use clustering method. You can run a campaign to target both methods using A/B testing to see which one did better.
>
> At my company, we used RFM a lot and gotten faster and profitable results on targeting customers from marketing campaign. The stakeholders want simple solutions and need to understand how customers were segmented. RFM is a lot easier to explain than clusters.

## Readings

- [不要再用K-means！ 超實用分群法DBSCAN詳解](https://axk51013.medium.com/%E4%B8%8D%E8%A6%81%E5%86%8D%E7%94%A8k-means-%E8%B6%85%E5%AF%A6%E7%94%A8%E5%88%86%E7%BE%A4%E6%B3%95dbscan%E8%A9%B3%E8%A7%A3-a33fa287c0e)
- [StatQuest: K-means clustering](https://www.youtube.com/watch?v=4b5d3muPQmA)
- [Clustering: K-means and Hierarchical](https://www.youtube.com/watch?v=QXOkPvFM6NU)

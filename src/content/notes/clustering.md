---
title: Clustering
publishDate: 2024-09-30
---

# Clustering

## Hierarchical clustering can improve interpretability

- Handle permutation importance multicollinearity? [sklearn example](https://scikit-learn.org/stable/auto_examples/inspection/plot_permutation_importance_multicollinear.html#handling-multicollinear-features) Spoiler alert: seems like it makes no difference from just removing highly correlated features.
  - The problem is that the importances of highly correlated features would be largely underestimated since they contribute similar predictive powers with similar data adjustments. In short, hierarchical clustering groups any pair of highly correlated features into a node that could be further grouped, and keeps grouping until a threshold is reached. While grouping, one out of two features would be removed. At the end of grouping, only the features with lowest correlation would be kept. This way, the importances of the features could be reported accurately.
  - How does it differ from just removing highly correlated features? Removing all the features with correlation $>0.56$ gives similar results to hierarchical clustering. So maybe just simply removing highly correlated features is enough? [code](https://gist.github.com/benlau6/54d0dabaabe9cdf3d1a9b5cee8577a32)
- Handle observational causal inference multicollinearity [airbnb paper](https://airbnb.tech/wp-content/uploads/sites/19/2023/12/31.KDD-Paper-Hierarchical-Clustering-As-a-Solution-to-Multicollinearity-%E2%80%93-Marketing-Application-as-an-Example.pdf)
  - "While common solutions such as shrinkage estimators, principal component regressions, and partial linear regression are helpful in prediction problems, a crucial limitation hinders their applicability to causal inference problems -— they cannot provide the original causal relationships."

## Readings

- [不要再用K-means！ 超實用分群法DBSCAN詳解](https://axk51013.medium.com/%E4%B8%8D%E8%A6%81%E5%86%8D%E7%94%A8k-means-%E8%B6%85%E5%AF%A6%E7%94%A8%E5%88%86%E7%BE%A4%E6%B3%95dbscan%E8%A9%B3%E8%A7%A3-a33fa287c0e)
- [StatQuest: K-means clustering](https://www.youtube.com/watch?v=4b5d3muPQmA)
- [Clustering: K-means and Hierarchical](https://www.youtube.com/watch?v=QXOkPvFM6NU)

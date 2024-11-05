---
title: Association Rule Learning
publishDate: 2024-11-09
---

# Association Rule Learning

This is a type of machine learning that is used to find the association between items in a dataset. It could be used in market basket analysis to find the association between items that are frequently bought together. So that those items can be placed together in the store to increase sales, or we would know what to suggest next at the end of a blog post / video. [blog](https://artsdatascience.wordpress.com/2018/05/06/frequent-itemsets-%e5%a6%82%e4%bd%95%e6%95%b8%e5%be%97%e6%9c%80%e5%bf%ab%ef%bc%9f/)

## Difference between this and Collaborative Filtering

Collaborative filter is more powerful in that it breaks the independence of behavior among users, which allows for information sharing and surfacing of recommendations of items that are yet to be observed in a “basket”. However, it is much more computational expensive and data intensive. Note that AR mines for item-item similarity, which can be seen as a subset of CF.

Collaborative filtering is most effective when we have a rich history of users data which in turn helps us to build the recommender systems which is not the case with Market basket analysis which uses association rules to recommend you products based on the items in your basket. [ref](https://www.quora.com/How-is-association-rule-compared-with-collaborative-filtering-in-recommender-systems)

Note that market basket analysis is widely used in retail industry where as collaborative filtering is used by tech giants like Amazon, Netflix, etc., who possess a wide range of user information.

## Algorithms

- Apriori
- FP-Growth: typically used, a lot faster

## Tools

- [mlxtend.frequent_patterns](https://rasbt.github.io/mlxtend/api_subpackages/mlxtend.frequent_patterns/): [example](https://artsdatascience.wordpress.com/2019/12/10/python-%E5%AF%A6%E6%88%B0%E7%AF%87%EF%BC%9Aapriori-algorithm/)

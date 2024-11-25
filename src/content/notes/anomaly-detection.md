---
title: Anomaly Detection
publishDate: 2024-09-30
---

# Anomaly Detection

Basically anomalies equal to outliers. There is a special interpretation that anomalies are unusual patterns, which need not to be as extreme as outliers. Usually the anomalies are the minority class in the dataset, so unsupervised learning algorithms are key methods to detect them, such as [clustering](clustering.md). Otherwise, careful examination as described in [imbalanced data](imbalanced-data.md) might be needed to perform supervised learning. Another approach could be to model the data generation process, for example by Bayesian structural time series modeling, and detect the anomalies by comparing the model's prediction with the actual data.

## Some algorithms other than machine learning

### Levenshtein distance

Scammers will likely use emails or links that resemble real ones. So we could use the similarity of strings used between any users and celebrities to detect scammers. In this case, we could use Levenshtein distance to calculate the edit distance between two strings due to insertion, deletion, and substitution, which takes O(m\*n) Note that it does not have knowledge of semantics, which is exactly what we need in this case, because scammers usually just alter a few characters to make the link look real, without any semantic meaning. However, we might implement a custom Levenshtein distance function to add more weights on visually similar characters, such as `0` and `O`, `1` and `l`, etc.

### Benford's Law

Benford's Law states that in many naturally occurring collections of numbers, the leading significant digit is likely to be small. For example, in sets that obey the law, the number 1 appears as the most significant digit about 30% of the time, while 9 appears as the most significant digit less than 5% of the time. It is used to detect fraud in accounting, and tax evasion, because people tend to invent numbers with a uniform distribution, while real numbers have a non-uniform distribution. [ref](https://en.wikipedia.org/wiki/Benford%27s_law)

- [Why do Biden's votes not follow Benford's Law?](https://www.youtube.com/watch?v=etx0k1nLn78)
- [Application of Benford’s law in Data Analysis](Application of Benford’s law in Data Analysis)
- [Unveiling the Power of Benford’s Law and how it’s Revolutionizing Data Science](https://medium.com/ds3ucsd/benfords-law-and-its-many-applications-in-data-science-875bac4d562c)

## Two approaches

1. Accept those outliers by using robust models that are not sensitive to outliers, e.g. Student's t-regression, whose tails are heavier which interprets the outliers as part of the possible outcomes without altering the model's parameters.
2. Remove those outliers and model the data generating process with the rest of the data, such that the model can capture the underlying pattern of the normal data. So when an outlier comes, it is detected as an anomaly, whose behavior is different from the predicted value from normal data generating process. Note that it works for regression, e.g. for sensor data, because actual anomalies could be observed immediately. However, it might not be applicable for classification, e.g. fraud detection, because frauds shall be prevented, but not observed, which would be too late.

Or from sklearn, many applications require being able to decide whether a new observation belongs to the same distribution as existing observations(it is an inlier), or should be considered as different (it is an outlier).Often, this ability is used to clean real data sets. Two important distinction must be made: [sklearn ref](https://scikit-learn.org/1.5/modules/outlier_detection.html)

- novelty detection: the training data is not polluted by outliers, and we are interested in detecting anomalies in new observations. E.g. one-class SVM
- outlier detection: the training data contains outliers, and we need to fit the central mode of the training data, ignoring the deviant observations. E.g. Isolation Forest

In the context of outlier detection, the outliers/anomalies cannot form a dense cluster as available estimators assume that the outliers/anomalies are located in low density regions. On the contrary, in the context of novelty detection, novelties/anomalies can form a dense cluster as long as they are in a low density region of the training data, considered as normal in this context.

## Use IQR instead of standard deviation for non-normal distributions

- Robustness to outliers: Outliers badly affect the mean and standard deviation of the dataset. These may statistically give erroneous results. The IQR measures the range between the first (Q1) and third (Q3) quartiles, encompassing the middle 50% of the data. This makes it less sensitive to extreme values or outliers.
- Non-Normal skewed distributions: When data is not normally distributed or skewed distributed, the standard deviation may not accurately reflect the spread of the data. The IQR is a better measure of variability in such cases, as it focuses on the central portion of the data. [blog](https://tidsskriftet.no/en/2020/06/medisin-og-tall/mean-and-standard-deviation-or-median-and-quartiles)

## One-class SVM

It uses kernel to project features to high-dimensional space. By maximizing the margin between the hyperplane and the data points, it tries to find the hyperplane that separates the data points from the origin the most. [ref](https://cyeninesky3.medium.com/oneclass-svm-%E7%95%B0%E5%B8%B8%E6%AA%A2%E6%B8%AC%E4%BB%BB%E5%8B%99-anomaly-detection-%E7%9A%84%E7%AE%97%E6%B3%95%E7%90%86%E8%A7%A3%E8%88%87%E5%AF%A6%E8%B8%90-cf5f0bbb01c0)

It is a novelty detection algorithm. In one-class SVM, the hyperplane is only learnt from the normal class, while the outliers are ignored. So the training dataset should not contain anomalies, because the model might learn from those anomalies if the algorithm misclassify some anomalies as normal, which will distort the hyperplane. However, it might be fine when the dataset has high dimensionality, or we have no assumption about the distribution of the data. [ref](https://www.cnblogs.com/wj-1314/p/10701708.html)

This algorithm is good in that the kernel trick allows for a much larger class of functions by nonlinearly maping into a high-dimensional feature space, and thereby increases the chances of a separation from the origin being possible. In particular, using a Gaussian kernel, such a separation is always possible. Secondly, the nu trick bounds the fractions of outliers and support vectors from above and below, respectively, so it allows for the possibility of outliers. [Estimating the Support of a High-Dimensional Distribution](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-99-87.pdf)

### What is a support vector machine?

- [Nature | What is a support vector machine?](https://www.nature.com/articles/nbt1206-1565): It contains four basic concepts, which are the separating hyperplane, the maximum-margin hyperplane, the soft margin and the kernel function.
  - The separating hyperplane is a generalization of string line in a high-dimensional space, so essentially it is the line that separates the samples the most.
  - The maximum-margin hyperplane: There are many hyperplanes, but which hyperplanes are the best classifier? SVM answer it by defining the distance from the separating hyperplane to the nearest expression vector as the margin of the hyperplane. Finding the maximum-margin hyperplane is the goal of a support vector machine.
  - The soft margin introduce tolerance to some data points wrongly placed at the opposite side without affecting the final result.
  - The kernel function guarantees there must be a hyperplane that allow the data to be linearly separated.
- [Support Vector Machine — Introduction to Machine Learning Algorithms](https://towardsdatascience.com/support-vector-machine-introduction-to-machine-learning-algorithms-934a444fca47)
  - Support vectors are data points that are closer to the hyperplane and influence the position and orientation of the hyperplane. Only the support vectors decide the decision boundary in SVM. Using these support vectors, we maximize the margin of the classifier. Deleting the support vectors will change the position of the hyperplane.
- [Support Vector Machine (SVM) in 2 minutes](https://www.youtube.com/watch?v=_YPScrckx28)
- [Support Vector Machines: All you need to know!](https://www.youtube.com/watch?v=ny1iZ5A8ilA)

### Parameters

- `nu`: An upper bound on the fraction of outliers and a lower bound of the fraction of support vectors. Should be in the interval (0, 1]. By default 0.5 will be taken. If the value of nu is small, the model will consider fewer samples as outliers. If it is large, it will consider more samples as outliers, i.e. fewer false negatives, but more false positives.
  - It is also known as the margin of the One-Class SVM, corresponds to the probability of finding a new, but regular, observation outside the frontier.
- `kernel`: Specifies the kernel type to be used in the algorithm. It must be one of 'linear', 'poly', 'rbf', 'sigmoid', 'precomputed' or a callable. The default is 'rbf'. [How to select kernel for SVM?](https://stats.stackexchange.com/questions/18030/how-to-select-kernel-for-svm?rq=1)
- `gamma`: Kernel coefficient for 'rbf', 'poly' and 'sigmoid'. It controls the variance which approximates the inverse of sigma. Large gamma will lead to overfitting.

## Isolation Forest

## DBSCAN

[DBSCAN](clustering.md#dbscan) is a density-based clustering algorithm that groups together points that are closely packed together, marking as outliers the points that lie alone in low-density regions.

## Personalized PageRank

In fraud detection, PageRank can be used as an additional feature (input) to a machine learning algorithm to improve classification and reduce false positives.

Users who are involved in fraudulent transactions with shared cards are more likely to be fraudsters. So the node ranks involved in these particular transactions can be a piece of valuable information that can be used in machine learning models to predict and detect fraud among individuals that have connections with known fraudsters in the network.

Nodes can also be ranked based on how much money flows through each one to flag transactions that move much more money than what's average for a specific user. [ref](https://memgraph.com/blog/pagerank-algorithm-for-graph-databases)

It could also be applied to a graph neural network.

- [Personalized PageRank to a Target Node, Revisited](https://arxiv.org/pdf/2006.11876)
- [Using PageRank to Detect Anomalies and Fraud in Healthcare](https://blogs.cornell.edu/info2040/2018/10/22/using-pagerank-to-detect-anomalies-and-fraud-in-healthcare-2/)
- [How to Perform Fraud Detection with Personalized Page Rank](https://data-ai.theodo.com/blog-technique/2019-01-09-fraud-detection-personalized-page-rank)

## Graph Neural Network

## Fraud detection of transaction

It is essentially a risk scoring model. If the number of weird behaviors exceed certain threshold, the purchase is flagged for potential fraud until confirmed. [discussion](https://www.reddit.com/r/amex/comments/1gfr4si/how_does_fraud_detection_work_its_so_fascinating/)

Apart from that, fraud detection is inherently [imbalanced](imbalanced-data.md)

Here are some [Resources for Fraud Detection/Prevention](https://www.reddit.com/r/datascience/comments/1aes9jn/resources_for_fraud_detectionprevention/)

- [Stripe | Train, Evaluate, Repeat: Building a Credit Card Fraud Detection System - Leela Senthil Nathan](https://youtu.be/rHSpab1Wi9k?t=1044)
  - Since a good fraud detection model would block most fraudulent transactions, we end up with very little fraud to train on! So over time, the model forgets what most fraud looks like and performs poorly. [ref](https://youtu.be/rHSpab1Wi9k?t=1523)
  - Initial attempt is to take a small percentage of transactions that would have blocked, reverse the decision to allow the blocked transactions to go through. This let through some amount of more normal fraud to obtain true outcomes. They used a propensity function to determine P(allow), and P(allow) was inversely proportional to the risk score. Then they only look at transactions that were allowed by the model, upweight those allowed transaction by 1/P(allow).
  - However, it caused a lot of variance and noise in the estimates of precision and recall because the metrics were upweighted. Also, a single high-weight transaction that was misclassified would move the estimates significantly. Moreover, the calculation of P(allow) is difficult because it assumes all events were independent, but how about repeated attempts for a single transaction? Should the events be user sessions> or individual transactions? It turned out that they didn't have the confidence.
  - Current method (2018) is to score the transaction using ML, and for x% of transactions, regardless of what the ML score is, the transactions would be allowed. So now all risky transactions have a uniform likelihood of reversal. Then all transactions in the holdback group get upweighted uniformly by 1/P(allow). By doing this, they got rid of variance in the estimator function.
  - The only difference is that at the latest attempt, they won't block x% of transaction no matter what, i.e. independent of the decision of the model, so the P(allow) after threshold is a constant (x%), but at the first attempt, they would reverse x% of the transaction to be blocked, i.e. dependent on the decision of the model, so the P(allow) after threshold is not a constant (it was not x%), but inversely proportional to the risk score.

### Scenarios

Thinking of scenarios of how fraud happen would be a good practice.

- Somebody stole my credit card online, and use it to buy stuffs at reliable merchants afterwards. Then the geolocation might be different.
- Somebody stole my credit card in person, e.g. I was pickpocketed. Then the purchase amount and the number of transactions might be different.
- Somebody stole my credit card, and use it immediate on a Bitcoin ATM or some weird online merchants. Then the transaction history, or fraud history of the merchants might be a good hint. The product to be bought might also be another good hint.
- If I have never bought anything at 3am, then multiple new transactions at that time is super weird.

### Good features

- Ratio of numerical behavior today to that in the past 7 days, e.g. purchase amount, number of transactions, time of transaction, etc.
- Geographic distance between the location of the transaction and the payer's home address.
- Purchase history of travelling service. Does the user just bought a airline tickets to somewhere else, and the transactions occur at that place?
- Geographic distance between the location of the transaction and the location of last transaction. Does the consumer teleported?
- Geographic distance between the location of the transaction and the mode of the location of last 7 days transaction.
- Transaction mode, is it in person transaction with physical card? Or is it online transaction?
- Target merchant, is it a high-risk retail? Or is it a reliable store? How many fraudulent transactions occur at that particular store?

## Readings

- [李宏毅 Anomaly Detection](https://hackmd.io/@shaoeChen/SJkSrunVL)
- [Content Moderation & Fraud Detection - Patterns in Industry](https://eugeneyan.com/writing/content-moderation/)

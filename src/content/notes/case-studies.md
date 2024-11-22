---
title: Case Studies
publishDate: 2024-09-20
---

# Case Studies

## Framework

1. Root cause analysis, avoid XY problem, segment the problem into sub problems. For example, if profit dropped, is it dropped in price or dropped in demand, or increased in cost?
2. Be aware of any unrealistic expectations, e.g. "I want to predict the stock price", "I want to predict the weather in 10 years", etc. Adjust the expectation to a more realistic one to avoid disappointment.
3. If there are user, who are the users? Walk through the user journey. Create a user funnel to help segment the problem.
4. Define and clarify any terms. If there are any communication or explanation difficulties in the following stages, it is either the terms or the solution logic is unclear. Re-clarify the terms, provides some examples. If it is the logic, walk through the logic again.
5. Clarify business objectives and constraints
6. Define metrics and target variable, quantify the business problem, what does it mean by "not done well", "users have gone down" in quantitative terms, etc.
7. Be aware of imbalanced target. If any, all the following might have to be tailor made, e.g. weighted cross-entropy, stratified cross validation, stratified a/b testing, etc.
8. Start with simplest model, segment the model. If it could be done in 2 step models, try it.
9. Think creative on the feature selection / engineering, think of any external factors like marco-economics or competitors information could be brought in
10. Think creative on the loss function, e.g. Gamma distribution on delivery time from Doordash, Tweedie distribution on sales forecasting from Walmart
11. Always do offline and online evaluation
12. Business result oriented. What is the business impact? Does it handle / provide a good insight on the business objective?

## Analytics

### Problem set

- Predicting the arrival delay of flights

### Survey

- [Case Study: A City Social Survey Blog](https://aakinshin.net/posts/cs-social-survey/)

### Anomaly detection

[Notes on anomaly detection](anomaly-detection.md)

### Sports

- [Football AI Tutorial: From Basics to Advanced Stats with Python](https://www.youtube.com/watch?v=aBVGKoNZQUw)
- [roboflow/sports](https://github.com/roboflow/sports)

### Marketing

[marketing note](marketing.md)

### Case procedures

#### Pricing

![pricing](./images/pricing.png "A diagram from Azure")

1. Data collection: transactional data, product data, customer data
2. Exploratory data analysis: understand the data, identify patterns, and relationships
3. Preprocessing: data cleaning, feature engineering
4. Forecasting: predict demand
5. Optimization: price optimization
   - Given the demand forecast, the goal is to find the optimal price that maximizes the profit
6. Recommendation: recommend prices to the business
7. Evaluation: A/B testing / Causal Impact Analysis

Examples: [online retail analytics notes](online-retail-analytics.md)

#### Searching

The usual procedure of Bayesian search theory is as follows: [ref](https://en.wikipedia.org/wiki/Bayesian_search_theory)

1. Formulate as many reasonable hypotheses as possible about what may have happened to the object.
2. For each hypothesis, construct a probability density function for the location of the object.
3. Construct a function giving the probability of actually finding an object in location X when searching there if it really is in location X. In an ocean search, this is usually a function of water depth — in shallow water chances of finding an object are good if the search is in the right place. In deep water chances are reduced.
4. Combine the above information coherently to produce an overall probability density map. (Usually this simply means multiplying the two functions together.) This gives the probability of finding the object by looking in location X, for all possible locations X. (This can be visualized as a contour map of probability.)
5. Construct a search path which starts at the point of highest probability and 'scans' over high probability areas, then intermediate probabilities, and finally low probability areas.
6. Revise all the probabilities continuously during the search. For example, if the hypotheses for location X imply the likely disintegration of the object and the search at location X has yielded no fragments, then the probability that the object is somewhere around there is greatly reduced (though not usually to zero) while the probabilities of its being at other locations is correspondingly increased. The revision process is done by applying Bayes' theorem.

### Real case studies

- [A Look at The First Place Solution of a Dermatology Classification Kaggle Competition](https://bjlkeng.io/posts/a-look-at-the-first-place-solution-of-a-dermatology-classification-kaggle-competition/)
- [How Writing My Thesis on League of Legends Made Me Stop Playing](https://www.youtube.com/watch?v=a-a6__xFeVc)
- [Beta 存活模型](https://taweihuang.hpd.io/2020/02/23/beta-survival-model/)
- [利用斷點迴歸設計設計估計需求曲線 – Uber 案例](https://taweihuang.hpd.io/2018/09/09/nat_exp_rdd_uber/)
- [sklearn@Examples based on real world datasets](https://scikit-learn.org/stable/auto_examples/applications/index.html)

## Tech blogs

- [Netflix Tech Blog](https://netflixtechblog.com/)
- [Discord Engineering & Developers](https://discord.com/category/engineering)
- [Line Engineering](https://engineering.linecorp.com/zh-hant/blog)
- [Uber Engineering Blog](https://www.uber.com/en-HK/blog/engineering/)
- [Jane Street Tech Blog](https://blog.janestreet.com/)
- [Airbnb Engineering & Data Science](https://medium.com/airbnb-engineering)
- [Facebook Engineering Blog](https://engineering.fb.com/)
- [Google AI Blog](https://ai.googleblog.com/)
- [Microsoft Research Blog](https://www.microsoft.com/en-us/research/blog/)
- [Apple Machine Learning Journal](https://machinelearning.apple.com/)
- [Amazon Science](https://www.amazon.science/)
- [Agoda Tech Blog](https://medium.com/agoda-engineering)
- [Twitter Engineering Blog](https://blog.twitter.com/engineering)
- [LinkedIn Engineering Blog](https://engineering.linkedin.com/blog)
- [Pinterest Engineering Blog](https://medium.com/pinterest-engineering)
- [Slack Engineering Blog](https://slack.engineering/)

## Books

- [Case In Point: Complete Case Interview Preparation](https://www.amazon.com/Case-Point-Complete-Interview-Preparation/dp/0971015880)
- [The Ultimate Case Interview Workbook: Exclusive Cases and Problems for Interviews at Top Consulting Firms](https://www.amazon.com/Ultimate-Case-Interview-Workbook-Interviews/dp/1733338101)

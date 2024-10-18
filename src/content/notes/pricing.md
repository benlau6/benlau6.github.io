---
title: Pricing
publishDate: 2024-10-18
---

# Pricing

Pricing, aka price optimization, is complicated because of non-linear price elasticity and other potential confounders, which are usually unmeasured. This topic could be seen as a [causal inference](causal-inference.md) problem, where you want to know the effect of price on demand, while controlling for other confounders, such that you can optimize the price.

## Terms

- Exogenous variable: an exogenous variable is one whose measure is determined outside the model and is imposed on the model, and an exogenous change is a change in an exogenous variable.
- Endogenous variable: an endogenous variable is a variable whose measure is determined by the model. An endogenous change is a change in an endogenous variable in response to an exogenous change that is imposed upon the model. An endogenous random variable is correlated with the error term in the econometric model, while an exogenous variable is not.
- Endogeneity: situations in which an explanatory variable is correlated with the error term, usually due to unmeasured confounders. Once the confounding variable is measured, you no longer include it in the error term; and once you no longer include a variable in the error term, it ceases being endogeneity.
- Price elasticity: how demand changes with price

## Considerations

### How to model price elasticity over time

[discussion](https://www.reddit.com/r/datascience/comments/swv0oy/ideas_for_modelling_price_elasticity_over_time/)

> I have done quite a bit of price elasticity modeling in industry. It is very challenging, and very context-specific. The questions I would have is
> (1) what are the volume sales per unit period? This will determine how much you can discretize time.
> (2) what kind of products are they? We had some products where the price swings were based on raw material costs, and the elasticity due to raw material costs was much lower than for price changes in other contexts.
> (3) do you have repeat customers? Tracking repeat customer behavior works much better for elasticity
> (4) do you have click data (so you can see customers which viewed the product but chose not to buy
> (5) Is there geographical segmentation that is relevant?
>
> Some other thoughts:
> (1) With modeling, you likely do not have enough data for each product to have a complex model, so regression may have to do.
> (2) Time series with regressors might work here (ARIMAX) to capture the elasticity.
> (3) If you don't do straight time series, you will want to look at whether you want to model levels or changes.
> (4) Sometimes it helps to log-transform the data.
> (5) One difficult feature that I saw sometimes was that price elasticity was often asymmetrical, in that the elasticity coefficient for price increases was very different than for price decreases. I have talked with others who have seen this in their data, but the literature contains virtually nothing about this.

> I worked on something very similar at a prior startup. We first log transformed the data to understand percentage impact instead of unit impact.
>
> We were also using Databricks with PySpark. We aggregated to daily sales (sum) and prices (median or mean) for each product across thousands of stores (convenience stores and supermarkets).
>
> The seasonality aspect was challenging because different products have different seasonalities, but (1) we had over two years worth of this data that lead us to assume we’d capture seasonality cycles, and (2) since we were looking at percentage changes and not unit changes, we assumed elasticities would be more or less constant across any time interval.
>
> This simple approach worked fairly well for us.

> Well, I believe the classic way would be to use a Multiple Linear Regression in the Econometrics way under continuous timeframes (OLS) or GLM if asked for specific periods where you’d create new timeframes (Summer, quarters or such).
>
> After that, check the coefficients (Making sure your pValue are close to zero)… if your coefficient are high, the price sensitivity is significant & vice versa.

### How to estimate price elasticities for products with many confounders and very little price variation?

[discussion](https://www.reddit.com/r/AskStatistics/comments/14zo08l/how_to_estimate_price_elasticities_for_products/)

> I am data scientist in the retail industry and I’ve been tasked with estimating price elasticities for our entire product catalogue (40.000+ products) across multiple categories (i.e. the price elasticity for each product). >
> I have the historical sales data (5 years), but if I filter out promotions, a lot of products have very little price variation, if any. This is in the retail industry where there are a lot of promotions and seasonality has a huge effect. Also, the assortment changes a lot - many products don’t have a very long sales history.
>
> I don’t want to reinvent the wheel, but a simple log(demand) ~ log(price) model is not cutting it. Too many confounding variables, too few price points for each product.

> A few thoughts here: First I would suggest checking out this lecture: <https://www.youtube.com/watch?v=POqSb-LH_PU> This is a random projection approach for high dimensional discrete choice models. I’m not sure how directly relevant this will be because it’s been several years since I’ve done anything along these ideas, but it’s the first thing I thought of that seemed to have any relevance.
>
> Third, on double ML: this does require that you can credibly control for all or almost all confounding. If you can’t do that there’s no point trying. In terms of the severely incorrect parameter values, this can occur in doubly robust methods based on plugin estimating equation methods (like double ML). This happens if the nuisance parameters are too noisy and the resulting approximate score is poorly behaved, and not guaranteed to respect bounds on parameters. This issue is largely resolved with TMLE (targeted maximum likelihood) which approximates the orthogonal score functions in a somewhat different manner.

- [TMLE blog](https://www.khstats.com/blog/tmle/tutorial)
- [TMLE paper](https://doi.org/10.1093/aje/kww165)

> I actually have the same task assigned at work. Roughly 30k items to get elasticities for each. Many of them don't have enough data or variation in price but I looped through all the feasible items to get around 3k elasticity measures for items whose model produced significant enough results but I largely only have enough data to do demand ~ price. Did you end up getting more data or find a more robust way to tackle this? I am debating making item groups to get a rough estimate of all the elasticity measures per group so that the other 27k items at least have a loose number to work off of but I will highly highly caution against using it unless the experts can be reasonably assured the prices in each group are not driven by enough outside factors. Lastly, I debated finding an optimal price by mapping the revenue across a range of prices multiplied by the item level elasticity and estimating demand (then doing price \* demand = revenue to find the max rev in the array of prices).

### How to use xgb to predict price elasticity given that there is a surge in demand while the price is below a certain threshold?

[discussion](https://www.reddit.com/r/datascience/comments/18bunqm/price_elasticity_xgb_predictions/)

> You may or may not need xgboost, at least not as much specifying the appropriate functional form. In that regard, this sounds more like an econometric problem.
>
> Run OLS with a log-log transformation to model elasticity. Include piece-wise segments/dummies to capture the surge in units sold when price goes below some threshold.
>
> xgb will almost always predict better, the reason for using OLS is accurately capturing the relationship between price and demand (if the massive increase is indeed due to price and not some confounder)

> Am familiar with tree based models for elasticity estimation. This is a usual extrapolation issue, try fitting a linear
>
> are u saying fit for example a linear regression model on the dataset where price is below a threshold and then use this model to calculate a separate elasticity in this region
>
> That's also an option. What I meant was first you calculate an elasticity in the problematic region with XGBoost, then you could define a measure of distance between the threshold and the point at which you are at, and train a linear model with that as an input. The output of the linear model would then be a correction which is applied to the estimated (with XGBoost) elasticity

> Is the phenomenon observed in the training data? If not then your best option is some form of post-modeling manual correction.
>
> If it is in the training data, XGB is not picking up the pattern. It’s on you to engineer a feature that helps it identify that threshold.
>
> I would try Linear-tree or piecewise learners in XGB. Most likely the overall fit will be worse, but it should be able to pick up the extrapolation better.
>
> This happens in forecasting as well with say impactful holidays. The model trades off for better predictions on the mean data rather than overfitting to infrequent large errors. This is where you can also try different loss functions like MSE, MAE, etc. or different loss distributions (poisson, tweedie, gamma).
>
> With low signal to noise ratio events like these I find an ensemble of a linear and tree based model to work well. Another commenter spoke to a correction using a linear model, but it might be easier to use a linear model first to fit the elasticity curve and then use XGB on the residuals of that linear model to capture all the non-linear patterns.
>
> It’s a frustrating problem because at the end of the day it’s your decision on how much you want to give up on average to have a better fit on outliers (infrequent events).

## Price Elasticity of Demand

Price elasticity of demand (PED) is the percentage change in demand for a 1% increase in price. If PED > 1, it is said to be price elastic. When PED < 1, it is price inelastic, i.e. a change in price does not have much of an effect on demand. For example, addictive goods like cigarettes would be price inelastic because people who are addicted will purchase it no matter what. [definition](https://altacademy.github.io/Micro/PED.html) We could use log-log regression to directly estimate this relationship, with the assumption of this relationship being constant. [theory](https://openstax.org/books/introductory-business-statistics-2e/pages/13-5-interpretation-of-regression-coefficients-elasticity-and-logarithmic-transformation)

Apart from that, by applying logarithm on demand, we could turn potential multiplicative seasonal pattern on demand to an additive seasonal pattern. [feature-engineering](feature-engineering.md#common-techniques)

To build a advanced model on it, we could consider adding some lagged prices. [feature-engineering](feature-engineering.md#common-techniques)

## Case studies

- [online-retail-analytics](online-retail-analytics.md)
- [Dynamic pricing in ride-sharing for Uber and Lyft using reinforcement learning](https://dx.doi.org/10.2139/ssrn.4355434)
- [Personalized pricing for e-commerce like Walmart and Amazon using RFM analysis](https://www.revologyanalytics.com/articles-insights/enhancing-sales-amp-marketing-for-manufacturers-building-robust-insights-capabilities)

## Methods

- Demand forecasting
- Double machine learning for causal inference on price elasticity
- Mixed integer programming for price optimization
- A/B testing for causal inference after production deployment to correct assumptions, and to validate that the price are indeed optimal

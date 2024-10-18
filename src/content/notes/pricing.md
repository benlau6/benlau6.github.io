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

## Questions to answer

- If I lower the price of a product, how much more will sell?
- If I raise the price of one product, how will that affect sales of the other products?
- If the market price of a product goes down, how much will that affect the amount that firms will be willing to supply to the market?

## Considerations

[Factors affecting price elasticity in the retail sector](https://7learnings.com/blog/price-elasticity/)

- Necessary goods and commodities (inelastic)
  - Goods that are essential to life are usually inelastic, meaning that a change in price has little effect on demand. For example, if the price of gasoline goes up, demand doesn’t change too much because people still need to use their cars to get to work.
  - Other examples include textbooks or prescription drugs.
- Comfort goods and commodities (more elastic)/Luxury goods and commodities (quite elastic)
  - Products that show more price elasticity are ones that make life more enjoyable and pleasant, such as a television or a gym membership.
  - In the case of pleasure and luxury goods such as a sports car or a diamond ring, taste also plays a role – after all, these products are basically not essential to life.
- Income and economy
  - The average income of a consumer group or an economy also influences the price elasticity of demand for goods and services.
  - If the economy is in a downturn, the decline in annual income for the majority of the population may cause luxury items to have more price elasticity.
  - A recession causes consumers to save rather than spend money on luxury items.
- Competition and substitutes/substitute products.
  - The more competition or the higher the quantity of substitute products there are, the more elastic demand is because consumers can easily switch.
- Product life cycle
  - For new products, the price elasticity of demand is low because there is little or no competition in the market.
  - In contrast, the long-tail SKUs or items with price discounts have more price elasticity.
- Level of price
  - For most products, price elasticity is not the same for all prices.
  - Often, high-priced products have more price elasticity because customers put more thought into the purchase and investment – they are also more likely to compare prices with competing products.
- Retailer brand and service
  - The price elasticity of a product interacts with the rest of a retailer’s offering.
  - If, for example, a retailer offers a bonus program or particularly good delivery conditions, customers are less likely to switch and will buy even if prices are higher – thus reducing price elasticity.
  - A retailer’s brand can also have a positive or negative impact on price elasticity.

### Features

- [forecasting considerations](forecasting.md#considerations)
- economic indicators: GDP, inflation, interest rate, etc
- price: current price, relative price compared to competitors or similar products (cross elasticity of demand), last week price, etc.
- competitor variables: price, promotion, etc. [paper](https://www.nber.org/system/files/chapters/c6068/c6068.pdf)
- Merchandising variables such as promotional discount, ads campaign, etc

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

[Why is it essential for me to know price elasticities](https://arminkakas.medium.com/the-science-and-art-of-estimating-price-elasticities-f182bb56e6c4)

Apart from that, by applying logarithm on demand, we could turn potential multiplicative seasonal pattern on demand to an additive seasonal pattern. [feature-engineering](feature-engineering.md#common-techniques)

To build a advanced model on it, we could consider adding some lagged prices, and tree-based models are great for modeling complex price elasticities. [feature-engineering](feature-engineering.md#common-techniques)

But there is no coefficient in tree-based models, what we have are the predicted demands. So we could use the predicted demands and simulated prices to calculate the implied price elasticities for each product by model perturbation (price perturbation). [blog](https://arminkakas.medium.com/a-brief-guide-to-price-elasticity-modeling-part-2-1d15277e9e6e) [blog2](https://arminkakas.medium.com/the-science-and-art-of-estimating-price-elasticities-f182bb56e6c4)

After modeling the price elasticity, we should not stop here because the result is meaningless without further suggestion or action. Actually, we could use it to optimize the price. [Food for Regression: Using Sales Data to Identify Price Elasticity](https://www.statworx.com/en/content-hub/blog/food-for-regression-using-sales-data-to-identify-price-elasticity/)

[Recursive least square (RLS) filter](https://towardsdatascience.com/calculating-price-elasticity-of-demand-statistical-modeling-with-python-6adb2fa7824d) can be used to investigate parameter (PED) instability

### Cross price elasticity of demand

> Price elasticity measures the effect of price changes of one product on its own sales. But this is not the only relevant elasticity, as there are also interdependencies between products. These interdependencies are measured by cross price elasticity. Cross price elasticity of demand measures the percentage sales modification of a particular product that is demanded, relative to the change in the price of another product. In real world scenarios, this can be seen in how the price changes of certain products impact the demand for others.
>
> Cross price elasticity can measure either complementary products, or substitute products. Being able to measure this can help retailers make informed decisions about their product assortments and the prices they set against their range. A negative cross price elasticity means that the two products are substitutes for one another, and the increase in price for one would lead to higher consumer demand for the other. Conversely, a product complement exists when the increase in the price of product #1 leads to a decrease in the demand for product #2, as the two products are used in conjunction with one another.
>
> A practical examples of cross price elasticity for complementary products would be a decrease in the price of hot dogs, which would lead to an increase in the demand for hot dog buns. This would be considered a positive cross price elasticity of demand. Cross price elasticity is often used strategically by retailers in this scenario, to encourage sales of complementary products.
>
> A common example of substitute products in cross price elasticity would be toothpaste. If the price of one brand of toothpaste increases, the demand for other brands of competing toothpaste would increase.
>
> [ref](https://7learnings.com/blog/price-elasticity/)

## Case studies

- [online-retail-analytics](online-retail-analytics.md)
- [Dynamic pricing in ride-sharing for Uber and Lyft using reinforcement learning](https://dx.doi.org/10.2139/ssrn.4355434)
- [Personalized pricing for e-commerce like Walmart and Amazon using RFM analysis](https://www.revologyanalytics.com/articles-insights/enhancing-sales-amp-marketing-for-manufacturers-building-robust-insights-capabilities)

## Methods

- Demand forecasting
- Double machine learning for causal inference on price elasticity
- Mixed integer programming for price optimization
- A/B testing for causal inference after production deployment to correct assumptions, and to validate that the price are indeed optimal

### Double machine learning for causal inference on price elasticity

Double ML calculation involves two main steps:

- One – Prediction: In this stage, machine learning algorithms are used to predict the outcome variable (e.g., quantity demanded) and the treatment variable (e.g., price) separately. Each prediction model is estimated independently.
- Two – Estimation: In this stage, the estimated treatment effect is calculated using the residuals obtained from the first stage predictions. Econometric methods, such as instrumental variables or propensity score weighting, are then applied to estimate the causal effect of interest (e.g., price elasticity) using the predicted and residualized data. After obtaining the predicted quantity demanded and predicted price for each observation, residuals are calculated by subtracting the predicted values from the actual values.

[blog](https://publications.pricingsociety.com/understanding-price-elasticity-models-a-comprehensive-cutting-edge-guide/)

## Applications

- Price Optimization: By understanding the price sensitivity of consumers, businesses can set prices to maximize revenue or market share.
- Promotional Planning: Price elasticity models help businesses evaluate the effectiveness of promotional activities. For example, a company can assess the impact of a discount or promotion on sales volume and revenue.
- Product Development/Adjustments: Price elasticity analysis informs product development decisions by identifying consumer preferences and willingness to pay for new features or enhancements.

[blog](https://publications.pricingsociety.com/understanding-price-elasticity-models-a-comprehensive-cutting-edge-guide/)

## Clustering on price elasticity

Here are concise pricing strategies for each segment identified in the graph [ref](https://thecleverprogrammer.com/2024/08/19/price-elasticity-of-demand-analysis-with-python/):

- Negative Elasticity (where price increases lead to quantity decreases): Focus on reducing prices to stimulate demand, as consumers are sensitive to price increases. Price cuts can lead to significant increases in quantity sold, making up for lower margins.
- Unitary Elastic (where price changes result in proportionate quantity changes): Maintain stable pricing while focusing on improving product value or differentiating offerings. Since price changes lead to proportional quantity changes, the emphasis should be on balancing price with perceived value to maintain sales volume.
- Highly Elastic (where small price changes lead to significant quantity changes): Use dynamic pricing strategies, such as promotional discounts or price drops during peak demand periods, to capitalize on the high sensitivity of consumers to price changes. Small price reductions can lead to large increases in sales volume.
- Zero Elasticity: Price adjustments are less effective in driving sales changes for this segment. Focus on non-price strategies, such as improving product features, quality, or customer service, to differentiate and capture market share without relying on price changes.

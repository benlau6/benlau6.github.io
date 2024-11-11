---
title: Pricing
publishDate: 2024-10-18
---

# Pricing

Pricing, aka price optimization, is complicated because of non-linear price elasticity and other potential confounders, which are usually unmeasured. This topic could be seen as a [causal inference](causal-inference.md) problem, where you want to know the effect of price on demand, while controlling for other confounders, such that you can optimize the price. [EconML case stuides](https://github.com/py-why/EconML/blob/main/notebooks/CustomerScenarios/Case%20Study%20-%20Customer%20Segmentation%20at%20An%20Online%20Media%20Company.ipynb)

Other than that, it could more be seen as a econometric problem or psychological problem. If we really want to approach it in statistical sense, we should first model it using the simplest log-log linear regression model such as GLM to estimate the price elasticity of demand, with a acknowledgement that there might be a large room to improve [ref](https://www.reddit.com/r/analytics/comments/l9itrx/comment/glifkkv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button). Note that Conjoint analysis, Van Westendorp's Price Sensitivity Meter or Gabor–Granger method from market research might also be a good direction. [ref](https://www.reddit.com/r/datascience/comments/147qx9o/resourcesmodels_on_price_elasticity/) [forbes](https://www.forbes.com/sites/rebeccasadwick/2020/06/22/how-to-price-products/)

## Parties

- Buyers (customers, consumers, clients) - It’s crucial to know what matters to them, and what influences them to trade up or come back. The goal for B2C pricing is to understand purchasing behavior and preferences, and use that insight to inform pricing.
- Sellers
  - Competitors
- Offers - B2B pricing is all about communicating—and monetizing—the value of your offerings.

## Service Business models

- One-time purchase
- Subscription fees
- Freemium - free basic services, but charge for premium features
- Advertising fees
- Commission fees
- Transaction fees

## Price discrimination

Price discrimination is selling the same product or service to different buyers at different prices—as long as companies can justify it. The challenge for business leaders who want to vary prices fairly is that individuals’ perceptions of what is fair are numerous, nuanced, and often contradictory. Whether individuals perceive a price to be fair will depend on the product or service category, their age, where they live, what they earn, their political beliefs, and who the customer is (themselves or someone else).

### Fair price

[BCG@Solving the Paradox of Fair Prices](https://www.bcg.com/publications/2022/considering-pricing-variation-to-help-solve-the-paradox-of-fair-prices)

For most people, a fair price is a price others pay for a good or service. At the same time, most people also consider giving a lower price to certain groups—such as seniors, students, or low-wage earners—to be fair. It is the paradox of fair prices. Charging different prices is often fairer than charging everyone the same price.

Most people will also tolerate price discrimination that works against their self-interest. This holds true when they feel they have some control over the prices they pay, such as by choosing where to buy, when to buy, or whether to join a certain organization. Rob them of this perceived control, however, and they may vehemently resist higher prices. Coca-Cola once proposed the idea of varying prices at vending machines according to changes in the air temperature on hot days. It scrapped the plan after encountering widespread resistance. The temperature is a condition that customers can’t control.

### Progressive pricing

[BCG@Why Progressive Pricing Is Becoming a Competitive Necessity]

Imagine if your company could measure, customize, and charge for—in real time—the value your products or services create for each customer. Seized to its fullest extent, such an opportunity would enable you to provide more value to more customers and still earn more money.

Progressive pricing is turning that idea into reality, one that more sensibly aligns with today’s digital products and services than traditional industrial-era pricing models could ever do. This innovative approach—already embedded in the sharing economy and in other sectors such as financial services—scales prices up or down on the basis of the value an individual customer derives.

The levels of prices under progressive pricing are value-based, not means-based. Think of the price that a customer pays as an investment in a desired level of value. Each paying customer receives a proportional return on that investment. The prices align properly to value without penalizing customers—by denying access to some customers because of an artificially high price barrier or by charging some customers their maximum willingness to pay while others enjoy a big surplus (the difference between the value they derive and the price they pay).

Firms now can and do differentiate their products and services by individual customer and differentiate their prices accordingly. Progressive pricing enables that differentiation by pushing the logic of discrete price points to its practical limit, offering each customer a fair, personalized product and price point.

What makes this possible are the properties of digital economics, built on the idea that added value is customizable at zero marginal cost. Instead of optimizing a small number of price points, the firm optimizes a continuum of prices. The key element is a value-sharing algorithm that dynamically sets prices specific to the value an individual customer derives based on time, location, and occasion.

Ride-sharing companies already use a version of such pricing in their day-to-day operations. For example, at the end of a concert or sports event, when hundreds of customers are requesting pickups at the same time at the same location, the cost of a ride goes up in line with that demand. Customers who group together, walk to a different location, or wait even half an hour to request a ride will likely see the price change based on how those conditions changed. But this kind of pricing logic is not unique to ride-sharing. China’s Meituan Dianping, which operates the world’s largest on-demand food delivery service, used its “proprietary real-time intelligent dispatch system” to make more than 14 million food deliveries per day in an average time of 30 minutes. When a surge occurs, Meituan offers its drivers higher commissions to ensure there is enough capacity to keep the service running.

The exhibit reveals the four most important differences between progressive and traditional pricing approaches:

- Market expansion
- More consumer surplus
- More profit
- A renewed sense of fairness - Progressive pricing is a fairer way to determine prices, because customers pay a price proportional to the value they receive, rather than paying the same fixed price others pay. But the firm must make the case for this perceived fairness. Google AdWords has done an excellent job of that by using an auction system where advertisers bid on keywords to get their ads placed in Google search results. The advertisers effectively set the prices.

### Consumer price sensitivity

[BCG@Understanding the Global Price-Sensitive Consumer](https://www.bcg.com/publications/2021/consumer-price-sensitivity)

- The ratio of price-sensitive consumers differs substantially across categories and markets.
- Most consumers indicate they are value conscious, but far fewer are price sensitive.
- Context is a substantial driver of price sensitivity.

## Extrapolation problem

There would be not much data in terms of completed transactions in price variants. Those completed transactions are the results of agreed prices. Those dissatisfied price associated with products or services would not be recorded in completed transactions because there is no deal. So it is inherently imbalanced. If we want to find the optimal price, the historical data would be sparse and insufficient.

## Exploration and exploitation

One way to solve it is to frame it as a reinforcement learning problem to explore the action space while minimizing the regrets, such as multi-armed bandit to solve the extrapolation problem in pricing with exploration and exploitation trade-off. In its simplest form, just do a market experiment with a small group of customers, and then use the result to optimize the price. [Ferreira, 2016](https://www.hbs.edu/ris/Publication%20Files/kris%20Analytics%20for%20an%20Online%20Retailer_6ef5f3e6-48e7-4923-a2d4-607d3a3d943c.pdf) [The New Frontier of Price Optimization](https://sloanreview.mit.edu/article/the-new-frontier-of-price-optimization/) [Jacob, 2017](https://www.gsb.stanford.edu/sites/gsb/files/mkt_10_17_misra.pdf) [Game Theory Models of Pricing](https://www.google.com/search?client=firefox-b-d&q=Game+Theory+Models+of+Pricing) [BCG@The Unified Theory of Pricing](https://www.bcg.com/publications/2023/the-unified-theory-of-pricing)

## Non-completed transactions

Another way is to utilize non-completed transactions or interactions, which could be reviewed to identify interests of customers with hesitation to purchase, which might be due to the price. If it is a online settings, some pattern tracking could be used to identify it. For example, if there is a interaction sequence that the customer added the product to the cart, but then replaced it with a cheaper product, it is a strong signal that the original product might be sold with a lower price.

## Life and non-life business

Pricing is completely different from life to non-life business. Most of the time it is a bit out of the scope of the purely statistician job in life business because the time span would be tens of years which involves financial and actuarial aspects. While non-life business would be far more interesting from a statistical perspective that we could have much more data and features to play with, and with a much shorter time span. The price would solely depend on these characteristics instead of other external uncertainties. The industry standard in non-life business would be [GLM](generalized-linear-models.md), but some companies are switching to neural networks. [ref](https://www.reddit.com/r/datascience/comments/13bwhkv/comment/jjdrzqr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

## Pricing strategies

Must read [BCG@The Unified Theory of Pricing](https://www.bcg.com/publications/2023/the-unified-theory-of-pricing)

The academic and business literature is vague about what constitutes a pricing strategy. Business leaders therefore tend to describe their pricing strategies in terms of:

- Pricing models
  - discounts
  - subscriptions
- Pricing methods
  - value-based
  - cost-plus
  - customizing to win

But BCG redefine pricing strategy as a business leader’s conscious decisions on how to shape their market by determining the amount of money available, how that money flows, and to whom. This definition of pricing strategy recognizes the fact that the size of any market—-and especially how that pie gets divvied up—is the direct result of the countless pricing decisions that companies and customers make every day. This new definition expands the pricing conversation beyond the quest for better price points and enables pricing to inform and determine corporate strategy.

Developing the unified theory of pricing starts with cost, competition, and customer value, which are the three fundamental information sources for the development of any business strategy.

The traditional pricing perspective, however, treats these information sources as inputs into price calculations. From this tactical perspective, customer value sets a price ceiling or a maximum price, while costs define the floor or the minimum price. To calibrate the range in between, leaders take competitor prices into account before deciding on the price they will charge for a product or service.

But costs, competitor prices, and customer value can generate important and more powerful strategic insights when leaders look at their interactions rather than how they behave in isolation. Cost and customer value lead to price elasticity, customer value and competitor prices lead to price differentiation, while costs and competitor prices lead to game theory. Combining all three interactions leads to supply and demand. A market’s supply curve is based on the costs, capacities, and prices of every competitor, while the demand curve is a function of either the aggregated willingness to pay of individual customers or the value that those customers derive.

### The Strategic Pricing Hexagon

Most markets fit very well to one of the games, but some may fit to more than one game. This is not a flaw, but rather an opportunity for leaders to decide which game to play, depending on their competitive advantages.

- Value Game - high-tech, luxury goods, and pharmaceutical companies. The goal is to defend their values and shape demands from unique solutions. A value-based pricing approach is most helpful in this context when an offering’s economic and emotional value far exceeds what competitors offer and when the buyers are so numerous and fragmented that no individual customer or group holds significant purchasing power.
- Uniform Game - consumer goods companies and retailers. The goal is to optimize the same prices for all customers by carefully weighing the volume and margin tradeoffs. The price elasticity framework is the best approach when markets have a very large number of buyers with relatively homogeneous needs, served by numerous and comparable sellers.
- Cost Game - industrial suppliers, distributors, and government contractors. The goal is to optimize the efficiency by minimizing the cost. The cost-plus pricing approach is most helpful.
- Power Game - high-tech suppliers. Rely on slim advantages to negotiate high-stakes deals that preserve the market's balance of power. Game theory would be the best approach when a market is concentrated on both the buyer and seller sides and offers show limited differentiation, often because buyers impose technical standards that only a few sophisticated sellers can fulfill.
- Custom Game - B2B suppliers. Win by customizing offerings to meet the unique needs of individual customers amidst heavy competition. The negotiated terms, conditions, and supplemental offerings make each deal unique, even when the underlying products from each supplier seem similar. Pricing to competition is the recommended approach when market characteristics prevent a convergence toward large customer segments, common price structures, and similar product configurations.
- Choice Game - software suppliers and some restaurant chains. Rely on behavioral economics to help their customers self-select from a well-structured lineup of offerings. How prices compare to each other matters far more than the individual prices themselves. Price differentiation is especially important when offers have limited or no marginal costs.
- Dynamic Game - airlines, hotels, sports teams, e-commerce retailers, and logistics firms. Rely on real time adjustments in response to supply and demand signals. This need can arise when a company has adjustable capacity, perishable inventory of relatively undifferentiated products, or constantly fluctuating demand from a broad base of customers. The AI with the aid of human judgment approach is the best approach.

The Strategy Hex also prevents leaders from acting on incomplete information, falling prey to pricing misconceptions, or applying frameworks or techniques that are ineffective or inefficient for a particular game. Elasticity, for example, is a core framework for the Uniform Game, but it is significantly less important for business leaders playing the Power, Custom, or Choice Games.

Each game is also subject to six well-defined forces—innovation, commoditization, customization, digitalization, fragmentation, and concentration—that can cause a market or company to shift toward a different part of the Strategy Hex.

Business leaders can harness these forces to help their companies reshape their business and their market. Digitalization, for example, tends to reduce marginal costs and allow a broader set of offers, thus pushing companies toward the Choice Game. Developing an innovative solution can enable a company to move from the Cost Game to the Value Game or Choice Game, depending on their existing market characteristics. Rapid consolidation in a market on the buyer or seller side can confront a company with a fundamental strategic decision: reorganize to play the Power Game or make another move that will allow them to enter another game.

Read the blog post for more hexagons and solutions.

## Factors

- Cost of production should be the lower bound of the price, unless it is a startup, a new product, or a new service to a new market, which you may want to acquire customers first even with a loss, like Keeta, Uber, etc. You can always raise the price later when you have a large customer base.
- Inventory, due to the cost of storage, cash flow, or perishable goods like food or fashions
- Demand, due to price elasticity of demand
- Competition, due to cross price elasticity of demand
- Macro-economic factors, such as inflation, interest rate, etc, people would have less money to spend, or hesitate to spend money on unnecessary goods or services if the inflation is high, or the interest rate is high, which would affect the demand

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

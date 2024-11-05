---
title: Marketing
publishDate: 2024-09-24
updatedDate: 2024-10-17
---

# Marketing

There are three major models in marketing data science: survival analysis, marketing mix modeling (MMM) and customer lifetime value (CLV). Survival analysis is to model the time until an event of interest occurs, e.g. customer churn, product failure. MMM is to evaluate the effectiveness of advertising channels in order to allocate future advertising budgets, while CLV is about predicting the future value of a customer. The former is a explanatory model, while the latter is a predictive model.

## Readings

- [PyMC-Marketing: A Bayesian Approach to Marketing Data Science](https://www.pymc-labs.com/blog-posts/pymc-marketing-a-bayesian-approach-to-marketing-data-science/)
- [How-to: MMMs and CLVs notebooks](https://www.pymc-marketing.io/en/stable/notebooks/index.html)
- [Revenue retention presentation](https://juanitorduz.github.io/html/revenue_retention_presentation.html#/title-slide)
- Targeting ads campaign: [Recommendation system](recommendation-systems.md)
- [Identifying machine learning techniques for classification of target advertising](https://www.sciencedirect.com/science/article/pii/S2405959520301090?ref=pdf_download&fr=RR-2&rr=8d357575bd9207a9)
- [Push Notifications: What to Push, What Not to Push, and How Often](https://eugeneyan.com/writing/push/)

## Two types of churns

There are two types of churn, contractual churn and [non contractual churn](https://medium.com/rond-blog/non-contractual-customer-churn-f46a1cf8eec4). The fundamental difference is do we have a clear boundary of customers being churned or not, e.g. retails or marketing have non contractual churns. Contractual churn is when a customer cancels a service because they are no longer continue their periodic agreements, while non-contractual churn is when a customer becomes inactive. The former is easier to get the target variable, while the latter is much harder, artificial and subjective.

[Shifted Beta Geometric model](https://juanitorduz.github.io/html/revenue_retention_presentation.html#/bottom-up-approaches) could be used for contractual churn, while [BG/NBD model](https://juanitorduz.github.io/html/revenue_retention_presentation.html#/bottom-up-approaches-1) could be used for non-contractual churn, and they both are bottom-up approaches.

## Modeling

- [Bayesian GLM model](https://juanitorduz.github.io/html/revenue_retention_presentation.html#/retention---generalized-linear-model) with binomial distribution could be used.
- A [BART model](https://juanitorduz.github.io/html/revenue_retention_presentation.html#/more-complex-models---requirements) could also be used.
- [pymc-marketing@shifted beta geometric](https://www.pymc-marketing.io/en/latest/notebooks/clv/sBG.html)
- [pymc-marketing@BG/NBD model](https://www.pymc-marketing.io/en/stable/notebooks/clv/bg_nbd.html)
- Survival analysis
  - [beta survival models](https://arxiv.org/pdf/1905.03818)
  - [Random Survival Forests@sklearn](https://scikit-survival.readthedocs.io/en/stable/user_guide/random-survival-forest.html)
  - [Random Survival Forests@paper](https://arxiv.org/pdf/0811.1645)
- [Bayesian Proportional Hazard Model](https://www.pymc.io/projects/examples/en/latest/survival_analysis/survival_analysis.html#bayesian-proportional-hazards-model)
- [BG/NBD Model in PyMC](https://juanitorduz.github.io/bg_nbd_pymc/)

## Survival analysis

It is also called Time-To-Event Study. Good for contractual business.

- [Frailty and Survival Regression Models](https://www.pymc.io/projects/examples/en/latest/survival_analysis/frailty_models.html)
- [PySurvival: Churn Prediction](https://square.github.io/pysurvival/tutorials/churn.html)
- [lifetime](https://lifetimes.readthedocs.io/en/latest/)

## Marketing mix modeling

It could differentiate changes due to advertising spend, holiday effect, seasonality, or macro-economic factors, or account for adstock (carry-over), saturation, or delayed effects of advertising. The adstock effect is the idea that the impact of advertising on sales will persist for a period of time after the advertising ceases. The saturation effect is the idea that the impact of advertising on sales will diminish due to long time exposure. The delayed effect is the idea that the impact of advertising on sales will not be immediate, but will occur after a delay.

- [Media Effect Estimation with PyMC: Adstock, Saturation & Diminishing Returns](https://juanitorduz.github.io/pymc_mmm/)
- [Media Mix Model and Experimental Calibration: A Simulation Study](https://juanitorduz.github.io/mmm_roas/)
- [Bayesian Media Mix Modeling for Marketing Optimization](https://www.pymc-labs.com/blog-posts/bayesian-media-mix-modeling-for-marketing-optimization/)
- [Introduction to Media Mix Modeling](https://www.pymc-marketing.io/en/stable/guide/mmm/mmm_intro.html)
- [Media Mix Model and Experimental Calibration: A Simulation Study](https://juanitorduz.github.io/mmm_roas/)

### Business problem

We are a marketing agency want to optimize the marketing budget of a client, and we have the access to sales and media spend data.

Some common questions that are best answered by MMM include [Robyn doc](https://facebookexperimental.github.io/Robyn/docs/analysts-guide-to-MMM/):

- How much sales (online and offline) did each media channel drive?
- What was the ROI of each marketing channel?
- How should I allocate budget by channel so as to maximize my KPIs?
- Where should my next marketing dollar go?
- What is the optimal level of spend for each major marketing channel?
- How would sales be impacted if I made X change to my marketing plan?
- If I needed to cut my marketing budget by X%, where should the dollars come from?
- How is performance of channels such as FB impacted by the way they are executed (e.g., buying objective, frequency, creative quality or targeting strategy used)?
- Should we raise our prices? If so, by how much?
- What is the impact of competitor advertising on the performance of our brands?
- How much incremental revenue to trade and promotional activities drive?

### Some attributes from each channel or the whole campaign would be good

- the target could be weekly sales
- weekly spend on different media channels
- some other domain knowledge about exogenous variables such as holiday effect, seasonality, macro-economic factors, etc, or any special events.

### How to model it?

It is believed that the causal relationship between marketing and sales should be non linear, for example, a 10% increase in channel x1 spend does not necessarily translate into a 10% increase in sales. Since there could be a carry-over effect, i.e. the effect of spend on sales is not instantaneous but accumulates over time, or a saturation effect, i.e. the effect of spend on sales diminishes at some point due to long time exposure. [MMM Example Notebook](https://www.pymc-marketing.io/en/stable/notebooks/mmm/mmm_example.html) [paper](https://storage.googleapis.com/gweb-research2023-media/pubtools/3806.pdf)

The carry-over effect on sales could be modeled by a geometric distribution, and the saturation effect could be modeled by a logistic function.

In case of time-varying intercept, it could be modeled by a random walk, or a Gaussian process.

### Actual use case

- [Bayesian Marketing Mix Modeling](https://getrecast.com/bayesian-mmm/)
- [Recast@Introduction to Bayesian Methods for MMM](https://getrecast.com/bayesian-methods-for-mmm/)

## Customer lifetime value

While MMM maximize the mean of target variable, e.g. sales, or user signups, sometimes it is better to focus a specific group of high value customers. CLV predicts future purchases and quantify the long-term value of each customer, so it can differentiate the value of customers, and help to allocate resources to the most valuable customers. [blog](https://www.pymc-labs.com/blog-posts/pymc-marketing-a-bayesian-approach-to-marketing-data-science/#customer-lifetime-value)

It build on the Buy Till You Die (BTYD) framework, which tells the story of people buying until they become inactive. A model in the BTYD family includes both repeat purchase and churn components. [blog](https://thetaclv.com/resource/how-to-model-customer-churn-for-a-subscription-business/)

PyMC-Marketing's CLV module includes a range of models, to predict future churn rates, purchase frequency, and monetary value of customers.

It uses BG/NBD model to predict churn, and Gamma-Gamma model to predict CLV. The BG/NBD model is a latent attrition model, which assumes that all customers are active at the beginning of the observation period and that a customer can only drop out immediately following a transaction. Customers with no repeat transactions during the observation period haven't had a chance to drop out so their probability of being alive equals 1. [paper](http://brucehardie.com/papers/018/fader_et_al_mksc_05.pdf) [step-by-step derivation](http://www.brucehardie.com/notes/039/bgnbd_derivation__2019-11-06.pdf) [lifetime examples](https://lifetimes.readthedocs.io/en/latest/Quickstart.html)

In summary, what it will do is learn the mass behavior from these individual behaviors and then make a probabilistic estimation specific to the individual. After making a purchase, the customer becomes partial churn. The BG/NBD Model probabilistically models two processes for the expected number of transactions. [ref](https://medium.com/geekculture/predicting-customer-life-time-value-cltv-via-beta-geometric-negative-binominal-distribution-59be07ac30bd)

1. First Process: Transaction Process (Buy)
   - While active, transactions made by a customer in time period t is Poisson distributed with mean λt
   - Heterogeneous transaction rate between customers follows a gamma distribution with shape r and scale α
   - Note: The gamma distribution is the conjugate prior of the Poisson distribution, combining the two gives Negative Binomial Posterior Predictive Distribution, that is the NBD.
2. Second Process : Dropout process (Till You Die) → process of becoming churn
   - Each customer becomes inactive after each transaction with probability p
   - Heterogeneous p follows a beta distribution with shape parameters a and b
   - The number of transactions made by a customer before becoming inactive follows a geometric distribution

Here is also a experienced data scientist talking about contractual CLV [ref](https://www.reddit.com/r/datascience/comments/ipwt4z/question_about_predicting_customer_life_time/).

### CLV will give your answers to questions such assumes

- What is the average order value for a single customer?
- How much is my customer likely to spend in my webshop, or store, or both next year?
- What is a single customer likely to spend next year?
- What is the average lifetime value of each customer?
- What is the likelihood of a customer leaving my business?
- How many days have passed since a single customer’s first order?
- How many days have passed since a single customer’s last order?
- How many days usually pass between orders?

[ref](https://content.raptorservices.com/blog/customer-lifetime-model-clv-how-to-predict-your-best-customers)

### Some attributes from each customer would be good

- The target variable could be expected number of transaction \* expected profit
- frequency: number of repeated purchases
- recency: time duration between first and last purchase
- first purchase: time duration between first purchase and the present
- number of repeated purchases
- monetary value: average purchase value
- membership

[SQL to calculate recency, frequency, monetary value, and time since first purchase from databricks](https://www.databricks.com/notebooks/Customer%20Lifetime%20Value%20Virtual%20Workshop/02%20The%20BTYD%20Models.html)

### But how to calculate the churn rate?

It is actually kind of complicated, but it works by considering frequency, recency, and time since first purchase. The basic idea is that there is not much evidence of customers with low repeated purchases, so we assume it is very likely they are still active. But when a customer has lots of repeated purchases, and the time between the first purchase and last purchase is short, i.e. time since last purchase is long, it is very likely that they are no longer active. [formula](http://www.brucehardie.com/notes/021/palive_for_BGNBD.pdf) [code](https://github.com/CamDavidsonPilon/lifetimes/blob/4f2833f4518621343bb6983eb3e540c11f66ec6a/lifetimes/fitters/beta_geo_fitter.py#L260)

The simplest way to calculate the churn rate could be $p=(\frac{\text{frequency}_i}{\text{frequency}_{max}})(\frac{\text{recency}_i}{\text{recency}_{max}})^2$

### How to model the churn

The transaction process (Buy), i.e. the number of events within a fixed interval could be modeled by Poisson distribution with transaction rate, while the transaction rate could be modeled by a gamma distribution. Since gamma distribution is the [conjugate prior](conjugate-priors.md) of Poisson distribution, and it is a continuous analog of the negative binomial distribution, which is also a analog of geometric distribution but allowing overdispersion, i.e. the number of trials until the first success. As a result, the posterior predictive distribution would be a negative binomial distribution. [ref](https://en.wikipedia.org/wiki/Conjugate_prior)

After any transaction, a customer becomes inactive with probability p, i.e. the dropout process (Till You Die). It could be seen as a geometric distribution, whose probability could be modeled by a beta distribution. [notebook](https://www.pymc-marketing.io/en/stable/notebooks/clv/bg_nbd.html#model-specification)

The transaction rate and the dropout probability shall vary independently across customers. But instead of estimating the parameters for each specific customer, we could do it for a randomly chosen customer, i.e. the expected values. So it comes to find the posterior distribution of the parameters, which then can be depends on the purchase history of the customers.

### Note that BG/NBD model assumes no future purchases

For frequent buyers, the probability of being alive drops very fast as we are assuming no future purchases, so be careful for interpretation. For them, a short time period would be preferred.

### How to model the monetary value?

It can be modeled by Gamma-Gamma model. [code](https://www.pymc-marketing.io/en/stable/notebooks/clv/gamma_gamma.html#model-specification) [paper](http://www.brucehardie.com/notes/025/gamma_gamma.pdf)

First of all we should filter out all those customers with only one purchase, i.e. no repeated purchases.

The model of spend per transaction is based on the following three general assumptions [ref](https://www.pymc-marketing.io/en/stable/notebooks/clv/gamma_gamma.html#model-specification):

- The monetary value of a customer’s given transaction varies randomly around their average transaction value.
- Average transaction values vary across customers but do not vary over time for any given individual.
- The distribution of average transaction values across customers is independent of the transaction process.

The monetary value could simply be the total spend divided by the number of transactions of any customer. Then the spend could be modeled by a gamma distribution, such that the total spend across x transactions of any customer is also gamma distributed due to the convolution property, and the average spend across x transactions and all customer is also gamma distributed due to scaling property.

Note that the Gamma-Gamma model assumes that there is no relationship between the monetary value and the purchase frequency, i.e. the distribution of average transaction values across customers is independent of the transaction process.

With the posterior distribution of the parameters, we could then predict the expected spend of each customer. Since the average transaction value is gamma distributed among all customers.

Combining the BG/NBD model and the Gamma-Gamma model, we could then predict the CLV of each customer with a discounted cash flow model.

## Click-Through Rate (CTR)

When the business goal is to correctly predicting the click-through rate, it could be a regression or classification problem, but when the business goal is to increase the click-through rate, then it is a [recommendation system](recommendation-systems.md) problem, which usually is the right problem to solve. Though correctly predicting the click-through rate could be a good upstream task to be further [pass down to experts to choose the actions](classification.md#so-when-a-binary-response-is-appropriate), manual decision making is not scalable, that might be infeasible in large scale, e.g. 1000+ ads or users.

- [Microsoft Predicting Clicks: Estimating the Click-Through Rate for New Ads](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/predictingclicks.pdf)
- [Contextual Multi-Armed Bandits](https://static.googleusercontent.com/media/research.google.com/zh-TW//pubs/archive/37042.pdf)
- [CTR Optimization via Thompson Sampling](https://medium.com/walmartglobaltech/ctr-optimization-via-thompson-sampling-83df19fa577f)
- [Multi armed bandit: How to use multi armed bandit for click through modeling and balance exploration and exploitation](https://fastercapital.com/content/Multi-armed-bandit--How-to-use-multi-armed-bandit-for-click-through-modeling-and-balance-exploration-and-exploitation.html)
- [21.8. Feature-Rich Recommender Systems@d2l](http://d2l.ai/chapter_recommender-systems/ctr.html)

## Evaluation

ROC curve and calibration curve is great. [Notes on classification](classification.md#evaluation)

## How to get a job in marketing data science?

Marketing analytics/data science can definitely be a mixed bag. You probably want to avoid any postings that mention Google/Adobe Analytics. Most of your Bayesian MMM type work will come from marketing measurement related positions, it gets called out in the JD pretty often. Large CPGs, US Tech/ecommerce, and marketing measurement firms (NeilsenIQ and the like) are good places to look. Marketing DS jobs related to performance marketing can be pretty good options as well. [ref](https://www.reddit.com/r/datascience/comments/11siza8/how_often_are_bayesian_methods_used_in_practice/)

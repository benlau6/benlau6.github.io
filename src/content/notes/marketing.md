---
title: Marketing
publishDate: 2024-09-24
---

# Marketing

There are two major topics in marketing data science: marketing mix modeling (MMM) and customer lifetime value (CLV). MMM is to evaluate the effectiveness of advertising channels in order to allocate future advertising budgets, while CLV is about predicting the future value of a customer. The former is a explanatory model, while the latter is a predictive model.

- [PyMC-Marketing: A Bayesian Approach to Marketing Data Science](https://www.pymc-labs.com/blog-posts/pymc-marketing-a-bayesian-approach-to-marketing-data-science/)
- [How-to: MMMs and CLVs notebooks](https://www.pymc-marketing.io/en/stable/notebooks/index.html)

## Marketing mix modeling

It could differentiate changes due to advertising spend, holiday effect, seasonality, or macro-economic factors, or account for diminishing returns of ad exposure over time, channel saturation, or delayed effects of advertising.

- [MMM Example Notebook](https://www.pymc-marketing.io/en/stable/notebooks/mmm/mmm_example.html)
- [Media Effect Estimation with PyMC: Adstock, Saturation & Diminishing Returns](https://juanitorduz.github.io/pymc_mmm/)
- [Bayesian Media Mix Modeling for Marketing Optimization](https://www.pymc-labs.com/blog-posts/bayesian-media-mix-modeling-for-marketing-optimization/)
- [Introduction to Media Mix Modeling](https://www.pymc-marketing.io/en/stable/guide/mmm/mmm_intro.html)

## Customer lifetime value

While MMM maximize the mean of target variable, e.g. sales, or user signups, sometimes it is better to focus a specific group of high value customers. CLV predicts future purchases and quantify the long-term value of each customer, so it can differentiate the value of customers, and help to allocate resources to the most valuable customers. [blog](https://www.pymc-labs.com/blog-posts/pymc-marketing-a-bayesian-approach-to-marketing-data-science/#customer-lifetime-value)

PyMC-Marketing's CLV module includes a range of models, to predict future churn rates, purchase frequency, and monetary value of customers.

### Some attributes from each customer would be good

- frequency
- recency
- number of repeated purchases
- membership

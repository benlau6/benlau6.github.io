---
title: Online Retail Analytics
publishDate: 2024-09-20
---

# Online Retail Analytics

- [The research paper](https://www.hbs.edu/ris/Publication%20Files/kris%20Analytics%20for%20an%20Online%20Retailer_6ef5f3e6-48e7-4923-a2d4-607d3a3d943c.pdf)
- Great combination of business and data science.
- Great combination of demand forecasting, price optimization, mathematical proof, causal inference, and hypothesis testing.

## Questions to address

- How does price optimization work with demand forecasting?
  - replace the expected demand in the profit objective function with the forecasted demand
- How does pricing optimization work in practice with constraint to avoid increasing prices indefinitely?
  - A key observation is that the demand of a style is only dependent on the price of that style and the sum of the prices of all the competing styles, not the individual price of each style.
  - So assign a reasonable price range for each product, deviating it by relative prices of competing styles.
- Price elasticity problem
  - Although not modeled explicitly, Rue La La was particularly concerned that raising prices would decrease sales.
  - Preliminary analysis of the pricing decision support tool on historical data suggested that, in fact, the model recommended price increases had little to no effect on sales quantity.
  - Motivated by this analysis, we wanted to design an experiment to test whether implementing model recommended price increases would decrease sales. Ideally, we would have liked to design a controlled experiment where some customers were offered prices recommended by the tool and others were not; due to potentially inducing negative customer reactions from such an experiment, we decided not to pursue this type of experiment. Instead, we developed and conducted a field experiment that took place from January through May of 2014 and satisfied Rue La La’s business constraints.
  - Our goal for the field experiment was to address two questions: (i) would implementing model recommended price increases cause a decrease in sales quantity, and (ii) what impact would the recommended price increases have on revenue?

## Demand Forecasting

- Regression tree

## Price Optimization

- Used the output of demand forecasting.
- Integer linear programming
- Proved some theorems

## Implementation

- Feasible run time for daily update
  - average 1 hour, maximum 4.5 hours for daily update
  - the regression tree need not to be update daily. Only if the business and competitive landscape change over time.
    - The update of regression tree is also automated
- Pre-calculated part of the data and stored into optimizer database
  - for price recommendation
  - for post-event margin analysis
- Parallel computing
  - 100 regression trees used to predict future demand for each department
  - 12 price optimization problems, one for each subclass and event combination

## Evaluation

- Field experiment

  - Causal inference
  - Reasons
    - Preliminary analysis of the pricing decision support tool on historical data suggested that, in fact, the model recommended price increases had little to no effect on sales quantity. Motivated by this analysis, we wanted to design an experiment to test whether implementing model recommended price increases would decrease sales. Ideally, we would have liked to design a controlled experiment where some customers were offered prices recommended by the tool and others were not; due to potentially inducing negative customer reactions from such an experiment, we decided not to pursue this type of experiment. Instead, we developed and conducted a field experiment that took place from January through May of 2014 and satisfied Rue La La’s business constraints.
  - Questions to address
    1. would implementing model recommended price increases cause a decrese in sales quantity
    2. what impact would the recommended price increases have on revenue

- Hypothesis testing

## Tools

- [Azure/cortana-intelligence-price-optimization](https://github.com/Azure/cortana-intelligence-price-optimization/blob/master/Manual%20Deployment%20Guide/Solution%20Description.md)

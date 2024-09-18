---
title: "Bayesian Changepoint Detection"
description: "A Bayesian approach to detecting changepoints in time series data"
publishDate: "2021-08-25"
coverImage:
  src: "./cover.png"
  alt: "Trace plot"
demo: "https://github.com/benlau6/hierarchy-bayesian-modeling-time-series-sensor/blob/main/demonstration.ipynb"
github: "https://github.com/benlau6/hierarchy-bayesian-modeling-time-series-sensor/"
tags:
  - "anomaly-detection"
  - "bayesian"
  - "python"
  - "pymc"
---

- Implemented several hierarchical Bayesian model to detect changepoints in time series data

## Baseline Model

A simple linear regression model is used to fit the data.

Trace plot is shown below:

![trace plot](./trace0.png)

Fitted as:

![Fitted](./fit0.png)

## First model

Model architecture:

![Model architecture](./model.png)

Trace plot is shown below:

![trace plot](./trace.png)

Fitted as:

![Fitted](./fit.png)

## Second model

Model architecture:

![Model architecture](./model2.png)

Trace plot is shown below:

![trace plot](./trace2.png)

Fitted as:

![Fitted](./fit2.png)

## Comparison

| model | rank | weight | loo | d_loo |
| --- | --- | --- | --- | --- |
| switchpoint | 0 | 0.971818 | -72.991731 | 0.000000 |
| baseline | 1 | 0.028182 | -158.430899 | 85.439168 |

Rank is the rank-order of the models with 0 being the best model. Weight can be loosely interpreted as the probability of each model (among the compared model) given the data. As a result, the switchpoint model is much better than the baseline model.

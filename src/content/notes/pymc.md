---
title: "PYMC"
publishDate: "2024-09-19"
---

# PYMC

## Random Walk Implementation

- [Time series implementation questions](https://discourse.pymc.io/t/time-series-implementation-questions/10653/1)
- [Implement DiffTransform for RandomWalk distributions](https://github.com/pymc-devs/pymc/issues/6098)
- [RandomWalk implementation using scan vs vectorized](https://gist.github.com/ricardoV94/2167ab7214affef47a86582141205bf5)
- [GaussianRandomWalk implementation using library vs from scratch](https://gist.github.com/AustinRochford/a99a6951e2c4e167b3173cb2afd4e5ea)
- [Beta random walk](https://discourse.pymc.io/t/beta-random-walk/6006)
  - `scan`
  - `pm.Beta('x', ...).cumsum()`
  - wrap a `GRW` inside `sigmoid`
- [5 Levels of Difficulty - Bayesian Gaussian Random Walk with PyMC3 and Theano](https://github.com/luisroque/bayesian_time_series/blob/main/5%20Levels%20of%20Difficulty%20-%20Bayesian%20Gaussian%20Random%20Walk%20with%20PyMC3%20and%20Theano.ipynb)
- [tensorflow/probability/Estimating_COVID_19_in_11_European_countries.ipynb](https://github.com/tensorflow/probability/blob/main/tensorflow_probability/examples/jupyter_notebooks/Estimating_COVID_19_in_11_European_countries.ipynb)
  - fine tuned bijectors to solve problem of heaviness of tails of lognormal distribution and make inference fast and numerically more stable

## Random Walk Predictions

- [Important points of making predictions in GRW timeseries](https://discourse.pymc.io/t/sample-posterior-predicitve-not-catching-shape-of-new-data/10179/10)
- [Forecasting using Gaussian Random Walk](https://discourse.pymc.io/t/forecasting-using-gaussian-random-walk/10565)
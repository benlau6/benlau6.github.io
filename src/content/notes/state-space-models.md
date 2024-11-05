---
title: State Space Models
publishDate: 2024-09-20
---

# State Space Models

- Defined in terms of a pair of equations
  - Observation equation: $y_t = Z_t^T \alpha_t + \varepsilon_t$
    - It links the observed data $y_t$ to a latent d-dimensional state vector $\alpha_t$
  - State equation: $\alpha_{t+1} = T_t \alpha_t + R_t \eta_t$
    - It governs the evolution of the state vector $\alpha_t$ through time

## Bayesian Structural Time Series

It is a state space model with a specific structure that allows for easy interpretation and forecasting. It is also a flexible framework for modeling time series data with multiple sources of information. [paper](https://static.googleusercontent.com/media/research.google.com/zh-TW//pubs/archive/41854.pdf) [pymc notebook](https://github.com/pymc-devs/pymc-experimental/blob/main/notebooks/Structural%20Timeseries%20Modeling.ipynb) [pymc discussion](https://discourse.pymc.io/t/pymc-experimental-now-includes-state-spaces-models/12773)

Note that there is another stream of Bayesian structural time series models that seems not using the state space model framework. [Forecasting with Structural AR Timeseries](https://www.pymc.io/projects/examples/en/latest/time_series/Forecasting_with_structural_timeseries.html)

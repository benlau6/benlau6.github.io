---
title: Forecasting
publishDate: 2024-10-13
---

# Forecasting

A stationary time series is one whose statistical properties do not change over time. Thus, time series with trends, seasonality, varying variance, or varing autocorrelation pattern, are not stationary — the trend and seasonality will affect the value of the time series at different times. Most of the non-time series models does not work well with non-stationary data. However, some of the problematic parts, e.g. [trends](https://machinelearningmastery.com/time-series-trends-in-python/), could be removed, by modeling the trend, then subtracting it from the original data, which is called detrending. The simplest detrending method would be differencing, which simply subtracts the previous value from the current value.

Autocorrelation could be handled by fitting AR model, finding the autocorrelation parts, then subtracting it from the original data.

## Methods

- Since $y_t$ can be explained by the previous $y_{t-k}$ values, add lagged response value $y_{t-1}, y_{t-2}, ..., y_{t-k}$ to the feature set, or add the rolling mean, then fit it as usual
- Discrete GLM
  - [Poisson regression](https://www.pymc.io/projects/examples/en/latest/generalized_linear_models/GLM-poisson-regression.html)
  - [Negative binomial regression](https://www.pymc.io/projects/examples/en/latest/generalized_linear_models/GLM-negative-binomial-regression.html)
- Continuous GLM
  - [Gamma regression](https://juanitorduz.github.io/gamma_gamma_pymc/)
- ARIMA
- Prophet from Facebook
- Causal Impact from Google
- LSTM
- [skforecast](https://cienciadedatos.net/documentos/py27-time-series-forecasting-python-scikitlearn.html)
  - one of the method is recursive multi-step forecasting, just like my covid project

## ARIMA

- p is the number of autoregressive terms
- d is the number of nonseasonal differences needed for stationarity
- q is the number of lagged forecast errors in the prediction equation.

### Interpretation

- ARIMA(1,0,0) = first-order autoregressive model: if the series is stationary and autocorrelated, perhaps it can be predicted as a multiple of its own previous value, plus a constant.
- ARIMA(0,1,0) = random walk
- ARIMA(0,1,1) without constant = simple exponential smoothing
- ARIMA(0,1,1) with constant = simple exponential smoothing with growth

[ref](https://people.duke.edu/~rnau/411arim.htm)

## Evaluation

- Without refit: fitting up to training data, then predict test data with a time window sequentially [ref](https://medium.com/@mouse3mic3/a-practical-guide-on-scikit-learn-for-time-series-forecasting-bbd15b611a5d)
- With refit and increasing train size: fixed testing time window, but increase training size sequentially
- With refit and fixed train size: time window for both training and testing, run in sequentially

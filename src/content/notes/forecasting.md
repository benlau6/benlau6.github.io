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

## Model Selection

### Is deep learning suitable for time series forecasting?

[discussion](https://www.reddit.com/r/MachineLearning/comments/12hjh4m/r_is_deep_learning_suitable_for_time_series/)

> At a previous job, we ended up using LSTM for a problem that where it was just superior against most of the stat based methods. The data was rich, plenty of features, clean data (or it required minimal cleaning), and a lot of examples (original table had over 2T rows, but that wasn't what the model was fed, but I wanted to clarify just how much of good data we had). Matter of fact, we initially thought there was some sort of leakage due to the exceptional performance, but after few rounds of auditing, and a small online test drive it ended up being implemented.
>
> Do note that the model wasn't a simple thing, we had temporal and none temporal data and we had to come up with a multi-input multi-output kind of thing, and we were trying to predict two things (basically a combo of regression and a classifier) . As far as I know the model is still in production after 3.5 years with just more features being added to it to try to squeeze more accuracy out of it.
>
> It worked in our case because it wasn't an on-line model, we set an initial 3 month retrain timeline, but we ended having to retrain every 6~7 months once a specific metric went below a certain value, however, training did take almost a full weekend.

> In my experience, it depends on the underlying generating process. Is it stationary, markovian, ergodic, exchangeable, self-similar, time-reversible, etc? What properties can you reasonably assume it has, or test for to confirm?
>
> Deep learning clearly works best when there is strong underlying structure. Some time series have that, some don't. Often the structure to learn in time series is not very complex. In these cases, not overfitting is way more important than a ton of model capacity. Possibly why certain ensemble tree based models can do so well with time series.
>
> I've mainly looked at financial machine learning. For that use case, DL and even ML struggles in certain usecases. The main place DL struggles here is forecasting directly profitable information. Information that is not directly profit-able (where you can profit from good forecasts) is much easier.
>
> You have to assume others are also forecasting trading signals, which in turn makes them more difficult to forecast. There is inherent adversity that doesn't exist in the fields deep learning tends to be great for (translation, digit recognition, etc). Maybe RL, a problem statement that can be combined more easily with game theory, would be more useful for DL here. Great care has to be taken to avoid fitting to the noise. Depending on who you ask, it may even be impossible to do any meaningful forecasting - especially autoregressively (weak-form EMH).

> For a single series with less than 10k data points, I think you're better off with classical techniques. More than that, DL might be useful but it all depends on the type of problem you're dealing with.
>
> Now assuming you have multiple series (say more than 100), with all of them representing the same data generation process, you could do great stuff with DL using simple 1D convnets.
>
> Multiple series with different generation processes can be modeled using 2D convnets too but that's not something I've tried myself.
>
> Classical algos tend to fail with large datasets because they're optimizing a limited number of parameters. DL models are useful with those as they have feature engineering embedded within and can capture complex patterns that classical algos cannot.
>
> For example, if a stock price always goes down whenever it's gone up by more than $4 for three consecutive days, that's not a pattern you can capture explicitly through the autoregressive scheme (because it's not really establishing clear decision boundaries). Try thinking about binary forecasting if you don't see my point
>
> With time series data in general, my experience has been that you've got to know exactly what you're doing, and maybe that's why a lot of DL approaches don't seem to do well

## Evaluation

- Without refit: fitting up to training data, then predict test data with a time window sequentially [ref](https://medium.com/@mouse3mic3/a-practical-guide-on-scikit-learn-for-time-series-forecasting-bbd15b611a5d)
- With refit and increasing train size: fixed testing time window, but increase training size sequentially
- With refit and fixed train size: time window for both training and testing, run in sequentially

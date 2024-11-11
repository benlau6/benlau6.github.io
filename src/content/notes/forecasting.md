---
title: Forecasting
publishDate: 2024-10-13
---

# Forecasting

A stationary time series is one whose statistical properties do not change over time. Thus, time series with trends, seasonality, varying variance, or varing autocorrelation pattern, are not stationary — the trend and seasonality will affect the value of the time series at different times. Most of the non-time series models does not work well with non-stationary data. However, some of the problematic parts, e.g. [trends](https://machinelearningmastery.com/time-series-trends-in-python/), could be removed, by modeling the trend, then subtracting it from the original data, which is called detrending. The simplest detrending method would be differencing, which simply subtracts the previous value from the current value.

Autocorrelation could be handled by fitting AR model, finding the autocorrelation parts, then subtracting it from the original data.

## Readings

- [Discussion | How to know that your machine learning problem is hopeless?](https://stats.stackexchange.com/questions/222179/how-to-know-that-your-machine-learning-problem-is-hopeless): There is a good answer talking about forecastability
- [Skforecast: time series forecasting with Python, Machine Learning and Scikit-learn](https://cienciadedatos.net/documentos/py27-time-series-forecasting-python-scikitlearn.html)
- [Statistical forecasting: notes on regression and time series analysis](https://people.duke.edu/~rnau/411home.htm)
- [How to use XGBoost for time series forecasting](https://www.analyticsvidhya.com/blog/2024/01/xgboost-for-time-series-forecasting/)
- [Modeling Variable Seasonal Features with the Fourier Transform](https://towardsdatascience.com/modeling-variable-seasonal-features-with-the-fourier-transform-18c792102047) - Great read on modeling seasonality
- [Fourier Series as a Function of Approximation for Seasonality Modeling - Exploring Facebook Prophet's Architecture](https://gowrishankar.info/blog/fourier-series-as-a-function-of-approximation-for-seasonality-modeling-exploring-facebook-prophets-architecture/)
- [M5 Forecasting - Accuracy Simple 4th place solution](https://www.kaggle.com/competitions/m5-forecasting-accuracy/discussion/163216) - The task is to estimate the point forecasts of the unit sales of various products sold in the USA by Walmart. This solution fitted 40 LightBGM models to 10 stores times 4 weeks of daily predictions. The key is to split the models by store and week, and use [tweedie](https://www.kaggle.com/competitions/m5-forecasting-accuracy/discussion/150614) loss to deal with right-skewed data with most of the data distribution concentrated around 0.
  - It used sales features which includes lagged sales, rolling mean, rolling standard deviation and released
  - Calendar features which includes day of year, day of week, week of year, weekend, week of month, month of year, and year
  - Any special events with binary features
  - Price features, most of which are summary statistics
  - Id features including item_id, cat_id, dept_id, and group mean, standard deviation of those features
  - [model architecture](https://www.kaggle.com/competitions/m5-forecasting-accuracy/discussion/163216#924779)

## Considerations

- Number of observations vs number of features
- Assumed relationship between the features and the target
- While using exogenous variables, it is important that future values of the exogenous variables are known at the target forecast time. Usually, they should be time-invariant for this to be true. Otherwise, we need to forecast the exogenous variables with another model such that the forecasted exogenous values are available at the target forecast time.
- Time granularity: daily, weekly, monthly or yearly? How are the data collected in time? How should the forecast be presented?
- How many years of data?
- How many features that are considered to be important?
- Non-stationary: it is a time series whose statistical properties change over time, e.g. trend, seasonality, sudden events, autocorrelation, and heteroscedasticity
- Heteroscedasticity: it is a situation in which the variance of the error term is not constant, could be handled by transforming the data, e.g. log transformation, which turn multiplicative components to additive components, i.e. from proportional variance to constant variance.
- Trend: could be handled by differencing, or detrending
- Seasonality: could be handled by Fourier transformation, or one-hot encoding of day of year, month of year, or week of year
- Sudden events: could be handled by adding a binary feature, e.g. 1 for the event, 0 for the rest, or despiking by handling the outliers through imputation, clipping, or removing.
- Autocorrelation: could be handled by lagged features

## Applications

- Retail and e-commerce
  - Demand prediction
  - Dynamic pricing
  - Sales forecasting
- Finance
  - Risk management: [Overview of Asset Risk Cost Methodology](https://www.powerlink.com.au/sites/default/files/2019-05/Overview%20of%20Asset%20Risk%20Cost%20Methodology.pdf) [Cost Risk Analysis: How to Use Cost Simulation Model to Identify and Mitigate the Potential Cost Risks](https://fastercapital.com/content/Cost-Risk-Analysis--How-to-Use-Cost-Simulation-Model-to-Identify-and-Mitigate-the-Potential-Cost-Risks.html)
  - Fraud detection
  - Credit scoring
- Manufacturing
  - Predictive maintenance
  - Raw materials demand forecasting
  - Operations optimization: production scheduling, resource allocation, inventory management, energy consumption
- Web resources
  - Traffic prediction
  - Downtime prevention
  - Hosting cost optimization

[ref](https://codeit.us/blog/machine-learning-time-series-forecasting)

- Problem:
  - A client has contacted the CodeIT team, requesting us to develop a digital solution for running predictive maintenance, using the 500gb dataset with parameters of equipment. He wanted a model to thoroughly predict when a piece of equipment is likely to fail so that he could update production schedules and order new equipment in advance.
- Solution:
  - We’ve analyzed project requirements and prepared a proof of concept (PoC) to validate the client’s idea. After collecting and analyzing the feedback from the client, our team has developed a minimum viable product (MVP). We’ve released the MVP and supplemented it with new features that were released incrementally.
  - The developed solution gathers data from shop floor sensors and analyzes it using AI. Insights delivered by the systems help spot anomalies and detect trends. The system builds predictive models that help understand when exactly the piece of equipment will reach the point of failure. Also, we’ve enabled users to create custom dashboards. Hence, different user roles can compose personalized dashboards to access crucial information in an easy-to-digest way.

## Feature engineering

- Differencing: it is useful in forecasting when the data is non-stationary, i.e. the mean, variance, and covariance are not constant over time. By taking the difference between the current value and the previous value, it removes the trend and makes the data stationary. [ref](https://people.duke.edu/~rnau/411diff.htm) Apart from that, we can use model differencing, e.g. remove a fitted linear trend, seasonality, or other patterns.
- Linearization of exponential growth and inflation: commonly in forecasting, by taking logarithm of a variable, it would converts the exponential growth pattern to a linear growth pattern, and it simultaneously converts the multiplicative (proportional-variance) seasonal pattern to additive (constant-variance) seasonal pattern. So it straightens out exponential growth patterns and reduces heteroscedasticity (i.e., stabilizes variance), but it does not eliminate an upward trend in the data. Moreover, it avoid the need of [deflating](https://people.duke.edu/~rnau/411infla.htm) in monetary value. In this setting, trend measured in natural-log units ≈ percentage growth, errors measured in natural-log units ≈ percentage errors, and coefficients in log-log regressions ≈ proportional percentage changes. [ref](https://people.duke.edu/~rnau/411log.htm) [discussion](https://stats.stackexchange.com/questions/244199/why-is-it-that-natural-log-changes-are-percentage-changes-what-is-about-logs-th)
- Lagged features: if it is assumed that a change in X causes a change in Y, we can model this by using both lagged x and current x as features, and then trees-based models would find the interaction term for us, or we could assign a delta x variable one of the covariates manually. It is a common practice for time series forecasting dealing with autocorrelation. [ref](https://scikit-learn.org/1.5/auto_examples/applications/plot_time_series_lagged_features.html)
- Fourier transformation: convert a time series data to frequency domain, which is useful for detecting periodic patterns, e.g. seasonality, and it is useful for forecasting. [ref](https://www.analyticsvidhya.com/blog/2024/01/xgboost-for-time-series-forecasting/) Applying one-hot encoding to day of year, month of year, or week of year are actually performing the same task as Fourier series time features, but with different implementation.
  - Fourier series are concise and can express arbitrarily large periods P — they are well-suited for large-period seasonality. On the other hand, if the waveform is very complex, it may not be learned well without creating many sine/cosine pairs.
  - Never create Fourier components with a period shorter than twice the sampling period of your time series. If your time series has a daily sampling period, then the shortest seasonality you will ever be able to model is 2 days. The Nyquist-Shannon theorem places a hard limit there, like a brick wall.
  - A periodogram plot would be a great reference to determine the series, which will highlight all spectral components, i.e. seasonality, in the signal.
  - The periodogram will highlight all spectral components in the signal (all seasonal components in the data), and will provide an overview of their overall “strength”, but it’s an aggregate of the “strength” of any component over the whole time interval. It says nothing about how the “strength” of each seasonal component may vary in time across the dataset. To capture that variation, you have to use the Fourier spectrogram instead. [good read](https://towardsdatascience.com/modeling-variable-seasonal-features-with-the-fourier-transform-18c792102047)

## Methods

Normally it is a multi-step forecasting, which could be implemented in several ways:

- Recursive forecasting: predict one step ahead, then use the prediction as input for the next step
- Direct forecasting: predict multiple steps ahead at once
- Multi-output forecasting: predict multiple outputs at once while accounting for the correlation between them, i.e. predicting multiple values of a sequence.

Concrete methods:

- Since $y_t$ can be explained by the previous $y_{t-k}$ values, add lagged response value $y_{t-1}, y_{t-2}, ..., y_{t-k}$ to the feature set, or add the rolling mean, then fit it as usual
- Discrete GLM
  - [Poisson regression](https://www.pymc.io/projects/examples/en/latest/generalized_linear_models/GLM-poisson-regression.html)
  - [Negative binomial regression](https://www.pymc.io/projects/examples/en/latest/generalized_linear_models/GLM-negative-binomial-regression.html)
- Continuous GLM
  - [Gamma regression](https://juanitorduz.github.io/gamma_gamma_pymc/)
- Gradient boosting: [a silver bullet in forecasting](https://towardsdatascience.com/gradient-boosting-a-silver-bullet-in-forecasting-5820ba7182fd)
- SARIMA: Seasonal Autoregressive Integrated Moving Average, which is a composite model
- Prophet from Facebook
- Causal Impact from Google
- RNN/LSTM
- [skforecast](https://cienciadedatos.net/documentos/py27-time-series-forecasting-python-scikitlearn.html)
  - one of the method is recursive multi-step forecasting, just like my covid project
- Structured State Space for Sequence Modeling (S4): [The Annotated S4](https://srush.github.io/annotated-s4/) [paper](https://arxiv.org/abs/2111.00396)
- Recursive vs direct forecasting
- one model per one output (no interaction between submodels) vs one model for multiple-output (joint optimization, might benefit from joint constraints)

### Is deep learning suitable for time series forecasting?

On a set of 3,003 different time series an ensemble DL method achieved 10% lower error than the next best, the statistical model ensemble. The DL ensemble took considerably more time to train, 15 days vs 1 hour. The DL ensemble performed better with noisy, non linear data with strong trends, while the statistical ensemble did well with seasonal and low variance data. [blog](https://towardsdatascience.com/time-series-forecasting-deep-learning-vs-statistics-who-wins-c568389d02df)

[paper - Do We Really Need Deep Learning Models for Time Series Forecasting?](https://arxiv.org/abs/2101.02118)

According to some experienced guys, definitely yes. Some guys succeeded with LSTM model on 2T rows. [discussion](https://www.reddit.com/r/MachineLearning/comments/12hjh4m/r_is_deep_learning_suitable_for_time_series/)

> In my experience, it depends on the underlying generating process. Is it stationary, markovian, ergodic, exchangeable, self-similar, time-reversible, etc? What properties can you reasonably assume it has, or test for to confirm?
>
> Deep learning clearly works best when there is strong underlying structure. Some time series have that, some don't. Often the structure to learn in time series is not very complex. In these cases, not overfitting is way more important than a ton of model capacity. Possibly why certain ensemble tree based models can do so well with time series.
>
> I've mainly looked at financial machine learning. For that use case, DL and even ML struggles in certain usecases. The main place DL struggles here is forecasting directly profitable information. Information that is not directly profit-able (where you can profit from good forecasts) is much easier.
>
> You have to assume others are also forecasting trading signals, which in turn makes them more difficult to forecast. There is inherent adversity that doesn't exist in the fields deep learning tends to be great for (translation, digit recognition, etc). Maybe RL, a problem statement that can be combined more easily with game theory, would be more useful for DL here. Great care has to be taken to avoid fitting to the noise. Depending on who you ask, it may even be impossible to do any meaningful forecasting - especially autoregressively (weak-form EMH).

> Anyway, in the M6 Forecasting competition (whose goal was to find if data science & econometrics can outperform Buffet's returns) the winning solution used neural networks and meta-learning to beat the option's and the ETF market

> We have spent a lot of time on this topic at our company as well, although there is no clear winner, here is what stood out for us.
>
> 1. Multivariate models like GBT etc. have comparable or better performance to DL methods like TFT etc. if feature engineering done right.
> 2. Regular tree models are a bit of a pain to use because of the feature engineering etc. involved and on the other hand, many DL models are end to end.
>
> On the flip side, DL methods are much harder to make it work and involves a lot of tuning etc.
>
> On the M5 kaggle data set, except for a couple or so, most of the top solutions are using tree modes or non-DL techniques.

### Tree-based models are not good at extrapolation

A good practice then is to decompose the time series and forecast all the components separately, e.g. trend, seasonality, and residuals. [ref](https://medium.com/@joachimiak.krzysztof/multi-output-regression-with-gradient-boosting-machines-39c925b5a1d4)

### ARIMA

- p is the number of autoregressive terms
- d is the number of nonseasonal differences needed for stationarity
- q is the number of lagged forecast errors in the prediction equation.

#### Interpretation

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

### Why are predictions from my LSTM Neural Network lagging behind true values?

The prediction lags behind the true value because the series is autoregressive (i.e. a strong way to predict tomorrow’s value is “It will be about the same as today”). Your model therefore corrects itself with the new information when it misses a big jump. In other words, if the price jumps one day and your model does not predict that, it has learned to take into account the higher price for the prediction of the next day’s price. Unless there is a dominating time pattern in the data, a LSTM model won't predict well. It will especially perform poorly if the data is changing direction often. [discussion](https://datascience.stackexchange.com/questions/76826/why-are-predictions-from-my-lstm-neural-network-lagging-behind-true-values) [examples](https://www.analyticsvidhya.com/blog/2018/10/predicting-stock-price-machine-learningnd-deep-learning-techniques-python/)

## Evaluation

- Without refit: fitting up to training data, then predict test data with a time window sequentially [ref](https://medium.com/@mouse3mic3/a-practical-guide-on-scikit-learn-for-time-series-forecasting-bbd15b611a5d)
- With refit and increasing train size: fixed testing time window, but increase training size sequentially
- With refit and fixed train size: time window for both training and testing, run in sequentially

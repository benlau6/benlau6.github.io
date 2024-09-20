---
title: Gaussian Processes
publishDate: 2024-09-20
---

# Gaussian Processes

## Introduction

GPs are generally a go-to approach for non-linear time series, but the reservation is that it is not a mechanistic model. So it is not good for modeling compartmental models such as SIR, SEIR, etc. A GP model might be useful for very short-term predictions, but since it does not account for changes in behavior (including specific interventions), it has limited use. That said, it might be interesting to incorporate a GP into a mechanistic model as a way of estimating some of the latent parameters, and their dynamics [1](https://discourse.pymc.io/t/prediction-of-danish-covid19-cases/4904).

However, there seems to be a solution [Stationarity without mean reversion in improper Gaussian processes](https://arxiv.org/pdf/2310.02877).

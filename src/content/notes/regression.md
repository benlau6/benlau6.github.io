---
title: "Regression"
publishDate: "2024-09-19"
---

# Regression

## Background of regression

- dataset $d$, where $d = {(x_i, y_i)), i=1,2,...,N}$
- $x_i$ is a vector of predictors, or "covariates" taking its value in some space $\mathcal{X}$
- response $y_i$
- a regression algorithm want to output a rule $r_d(x)$ where $\hat{y} = r_d(x)$

## Three Major uses of regression

- For prediction
  - Given a new observation of x, use $\hat{y} = r_d(x)$ to predict y, e.g. email spam prediction
- For estimation
  - Uses the rule to describe a regression surface $\hat{S}$ over $\mathcal{X}$, where $\hat{S} = \{r_d(x), x\in \mathcal{X}\}$
  - For estimation, but not necessarily for prediction, we want $\hat{S}$ to accurately portray S, the true regression surface.
- For explanation
  - The relative contribution of the different selected predictors to $r_d(x)$ is of interest to explain the response. How the regression surface is composed is of prime concern in this use, but not in use for prediction or estimation.

The three different uses of $r_d(x)$ raise different inferential questions. Prediction use calls for estimates of prediction error. For estimation, the accuracy of $r_d(x)$ as a function of x, perhaps in standard deviation terms, $sd(x) = sd(\hat{y}|x)$, would tell how closely $\hat{S}$ approximates S. Explanation requires more elaborate inferential tools, saying for example which of the regression coefficients $\alpha_i$ can safely be set to zero.

## References

- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.
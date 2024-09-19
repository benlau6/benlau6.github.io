---
title: "R-squared"
publishDate: "2024-09-19"
---

# R-squared

- $$R^2 = 1- \frac{residual error}{sum-of-squares from the mean}$$
  - residual error is the sum of the squared differences between the observed values and the predicted values
  - note that the mean is the horizontal line, which is the simplest model
  - It is not always the square of anything, so it can be negative, which means the model is worse than the simplest model
- aka coefficient of determination
- without the square, it is like the correlation coefficient `r`
  - only if the prediction is a linear regression. In complex models, it is not the same, and there is no r
  - ranged from -1 to 1, extremes are good, 0 is bad
  - it tells how two quantitative variables are related
- Interpretation is easier with the square
- It is the percentage of variation explained by the relationship between the two variables
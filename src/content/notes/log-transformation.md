---
title: Log Transformation
publishDate: 2024-11-24
---

# Log Transformation

- $E(Y) \leq e^E(lnY)$ because of Jensen's inequality. In other words, $E(exp(\epsilon)) > 0$
- But median of $Y$ is the same as $exp(E(lnY))$ because $exp$ is a monotonic function that the order is preserved.
- After taking log on Y, we might want to take log on some X if we assume linear relationship between X and Y, because transforming one without the other will introduce severe nonlinear curvature, badly violating the linearity assumption.
- The coefficient of X has a special interpretation in the log-log model, called elasticity. This parameter measures the percent increase in the median of the distribution of the untransformed Y variable corresponding to a small percent increase in the untransformed X variable. A close enough interpretation would be "There is a $\beta_1$% increase in the median of Y associated with a 1% increase in X".

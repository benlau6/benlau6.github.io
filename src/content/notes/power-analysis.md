---
title: Power Analysis
publishDate: 2024-09-20
---

# Power Analysis

- [What is Power? - StatQuest](https://www.youtube.com/watch?v=Rsc5znwR5FA)
- To get the effect size, which is the requested sample size of a experiment
- [StatQuest](https://www.youtube.com/watch?v=VX_M3tIyiYk)

## Formula

$$n = \frac{(\sigma^2)(Z_{1-\alpha/2}+Z_{1-\beta})^2}{\delta^2}$$

## Sample size on non-normal data

- [Rules of Thumb for Web Site Experimenters](https://stats.stackexchange.com/a/494386): $355 \times s^2$, where $s=\frac{E[(y_i-\mu)^3]}{sigma^2}$
- [Neither the t-test nor the permutation test have much power to identify a difference in means between two such extraordinarily skewed distributions.](https://stats.stackexchange.com/a/69967)

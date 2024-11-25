---
title: Missing Data
publishDate: 2024-11-25
---

# Missing Data

## Types

- **Missing Completely at Random (MCAR)**: if the events that lead to any particular data-item being missing are independent both of observable variables and of unobservable parameters of interest, and occur entirely at random. When data are MCAR, the analysis performed on the data is unbiased; however, data are rarely MCAR.
- **Missing at Random (MAR)**: occurs when the missingness is not random, but where missingness can be fully accounted for by variables where there is complete information. Since MAR is an assumption that is impossible to verify statistically, we must rely on its substantive reasonableness. An example is that males are less likely to fill in a depression survey but this has nothing to do with their level of depression, after accounting for maleness.
- **Missing Not at Random (MNAR)**: data that is neither MAR nor MCAR (i.e. the value of the variable that's missing is related to the reason it's missing). For example, people with high salaries might not disclose their income. This would also occur if men failed to fill in a depression survey because of their level of depression.
- **[Structured Missingness](https://en.wikipedia.org/wiki/Missing_data#Structured_Missingness)**: Missing data can also arise in subtle ways that are not well accounted for in classical theory. An increasingly encountered problem arises in which data may not be MAR but missing values exhibit an association or structure, either explicitly or implicitly.
  - Structured missingness commonly arises when combining information from multiple studies, each of which may vary in its design and measurement set and therefore only contain a subset of variables from the union of measurement modalities. In these situations, missing values may relate to the various sampling methodologies used to collect the data or reflect characteristics of the wider population of interest, and so may impart useful information.
  - The presence of structured missingness may be a hindrance to make effective use of data at scale, including through both classical statistical and current machine learning methods. For example, there might be bias inherent in the reasons why some data might be missing in patterns, which might have implications in predictive fairness for machine learning models.
  - Established methods for dealing with missing data, such as imputation, do not usually take into account the structure of the missing data and so development of new formulations is needed to deal with structured missingness appropriately or effectively.
  - Characterising structured missingness within the classical framework of MCAR, MAR, and MNAR is a work in progress.

## Handling

[Best practices for addressing missing data through multiple imputation](https://doi.org/10.1002/icd.2407): Must read

- Partial deletion: Detect and remove outliers through IQR or Z-scores, though it is not recommended because it can lead to biased results if the data is not MCAR, which is often the case. IQR could be used if the data is not normally distributed, e.g. the data is skewed, or having long tails.
- Interpolation: Fill in missing values with the average of the previous and next values, if the data is time series, and there is a serial correlation
- Imputation
  - The simplest method would be mean imputation for unbiasedness, median imputation for robustness, or KNN imputation for preserving the relationships in the data.
  - Multiple imputation is also appropriate (and better than listwise deletion due to increased statistical power) under the more restrictive MCAR assumption. Even under MNAR, multiple imputation (used with sufficient auxiliary variables) can offer advantages over other approaches (e.g., deletion-based methods).
  - Multiple imputation has advantages even when the amount of missing data is low (i.e., because multiple imputation will eliminate bias under MAR and can partially eliminate bias under MNAR).

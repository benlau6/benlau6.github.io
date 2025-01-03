---
title: Data Science Workflow
publishDate: 2024-10-02
---

# Data Science Workflow

## Must Read

- [Wanted: Data Scientists with Technical Brilliance AND Business Sense](https://careers.doordash.com/blog/data-scientists-technical-skill-business-impact/)
- [Get Knowledge from Best Ever Data Science Discussions on Reddit](https://www.analyticsvidhya.com/blog/2015/08/best-ever-data-science-discussions-reddit/)
- [case-studies notes](case-studies.md)
- [Grokking the Machine Learning Interview](https://www.educative.io/courses/grokking-the-machine-learning-interview)

## Problem framing

### Business wise

[case-studies](case-studies.md#framework)

### Data wise

1. How do you get data from its source?
2. Is the data diverse enough to solve the problem?
3. Do you have enough data?
4. How is the data biased?
5. How frequently does the data change?
6. How sensitive is the data?
7. Are there missing, inconsistent, or incorrect values?
8. How noisy is the data?
9. How can you trace back every piece of data to its source?
10. Are there any legal restrictions on the use of the data?
11. How do you scale as data grows?
12. How quickly does the data become stale?

## Data collection

[Notes on sql](sql.md)

## EDA

- data missingness
- imbalanced data
- outliers
- improperly formatted data
- inconsistent values

## Data assertion and static typing

- Never trust what you are told to be true about the data, always check by static typing and assertions. Typing and assertions could be made by the assumptions you collect from the stakeholders or by EDA.
- It must be done as early and comprehensive as possible, to avoid the shotgun parsing problem.
- Every given assumption must be explicitly stated and asserted, don't trust any people, you are the last safeguard. If data is given or will be given, and the assumption is quantifiable, assert it. If something goes wrong, e.g. having wrong results or bugs, after debugging for hours without getting better, you shall review the assumptions.
  - One time I worked with a client, it costed me several days to figure out the given assumption of seat capacity of a vehicle was incorrect. It assumed that a vehicle request shall be denied automatically when a incoming request is with a exceeding seat demand. However, it is not the case in the historical data, that some accepted cases were with exceeding demand. Before figuring out that, I was thinking that the solver or the code was incorrect. I had been searching for related discussions, diving into documentations, trying different alternatives for days. Given that the framework has been used and tested for years, next time facing a similar issue, we should first check the assumptions. And it brings me the importance of explicitly stating assertions on the assumptions, as suggested by TigerBeetle about [secure coding](https://github.com/tigerbeetle/tigerbeetle/blob/main/docs/TIGER_STYLE.md#safety).

[Notes on error handling](error-handling.md)

## Preliminary modeling

- Make a simple model to get a baseline on least features and least complexity to get a sense of feasibility and directions to work on.

[Notes on modeling](modeling.md)

[Notes on distributions](distributions.md)

## Data preprocessing

[Notes on numpy](numpy.md)

[Notes on pandas](pandas.md)

## Feature engineering

[Notes on feature engineering](feature-engineering.md)

Be aware of data leakage. It is like cheating that, the model would perform well in the predefined testing set, but it would not reveal the actual predictive power on any unseen data, i.e. overfitting and inflated performance metrics. Don't use the information that is not available at the time of prediction. However, it is okay to use target encoding. As long as no test data is involved. Adding some Gaussian noise into it would also be a good practice.

## Model selection

One way is to implement different models. [Notes on modeling](modeling.md)

Another way is to try different hyperparameters, or different cost functions. [Notes on mathematical optimization](mathematical-optimization.md)

If the performances are close, ensemble methods, i.e. combining those results, maybe by averaging, or voting, would be a great choice.

## Model evaluation

[Notes on metrics](metrics.md)

## Hypothesis testing

[Notes on hypothesis testing](hypothesis-testing.md)

## Visualization

- A good model without user understanding is useless. You can't please the audiences with your own words which require years of understanding in data science. They won't use it without understanding it. Visualization is the key to make them understand the model.

[Notes on visualization](data-visualization.md)

## Stating the business outcome

- Data science projects are not about the model, they are about the business outcome. The model is just a tool to achieve the business outcome. Most of us are not researchers, we are engineers. A clear business outcome must be accomplished for a project to be successful.

[linkedin discussion](https://www.linkedin.com/posts/danleedata_data-scientist-my-model-has-094-auc-activity-7244001578649616384-mAcu/?utm_source=share&utm_medium=member_desktop)

## Model deployment

- Website, API, etc.
- [6 Little-Known Challenges After Deploying Machine Learning](https://eugeneyan.com/writing/challenges-after-deploying-machine-learning/)
- [A Practical Guide to Maintaining Machine Learning in Production](https://eugeneyan.com/writing/practical-guide-to-maintaining-machine-learning/)

## Documentation and refactoring

- Programming is more about communicating with the next programmer, which includes your future self then telling the computer what to do.
- It is almost certain that you will do some dirty tricks creating shit code to make progress. Refactor it. Stop procrastinating until it is too late.
- A program is never finished, only abandoned. Documentation and ease of readability are essential.

[Notes on programming](programming.md)

[Notes on documentation](writings.md)

---
title: Data Science Workflow
publishDate: 2024-10-02
---

# Data Science Workflow

## Problem framing

## Data collection

[Notes on sql](sql.md)

## EDA

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

## Model selection

## Model evaluation

## Hypothesis testing

[Notes on hypothesis testing](hypothesis-testing.md)

## Visualization

- A good model without user understanding is useless. You can't please the audiences with your own words which require years of understanding in data science. They won't use it without understanding it. Visualization is the key to make them understand the model.

[Notes on visualization](data-visualization.md)

## Stating the business outcome

- Data science projects are not about the model, they are about the business outcome. The model is just a tool to achieve the business outcome. Most of us are not researchers, we are engineers. A clear business outcome must be accomplished for a project to be successful.

[linkedin discussion](https://www.linkedin.com/posts/danleedata_data-scientist-my-model-has-094-auc-activity-7244001578649616384-mAcu/?utm_source=share&utm_medium=member_desktop)

## Model deployment

## Documentation and refactoring

- Programming is more about communicating with the next programmer, which includes your future self then telling the computer what to do.
- It is almost certain that you will do some dirty tricks creating shit code to make progress. Refactor it. Stop procrastinating until it is too late.
- A program is never finished, only abandoned. Documentation and ease of readability are essential.

[Notes on programming](programming.md)

[Notes on documentation](writings.md)

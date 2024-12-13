---
title: Programming
publishDate: 2024-09-20
---

# Programming

## Advices

- Being a "good programmer" means being able to write good code when things aren't perfect.
- Programming is more about communicating with the next programmer, which includes your future self then telling the computer what to do.
- Wrong duplication is better than the wrong abstraction.
- A program is never finished, only abandoned. Documentation and ease of readability are essential.
  - A picture is worth a thousand words.
- [Choose Boring Technology](https://boringtechnology.club/)
- [Data Driven Products Now! (AB Testing)](https://datadriven.club/)
- Offensive programming is great in development stage, and sometimes it is also great in production. [Safety Critical Code -- tigerbeetle, NASA](https://github.com/tigerbeetle/tigerbeetle/blob/main/docs/TIGER-STYLE.md) [normal vs defensive vs offensive programming](https://programmingduck.com/articles/defensive-programming)
- Don't use default argument except it will brings in lots of benefits because it hides potential bugs or misuses, which is one of the practice of offensive programming.
- Follow Chesterton's fence principle: "Don't remove a fence until you know why it was put up in the first place."

## Common problems

- [XY problem](https://xyproblem.info/) - asking about your attempted solution rather than your actual problem. This leads to enormous amounts of wasted time and energy, both on the part of people asking for help, and on the part of those providing help.
  - Always include information about a broader picture along with any attempted solution.
  - If someone asks for more information, do provide details.
  - If there are other solutions you've already ruled out, share why you've ruled them out. This gives more information about your requirements.
- [N+1 query problem](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it) - The chief symptom of this problem is that there are many, many queries being performed. Typically, this happens when you structure your code so that you first do a query to get a list of records, then subsequently do another query for each of those records. This type of query execution is often called "N+1 queries" because instead of doing the work in a single query, you are running one query to get the list of categories, then another query for every N categories. Hence the term "N+1 queries".
  - it's possible to perform the exact same job 10× faster by using only one query that uses a JOIN clause.
  - You might expect that many small queries would be fast and one large, complex query will be slow. This is rarely the case. In practice, the opposite is true. Each query has to be sent to the database, the database has to perform the query, then it sends the results back to your app. The more queries you perform, the more time it takes to get the results back, with each trip to the database server taking time and resources. In contrast, a single query, even if it's complex, can be optimized by the database server and only requires one trip to the database, which will usually be much faster than many small queries.

## Explanations

- [Rust and RAII Memory Management - Computerphile](https://www.youtube.com/watch?v=pTMvh6VzDls)
- [POV: I'm on my third coffee and you just asked me how the internet works](https://www.youtube.com/watch?v=jjKFXlFNR4E)
- [Garbage Collection (Mark & Sweep) - Computerphile](https://www.youtube.com/watch?v=c32zXYAK7CI)

## Design Patterns

- [Command Pattern](https://refactoring.guru/design-patterns/command)

## Exception vs Error vs Assertion

- [Why I Prefer Exceptions To Errors - Primeagen](https://www.youtube.com/watch?v=sS6u5UU3t3c)
- [Assertions detect programmer errors. Unlike operating errors, which are expected and which must be handled, assertion failures are unexpected. The only correct way to handle corrupt code is to crash. Assertions downgrade catastrophic correctness bugs into liveness bugs. Assertions are a force multiplier for discovering bugs by fuzzing.](https://github.com/tigerbeetle/tigerbeetle/blob/main/docs/TIGER-STYLE.md#safety)
- [Notes on error handling](error-handling.md)

## Logging

- [12 Logging BEST Practices in 12 minutes](https://www.youtube.com/watch?v=I2mWnh66Bkg)

## Tools

- neovim + lazyvim + vim-tmux-navigator
- zsh + oh-my-zsh + zsh-vi-mode
- tmux + vim-tmux-navigator

## Fun projects

- [Million checkboxes](https://www.youtube.com/watch?v=0XKYMt5mGpQ)
- [Display every UUIDs](https://www.youtube.com/watch?v=HhLQi_wZUDc)

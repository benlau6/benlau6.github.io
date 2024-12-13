---
title: Mathematical Programming
publishDate: 2024-12-11
---

# Mathematical Programming

## Model Building

### Three components

- Decision variables: the unknowns in the problem
- Objective function: the goal of the problem
- Constraints: the limitations of the problem

### Possible constraints

- Capacity constraints: for example, man day required by producing component 1 of product A times quantity of product A should be less than or equals to the maximum capacity of man days of producing component 1. The required resources don't have to be man days, it could be monetary cost, units to be produced, man hours, etc.
- Demand constraints
- Non-negativity constraints
- Upper and lower bounds constraints
- Logical constraints: for example, if we produce product A, we must produce product B.
- Physical constraints: link the physical properties of the problem between different periods while considering a multi-period problem. Initial condition, final condition, and ongoing condition are needed to be defined as multiple constraints.

### Techniques

- [Dimensional analysis](https://en.wikipedia.org/wiki/Dimensional_analysis): a method to check the correctness of equations, that is, to check that the dimensions of the left-hand side of an equation are the same as the dimensions of the right-hand side.
- Don't be hesitant to define a lot of new variables. For example, quantities of n raw materials to be performed by k actions in m periods can be defined as a matrix of size n x k x m, i.e. n*k*m variables.
- Count the number of variables and number of constraints
- First solve it with minimal constraints, then add more constraints
- First solve it as a single-period problem, then extend it to a multi-period problem. To extend the problem, we simply multiply the number of $x_i$ variables by the number of periods to $x_{ij}$, and add the physical constraints linking the physical properties between periods. E.g. quantity held in previous month + quantity manufactured in current month equals to quantity sold in current month + quantity held in current month.
- Whenever there are logical conditions, we could first model it as a linear programming model, then extend it to a mixed-integer programming model by adding integer variables with extra constraints.

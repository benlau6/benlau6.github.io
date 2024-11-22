---
title: Assortment
publishDate: 2024-11-14
---

# Assortment

- [Microsoft Azure@SKU optimization for consumer brands](https://learn.microsoft.com/en-us/azure/architecture/industries/retail/sku-optimization-solution-guide)
  - Parametric model:
    - They used multinomial logistic regression to model the probability that a consumer chooses an item at a specific time, given a set of items of that cateogry in an assortment with a known utility to the customer.
    - They also assume that the utility of an item can be a function of its features. External information can also be included in the measure of utility (for example, an umbrella is more useful when it rains).
    - Neural networks with a softmax output layer could be used effectively on large multi-class problems to replace the multinomial logistic regression.
  - Nonparametric model:
    - MNL assumes that the relative probability of someone choosing between two options is independent of additional alternatives introduced in the set later. That's impractical in most cases.
    - For instance, if you like product A and product B equally, you'll choose one over the other 50% of the time. Let’s introduce product C to the mix. You may still choose product A 50% of the time, but now you split your preference 25% to product B and 25% to product C. The relative probability has changed.
    - Also, MNL and derivatives have no simple way to account for substitutions that are due to stock-out or assortment variety (that is, when you have no clear idea and pick a random item among those on the shelf).
    - Non-parametric models are designed to account for substitutions and impose fewer constraints on customer behavior.
    - They introduce the concept of ranking, where consumers express a strict preference for products in an assortment. Their purchasing behavior can therefore be modeled by sorting the products in descending order of preference.
    - The assortment optimization problem can be expressed as maximization of revenue
    - In such a formulation, the problem can be regarded as a mixed-integer optimization.

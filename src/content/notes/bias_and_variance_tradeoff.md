---
title: Bias and Variance Tradeoff
publishDate: 2024-09-25
---

# Bias and Variance Tradeoff

## Terms

- bias
- variance
- flexibility
- expected error
- irreducible error
- overfitting
- underfitting
- rule
- learning algorithm
- hypothesis
- hypothesis space

## Explanation

In short, bias is the error from the learning algorithm due to its assumption, e.g. assuming the data is linear when it is actually quadratic; variance is the error from the model's sensitivity to the training data, e.g. having too much freedom. If a model is too simple, it will have high bias, which means it fails to capture the underlying pattern in the data. If a model is too complex, it will have high variance, which means it is too sensitive to the training data, with no ability to predict the unseen data accurately. The tradeoff is a observation suggesting that optimizing for one of these sources of error tends to degrade the other. Simultaneously avoiding both requires learning a perfect model, and short of knowing it in advance there is no single technique that will always do best (no free lunch).

Alternative thinking: Bias is a learner’s tendency to consistently learn the same wrong thing. Variance is the tendency to learn random things irrespective of the real signal. [ref](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)

### Deep dive

"A classifier must be represented in some formal language that the computer can handle. Conversely, choosing a representation for a learner is tantamount to choosing the set of classifiers that it can possibly learn. This set is called the hypothesis space of the learner. If a classifier is not in the hypothesis space, it cannot be learned." [ref](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)

A model architecture could mostly be a representation. E.g. neural networks, decision trees, hyperplanes (logistic regression, naive Bayes), instances (kNN, SVM), graphical models (Bayesian networks), Sets of rules (propositional rules, logic programs) are 6 representations.

If we reduce the flexibility of the model to reduce variance, the hypothesis space will also be shrink. Then the chances that it contains the true rule shrink also, i.e. the bias increases. For example, fitting linear regression to a quadratic dataset. There is only one best line, but it is quite wrong; On the other hand, if we increase the flexibility, the hypothesis space will be so large that it will likely to contain the true rule, but it will also contain many other rules that are not true but fitting well, and the given number of samples are insufficient to distinguish between them. Hence the variance increases. For example, fitting n-degree polynomial to a dataset of sample size n. There are too many rules that fit perfectly.

## Examples

- fitting linear regression to a quadratic data
- fitting a n-degree polynomial to a data of sample size n
- fitting a $sin(ax)$ function to any data

## Sources of overfitting

Noises might be one of the sources of overfitting, e.g. wrong labeled training data. But severe overfitting can occur even in the absence of noise. [ref](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755).

"The problem of multiple testing is closely related to overfitting. Modern learners can easily test millions before they are done. As a result what looks significant may in fact not be. For example, a mutual fund that beats the market 10 years in a row looks very impressive, until you realize that, if there are 1,000 funds and each has a 50% chance of beating the market on any given year, it is quite likely that one will succeed all 10 times just by luck."

## Why it is so hard to generalize?

"Most interesting hypothesis spaces are doubly exponential in the number of features d, which still leaves us needing a number of examples exponential in d. For example, consider the space of Boolean functions of d Boolean variables. If there are e possible different examples, there are $2^e$ possible different functions, so since there are $2^d$ possible examples, the total number of functions is $2^{2^d}$. And even for hypothesis spaces that are “merely” exponential, the bound is still very loose, because the union bound is very pessimistic. For example, if there are 100 Boolean features and the hypothesis space is decision trees with up to 10 levels, to guarantee δ = ε = 1% in the bound above we need half a million examples. But in practice a small fraction of this suffices for accurate learning."

"Generalizing correctly becomes exponentially harder as the dimensionality (number of features) of the examples grows, because a fixed-size training set covers a dwindling fraction of the input space. Even with a moderate dimension of 100 and a huge training set of a trillion examples, the latter covers only a fraction of about 10^-18 of the input space. The curse of dimensionality is what makes machine learning both necessary and hard." [ref](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)

## If curse of dimensionality is a problem, why image recognition works?

"There is an effect that partly counteracts the curse, which might be called the “blessing of non-uniformity.” In most applications examples are not spread uniformly throughout the instance space, but are concentrated on or near a lower dimensional manifold. For example, k-nearest neighbor works quite well for handwritten digit recognition even though images of digits have one dimension per pixel, because the space of digit images is much smaller than the space of all possible images. Learners can implicitly take advantage of this lower effective dimension, or algorithms for explicitly reducing the dimensionality can be used." [ref](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)

## If neural networks are so flexible, why they don't always work?

"“Every function can be represented, or approximated arbitrarily closely, using this representation.” is true, but just because a function can be represented does not mean it can be learned. For example, standard decision tree learners cannot learn trees with more leaves than there are training examples. In continuous spaces, representing even simple functions using a fixed set of primitives often requires an infinite number of components. Further, if the hypothesis space has many local optima of the evaluation function, as is often the case, the learner may not find the true function even if it is representable. Given finite data, time and memory, standard learners can learn only a tiny subset of all possible functions, and these subsets are different for learners with different representations. Therefore the key question is not “Can it be represented?” to which the answer is often trivial, but “Can it be learned?”"

## Methods to prevent overfitting

- regularization
  - penalization
- statistical significance test like chi-square
- cross-validation
- stricter learning algorithm

## Acknowledgements

- [A few useful things to know about machine learning](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)
- [Hypothesis in Machine Learning -- geeksforgeeks](https://www.geeksforgeeks.org/ml-understanding-hypothesis/)
- [Do successful models defy the "bias-variance tradeoff"? -- reddit](https://www.reddit.com/r/MachineLearning/comments/nkfarw/comment/gzdiaiv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- [The Bias Variance Trade-Off with visualization](https://www.youtube.com/watch?v=FcXQKsZKRUs)
- [Could anyone explain the terms "Hypothesis space" "sample space" "parameter space" "feature space in machine learning with one concrete example?](https://stats.stackexchange.com/questions/419095/could-anyone-explain-the-terms-hypothesis-space-sample-space-parameter-spac)
- [bias variance tradeoff -- math stack exchange](https://math.stackexchange.com/questions/3298444/bias-variance-tradeoff/3300149)

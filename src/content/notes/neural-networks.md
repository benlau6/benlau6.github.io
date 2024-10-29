---
title: Neural Networks
publishDate: 2024-09-20
---

# Neural Networks

## Definition

- A highly parametrized model, promoted as a universal approximator, a machine that with enough data could learn any smooth predictive relationship.
- It contains hidden layers that derive transformation of the inputs, nonlinear transformations of linear combinations, which are then used to model the ouput.
- In a simple three layer model with one input layer, one hidden layer, and one output layer, it contains a set of predictors or input $x_j$, a set of hidden units $a_l=g(w_{l0}^{(1)}+\sum^{n_j}_{j=1}w^{(1)}_{lj}x_j)$, and a set, possibly one, of output units $o=h(w_{0}^{(2)}+\sum^{n_l}_{l=1}w^{(2)}_{l}a_l)$.
- The intercept terms $w^{(1)}_{l0}$ are called a bias, and the function $g$ is a nonlinearity, such as the sigmoid function $g(t)=1/(1+e^{-t})$.

## Formula

Transition from layer $k-1$ to layer $k$:

$$
z^{(k)} = \bm{W}^{(k-1)}a^{(k-1)}
$$

$$
a^{(k)} = g^{(k)}(z^{(k)})
$$

where W^{(k-1)} represents the matrix of weights that go from layer $L_{k-1}$ to layer $L_k$, $a^{(k)}$ is the entire vector of activations at layer $L_{k}$, and our notation assumes that $g^{(k)}$ operates elementwise on its vector argument.

M-class classification transformation $g^{(K)}$

$$
g^{(K)}(z^{(K)}_m;z^{(K)}) = \frac{e^{z^{(K)}_m}}{\sum^M_{l=1}e^{z^{(K)}_l}}
$$

Given a training set $\{x_i,y_i\}^n_1$, and a loss function $L[y, f(x)]$, along familiar lines we might seek to solve

$$
\underset{W}{\text{minimize}} \frac{1}{n}\sum^n_{i=1}L[y_i, f(x_i;W)] + \lambda J(\mathcal{W})
$$

where $J(\mathcal{W})$ is a nonnegative regularization term on the elements of $\mathcal{W}$, and $\lambda \geq 0$ is a tuning parameter. (In practice there may be multiple regularization terms, each with their own $\lambda$.).

## Building the neural network

### Tuning Parameters

- Number of hidden layers, and their sizes
- Choice of Nonlinearities (activation functions)
  - sigmoid, tanh, ReLU, ELU, softplus
  - full range of x only use part of the range of activation function
- Choice of Regularization
- Early stopping

## Algorithms

### Backpropagation (P. 357)

A neural network starts out with unknown weights and biases (parameter values) that are estimated when we fit the model to the training data using Backpropagation.

Main ideas

1. Uses gradient descent to minimize the loss function
2. Uses the chain rule to compute the gradient of the loss function with respect to the weights and biases
3. Plug the computed gradients into the gradient descent algorithm to optimize(update) the weights and biases

References

- [What is back propagation?](https://www.youtube.com/watch?v=Ilg3gGewQ5U)

### Gradient Descent (P. 358)

A method to find the optimal solution to a wide range of optimization problems (gradient ascent for maximization). It is a first-order optimization algorithm that finds the minimum of a function. To find a local minimum of a function using gradient descent, one takes steps proportional to the negative of the gradient of the function at the current point. It takes big steps when it is close to the minimum and small steps when it is far away.

With the quadratic form for the penalty, a gradient-descent update is

$$
\bm{W}^{(k)} \leftarrow \bm{W}^{(k)} - \alpha (\Delta{\bm{W}^{(k)}}+\lambda\bm{W}^{(k)}), \quad k=1,...,K-1
$$

Stochastic Gradient Descent

Rather than process all the observations before making a gradient step, it can be more efficient to process smaller batches at a time -- even batches of size one. These batches can be sampled at random, or systematically processed. For large data sets distributed on multiple computer cores, this can be essential for reasons of efficiency. An epoch of training means that all $n$ training samples have been used in gradient steps, irrespective of how they have been grouped.

#### Side projects

- v.s. Newton's method

## Architectures

### CNN

- [Inside a Neural Network - Computerphile](https://www.youtube.com/watch?v=BFdMrDOx_CM)

### Autoencoder

A special neural network for computing a type of nonlinear principal-component decomposition. The linear principal component decomposition is a popular and effective linear method for reducing a large set of correlated variables to a typically smaller number of linear combinations that capture most of the variance in the original set.

### GAN

- [Generative Adversarial Networks (GANs) - Computerphile](https://www.youtube.com/watch?v=Sw9r8CL98N0)

### Transformer

- [AI Language Models & Transformers - Computerphile](https://www.youtube.com/watch?v=rURRYI66E54)
- [【機器學習2021】Transformer (上)](https://www.youtube.com/watch?v=n9TlOhRjYoc)
- [09 Transformer 之什么是注意力机制（Attention）](https://www.youtube.com/watch?v=z2TqBUouF8I)

### Diffusion

- [Why Does Diffusion Work Better than Auto-Regression?](https://www.youtube.com/watch?v=zc5NTeJbk-k)
- [Stable Diffusion in Code (AI Image Generation) - Computerphile](https://www.youtube.com/watch?v=-lz30by8-sU)
- [How AI Image Generators Work (Stable Diffusion / Dall-E) - Computerphile](https://www.youtube.com/watch?v=1CIpzeNxIhU)
- [Diffusion models from scratch in PyTorch](https://www.youtube.com/watch?v=a4Yfz2FxXiY)
- [【生成式AI】淺談圖像生成模型 Diffusion Model 原理 -- Hung-yi Lee](https://www.youtube.com/watch?v=azBugJzmz-o)
- [【生成式AI】Stable Diffusion、DALL-E、Imagen 背後共同的套路 -- Hung-yi Lee](https://www.youtube.com/watch?v=JbfcAaBT66U)

### CLIP

- [How AI 'Understands' Images (CLIP) - Computerphile](https://www.youtube.com/watch?v=KcSXcpluDe4)

### Mamba

- [MAMBA from Scratch: Neural Nets Better and Faster than Transformers](https://www.youtube.com/watch?v=N6Piou4oYx8)

## Concepts

- CNN tackles the problem of spatial invariance, locality, sparsity, and computation difficulty, allow for more efficient learning.
- Resnet tackles the vanishing gradient problem.
- Dropout tackles overfitting.
- DenseNet, LSTM, Transformer allow for capturing complex interactions in the data.
- Backpropagation is a method to compute the gradient of the loss function with respect to the weights and biases of the network by chain rule. Since the coefficients of the first layer are distant from the output layer, which calculates the loss, the gradient is needed to be propagated back through the whole network.
- Adversarial examples are inputs to neural networks that are designed to fool the network. They are often created by applying small perturbations to regular inputs to cause the network to misclassify the input, while the perturbations are imperceptible to humans.
- Hallucination is a problem of llm that the model generates sentences that are not meaningful but trying to fool you instead of admitting their incapability of generating an correct answer.
- Diffusion models, aka denoising model, uses the idea of diffusion to generate results, which is a process of spreading out the information due to entropy. It uses the idea that the diffusion process follows a Gaussian distribution, and reverses the process will have a tendency towards center. The possible reverse path could be determined by score functions. It also benefits from the idea of manifold hypothesis.
- Long range dependencies is the fundamental idea of video processing, otherwise the output videos would be non-sense. However, time continuity does not equal to logical or realistic, which is a problem that needs to be solved in SORA.

## When to use neural networks

- Easy to collect data, and there are lots of data
- Invariant patterns
- Mechanistic workflow

[video ref](https://www.youtube.com/watch?v=LF9sd-2jCoY)

## References

- [Deep Learning](https://www.deeplearningbook.org/), Goodfellow, I., Bengio, Y., & Courville, A. (2016). MIT press.
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/), Nielsen, M. (2015). Determination Press.
- [The Elements of Statistical Learning](https://web.stanford.edu/~hastie/ElemStatLearn/), Hastie, T., Tibshirani, R., & Friedman, J. (2009). Springer.
- Efron, B., & Hastie, T. (2021). Computer Age Statistical Inference: Algorithms, Evidence, and Data Science. Cambridge University Press.
- [Deep learning series -- 3Blue1Brown](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
- [Neural Networks / Deep Learning series -- StatQuest](https://www.youtube.com/watch?v=CqOfi41LfDw&list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1&index=2)
- [Building a neural network FROM SCRATCH using numpy](https://www.youtube.com/watch?v=w8yWXqWQYmU)
- [A Neural Network Playground](https://playground.tensorflow.org/)
- [Why Neural Networks can learn (almost) anything](https://www.youtube.com/watch?v=0QczhVg5HaI)

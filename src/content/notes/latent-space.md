---
title: Latent Space
publishDate: 2024-11-18
---

# Latent Space

A latent space, also known as a latent feature space or embedding space, is an embedding of a set of items within a manifold in which items resembling each other are positioned closer to one another. Position within the latent space can be viewed as being defined by a set of latent variables that emerge from the resemblances from the objects. [wiki](https://en.wikipedia.org/wiki/Latent_space)

In most cases, the dimensionality of the latent space is chosen to be lower than the dimensionality of the feature space from which the data points are drawn, making the construction of a latent space an example of dimensionality reduction, which can also be viewed as a form of data compression. Latent spaces are usually fit via machine learning, and they can then be used as feature spaces in machine learning models, including classifiers and other supervised predictors.

## PCA

[世上最生動的 PCA：直觀理解並應用主成分分析](https://leemeng.tw/essence-of-principal-component-analysis.html): Compress the features into a lower-dimensional space by finding most representative eigenvectors. Elbow method can be used to determine the number of principal components to keep. The projection can be done by SVD or eigendecomposition. The

[踏入荒野：實際應用 PCA 來解析真實數據](https://leemeng.tw/essence-of-principal-component-analysis.html#%E8%B8%8F%E5%85%A5%E8%8D%92%E9%87%8E%EF%BC%9A%E5%AF%A6%E9%9A%9B%E6%87%89%E7%94%A8-PCA-%E4%BE%86%E8%A7%A3%E6%9E%90%E7%9C%9F%E5%AF%A6%E6%95%B8%E6%93%9A)

## t-SNE

- [StatQuest: t-SNE, Clearly Explained](https://www.youtube.com/watch?v=NEaUSP4YerM)
- [資料降維與視覺化：t-SNE 理論與應用](https://www.mropengate.com/2019/06/t-sne.html)

## Embedding

We can actually use neural networks to learn the latent space, which is called embedding. The idea is to learn a mapping from the input space to the latent space, such that the latent space is a more compact representation of the input space. This is useful for tasks like recommendation systems, where we want to find similar items in the latent space.

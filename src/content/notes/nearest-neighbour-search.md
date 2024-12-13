---
title: Nearest Neighbour Search
publishDate: 2024-12-06
---

# Nearest Neighbour Search

## Approximate Nearest Neighbour Search

### Readings

- [Maciej Arciuch, Karol Grzegorczyk: Embeddings! Embeddings everywhere! | PyData London 2019](https://www.youtube.com/watch?v=muXTMnfPU0k)

### Algorithms

- FAISS from Facebook implements a two-stage searching strategy: it first clusters the vectors into 1000 of partitions, aka cells. Then, it searches 5 cells whose centroids are closest to the query vector. Finally, it performs exhaustive search within these 5 cells. It also provides more advanced quantization techniques for further approximations.

### Memory problem

Sometimes it is not possible to load all the vectors into memory. In this case, we can use the following techniques:

- Single index if the vectors are small enough to fit in memory
- Separate indices for each top category of products

### Diversity problem

We might want to filter out neighbours that are too close to each other to provide a more diverse set of recommendations.

### Speed problem

Most of the recommendations need to be computed in real-time. To speed up the search, we can use the following techniques:

- Serve pre-calculated item-to-item recommendations, which are updated periodically, stored in cassandra
- Exclude items that are no longer available at serving time

But note that if we care about the sequence of recently visited items, we need to calculate the recommendations in real-time. Since there are just too many combinations of browsing history, we can't pre-calculate all of them.

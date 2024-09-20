---
title: Memory Management
publishDate: 2024-09-20
---

# Memory Management

## Python Memory Management

- [The Python Memory Model](https://www.cs.toronto.edu/~david/course-notes/csc110-111/06-memory-model/04-python-memory-model-1.html)
- `dict` is a [hash map](/hash_maps.md)

## [[Rust]] Memory Management

[Visualizing memory layout of Rust's data types](https://www.youtube.com/watch?app=desktop&v=rDoqT-a6UFg)

### Dynamically sized type (DST) in rust

- Reason
  - they are DST cuz by looking at the type [T], its size is indeed not known at compile time. Sometimes we type `let  b: [u8] = a[0..2]`. It seems that we know the size of slice, which is 2, but it is evaluated at run time. The type for `a[0..2]`, `a[0..5]`, `a[n..m]` is also [u8] at compile time.
- Solution
  - However, we can turn it into reference type &[T], &str, &dyn Trait, then its size is now known at compile time, which is a fat pointer storing a pointer and a length (not for the case of trait object).
- **Vector is not DST**
  - size of vector is known at compile time, which is a fat pointer storing a pointer, capacity, and length.
  - capacity is its max length allocated
  - length is the current number of the elements

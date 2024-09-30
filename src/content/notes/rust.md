---
title: Rust
publishDate: 2024-09-20
---

# Rust

## Prototyping

- Feel free to use `unwrap` and `expect` methods when prototyping, before you have a clear idea of how you want to handle errors. They leave clear markers in your code for when you're ready to make your program more robust. [rust book](https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html#examples-prototype-code-and-tests)
- Return `Result<(), Box<dyn Error>>` from main function so that you can use `?` operator in main function. It allows easy refactoring when you want to encapsulate some code blocks into functions.

## Error handling

- [A Simpler Way to See Results](https://www.youtube.com/watch?v=s5S2Ed5T-dc)
  - How to use `?`
    - How to define a function with multiple possible errors which may be populated by `?`
      - `anyhow::Error`, which is similar but a better `Box<dyn Error>`
      - `enum` Error + `thiserror` which helps to implement the From trait
  - When to use `Result(T, E)`, when to use `Option(T)`
    - [Choose the Right Option](https://www.youtube.com/watch?v=6c7pZYP_iIE)
  - `Infallible` (bottom type) uses `!`

## Testing

- [Unit testing](https://doc.rust-lang.org/rust-by-example/testing/unit_testing.html)
- [Documentation testing](https://doc.rust-lang.org/rust-by-example/testing/doc_testing.html)
- [Integration testing](https://doc.rust-lang.org/rust-by-example/testing/integration_testing.html)
- [colorful assertion diff](https://doc.rust-lang.org/rust-by-example/testing/dev_dependencies.html)

## Concurrency and Parallelism

- `async` and `await` give us a way to write asynchronous code. By awaiting a async function, we can run the function in sequential order, just like synchronous code, but without blocking the thread. However, it does not bring any performance benefits unless we bring in concurrency by using [`task::spawn`](https://rust-lang.github.io/async-book/06_multiple_futures/04_spawning.html) or [`futures::join!`](https://rust-lang.github.io/async-book/06_multiple_futures/02_join.html) or `for_each_concurrent` etc. [Iteration and Concurrency](https://rust-lang.github.io/async-book/05_streams/02_iteration_and_concurrency.html) [Properly using async ? How to take advantage of it ?@reddit](https://www.reddit.com/r/learnrust/comments/15jmd5i/properly_using_async_how_to_take_advantage_of_it/)
- without `await` in a async function while using `tokio::join!` or `tokio::spawn!`, the function will not be executed concurrently because the tokio runtime is not able to swap the tasks, which can only happen at an `await`, i.e. those tasks are blocking. [Async: What is blocking?](https://ryhl.io/blog/async-what-is-blocking/)
- [Parallelism vs concurrency vs mixed in rust with examples](https://github.com/quambene/rust-concurrency)
- Sometimes blocking is good, for example, for a CPU-bound task or synchronous I/O. Parallelism by `rayon` could be a better choice for CPU-bound tasks, e.g. computation.
- If a blocking operation keeps running forever, you should run it on a dedicated thread, for example, a web server that listens to incoming requests that may come at any time.
- Returning a stream does not need to be async

### Readings

- [Async Rust can be a pleasure to work with (without 'Send + Sync + 'static)](https://emschwartz.me/async-rust-can-be-a-pleasure-to-work-with-without-send-sync-static/)
- [Understanding Async Await in Rust: From State Machines to Assembly Code](https://www.eventhelix.com/rust/rust-to-assembly-async-await/)
- [How does async Rust work blog](https://bertptrs.nl/2023/04/27/how-does-async-rust-work.html#the-future-trait)
- [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)
- [So what is event loop | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [A guided tour of streams in rust](https://www.qovery.com/blog/a-guided-tour-of-streams-in-rust/)

## trait object vs enum

- It is about different approach to Polymorphism
- [There are still a couple of cases in which I use traits. The main reason is if I want external code to be able to add types, which enums do not allow.](https://www.mattkennedy.io/blog/rust_polymorphism/)
  - I also consider using traits if the behaviour is particularly generic, such that the interface I am defining is not determined by the types that implement it.
  - Some people argue that enums produce ugly code with methods that are long and hard to read and hence favour using traits. I disagree, if the methods start to get too long one can extract the logic into separate functions, even grouping these functions into a module if there a large number of methods. In fact, I think this makes the code easier to read. The methods can be used as a table of contents allowing one to view the logic by jumping to the function definitions, rather than have to search through the code for the individual types.
- [The real fundamental difference between them is that enum is a closed set, and the trait object is an open set. And neither of these is universally better.](https://dpc.pw/posts/what-oop-gets-wrong-about-interfaces-and-polymorphism/)
  - Enums are closed sets and trait objects are open sets.
  - A trait is a collection of variants that may or may not have unknown members.
  - An enum is a collection of variants that may not have unknown implementations.

## static dispatch vs dynamic dispatch

- “When you’re given the choice between static and dynamic dispatch, there is rarely a clear-cut right answer. Broadly speaking, though, you’ll want to use static dispatch in your libraries and dynamic dispatch in your binaries. In a library, you want to allow your users to decide what kind of dispatch is best for them, since you don’t know what their needs are. If you use dynamic dispatch, they’re forced to do the same, whereas if you use static dispatch, they can choose whether to use dynamic dispatch or not.” - Rust for Ruataceans

## trait object vs generic trait bound or impl Trait

- It is mostly just static dispatch vs dynamic dispatch
- [a function that accepts a trait object doesn't need to be generic and doesn't need monomorphization: the programmer writes a function using trait objects, and the compiler outputs only a single version of that function, which can accept trait objects that come from multiple input types](https://www.lurklurk.org/effective-rust/generics.html)
  - A more significant difference is that generic trait bounds can be used to conditionally make different functionality available, depending on whether the type parameter implements multiple traits
- [Choosing Trait Objects: When you need one tool that can adjust to handle various tasks even though it might not be the most efficient tool for any single task, you choose the adjustable wrench (trait object). It’s like having a tool that can adapt to different situations without knowing the specifics beforehand.](https://medium.com/@richinex/trait-objects-vs-generics-in-rust-426a9ce22d78)
  - Choosing Generics: When you understand the tasks ahead and need the best tool for each specific task, you can choose from your specialized wrenches (generics). This approach requires planning and knowledge about what you will face, but it pays off in performance and precision.

## Why slice is DST but not the vector

[memory-management#Dynamically sized type (DST) in rust](memory-management.md#dynamically-sized-type-dst-in-rust)

## Scope example

In the following example, `stmt` isn't dropped until the end of the scope. `tx.commit` will take ownership of `self`, so `tx` will be moved then `stmt` cannot drop the borrow of `tx`, causing error. So we need to create a inner scope to drop it this inner scope is for dropping `stmt` before running `tx.commit()`. [ref](https://stackoverflow.com/questions/69415738/cannot-move-out-because-of-borrowing)

```rust
struct File {
    file_name: String,
    modified_at: String,
    size: i32,
}

let files = vec![
    File {
        file_name: "file1".to_string(),
        modified_at: "2024-09-20".to_string(),
        size: 100,
    },
    File {
        file_name: "file2".to_string(),
        modified_at: "2024-09-20".to_string(),
        size: 200,
    },
];

let mut conn = Connection::open("file.db")?;
// transaction is created because it avoids the overhead of committing after each insert
let tx = conn.transaction()?;
{
    let mut stmt = tx.prepare(
        r#"INSERT INTO files (file_name, modified_at, size) VALUES (?, ?, ?)"#,
    )?;
    for file in files {
        stmt.execute([
            &file.file_name,
            &file.modified_at,
            &file.size.to_string(),
        ])?;
    }
}
tx.commit()?;
```

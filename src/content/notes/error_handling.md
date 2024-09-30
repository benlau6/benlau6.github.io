---
title: Error Handling
publishDate: 2024-10-01
---

# Error Handling

## [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)

### Why

- A well designed type system can enforce correctness, catch edge cases and reduce checking code duplication.
- Mixing parsing and validation is bad and be called as "Shotgun parsing". It is a programming anti-pattern necessarily deprives the program of the ability to reject invalid input instead of processing it. Late-discovered errors in an input stream will result in some portion of invalid input have been processed, with the consequence that program state is difficult to accurately predict.
  > - In other words, a program that does not parse all of its input up front runs the risk of acting upon a valid portion of the input, discovering a different portion is invalid, and suddenly needing to roll back whatever modifications it already executed in order to maintain consistency. Sometimes this is possible—such as rolling back a transaction in an RDBMS—but in general it may not be.
  > - The problem is that validation-based approaches make it extremely difficult or impossible to determine if everything was actually validated up front or if some of those so-called “impossible” cases might actually happen. The entire program must assume that raising an exception anywhere is not only possible, it’s regularly necessary.
  > - Parsing avoids this problem by stratifying the program into two phases—parsing and execution—where failure due to invalid input can only happen in the first phase. The set of remaining failure modes during execution is minimal by comparison, and they can be handled with the tender care they require.

### How

- Use a data structure that makes illegal states unrepresentable.
- Let your datatypes inform your code, don’t let your code control your datatypes.
- Push the burden of proof upward as far as possible, but no further.

## Assertions vs Exceptions

- Use assertions with message stating the assumption, e.g. `assert x > 0, "x should be positive"`. So that when the assertion fails, you know it is the time to check whether the assumption is wrong, or the implementation is wrong.
- Exceptions address the robustness of your application while assertions address its correctness [discussion](https://stackoverflow.com/a/1957656)
- use assertions to check for outcomes after data preprocessing. If the data is not as expected, that means our assumptions are fundamentally wrong, so we should change our beliefs, or check the data. i.e. It is not a error handled by exception that only requires a retry with different user input. Detail examination and correction are needed.
- use exceptions when checking parameters passed to public or protected methods and constructors
- use assertions when checking pre-conditions, post-conditions and invariants of private/internal code
- use exceptions to address problems that might occur
- use assertions to address problems that should never occur otherwise there is a bug in the code
- use assertions to provide feedback to yourself or your developer team
- use assertions to state things that you (supposedly) know to be true

## Design by contract

1. Use types [TigerBettle -- it takes two to contract](https://tigerbeetle.com/blog/2023-12-27-it-takes-two-to-contract) [Primeagen comments on tigerbettle](https://youtu.be/sS6u5UU3t3c?t=1461)
2. Use assertions

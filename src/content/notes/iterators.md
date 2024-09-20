---
title: Iterator
publishDate: 2024-09-20
---

# Iterator

## Iterator vs For loop

a good rule of thumb (IMHO) is that you want to use an iterator when you want to highlight the action that you are taking in the loop. You want to use a for loop (or similar) when you want to highlight the iteration.

If I wanted to compare the price of milk in every store, the iteration is boring and beside the point. The important part is getting the price of milk. However, if I want to drive to every store and check the price of milk, the complexity of the action is in driving to the store. The price of milk is secondary.

Of course, you may think that it's best to move the complexity of the iteration (driving to the store) into an iterator, and there is a definite argument to that. However, every time you abstract things in your code, cohesion suffers. When I am looking for the code that navigates the car to every store, I may first go to the place where I'm getting all of the milk prices. Then I find that there is an iterator and I have to move to definition of the iterator. One jump is often fine, but every level of abstraction adds mental overhead to your understanding of the code. Especially if the iteration affects program state in some way (say the position of your car), it can be difficult to keep it all in your head when it gets complex.

On the other hand, if you have to do the iteration in many places, adding that layer of abstraction increases cohesion. The navigation to different stores is identical to the navigation to different movie theaters, for example. Moving all of that navigation into one place makes it easier to find and easier to reason about.

It's just tradeoffs. You can't say up front which way will be better. In my experience, more often the iteration is trivial and common. For that reason iterators are more usually the thing to use. The important part of the code is the action in each part of the loop and it is better to highlight it. Because the iteration is shared, you get better cohesion by using standard iterators rather than rolling your own loop each time. However, this can easily change and it's the mark of a good programmer to know when it's better to break away from that pattern.

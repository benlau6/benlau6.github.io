---
title: Web Development
publishDate: 2024-11-09
---

# Web Development

## Python

FastAPI is a modern Flask, i.e. a API framework. While Django is a full stack web framework that is batteries included for building website. [ref](https://www.reddit.com/r/Python/comments/1dxcdiy/flask_django_or_fastapi/)

## HTMX

HTMX is a great tool for building frontend when these is not much interactivity needed because it is just a representation of the state from backend, which remove code duplication and mental effort to rebuild state management for frontend, which also avoid the need to sync it with backend state management. A typical use case would be a CRUD internal tool. A typical bad use case would be dashboard. [htmx notes](htmx.md)

Server <-> client state management is miserable, no matter which way you cut it. By using HTMX, each of your HTTP endpoints in Go are just paths that spit out rendered templates. All of your user session data and state is stored entirely server side without having to send state to the client -- you just send exactly (and only!) what you want the user to see. HTMX will take your server's response and replace the DOM (or a part of the DOM if you want!) with your response, without doing a full page reload. [discussion](https://www.reddit.com/r/golang/comments/12od911/html_templates_why_would_you_use_them_over_react/) [HTMX notes](htmx.md)

But sometimes you still want client side state management, e.g. sending file to S3, you probably won't want to handle it in the backend. This part can be done by Alpine.js, which is a lightweight client side framework.

### Cons

> My biggest hangup (and dont have a great work around for) is that HTMX isn't really designed for multi location event handling. It can do some event triggering but its not elegant and just a cascading set of reloads.
>
> Let's say you have a search page. You have a bar on the side with filters, a banner at the top, some pills on what filters are used, the results area and pagination at the bottom.
>
> If you click a filter you need to do a new search and that means updating:
>
> - results section
> - pills
> - pagination
> - filters (if there is meta data like result counts)
>
> If you click on pagination you need to update:
>
> - results
> - pagination
>
> If you clear a pill you need to update:
>
> - results
> - filters
> - pagination
>
> Every area a user touches has a different group of areas affected. Grouping them all together as a single reload, i might as well just load the entire page at that point. The way these types of pages are created is having a front end with an event bus that all the sections can update themselves with the right data. [discussion](https://www.reddit.com/r/htmx/comments/1e99d3i/comment/lekeo7b/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
>
> The htmx team acknowledged on their site that a multi location updating SPA page is not their ideal use case.
>
> Honestly, at this point I am pretty certain, the only options sensible options are:
>
> - Group them together as one reload
> - Fetch the data and do it entirely client-side

## Rust vs Go

- Do you value ease? Choose Go.
- Do you value correctness? Choose Rust.
- Are you writing utility scripts? Choose Go.
- Are you writing business logic? Choose Rust.
- Do you want to forget about memory management? Choose Go.
- Do you need to avoid garbage collection? Choose Rust.

> Rust has a more thorough type system, traits and enums.
>
> This biggest issue on the business logic front is that you can’t avoid nil things in a Go program. I can’t prevent you from creating an nil type my package owns if I want to make it public. This means that every struct (for example) can be nil, partial or complete.
>
> When writing business logic, it’s incredibly useful to make it impossible to represent invalid states, because then you (and others) can write code assuming it’s entirely valid in value, not just in shape. Empty and Partial values are huge categories of state that you might want to make invalid, but in Go, it’s not possible to practically prevent nil, or partially initialised states (try it).
>
> The knock-on effect is, as a receiver, the only guarantee you have of a type is the shape. This is a very hollow guarantee and means that every receiver of a struct has to expect it to be empty or partially complete — said another way, every receiver must cope with something, or its properties, being nil.
>
> In Go, let’s say you write 100 functions that all take a EmergencyContact struct { Id string, Name string, Phone string }. You expect EmergencyContact to have some sort of legit value because all EmergencyContacts come from some trusted function. Then someone on your team comes along and freely makes a new EmergencyContact{ Phone: “hello world” }, oops? You might think, well what about using a setter? It still doesn’t cover the empty case: EmergencyContact{}. Your functions take it, but Id, Name and Phone are nil, so is it really a valid EmergencyContact as far as your business logic dictates? Now your functions taking an EmergencyContact might work in unexpected ways at runtime, so now you need to do 100 checks to make sure EmergencyContact is actually valid in the ways each function cares about. You see, the cost of dealing with the invalid state is pushed onto the receivers, many times over.
>
> Whereas in Rust, you could choose to make those empty, partial or invalid states completely unrepresentable - ie. you can control how your types are initialised, therefore you can guarantee certain things about the value at compile time, like it not being nil, or partially complete, or the value of Phone having passed through a guard, guaranteeing the value against your codified business logic.
>
> Having these constraints are incredibly valuable when working in a shared, evolving codebase to prevent bugs and reduce boilerplate. But rather impossible to do with Go (try it! And I’m keen for an example that proves otherwise) [discussion](https://www.reddit.com/r/golang/comments/1cw98b7/comment/l4v7vgf/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

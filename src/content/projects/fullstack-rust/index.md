---
title: "Full Stack Web Development in Rust"
description: "A full stack web development project using Rust and HTMX"
publishDate: "2024-09-02"
updatedDate: "2024-09-08"
coverImage:
  src: "./cover.png"
  alt: "Full Stack Web Development in Rust"
demo: "https://pokemon-auth.shuttleapp.rs/"
github: "https://github.com/benlau6/fullstack-rust"
tags:
  - "frontend"
  - "backend"
  - "rust"
  - "htmx"
  - "axum"
---

## Brief description

- Built an API in Rust and a website in HTMX and tailwindcss
- Used traits in Rust to define shared behavior as contracts to be fulfilled by services, handlers, and ETL procedures
- Implemented user authentication and authorization from scratch
- Built a scrapping program to collect data and stored it in Postgres database

## Technical Details of the design

### Why always define trait and associated type for handlers, services, and pages?

Since fundamentally most of these api functions are stateless, we don't actually have a instance storing its own state
so Self::create_router would still be better than a separated `fn create_router(service: impl HasCatalogHandlers) -> Router<AppState>;`
in that we don't need to pass a instance of service to the every functions, a associated type would be sufficient and reduce code duplication.

Moreover, there are many common behaviors that should be shared between layers and inside the same layer. It provides a convenient way to reuse the shared behaviors through trait methods or default implementations in the same trait or in the associated type which requires a trait bound. It also ensures that every new struct is enforced to implement the same behaviors before being introduced.

---
title: "HTMX Tech Stack"
publishDate: "2024-09-19"
---

# HTMX Tech Stack

- HTMX
  - [Why HTMX](https://youtu.be/2hMrk7A8Wf0?t=613)
    - Having state only in one place, but not two
      - Frontend written in HTMX is only the representation of the state
    - Implement validation only once
  - [HTMX website](https://htmx.org/)
  - [HTMX Website React](https://www.youtube.com/watch?v=zjHHIqI9lUY)
  - [Book - Hypermedia Systems from framework creator](https://hypermedia.systems/book/contents/)
  - [Book - Server-Driven Web Apps with htmx](https://pragprog.com/titles/mvhtmx/server-driven-web-apps-with-htmx/)
- Go
  - Markdown parser [goldmark](https://github.com/yuin/goldmark)
  - HTML template engine [Templ](https://github.com/yuin/goldmark)
  - API framework
    - [chi](https://github.com/go-chi/chi)
    - [chi vs stardard library since 1.22](https://www.calhoun.io/go-servemux-vs-chi/)
  - SQL library
    - [SQLx vs SQLc](https://www.youtube.com/watch?v=tPhyJHly7CU)
  - Hosting platform
    - [Vercel](https://vercel.com/)
    - [Cloudfare Pages](https://pages.cloudflare.com/)
  - [Project Folder Structure](https://github.com/golang-standards/project-layout)
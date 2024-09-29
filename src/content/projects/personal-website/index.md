---
title: "Personal Website"
description: "A research on personal websites to build this website"
publishDate: "2024-09-16"
updatedDate: "2024-09-18"
github: "https://github.com/benlau6/benlau6.github.io"
tags:
  - "frontend"
  - "typescript"
  - "astro"
  - "tailwindcss"
---

## Brief Description

This website was built in [Sveltekit](https://github.com/benlau6/benlau6.github.io/tree/archive-sveltekit), then migrated to Astro for better performance and layout dedicated for static website.

- Implemented a static website with minimalistic design in Typescript and tailwindcss to showcase my portfolio including projects and notes.
- Implemented a [Rust program](https://github.com/benlau6/markdown-frontmatter) to extract the first heading, last modified date, and creation date of markdown files and use them as frontmatters in Astro.
- Implemented a remark plugin `remark-h1-to-title.ts` to extract the first heading of a markdown file and use it as the title of the page.
- Implemented a remark plugin `remark-updated-date.ts` to extract the last modified date of a markdown file in git commit history and use it as the updated date of the page.

## Technical Details

### How does flex wrap work?

- [flex-wrap](https://stackoverflow.com/questions/42613359/how-does-flex-wrap-work-with-align-self-align-items-and-align-content)

### Centering a flex container with left-aligned items

- [grid-template-columns with auto-fill seems feasible but not working](https://stackoverflow.com/questions/52764726/css-grid-auto-fit-with-max-content/53725944#53725944)
- `grid-auto-flow: column` seems feasible but somehow not working (20 minutes spent)
- ghost element seems to be the only way to center a flex container with left-aligned items
  - [empty cells](https://codepen.io/airen/pen/ZZjWRv)
  - [fillers](https://stackoverflow.com/questions/39537413/how-to-center-a-flex-list-container-with-wrap-and-justify-to-flex-start-elements)
- [How to center a flex container but left-align flex items](https://stackoverflow.com/questions/32802202/how-to-center-a-flex-container-but-left-align-flex-items)

## References

Several days were spent to conduct a research on how to build a good personal website. Here are the websites that I found inspiring.

### Collections

- [What's the best portfolio website you've ever seen? -- Reddit](https://www.reddit.com/r/webdev/comments/112r7m5/whats_the_best_portfolio_website_youve_ever_seen/) -- great discussion and honest votes
- [awesome-dev-websites](https://github.com/amitozdeol/awesome-dev-websites) -- really awesome list of dev websites
- [Astro Themes](https://astro.build/themes/?search=&categories%5B%5D=blog&categories%5B%5D=portfolio) -- checked all 14 pages of themes with blog and portfolio categories as of 2024-09-17

### Minimalistic design

- [Astro Cactus](https://astro-theme-cactus.netlify.app/) -- design, main template
- [astro-blog-zozo](https://astro-blog-zozo.pages.dev/) -- dark mode, design, list style, tag page, font
- [markhorn.dev](https://markhorn.dev/) -- design
- [Astro Sphere](https://astro-sphere-demo.vercel.app/) -- home page, background, design
- [devolio](https://devolio.devaradise.com/) -- design, list style with tags
- [astro-gaia](https://astro-gaia.netlify.app/) -- design, list style, tag, navigation
- [astro-void](https://astro-void.netlify.app/) -- list style with photos
- [Astro Nano](https://astro-nano-demo.vercel.app/) -- design
- [blogster-bubblegum](https://blogster-bubblegum.netlify.app/blog/) -- list style
- [blogster-minimal](https://blogster-minimal.netlify.app/blog/) -- list style
- [resume](https://astro-theme-resume.vercel.app/blog) -- list style
- [devfolio](https://devfolio-blog-starter.vercel.app/) -- home page, background
- [Nemanja Mitic](https://nemanjamitic.com/blog/) -- list style with photos, tag filter
- [Typography](https://astro-theme-typography.vercel.app/) -- typo, background
- [Simon Camacho](https://simoncamacho.com/) -- home page, minimalistic design, background color
- [eva.town](https://eva.town/) -- home page, now
- [AstroPaper](https://astro-paper.pages.dev/) -- tags navigation, search page, dark mode
- [the-void](https://the-void.cosmicthemes.com/) -- list style with photos and tags
- [astro-tech-blog-ten](https://astro-tech-blog-ten.vercel.app/) -- design, dark mode, tags
- [astro-agency02](https://astro-agency02.vercel.app/about) -- about page, project page, blog list style, content bottom navigation
- [godruoyi](https://godruoyi.com/) -- blog list, blog content style, timeline page, personality
- [astro-simple-portfolio](https://astro-simple-portfolio.vercel.app/) -- home page, animation
- [saastar](https://saastar.netlify.app/#use-cases) -- design, list style
- [Youssouf](https://elazizi.com/posts/add-comments-section-to-your-astro-blog/)

### Academic

- [Matti](https://mvuorre.github.io/posts/2019-02-18-analyze-analog-scale-ratings-with-zero-one-inflated-beta-models/) -- blog structure, tags, toc
- [TK Kinoshita](https://www.iamtk.co/) -- minimalistic design, list style, font, content, tags
- [dennybritz](https://dennybritz.com/): Great articles on AI, rust, gaming, visualization, minimalistic design, content
  - [poe-crafting](https://dennybritz.com/posts/poe-crafting/) -- rust, ai, visualization
  - [Deep Learning ideas that have stood the test of time](https://dennybritz.com/posts/deep-learning-ideas-that-stood-the-test-of-time/)
- [distill.pub](https://distill.pub/) -- content, design, list style
- [Amit Chaudhary](https://amitness.com/) -- blog content, list style with photos, one-liner, tag filter
- [Andrew M. Webb](http://www.awebb.info/) -- minimalistic design, list style with photos, one-liner
- [Cameron Raymond](https://cameronraymond.me/) -- tag filter
- [Andrej Karpathy blog](http://karpathy.github.io/) -- blog content
- [Chip Huyen](https://huyenchip.com/) -- blog content
- [otoro.net](https://otoro.net/ml/) -- home page, list style with gifs, blog content

### Data journalism

- [New York Times Graphics](https://www.nytimes.com/spotlight/graphics)
  - [2023 year in graphics](https://www.nytimes.com/interactive/2023/us/2023-year-in-graphics.html)
- [Bloomberg Graphics](https://www.nytimes.com/spotlight/graphics)
  - [2023 in graphics](https://www.bloomberg.com/graphics/2023-in-graphics/)
- [Washington Post Graphics](https://www.washingtonpost.com/media/interactive/2022/2022-year-graphics/)
- [FiveThirtyEight](https://fivethirtyeight.com/)
- [The Pudding](https://pudding.cool/)

### Linux OS alike

- [vivek9patel](https://vivek9patel.github.io/)
- [dustinbrett](https://dustinbrett.com/)

### Visualization

- [Italia Personal Finance](https://www.italiapersonalfinance.it/) -- great design, layout, use of colors, blog list, preview photo aspect ratio
- [hakim.se](https://hakim.se/)
- [lynnandtonic.com](https://lynnandtonic.com/)
- [Not a Number](https://www.nan.fyi/)
- [colah's blog](https://colah.github.io/)
- [adamhartwig](https://www.adamhartwig.co.uk/work-and-play)
- [robbowen](https://robbowen.digital/)

### Typography

- [rauno.me](https://rauno.me/craft/interaction-design#spatial-consistency) -- typography, side nav
- [shud.in](https://shud.in/)

### Useful Plugins

- pagefind -- search for pages in your static site
- [Giscus](https://elazizi.com/posts/add-comments-section-to-your-astro-blog/) -- comments for your static site
- [quarto](https://quarto.org/) -- An open-source scientific and technical publishing system
- [Intersection Observer API](https://billyle.dev/posts/highlight-table-of-content-items-using-intersection-observer) -- for highlighting current section in table of contents

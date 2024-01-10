---
title: Introduction
sidebar_position: 1
slug: /
---

website-generator is a static-site generator written in Node.js, which aims to:

* offer only essential static-site generation capabilities;
* follow a Markdown-driven site structure;
* generate accessible HTML from Markdown; and
* support customisation when it is reasonable to do so.

It is **not** intended for production environments or large-scale applications.

## Feature comparison

Inspired by [the feature comparison page of
ack](https://beyondgrep.com/feature-comparison/), which is in turn inspired by
[a blog post by Andy
Lester](https://blog.petdance.com/2018/01/02/the-best-open-source-project-for-someone-might-not-be-yours-and-thats-ok/).

The following static-site generators can all achieve what website-generator
does:

* [Eleventy](https://www.11ty.dev);
* [Hexo](https://hexo.io);
* [Hugo](https://gohugo.io); and
* [Jekyll](https://jekyllrb.com) (the first static-site generator I used).

The above list is not exhaustive and only based on first-hand experience.
[Jamstack](https://jamstack.org/generators/) contains a comprehensive list of
most static-site generators that can filter by language, license or popularity.

## Dependencies

website-generator is built and uses the following packages and technologies:

* [remarkable](https://github.com/jonschlinkert/remarkable/) for parsing
  Markdown;
* [Handlebars template language](https://handlebarsjs.com) for writing
  templates;
* [PostCSS](https://postcss.org) for processing CSS at build time;
* [gray-matter](https://github.com/jonschlinkert/gray-matter/) for parsing
  front-matter;
* [DOMPurify](https://github.com/cure53/DOMPurify/) and
  [jsdom](https://github.com/jsdom/jsdom/) for sanitising HTML output;
* [TOML](https://toml.io/en/) for defining front-matter;
* [tape](https://github.com/ljharb/tape/) and
  [nyc](https://github.com/istanbuljs/nyc) for unit testing and code coverage;
  and
* [TypeScript](https://www.typescriptlang.org) for local development.

## History

website-generator was written in June 2021 as a response to many static-site
generators at the time not allowing the HTML output of footnotes in Markdown
(recognised as `[^1]`) to be customised.

Despite many static-site generators now supporting this level of customisation,
development on website-generator has continued as a side project and as a means
of avoiding dependency on an external ecosystem.

While only ever intended to be used locally, a public repository was created as
encouragement to present the project at a high standard.

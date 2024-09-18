---
title: "Covid Bayesian Analysis"
description: "A Bayesian analysis on COVID-19 pandemic in Hong Kong"
publishDate: "2024-09-13"
coverImage:
  src: "./rt.svg"
  alt: "Effective Reproduction Rate"
github: "https://github.com/benlau6/covid"
tags:
  - "covid-19"
  - "bayesian"
  - "python"
  - "pymc"
---

This project uses Bayesian methods and probabilistic programming to analyze the COVID-19 pandemic. It estimates effective reproduction rate and daily new cases for Hong Kong. The data is obtained from [DATA.GOV.HK](https://data.gov.hk/en-data/dataset/hk-dh-chpsebcddr-novel-infectious-agent).

The main idea is based on rtlive and k-sys/covid-19 by Thomas Wiecki and Kevin Systrom. The model is a State Space Model with Gaussian random walk prior, implemented in PyMC.

A few plots are generated to visualize the results. Note that time series plots are mostly in aspect ratio 21:9 for better visualization.[<sup>[1]</sup>](http://vis.stanford.edu/files/2006-Banking-InfoVis.pdf)[<sup>[2]</sup>](http://vis.stanford.edu/files/2012-SlopeComparison-InfoVis.pdf)

![Daily New Cases](./ts_new_cases.svg)

![trace plot](./trace.png)

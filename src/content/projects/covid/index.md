---
title: "Covid Bayesian Analysis"
description: "A Bayesian analysis on COVID-19 pandemic in Hong Kong"
publishDate: "2024-09-13"
coverImage:
  src: "./rt.png"
  alt: "Effective Reproduction Rate"
github: "https://github.com/benlau6/covid"
tags:
  - "bayesian"
  - "python"
  - "covid-19"
---

This project uses Bayesian methods and probabilistic programming to analyze the COVID-19 pandemic. It estimates effective reproduction rate and daily new cases for Hong Kong. The data is obtained from [DATA.GOV.HK](https://data.gov.hk/en-data/dataset/hk-dh-chpsebcddr-novel-infectious-agent).

The main idea is based on rtlive and k-sys/covid-19 by Thomas Wiecki and Kevin Systrom. The model is a State Space Model with Gaussian random walk prior, implemented in PyMC.

A few plots are generated to visualize the results.

![Daily New Cases](./ts_new_cases.png)
<p class="text-center">Daily new cases</p>

![trace plot](./trace.png)
<p class="text-center">Trace plot</p>

---
title: Survey Data
publishDate: 2024-11-26
---

# Survey Data

## Data Modeling

### SQL database

- [Discussion | Database design for a survey](https://stackoverflow.com/questions/1764435/database-design-for-a-survey)
- [Discussion | Questionnaire database design - which way is better?](https://dba.stackexchange.com/questions/11933/questionnaire-database-design-which-way-is-better): It complement the previous discussion to think of questionnaire revisions.
- [Discussion | Survey database design: associate an answer to a user](https://dba.stackexchange.com/questions/16002/survey-database-design-associate-an-answer-to-a-user)
- [MySQL | Guide To Design Database For Poll In MySQL](https://www.tutorials24x7.com/mysql/guide-to-design-database-for-poll-in-mysql)
- [Vertabelo | Database Design for Online Survey Systems](https://vertabelo.com/blog/database-design-survey-system/)
- [Vertabelo | A Database Model for an Online Survey. Part 1](https://vertabelo.com/blog/a-database-model-for-an-online-survey-part-1/)
- [Vertabelo | A Database Model for an Online Survey. Part 2](https://vertabelo.com/blog/a-database-model-for-an-online-survey-part-2/)
- [Vertabelo | A Database Model for an Online Survey. Part 3](https://vertabelo.com/blog/a-database-model-for-an-online-survey-part-3/): It modeled the conditional ordering of questions
- [Vertabelo | A Database Model for an Online Survey. Part 4](https://vertabelo.com/blog/a-database-model-for-an-online-survey-part-4/)

### NoSQL database

- [Designing a Database Schema for Survey Questions](https://wwwiti.cs.uni-magdeburg.de/iti_db/publikationen/ps/auto/thesisJohn22.pdf): It is a master's thesis that uses a NoSQL database, specifically MongoDB document-oriented database, to store survey data. But it also explored the relational database schema.
- [Stackoverflow Developer Survey Data - Discovering Neo4j AuraDB Free with Michael and Alexander](https://www.youtube.com/watch?v=nBVr-cSrOsY)
- [32. A Survey As A Graph](https://youtu.be/ExkAKEGj3oE?t=241): It demonstrated a survey example containing questions as its columns
- [Building a Questionnaire with Neo4j — part 1/3: One simple question](https://medium.com/neo4j/building-a-questionnaire-in-neo4j-part-1-3-one-simple-question-c89a18956756)
- [Building a Questionnaire with Neo4j part 3/3 — A dynamic list](https://medium.com/@stefan_d/building-a-questionnaire-with-neo4j-part-3-3-a-dynamic-list-995c7fa8cabd)

## Analysis

### How to model Likert scale data

A Likert scale is a rating scale used to measure survey participants' opinions, attitudes, motivations, and more. It uses a range of answer options ranging from one extreme attitude to another, sometimes including a moderate or neutral option. However, 4- to 7-point scales are the most popular.

The Likert scale is ordinal, but if we assume that the distance between each point is equal, we can treat it as interval data, i.e. the values are evenly spaced.

- [Ordinal regression: A review and a taxonomy of models](https://wires.onlinelibrary.wiley.com/doi/10.1002/wics.1545)
- [Why Ordinal Variables Can (Almost) Always Be Treated as Continuous Variables: Clarifying Assumptions of Robust Continuous and Ordinal Factor Analysis Estimation Methods](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2020.589965/full)
- [Chapter 12 Ordinal Logistic Regression](https://bookdown.org/chua/ber642_advanced_regression/ordinal-logistic-regression.html)
- [6.22 Ordinal logistic regression](https://www.bookdown.org/rwnahhas/RMPH/blr-ordinal.html)

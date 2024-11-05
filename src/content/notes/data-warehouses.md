---
title: Data Warehouses
publishDate: 2024-11-10
---

# Data Warehouses

Snowflake, Databricks, Redshift, and BigQuery are all cloud-based data warehouses. They are used to store and analyze large amounts of data. They are used by companies to store data from various sources, such as databases, applications, and other systems. Data warehouses are used to store data in a structured format, which makes it easier to analyze and query the data. Functional wise, they are all the same because they will copy useful features from each other. The only concern would be the pricing model and existing cloud platform.

## Data Warehouse vs Data Lake

Traditionally, data lakes store all types of raw data, which data scientists may then use for a variety of projects. Data warehouses store cleaned and processed data, which can then be used to source analytic or operational reporting, as well as specific BI use cases. [discussion](https://www.reddit.com/r/dataengineering/comments/skrkoj/what_is_difference_between_data_warehouse_and/)

Usually, data lakes stores all structured and unstructured data, while data warehouses store structured data. And data lakes store much more data than data warehouses, and cheaper.

A data lake can be a great source of data for a data warehouse.

The data lake is lower effort to build, can have very low-latency, and can support data analysis for those that have the skills to navigate it.

A data warehouse takes more time to build, provides less access to raw data, but because of its curation it's generally the safer & more productive place for the actual analysis of data.

But nowadays, since the rising of ELT pattern, the line between data lake and data warehouse is blurred.

## Data Warehourse vs RDBMS

RDMS is usually a row oriented storage for OLTP systems (think of real time bank payment processing)

Data Warehouse is a column oriented storage (in most of the cases) to perform faster aggregation queries for OLAP (analytical) systems

Data warehouse is a theoretical concept whereas RDBMS is a vendor implementation of a relational database (i. e. SQL Server, Oracle, Postgres). Data warehouses are traditionally built on top of the RDBMSes but with somewhat different design than transactional databases (hence you'll often hear OLTP vs OLAP databases) - it is expectes that data in a data warehouse will be rarely (if ever) updated; instead it is optimized for inserts and reads. Also, data is "denormalized", meaning there is a certain level of redundancy of the data in order to avoid some JOINs (because number of them in an analytical query can be very high).

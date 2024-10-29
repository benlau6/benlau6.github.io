---
title: Data Processing
publishDate: 2024-11-01
---

# Data Processing

## ETL vs ELT

The ETL approach uses a set of business rules to process data from several sources before centralized integration. The ELT approach loads data as it is and transforms it at a later stage, depending on the use case and analytics requirements. The ETL process requires more definition at the beginning. Analytics must be involved from the start to define target data types, structures, and relationships. Data scientists mainly use ETL to load legacy databases in the data warehouse, while ELT has become the norm today. [What’s the Difference Between ETL and ELT?@Amazon](https://aws.amazon.com/compare/the-difference-between-etl-and-elt/?nc1=h_ls)

In the ETL process, transformation is the second step, while in ELT it is the third. This step focuses on changing raw data from its original structure into a format that meets the requirements of the target system where you plan to store the data for analytics. Typically, we use a different processing server to transform that data.

ETL processes load data as a final step, so that reporting tools can use it directly to generate actionable reports and insights. However, in ELT, you still need to transform the extracted data after loading it.

In the ELT process, you load the extracted raw data from various sources in its natural state into a data warehouse or data lake. You then transform it as needed while in the target system, which usually is a MPP database, that is, massively parallel processing database. With ELT, all data cleansing, transformation, and enrichment occur within the data warehouse. You can interact with and transform the raw data as many times as needed.

### Why ELT becomes the norm?

ETL has been around since the 1970s, becoming especially popular with the rise of data warehouses. However, traditional data warehouses required custom ETL processes for each data source.

The evolution of cloud technologies changed what was possible. Companies could now store unlimited raw data at scale and analyze it later as required. ELT became the modern data integration method for efficient analytics.

#### Speed

ELT is faster than ETL. ETL has an additional step before it loads data into the target that is difficult to scale and slows the system down as data size increases.

In contrast, ELT loads data directly into the destination system and transforms it in parallel. It uses the processing power and parallelization that cloud data warehouses offer to deliver real-time or near real-time data transformation for analytics.

#### Costs

The ETL process requires analytics involvement from the start. It needs analysts to plan ahead on the reports they want to generate and define data structures and formatting. The time required for setup increases, which adds to costs. Additional server infrastructure for transformations may also cost more.

ELT has fewer systems than ETL, as all transformations occur within the target data warehouse. With fewer systems, there is less to maintain, leading to a simpler data stack and lower setup costs.

## OLAP vs OLTP

## Data lake vs Data warehouse

A Data Warehouse would traditionally run on a database. A database offers both compute and storage. A data lake typically runs on blob storage and does not offer compute.

I always think that for newcomers, confusion occurs when they think or are told that a Data Warehouse is something physical. It isn't. It's just a way of organising data that makes it efficient to query and easy to understand. I also don't think a data warehouse should be thought of as software. If anything, the transformation logic you write (ETL/ELT) could be thought of as the "software" but this is not the data warehouse itself, it's the mechanism by which the data warehouse is populated. I think it's important to clear this up because vendors have this tendency to offer data warehouses as products/software. Most of the time they are not offering a data warehouse but merely the tools to build it (orchestration and integration tools), host it (databases, compute, data lakes) etc.

A data warehouse can be built on anything really, even CSV files if you want to go nuts. Lakehouse is a relatively new approach to data warehousing, where there is a focus on separation of storage and compute. Think of it as an approach for building a data warehouse but instead of using the database for storage, data is stored on the data lake.

A data lake is also not something physical. A data lake is a term that is used to describe a place where you can store many different types of data, at scale in a distributed and redundant way. These days, data lakes are typically built on blob storage - S3, Azure blob storage etc.

## S3 as a NoSQL database

Latency is much higher than a real database.

Don't use S3 to replace a traditional RDS database with lots of small updates and reads (OLTP). BUT....

If your usage tends to involve large loads followed by many large analysis queries (group bys, joins, whole table scans). Saving your data into parquet files and using spark/athena/hive to query the data is a pattern that many groups use.

The other use case is when you have a lot of data that is unlikely to change, while you want to store cheaply and you don't need to query it often. S3 is a great place to store this data. Athena is a great tool to query this data as easy as querying a database.

## Tools

### Airflow

Core Idea:

- Idempotent
- Deterministic
- Immutable
- DAG dependency
- Pure functions from functional programming, which have No side effects

Airflow is a orchestration tool that can run tasks in DAG, while a task could be a docker image, or a python script, or whatever.

Airflow is more for orchestration, leave the large transformation task to something like spark, via the spark operator.

Don’t pass large data volumes between tasks. Any transform task needs to read from some external place (like GCS), do the transform, and write back to the external place. If the data doesn’t fit in memory you need to account for that which often means using a chunking strategy.

It’s tempting to try to separate concerns at task level, but if that necessitates passing the data itself using xcom or taskflow from task to task you should reconsider. A pattern I often use for transform steps is to read from cloud, do transform, write to cloud, then pass the url(s) of the written files to the next task. Passing metadata task to task is fine. Passing the actual data is often not.

As I couple people mentioned, the actual transforms and data should be external to airflow. Each operator should be writing out to some file or location and the next operator should read that previous file. This makes rerunning partial dags after a task failure much, much easier.

I'd highly recommend checking out this great post from the creator of Airflow.

<https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a>

Airflow should only be orchestrating, e.g used to start a Docker container that does the data processing. You shouldn’t actually use airflow to process the data.

### dbt

#### what

[dbt](https://docs.getdbt.com/docs/introduction) (Data build tool) is a CLI development framework for analysts, also called Analytics Engineers, that enables them to build, test, and document data pipelines using only SQL. It fits the ELT instead of ETL approach very well.

What dbt has to offer is not just the transformation, but a framework for reusable functions, testing framework, some powerful things you can do with jinja templating, framework for defining schema and context (which can be used for data lineage and documentation), to name just a few of the features.

There are a lot of integrations and support in the community as well. During your build and deployment process, you can leverage Metadata, compiled, and other files with integrations for other services like data dictionaries/catalogs (datahub, castor, etc).

Dbt generally isn't used for the E or L , just the T. If the data you need is already in your warehouse, dbt is a great tool. If you also need to get data for the source database, you'll need to script that in some way, and airflow can orchestrate that for you.

#### How

- init dbt project
- create a table to store the transformed result
- create custom models (sql files), with filename as its tablename, query inside as its table
- create models referencing the existing table such that we can do transformation to create new tables by custom models.
- the sql file syntax is enhanced by jinja template
- run dbt docker image

#### Why not custom python transformation scripts?

You can, but there are lots of boilerplate, e.g. schema definition, language specific db library, error handling, etc. And what if those data is coming from different db, or it might migrate to different db? Chaos! Just use pure sql! With macros, it also allows reuse of any code block.

#### Why

but if I'm already orchestrating my SQL transforms with something like airflow or prefect anyways what do I need DBT for?

Because in your airflow instance, you have to write more code, that draws attention away from Business Logic. Plus, you have to be explicit about dependencies in the DAG. Whereas DBT makes the DAG implicit. You will never get an out-of-order execution with DBT, whereas with Airflow if you declare that apples come before the apple tree, it will try to do just that.

Key productivity advantages gained with dbt:

- Parameterization for runtime variables within your models
- Order of operations maintained automatically by deriving a dependency tree based on references between models
- Parallel execution of models for root nodes in the dependency tree

DBT is a single tool that does an excellent job transforming relational data. Handles dependencies, tests, documentation all in a declarative manner. That's powerful. It's most powerful feature is the ability to write dynamic SQL in templates. This, with macros, allows some crazy functionality and reusability.

In other words, it allows good engineering practices with SQL. Not really better than Spark or rolling your own Python solution. But quicker to get up and running on new projects.

### dbt vs airflow

Airflow is an orchestrator. dbt is an ELT cli tool that provides a framework for elt, testing, consistency, standardization, etc.

You can pick what tool you want to use for your transformations and leverage airflow to orchestrate the tasks -- dbt is one option for ELT where the warehouse is the tool that runs the compute for part of a pipeline and dbt is the cli tool that provides a framework, compiles, connects to warehouse. You can use spark, basic script i.e. python on a server, etc for ETL, which can also be orchestrated via airflow.

You can pick what tool you want to use for your transformations and leverage airflow to orchestrate the tasks -- dbt is one option for ELT where the warehouse is the tool that runs the compute for part of a pipeline and dbt is the cli tool that provides a framework, compiles, connects to warehouse. You can use spark, basic script i.e. python on a server, etc for ETL, which can also be orchestrated via airflow.

- [dbt plus airflow](https://medium.com/plum-fintech/dbt-airflow-50b2c93f91cc)
- [How we orchestrate 2000+ DBT models in Apache Airflow](https://medium.com/apache-airflow/how-we-orchestrate-2000-dbt-models-in-apache-airflow-90901504032d)

## Related Notes

- [Data Processing Optimization](data-processing-optimization.md)

## Readings

- [Data Engineering Course for Beginners](https://www.youtube.com/watch?v=PHsC_t0j1dU) - teach dbt and airflow.
- [How Data Engineering Works](https://www.youtube.com/watch?v=qWru-b6m030)

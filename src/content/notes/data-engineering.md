---
title: Data Engineering
publishDate: 2024-11-01
---

# Data Engineering

## Related Notes

- [Data Processing Optimization](data-processing-optimization.md)

## Resources

- [DataTalksClub/data-engineering-zoomcamp](https://github.com/DataTalksClub/data-engineering-zoomcamp) - end-to-end hands-on project
- [data-engineer-handbook@github](https://github.com/DataExpert-io/data-engineer-handbook)
- [Data Engineering Course for Beginners](https://www.youtube.com/watch?v=PHsC_t0j1dU) - teach dbt and airflow.
- [How Data Engineering Works](https://www.youtube.com/watch?v=qWru-b6m030)
- [How I would learn Data Engineering (if I could start over)](https://www.youtube.com/watch?v=VSxF0bb-JH4)

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

## Cloud services

- S3
- Amazon EMR provides Apache Hadoop and applications that run on Hadoop HDFS. It is a very flexible system that can read and process unstructured data and is typically used for processing Big Data. It could run Spark.
- Amazon Redshift is a petabyte-scale data warehouse that is accessed via SQL. Data must be loaded into Redshift before being queried, which often requires some for of transformation ("ETL").
- Snowflake
- Databricks
- BigQuery

[How tf do you even get experience with Snowflake , dbt, databricks.](https://www.reddit.com/r/dataengineering/comments/1fipc2a/how_tf_do_you_even_get_experience_with_snowflake/)

## Certifications

- AWS Certified Big Data - Specialty: $300
- AWS Certified Data Engineer - Associate: $150
- AWS Certified Machine Learning Engineer - Associate: $150
- GCP Professional Data Engineer Certification: $200
- SnowPro Core Certification
  - snowflake university
  - udemy Ultimate SnowPro Core Certification Course & Exam
  - SkillCertPro for preparation
- Databricks lakehouse fundamentals
- Databricks Certified Data Engineer Associate: $200

## Data lake vs Data warehouse

A Data Warehouse would traditionally run on a database. A database offers both compute and storage. A data lake typically runs on blob storage and does not offer compute.

I always think that for newcomers, confusion occurs when they think or are told that a Data Warehouse is something physical. It isn't. It's just a way of organising data that makes it efficient to query and easy to understand. I also don't think a data warehouse should be thought of as software. If anything, the transformation logic you write (ETL/ELT) could be thought of as the "software" but this is not the data warehouse itself, it's the mechanism by which the data warehouse is populated. I think it's important to clear this up because vendors have this tendency to offer data warehouses as products/software. Most of the time they are not offering a data warehouse but merely the tools to build it (orchestration and integration tools), host it (databases, compute, data lakes) etc.

A data warehouse can be built on anything really, even CSV files if you want to go nuts. Lakehouse is a relatively new approach to data warehousing, where there is a focus on separation of storage and compute. Think of it as an approach for building a data warehouse but instead of using the database for storage, data is stored on the data lake.

A data lake is also not something physical. A data lake is a term that is used to describe a place where you can store many different types of data, at scale in a distributed and redundant way. These days, data lakes are typically built on blob storage - S3, Azure blob storage etc.

[data warehouses](data-warehouses.md)

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

### Why not

If you're doing ETL, you probably shouldn't use dbt, which is a tool built for ELT.

You've described a classic ETL process where data is extracted from source systems, transformed with Python tools, and then loaded to some destination. dbt assumes your pre-transformed data exists in the same database with transformed data (an ELT process), and it does a lot of neat things with versioning, templating, visualizations (of transformations of course), doc generation, etc. [discussion](https://www.reddit.com/r/dataengineering/comments/119s7yv/is_dbt_really_necessary/)

[What's "wrong" with dbt ?](https://www.reddit.com/r/dataengineering/comments/zamewl/whats_wrong_with_dbt/?share_id=AK3ipVG3bGr-W0UkZTav_&utm_content=2&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1)

- Replicating physical schemas from upstream transactional databases
- 100,000+ lines of SQL is never good - jinja2 macros + a massive pile of SQL is not manageable.
- Inability to create unit tests to support Quality Assurance
- Difficulty assessing code quality
- Functional limitations of SQL - There's a lot that SQL just can't do, that python can do with ease. Like using a 3rd party library for the transformation - to look up the isp and location of every ip address. Or convert every ipv6 to the same format. Or automatically detect which of 100 different date, time or timestamp formats a given string is. etc, etc, etc. Jinja2 extends its capabilities, but the results are ugly.
- Incomprehensibility of deep dependencies - The inability to easily see the impacts to manageability, to runtime performance, to runtime costs means that this easily happens. But when you have 20+ levels of dependencies for a single model then reasoning about your data becomes extremely difficult, the DAG takes forever, and costs a ton.
- Scheduled rather than event-driven DAGs: rather than building a downstream model when the data is available for a given period (say, hour of the day), we build it at a given time. This means that we need to give it enough time for all data to have arrived (big delay), and we're still sometimes wrong (missing late-arriving data). We could include steps that fail if the necessary data isn't yet there. But that sucks too. What would be better is to be event driven - and run once the data you need has arrived.

### Use cases

> As someone who's worked in SQL for over a decade but started using dbt this year I'd say the biggest upside is the reduction of redundancy (or redundant code) in datasets. You can create one data set (object) used in a dozen other data sets and when you need to make an update to the underlying dataset you make the update once and you're good. With my previous employer if a scope change was implemented I might have to update 12-14 different views or stored procs because a table name (or field) changed, etc. dbt does away with all that. Plus you really don't need stored procs at all. You can orchestrate all your changes and build pipelines incrementally without having to rely on stored proc updates. Pretty slick IMO.

> They added Python models now. You can still use the SQL models but the Python ones fill in some gaps that you couldn't do before, like throwing some machine learning stuff at it or pulling from different sources or even serving as a QA checkpoint by exporting the data to a flat file.
>
> One example of how the Python model just saved the day is ingesting a hive partitioned folder of JSON and land it as a table. It was trivial in Python to merge them all into a dataframe and pass that up the chain in DBT.

### Why don't do it directly in python but in dbt?

> A variety of reasons but I’ll go with clarity and ease of scaling. Unless you’re getting into nitty gritty transformations sql is ususually superior to Python for data transforming. And SQL is much easier to read and understand than the many ways you can munge data using Python.
>
> Then there’s performance , size of your data and scalability. For small datasets there’s probably not much difference though I still prefer sql because it’s easy to read and explain, but the bigger your data gets the more complicated your Python needs to be and you have to start worrying about your infrastructure or resources.
>
> e.g 2Gb worth of data being transformed on Python using pandas probably won’t be too much hassle. You go up to 20gb and depending on your machine you’ve got problems now you need to switch to polars or something and the syntax of transforms changes annoyingly because it’s not all identical.
>
> Meanwhile 2Gb of data on [duckdb](duckdb.md) or any other database is fine, 20gb is fine again without changing your sql. If your data gets too big to be handled on a laptop you’ve got other solutions like cloud warehouses or dbt or whatever but your sql remains the same wherever you go. [discussion](https://www.reddit.com/r/dataengineering/comments/1enhqlb/where_should_data_build_tool_dbt_be_used_and_why/)
>
> The issue is that you would have to spin up a node with sufficient memory to manipulate the data if done in Python with pandas or polars. With dbt the existing infrastructure from data warehouse takes care of this.

> dbt is a step forward from older approaches, where people would create stored procedures in the database and create these nested SQL view monstrosities. There often was no way to do source control or testing or CI/CD, and if you needed to do some calculation that wasn’t easy to do in SQL, there often were no escape hatches where you switch to Python for one small part. dbt/SQLMesh enable all of that.
>
> One advantage of SQL is that it runs in the database. You just send a SQL query and it can process 10GB of data. If you need to do this with Python, you often end up transferring 10GB of data over the wire, transforming it, then sending 10GB of data back over the wire. So it can be inefficient if the data is larger.
>
> However, you could also say if you had a simple setup or just Postgres on a Linux server, that running Python scripts to process 10GB of data is essentially no different than a SQL query that’s processed inside the database. They both read data from disk, load it into memory, transform it, and write it back to disk. So if your data can fit on a single server (and servers are very big these days), this approach is completely viable.

### Limitations

> dbt can be a great fit, as long as [discussion](https://www.reddit.com/r/dataengineering/comments/15oc8z5/why_is_dbt_popular_for_the_transformation_step/):
>
> - you don't have low-latency requirements
> - you don't have strict data quality requirements
> - you don't have complex transformation requirements
> - you don't mind the high costs of using a cloud database for transformations at scale compared to doing them on say lambda/kubernetes/etc
> - don't have a massive variety or complexity of data
> - you have disciplined "analytic engineers" that want to work with SQL all day, and are experienced with dbt and its best practices, and are really into testing, automation, really good data models, readable SQL, etc, etc.
> - you have management that will give these analytic engineers enough time to do their job right

### dbt vs airflow

Airflow is an orchestrator. dbt is an ELT cli tool that provides a framework for elt, testing, consistency, standardization, etc.

You can pick what tool you want to use for your transformations and leverage airflow to orchestrate the tasks -- dbt is one option for ELT where the warehouse is the tool that runs the compute for part of a pipeline and dbt is the cli tool that provides a framework, compiles, connects to warehouse. You can use spark, basic script i.e. python on a server, etc for ETL, which can also be orchestrated via airflow.

You can pick what tool you want to use for your transformations and leverage airflow to orchestrate the tasks -- dbt is one option for ELT where the warehouse is the tool that runs the compute for part of a pipeline and dbt is the cli tool that provides a framework, compiles, connects to warehouse. You can use spark, basic script i.e. python on a server, etc for ETL, which can also be orchestrated via airflow.

But note that Dagster is a much better orchestration tool to work with dbt. [discussion](https://www.reddit.com/r/dataengineering/comments/1d7fhyz/why_use_dbt_if_i_have_dagster/)

- [dbt plus airflow](https://medium.com/plum-fintech/dbt-airflow-50b2c93f91cc)
- [How we orchestrate 2000+ DBT models in Apache Airflow](https://medium.com/apache-airflow/how-we-orchestrate-2000-dbt-models-in-apache-airflow-90901504032d)

### dbt vs spark

Spark is more efficient and cost effective, but it needs programming skills. It is a tool for people with a Software Engineering background performing data-related tasks. While dbt can be handled by data analysts who know SQl, and it is much systematic and organized, but it is less efficient and much expensive when it runs the queries in data warehouse.

### Can I use dbt for big data?

[discussion](https://www.reddit.com/r/dataengineering/comments/stzuur/dbt_vs_spark/)

> All dbt does is run SQL on your DW. So if your DW supports big data, i would hope it does, then dbt does too
> The "brain" of dbt is whatever you connected it to. So bigquery, redshift, so on.

> It will take advantage of scaling on your DW.
>
> Which allows it to support scaling without adding that code complexity into the dbt project.
>
> But which also limits it to the scaling features of your DW. And typically scaling a DW is much more expensive than scaling on aws lambdas or kubernetes. Also, it doesn't work nearly so well for low-latency, high-volume scenarios.

> DBT is not for big data, if you go down that route be prepared for eyewatering bills, at my company we are currently decommissioning dbt pipelines replacing them with spark due to this.
>
> DBT is mostly run alongside a DWH like Snowflake which is the one who does the compute for you which also has an opaque policy for pricing and makes it very easy to rack up bills with running everything on a large warehouse (mostly analysts are not concerned with the performance of their queries)
>
> Someone else: not really true causality here; dbt can be run on a spark engine like deltalake or emr. in addition, one can write dbt logic in "incremental" fashion to reduce costs.

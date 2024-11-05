---
title: DuckDB
publishDate: 2024-11-10
---

# DuckDB

DuckDB is a local data warehouse which could be manipulate by dbt. Just like devs use SQLite for local transactional db, DuckDB is for local analytical db needs. Most of the time it is just a query engine that outperform pandas or polars. It could load data from any data source, such as S3, or SQLite.

Key selling points:

- Full SQL support: very helpful if you already have the SQL queries from another system like Snowflake or BigQuery, and you want to scale it down for single node processing for faster testing/POC development.
- Large-than-memory processing: pandas 1 requires your data plus some overhead to fit entire in memory, and quite a large overhead at that. DuckDB doesn't impose such limit.

## Comparison

[discussion](https://www.reddit.com/r/dataengineering/comments/11xcy2g/i_dont_understand_duckdb/)

> DuckDB > Pandas for in memory processing (import as a python package then use as is). Its optimized for that specific use case, where it uses clever tricks to make sure aggregates/OLAP queries are done within the first (?) layer of cached memory. Pandas starts to get bad once your data is larger than memory.
>
> DuckDB > Spark for 'small' data or single node processing. Spark is simply just too complex to configure for small projects. Spark however is almost always the best option when you start working with big data and distributed systems (several nodes).

> For 99% of companies it will be a faster / cheaper alternative to snowflake.
>
> For 100% of data scientist it will be a faster / cheaper alternative to Pandas for data preprocessing and analytics.
>
> For 90% of data engineers it will be a better alternative to spark for ETL.

## Run DuckDB on Lambda

> DuckDB is rapidly changing the way data scientists and engineers work. It’s efficient and internally parallelised architecture means that a single querying node often out-competes entire clusters of more traditional query engines.
>
> But out of the box, DuckDB needs to be run on a single node meaning the hardware naturally limits performance. The typical way of solving this in a production environment involves scaling out or scaling up your DuckDB infrastructure: increasing the size of your querying instance or distributing concurrent query jobs to different hardware. Traditionally, scaling out or up are slow and expensive tasks that involve waiting for an upstream provider to allocate resources and start new servers.
>
> The time and cost of scaling DuckDB infrastructure is a good trade-off for many analytical workloads — particularly if you are generating and pre-caching analytics for later consumption. This only works for some businesses in 2023: these days, our users expect more than rigid and overly optimised analytics — they want to dynamically filter, generate trends over long periods, and analyse data in real-time.
>
> Serverless computing presents an opportunity to solve both the cost and cold start problem. AWS Lambda instances are relatively small and underpowered (6 CPU cores, 10GB RAM, max 0.5Gbps network throughput), but have a core benefit of being charged per millisecond and having almost no time/cost overhead when starting, pausing, and resuming instances.
>
> If we can distribute our dataset across 3,000 Lambda instances, data will be downloaded at 1.5Tbps, and we’ll utilise 18,000 CPUs/30TB RAM (10GB Lambdas) to execute queries.
>
> Suddenly, it becomes possible to keep all our data in cold storage and rapidly load it into a serverless DuckDB cluster at query time for a real-time interactive analysis session.
>
> Note that in this case, DuckDB is just the query engine to run the SQL. Click to the link to see benchmarks and details. [boilingdata](https://boilingdata.medium.com/lightning-fast-aggregations-by-distributing-duckdb-across-aws-lambda-functions-e4775931ab04)

## Use cases

> I’ve been able to pack duckdb inside of lambdas and then I can have each lambda return what I need over billions of billions of rows in S3 - idea from [boilingdata](https://boilingdata.medium.com/lightning-fast-aggregations-by-distributing-duckdb-across-aws-lambda-functions-e4775931ab04)
>
> Edit because responses:
>
> My org as time series partitioned parquet files in our data lake and we usually know the times we care about so can simply fire up 1 lambda per file and pass it the sql you want when we invoke it from python and either return the data in the main process that called them using non blocking async calls or write to file and aggregate after. Its way faster than Athena and the slowest part of the query is just loading the returned data from the query back into memory if it’s a lot and you fired off a lot of lambdas.
>
> My team is currently managing about a trillion data points but this is going to grow exponentially the next few years. The only other options for fast queries on all this data is pushing stuff to a Cassandra DB or Druid as the schema is in a tidy format of timestamp, field, value (yes there are other ways to store it that may be more efficient but tidy data is nice!) [discussion](https://www.reddit.com/r/dataengineering/comments/11xcy2g/i_dont_understand_duckdb/)
> Advantage of that approach over Athena or spark? $$$

> I have also seen duck db used for the last mile of analytics. Tools like Spark/Athena are still used to perform large scale ETL where there is big data. But ultimately the billions of rows gets aggregated down into the millions/thousands and then DuckDB can used there.

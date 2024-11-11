---
title: Distributed Computing
publishDate: 2024-11-12
---

# Distributed Computing

It shall be used only if vertical scaling is not enough or too costly. It is a way to scale horizontally, but it brings complexity, and thus large maintenance costs.

## Resources

- [Youtube@Distributed Systems 1.1: Introduction](https://www.youtube.com/watch?v=UEAMfLPZZhE)

## Tools

- Dask
- Ray
- Spark
  - Spark batch job to be triggered by airflow
  - Spark streaming to consume data from Kafka
- Hadoop

### Comparison

- [databricks - When to use Spark vs. Ray](https://docs.databricks.com/en/machine-learning/ray/spark-ray-overview.html) - Spark excels at data parallelism like ETL and most common ML models, while Ray is good at task parallelism, i.e. computation-focused tasks, e.g. ML training, inferencing, and unstructured data processing. It also excels at reinforcement learning, deep learning training, hyper parameter tuning, and high-performance computing. And we could always use both in the same project.
- [Amazon’s Exabyte-Scale Migration from Apache Spark to Ray on Amazon EC2](https://aws.amazon.com/tw/blogs/opensource/amazons-exabyte-scale-migration-from-apache-spark-to-ray-on-amazon-ec2/)
  - [The Spark-to-Ray Migration That Will Save Amazon $100M+ Per Year](https://www.bigdatawire.com/2024/07/30/the-spark-to-ray-migration-that-will-save-amazon-100m-per-year/) - The problem was compacting newly arrived data into the data lakehouse, such as having millions of very small files to merge, or a few massive files. New subscriptions to their largest tables would take days or weeks to complete a merge, or they would just fail. The initial tool they turned to for compacting these unbounded streams of S3 files was Apache Spark running on Amazon EMR. No longer a mere 50PB, the Amazon data lakehouse had grown beyond the exascale barrier, or 1,000 PBs. The Spark-based system simply was no longer able to keep up with the sheer volume of workload, and it started to miss SLAs.
  - [Hacker News discussion](https://news.ycombinator.com/item?id=41104288)
- [Elastic Distributed Training with XGBoost on Ray](https://eng.uber.com/elastic-xgboost-ray/)

## Platforms

- AWS EMR is an AWS servcie that lets you run various big data systems like Spark, Hive, or Presto on a cluster of EC2 instances that are able to be scaled horizontally. It can use HDFS, but S3 is more common.
- AWS Glue is a serverless ETL service that can run Spark jobs without spinning up an EMR cluster, but behind the scenes it uses Spark on EMR. It is good to get data into S3 from your systems of records.
- AWS Athena is a level of abstraction over Presto. It basically is Presto, but serverless. Assuming data is stored on S3 to be queried. It is good to run SQL queries on data in S3.

## Hadoop

[discussion](https://www.reddit.com/r/dataengineering/comments/18kmkf6/hadoop_vs_mapreduce/)

Hadoop is a framework of tools to do cluster computing, which contains 4 things:

- HDFS for storage
- YARN for resource scheduling
- MapReduce for processing
- Common Libraries.

There are many applications that have been built to run on top of Hadoop. Some leverage MapReduce for processing, some build their own. This includes Spark, Hive, Giraph, etc.

Hadoop was a good solution for on prem data centers. When the cloud came along, object stores , like AWS S3, were a much better place to store your data, so this replaced HDFS.

YARN is a means to an end. It’s still used but Kubernetes has become more dominant. Spark has its own standalone scheduler so it doesn’t need YARN, but can still run on it if necessary.

## Spark

Spark is a standalone computation engine that works well with Hadoop but can be used outside the Hadoop ecosystem. Spark itself is an engine designed to work in a distributed fashion. It takes a given task (like "count the inventory") and figures out the most efficient way to divide up that work among multiple worker machines, and also actually manages the work while it's being done.

So it has both a planning component (called Catalyst) to analyze the work and generate an optimized work plan (in the form of a directed acyclic graph, or DAG), and then a task management component (Spark Scheduler) to orchestrate the work.

Spark could, but don't need to use MapReduce, it uses RDDs instead. MapReduce writes out every intermediate step to disk while RDDs keep a lot of it in memory and if one machine drops it has a lineage to recreate the data.

It got famous for being able to process the same as MapReduce but with a tenth of the number of lines of code and it was 100x faster. So everyone used Spark instead of MapReduce. Moreover, it has great performance and has several useful knobs for tuning for your specific workload requirements, it's designed to easily scale up and down (e.g. you could easily add 100 more workers to your inventory counting if you need it done faster), has support for multiple languages like Python, SQL, Scala, Java, .NET, and R, a wide variety of file formats, structured and unstructured data, and both batch and streaming data, so it's a very useful general-purpose Big Data engineering and querying tool [ref](https://www.reddit.com/r/dataengineering/comments/105rg45/comment/j3cp0aw/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button).

In the BigQuery example, you could use Spark to perform the transformations on the data before putting it into BigQuery, and/or you could use Spark instead of BigQuery to query the data.

### When not to use Spark

Spark shines when you need to do an ETL pattern over [ELT](data-engineering.md#etl-vs-elt) or need to otherwise process larger datasets outside of a data warehouse. If you have data inside data warehouse like Snowflake already and can do the work in SQL, keep it in Snowflake.

### Resources

- [A Neanderthal’s Guide to Apache Spark in Python](https://towardsdatascience.com/a-neanderthals-guide-to-apache-spark-in-python-9ef1f156d427)

## MapReduce

[MapReduce: Simplified Data Processing on Large Clusters](https://static.googleusercontent.com/media/research.google.com/zh-TW//archive/mapreduce-osdi04.pdf)

MapReduce is a programming model and an associated implementation for processing and generating large
data sets. Users specify a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key

For an analogy, imagine getting 1,000 people to count the books in a library: you can send them to count the books in specific sections, and then when they all come back with their individual sums, you add up their sums to get the total. Another analogy would be voting and election.

## Finding the median is a tricky problem in Big Data

Calculating the mean is almost a toy problem with map reduce, but the median is significantly trickier because we can throw away intermediate values when calculating the mean, while we need to keep track of the order of all values when calculating the median.

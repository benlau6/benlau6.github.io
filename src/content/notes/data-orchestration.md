---
title: Data Orchestration
publishDate: 2024-11-21
---

# Data Orchestration

## Tools

- [Apache Airflow](https://airflow.apache.org/) - action driven
- [Dagster](https://dagster.io/) - asset driven, here is a official [course for Dagster & dbt](https://courses.dagster.io/courses/dagster-dbt)
- [Prefect](https://www.prefect.io/)

## Case Studies

### Real time analytics

[Data engineering project with Flink (PyFlink), Kafka, Elastic MapReduce, AWS, Dagster, dbt, Metabase and more!](https://www.reddit.com/r/dataengineering/comments/1eyrzv1/data_engineering_project_with_flink_pyflink_kafka/): Data source -> Kafka -> Flink -> Dagster(S3 -> dbt -> Redshift) -> Metabase

## Deployments

### Airflow

[Automating Airflow/Dagster Deployment Across Multiple Environments: Best Practices for Production?](https://www.reddit.com/r/dataengineering/comments/1fv2y2p/automating_airflowdagster_deployment_across/) - Uses AWS Secrets Manager for Variables and Connections

### Dagster

[How to deploy Dagster & Postgres for a company](https://www.reddit.com/r/dataengineering/comments/1ff1yqe/how_to_deploy_dagster_postgres_for_a_company/)

> Very possible and very cheap. a 16Gb ram ec2 instance would probably be more than enough to host both dagster and postgres if you're not keen on RDS although i'd recommend a small rds instance then 8gb ec2 instance hosting dagster being run on docker. The big question is how are you extracting and upserting your data from source to postgres ?

> I have this same set up, we use a dagster instance hosted locally on our network perform all our etl and then load into a remote MySQL server hosted on azure. The main reason of having them separate was so that other groups could retrieve the information for analysis more reliably. Setting up dagster as a system service works pretty well but if you download it you can get it running with their "dagster dev" environment in a couple minutes.

> I ended up using the docker images for ECS and running it on Fargate. Every time a new job runs, it starts a new task in Fargate with the amount of memory and cpu you specify. The 3 images needed for Dagster itself run on small amount of memory and cpu. It has been pretty cost effective so far.

> Same for us. We struggled with occasional ebs freezes while having dagster running on ec2 with docker. Never really found out the cause for it so pulled everything to ecs / fargate. So far so good.

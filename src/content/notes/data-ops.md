---
title: DataOps
publishDate: 2024-11-19
---

# DataOps

## Shared experience

### Real time processing

[How I built a data warehouse using Amazon Redshift and AWS services in record time](https://aws.amazon.com/tw/blogs/big-data/how-i-built-a-data-warehouse-using-amazon-redshift-and-aws-services-in-record-time/)

- Handling data feeds: AWS ECS -> Lambda + Kinesis Data Stream -> Kinesis Firehose Delivery Stream -> S3
- Analysis
  - S3 -> Amazon Athena -> Amazon Quicksight
  - S3 -> AWS Data Pipeline -> EMR -> Redshift -> Amazon Quicksight

### Amazon EMR vs Amazon Redshift

[discussion](https://stackoverflow.com/questions/57174597/amazon-emr-vs-amazon-redshift) [blog](https://medium.com/@omidvd/when-should-we-use-emr-and-when-should-we-use-redshift-emr-vs-redshift-7328d5a53843)

AWS Athena, AWS Batch + AWS Lambda could also be considered.

### Airflow vs AWS Step Functions

[discussion](https://www.reddit.com/r/dataengineering/comments/10ujaxk/airflow_vs_aws_step_functions/)

> One thing that Airflow has over Step Functions is the ability to continue a dag if it fails halfway through, for example, if you have 10 glue jobs in sequential order in an airflow dag, and the 5th job fails, you can continue running it from that 5th job.
>
> I also think their graphical interface across dag runs is a bit easier to track for complicated jobs compared to step functions. For example, I would have to click into each step function to see where it failed compared to airflow which provides a better operations like dashboard.
>
> Having said that, I don't think there are more added features that you can get out of step functions. Step functions can be also much cheaper to maintain since it is serverless and you pay for what you use. I personally feel that airflow has much more overhead over step functions as airflow is not serverless (step functions is) and you need to make sure your server can handle all your workloads so it's more work to manage. Step Function's new graphical interface also makes it extremely easy to create jobs faster and you can still version control the json file. I feel the learning curve for airflow is much steeper compared to step functions.
>
> Airflow is open-sourced and cloud-agnostic so it's one reason that companies may use it over orchestration-specific cloud-native services so yes it would be a more transferable skill than say step functions.

> Airflow is a more coherent target for deployment than disparate deployments on the same cloud service.
>
> What I mean by that is most orgs have a single Airflow repo where devs can find what is done where very easily, while I've seen several companies botch cloud function jobs by having spaghetti code. Obviously you can do the same spaghetti on Airflow but I just think it's much more manageable than cloud functions ever end up.
>
> Despite this, if you have few pipelines or only one staff member doing the work then cloud functions or similar service can work fine. Airflow on GCP ends up being a couple hundred a month for us so we use that anyway even though I'm the only actual DE.

> Personally, I think that most scheduling of pipelines is bad. Most of this results in a variety of problems with late-arriving data, jobs that don't get run due to downtime, jobs that have to be manually restarted when data gets reposted, etc, etc, etc. So, event-driven should be the rule rather than the exception.
>
> And AWS lambdas & step functions work better than airflow when it comes to event-driven processes.

### What are event driven alternatives to Apache Airflow?

[discussion](https://www.reddit.com/r/dataengineering/comments/x9jlqn/what_are_event_driven_alternatives_to_apache/)

> It sounds like you’re using AWS since you mentioned kinesis. Standard pattern I’ve seen for this is to use a combination of SQS, lambda, step functions, and EventBridge (formerly cloudwatch events). EventBridge feeds SQS, SQS feeds lambda which can then either do the processing, kick off a step function, or route the event to another SQS queue (which kicks off another lambda and etc). You can set up timed executions with event rules in EventBridge. This all allows for a completely serverless event driven architecture

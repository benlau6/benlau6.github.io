---
title: Model Serving
publishDate: 2024-11-10
---

# Model Serving

## Idea

Save the trained model as a binary, storing it in a object store like S3, or in a local file system in the server. The server could be wrapped in a docker image storing in AWS ECR or Azure container registry, and deployed on AWS lambda, EC2, ECS, or EKS. Then load the model in the memory from S3 or disk, and serve it as a REST API. The API will take the input, preprocess it, and feed it to the model, then return the output.

## Feature stores

A feature store is a data system that acts as a central repository for all critical features that data scientists may use to train their models or serve critical applications in real-time to deliver immediate customer results. According to a suvery, feature stores need to return the features to an application performing inference in under 50ms. [ref](https://www.qwak.com/post/feature-store-vs-data-warehouse)

Feature stores are essential as they help data scientists store complex features and quickly retrieve them when required for model training. Also, ML systems in production require access to relevant features to serve customers. For example, a recommendation system needs access to the latest feature set that tells crucial customer behavior information. Computing the features manually every time a customer uses the application will result in poor service as it will take time to recalculate everything from scratch. The ML application can quickly access the feature values with a feature store and provide relevant recommendations in minimal time.

There are online and online inference. And there are online and offline store respectively. To serve for online inference which need instantaneous response, i.e. low latency, a database with quick loading time is needed. There are few examples [ref](https://www.youtube.com/watch?v=osxzKxiznm4):

- Cassandra: Uber, Booking.com, ViuTV
- Redis: Doordash
- DynamoDB: Amazon Sagemaker
- AWS RDS and Aurora: Databricks

To summarize, KV stores perform at very high load with low latency, and will outperform standard relational DB for standard feature store queries.

### Resources

- [Practitioner’s guide for using Cassandra as a real-time feature store](https://planetcassandra.org/post/practitioners-guide-for-using-cassandra-as-a-real-time-feature-store/) - Good read
- [Apply() Meetup | How to choose the right online store for your ML features.](https://www.youtube.com/watch?v=osxzKxiznm4) - Redis is cheap, able to serve very high scale use cases and very low tail latency.
- [How PayU uses Amazon Keyspaces (for Apache Cassandra) as a feature store](https://aws.amazon.com/blogs/database/how-payu-uses-amazon-keyspaces-for-apache-cassandra-as-a-feature-store/)
- [Apache Cassandra: The Database that Helps Uber and Apple De-risk Their AI Projects](https://hackernoon.com/apache-cassandra-the-database-that-helps-uber-and-apple-de-risk-their-ai-projects)

## Vector stores

While both vector databases and feature stores can store and serve high-dimensional data, the main difference is their focus and use case. Vector databases are designed for efficient similarity search, while feature stores are designed for feature management and sharing across different applications and teams. [ref](https://securemachinery.com/2023/04/08/feature-vectors-embeddings-vector-databases-feature-stores/)

## Scalability

### AWS

Wrap the model as a REST API using FastAPI and dockerize it. Then deploy it on AWS using the following services:

1. API Gateway + Lambda: Serverless thus cheapest, but has a cold start issue.
2. ECS + Fargate (simple platform managed workers, service auto scaling) or EC2 instances (complex self-managed workers, cluster auto scaling): Normally if we use ECS, we use Fargate, so we can seamlessly scale without worrying about the underlying infrastructure. On other other hand, using EC2 instances, we predefined the number of instances and the cluster will scale up or down based on the predefined number of instances according to some metrics, e.g. CPU utilization.
3. EKS: Kubernetes, self-managed clusters, most complex but most flexible, and transferable to other cloud providers. A team with strong K8s experience but no AWS experience might work on this way much faster.
4. EC2 + Auto Scaling group + Load balancer: EC2 Auto Scaling groups are not designed for containerization. You have to run docker inside the EC2 instances. It is not recommended to use this approach. Just use ECS.

Note that all servers should be behind a load balancer to distribute the load, and the combination of API Gateway and Lambda is mimicking this behavior.

## Case studies

- [The Spark-to-Ray Migration That Will Save Amazon $100M+ Per Year](https://www.bigdatawire.com/2024/07/30/the-spark-to-ray-migration-that-will-save-amazon-100m-per-year/)

## How to serve python ml models if the backend is not written in Python?

- Find a binding library that can be used in the backend language to call the trained models.
- Shared memory IPC: only way without performance penalty. But it is not independently scalable.
- Bash script: Wrap the Python script as a binary and call it from the backend. But it is not independently scalable.
- API call: Build a python API only for serving, such that the serving servers could be independently scaled.
  - RestAPI: FastAPI light weight server
  - [gRPC](https://aws.amazon.com/compare/the-difference-between-grpc-and-rest/?nc1=h_ls): a high performance protocol to call between a client and server on different machines over TCP, while it can also ultilize IPC for local processes communication within the same machine for less overhead and faster transfer speeds.
- Message queue: Kafka, RabbitMQ, etc., produce tasks to queue and let other micro-services consume the tasks. Note that it has a large performance penalty due to multiple TCP sessions involved.

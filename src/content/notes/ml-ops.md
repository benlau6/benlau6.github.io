---
title: ML Ops
publishDate: 2024-11-12
---

# ML Ops

## Resources

- [DataTalksClub/mlops-zoomcamp@github](https://github.com/DataTalksClub/mlops-zoomcamp) - highest stars, end to end hands on project
- [Andrew Ng - Machine Learning in Production](https://www.deeplearning.ai/courses/machine-learning-in-production/) - High level, conceptual
- [MLSys-NYU-2022@github] - Hands on, in depth tutorial
- [hands-on-train-and-deploy-ml@github](https://github.com/Paulescu/hands-on-train-and-deploy-ml) - new
- [Real-time Clickstream Anomaly Detection with Amazon Kinesis Analytics](https://aws.amazon.com/tw/blogs/big-data/real-time-clickstream-anomaly-detection-with-amazon-kinesis-analytics/)

## End-to-end

- [MLOps Automation with SageMaker Projects](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-projects.html): Data preparation, feature engineering, training, evaluation, deployment, monitoring and updating

## Orchestration

- [Airflow](https://airflow.apache.org/) - A platform to programmatically author, schedule and monitor workflows, not designed for ML.
- Dagster - Newer than Airflow, not designed for ML.
- Flyte - ML specific
- [Metaflow](https://github.com/Netflix/metaflow) - ML specific, newer than Kubeflow
- [Kubeflow](https://www.kubeflow.org/) - The machine learning toolkit for Kubernetes, decent but huge cost of needing a K8s team.

## Serving

- Ray Serve
- Triton Inference Server

## Monitoring

- [MLflow](https://mlflow.org/) - For experiment tracking, model artifacts management, and serving. Should be integrated with orchestration tools.

## Case Studies

- [Real-world ML and LLM systems](https://www.evidentlyai.com/ml-system-design)
- [A guide to ML model serving](https://ubuntu.com/blog/guide-to-ml-model-serving)
- [How to Quickly and Easily Package, Deploy, and Serve ML Models to Edge Devices.](https://techcommunity.microsoft.com/blog/startupsatmicrosoftblog/how-to-quickly-and-easily-package-deploy-and-serve-ml-models-to-edge-devices-/4036827https://techcommunity.microsoft.com/blog/startupsatmicrosoftblog/how-to-quickly-and-easily-package-deploy-and-serve-ml-models-to-edge-devices-/4036827)

### Reddit

[Evolving Reddit’s ML Model Deployment and Serving Architecture](https://www.reddit.com/r/RedditEng/comments/q14tsw/evolving_reddits_ml_model_deployment_and_serving/)

### Sometimes online learning does not need to be updated in real time

[Machine learning is going real-time](https://huyenchip.com/2020/12/27/real-time-machine-learning.html)

> this is too dogmatic and not realistic to the real world. it's negative ROI in virtually all applications.
>
> i've built bandit models that recalculated the explore/exploit path on literally every single test and it's just wasteful computations. it's just objectively better to have a reindex on some threshold, usually some number of iterations on a unit time.
>
> i've built even more models that had partial layer deployment via javascript that's stored on a CDN with 24+ hour caching. basically, there are a large portion of layers that do not need a server request for optimal results for most cases. when it came to real-world outcome performance, my shit tier split layer model on a CDN destroyed everyone else's in the test, and the fully "tier 2 real-time" models performed the worst.
>
> maybe in HFT, where the state space is changing in near infinite dimensions all the time, sure. but in most applications, nope. definitely not.

## Data Versioning

[discussion](https://www.reddit.com/r/MachineLearning/comments/mrb096/discussion_should_i_be_using_dvc_data_version/)

> I don't like data versioning (and I'm not referring to DVC in particular), I generally consider it a bad practice (with some exceptions under very particular circumstances). Any pipeline intermediate files should be considered ephemeral: if anyone comes and deletes everything but my raw data, I should be able to re-generate all outputs by checking out a commit and running the pipeline again. Keeping track of each output version won't provide any value.
>
> I've seen people advocate for data versioning to facilitate data sharing, but the only data that you should share is raw data. Any processed dataset whose origin is unknown should not be used for any downstream tasks (such as training a model) because there is no way to reproduce it from raw data.
>
> I think by now I've heard all arguments in favor of data versioning for ML but I still don't buy it.

> Yes, I also don't see what you would want to version data in common circumstances. There is immutable raw data and there is ephemeral intermediate data during the pipeline run. There no such thing as data version.
>
> And if you want to share or backup data, use the right tool for it: a network drive, a backup system etc.
>
> However, there are specific cases where you do manual data editing (annotation, labeling?) In that case, some versioning may be useful. Unless the manual labeling creates so little data that it can be stored in git.

### Tools

- [DVC](https://dvc.org/) - Git for data
- LakeFS

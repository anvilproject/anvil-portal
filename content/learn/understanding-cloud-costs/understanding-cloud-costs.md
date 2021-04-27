---
title: "Understanding Cloud Costs"
author: "AnVIL"
description: "Understanding Cloud Costs in  AnVIL."
---

# Understanding Cloud Costs

AnVIL and all of its components are free to use. You can browse showcase workspaces and the Data Library as soon as you register for an account.

Compute operations, however, such as running workflows, running Jupyter Notebooks, and accessing and storing data, may incur Google Cloud Platform charges. 

This section provides an overview of the types of charges along with links to current GCP pricing. We also link to Terra articles describing approaches for monitoring and controlling cloud costs.

<hero> For additional detail see Terra's [Controlling Cloud Costs](https://support.terra.bio/hc/en-us/sections/360006459511-Controlling-Cloud-costs) documentation. </hero>

### Types of GCP Charges

#### Compute
Cost for Computing is driven by your particular CPU and memory requirements. For more information including current compute pricing see, [Google Cloud
Compute Pricing](https://cloud.google.com/compute/all-pricing#top_of_page).

#### Storage
Cost for storage is driven by the amount of data you store, and the length of time you wish to store the data.
For more information and current pricing see [Google Cloud Storage Pricing](https://cloud.google.com/storage/pricing#storage-pricing)
and [Google Cloud Local SSD Pricing](https://cloud.google.com/compute/all-pricing#localssdpricing).

#### Network Usage (Egress)
Egress applies to data being transferred out of a Cloud resource. In this context, a Cloud resource
refers to a set of computers in a particular region. This would apply, for example, if you transferred data from Google’s East Coast computers to Amazon’s West Coast computers.

In general, while it’s free to upload data to the Cloud, you will incur costs when downloading data to your local computer or between Cloud regions. For more information see [Google Cloud Network Pricing](https://cloud.google.
com/storage/pricing#network-egress).

## Additional Cloud Cost Articles

- [Understanding and controlling Cloud costs](https://support.terra.bio/hc/en-us/articles/360029748111-Understanding-and-controlling-Cloud-costs) - This article provides information on the costs of using key cloud services (Google Cloud Storage, Google Computer Engine, and Google BigQuery) and examples to help you make informed decisions around controlling costs on Terra.

- [Controlling Cloud costs - sample use cases](https://support.terra.bio/hc/en-us/articles/360029772212-Controlling-Cloud-costs-sample-use-cases) - This article examines some uses cases and provides a framework for their costs. Specific costs will vary based on software versions, data sizes, storage and access locations. 

- [How much did a workflow cost?](https://support.terra.bio/hc/en-us/articles/360037862771-How-much-did-a-workflow-cost) - Executing jobs on the cloud can be frightening when you don't know how much you're spending. This article explains ways to view the cost of an executed workflow to give you the peace of mind that you're not going over a projected goal.. 

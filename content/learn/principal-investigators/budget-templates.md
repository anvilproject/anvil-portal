---
title: "Setting up Lab Accounts in AnVIL"
author: "AnVIL"
description: "An overview of best practices for account setup in AnVIL to effectively track and control cloud costs."
---

>Status: PLEASE REVIEW See the backing [Google Doc](https://docs.google.com/document/d/1xKY6UY9wBkFb-fJbv7kRyTPwbGl0y1yRCVbWo1hAfvc/edit) to comment or suggest.


# Preparing a Cloud Cost Budget Justification

This document walks you through creating a budget justification paragraph for a grant proposal.

## Understanding GCP Fees

Google Cloud Platform charges fees for:

1. **Storage** - Storing data in Google Storage buckets or persistent disk associated with running or stopped Cloud Environments. Costs for Storage are driven by the amount of data and the length of time to store the data. For current pricing and more information, see [Cloud Storage Pricing](https://cloud.google.com/storage/pricing#storage-pricing) and [Local SSD Pricing](https://cloud.google.com/compute/all-pricing#localssdpricing).


1. **Egress** - Downloading data from Google Storage and data transfer between cloud regions. Costs for Egress are driven by the amount of data being transferred out of a Cloud resource. See [Network Egress](https://cloud.google.com/storage/pricing#network-egress) for current pricing and more information.

1. **Computing** - Compute costs are driven by CPU and memory usage. See [Standard Machine Types](https://cloud.google.com/compute/all-pricing#n1_standard_machine_types) for more information and current pricing.


<hero> For more information and a broader overview of cloud costs, see [Understanding Cloud Costs](/learn/introduction/understanding-cloud-costs). </hero>


## Estimating your Cloud Costs
To estimate your costs, use the [AnVIL Cost Estimator](https://docs.google.com/spreadsheets/d/1GUN93HDRqDbZ0uktaZjoP-y8Ril1T_VIJnQrjRD6tV4) Google Sheet to calculate costs for computing, storage, and network usage (egress) for your grant proposal.


## Preparing a Budget Justification
To prepare a budget justification, you can use the template Google Doc [AnVIL
Budget Justification](https://docs.google.com/document/d/145JFLn2hviLmaYF-mO06gbCkG0i4HRaWvkUBKORo85Y) as a guide to creating a budget justification paragraph
for your proposal by including the information highlighted in pink (mostly
copying entries from your AnVIL Cost Estimator Google Sheet).

Be sure to check that the prices are up to date by using the links listed below
or in the AnVIL Cost Estimator.

### Budget Justification Example Text

An example budget justification is given below. For a Google Doc version of the example, see [AnVIL
Budget Justification Example](https://docs.google.com/document/d/1qMZNvZig7vNXposBxA77AIASY0gDCwaYwGl2YwzHXuY).

#### Example

**AnVIL Data Storage** - We anticipate collecting and storing genotype data on between 100,000 individuals representing a maximum of 10 TB of storage. These data will be stored on the AnVIL system for distribution and analysis through the AnVIL projects consortium data management. These data are hosted on Google Cloud Platform, and their storage will be governed under consortia data storage agreements arranged through the NHGRI and will not be charged to this grant.

**AnVIL Temporary Data Storage** - We anticipate that up to 4 TB of intermediate processed files, results, figures, and analysis products will be stored at any given time. Based on current Google Cloud Storage Pricing for single region storage (accessed 12/01/2020), the cost for this storage will be $81.92 per month for a total of $983.04 per year in storage costs.

**AnVIL Batch Processing Costs** - The AnVIL supports batch workflows of genetic and genomic data. To support this activity, we are budgeting committed usage of one n1-standard-4 instance consisting of 4 vCPUs and 15 GB of RAM with 375 GB of attached SSD storage for the entire year. Based on current Google Cloud Compute Pricing (accessed 12/01/2020) the cost for this interactive computing will be $127.09 per month for a total of $1,525.08 per year in compute costs.

**AnVIL Interactive Analysis Costs** -  The AnVIL supports interactive analysis of genetic and genomic data. We are budgeting the equivalent of one analyst working full time (5 days a week, 8 hours a day) on interactive analysis. To support this activity, we estimate 174 hours of compute time per month on n1-standard-8 instances consisting of 8 vCPUs and 30 GB of RAM with 375 GB of attached SSD storage. Based on current Google Cloud Compute Pricing (accessed 12/01/2020) the cost for this interactive computing will be $96.12 per month for a total of $1,153.44 per year in compute costs.

**AnVIL Egress Fees** - The AnVIL is hosted on Google Cloud Platform and we anticipate that some of the intermediate data files and summary statistics will require egress each year to local compute infrastructure. We anticipate up to 2 TB in data egress per year for the proposal. This may include both within network egress for analysis purposes and out of Google Cloud Platform egress for researchers to perform analysis on their own systems. Based on current Google Cloud Compute Pricing (accessed 12/01/2020) the cost for egress will be $2,826.24 per year.

**Contingency Storage/Compute** -  Estimates for cloud computing costs are based on current market prices, AnVIL infrastructure under the current configuration, and ongoing support from the NHGRI. We are budgeting a further $10,000 per year in contingency costs should we need to store the data on a secondary platform and in anticipation of additional compute needs for the project.







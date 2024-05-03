---
author: "AnVIL"
date: "2024-04-15"
description: "AnVIL, a leading cloud-native platform for biomedical data storage and analysis, offers features that use infrastructure on both Google Cloud Platform (GCP) and Microsoft Azure. AnVIL on Azure is in active development, and we expect to share updates as additional functionality and optimizations are released."
featured: true
title: "Comparing the NHGRI AnVIL Platform Offerings on Google Cloud Platform (GCP) and Microsoft Azure"
---

# Comparing the NHGRI AnVIL Platform Offerings on Google Cloud Platform (GCP) and Microsoft Azure

## Introduction

AnVIL, a leading cloud-native platform for biomedical data storage and analysis, offers features that use infrastructure on both Google Cloud Platform (GCP) and Microsoft Azure. AnVIL on Azure is in active development, and we expect to share updates as additional functionality and optimizations are released. Most of the features of AnVIL will be very similar or identical between GCP and Azure, especially the ability to run interactive analyses or large-scale workflows in a secure collaborative environment. However, there are a few important differences in the features and services the two cloud environments provide. This comparison aims to explore some differences users can expect when choosing a cloud-service provider when using the AnVIL platform.

For new users to AnVIL, you can learn more about the platform and its offerings at [anvilproject.org/learn](/learn). If you have any questions, feel free to engage with us at [help.anvilproject.org](https://help.anvilproject.org/). 

|Offering|GCP|Azure|
|---|:---:|:---:|
| Access cloud resources within AnVIL’s **FedRAMP-certified security perimeter** | X | X |
| <ul><li> **Additional Security Monitoring** on workspaces to enable working with controlled-access data</li><ul> | X | X |
| <ul><li> **Data Access Controls** inherited by workspaces to ensure only authorized users can access controlled-access data</li><ul> | Q2 2024 Interim: Authorization Domains | X |
| Access to **AnVIL’s data corpus** (BAMs, CRAMs, metadata) | `✝` | Q2 2024 |
| Access to **Terra-owned shared central services** for workflow submission and execution and data tables (reduced user expenses) | X | See free tier |
| **User-owned central services** for workflow submission and execution and data tables allow for shorter wait times for scheduled tasks, improved data table functionality and control of data residence (greater user expenses) | Long-term roadmap (2025+) | X |
| Access to **batch computing and interactive analyses** | X | X |
| <ul><li> Use of **custom VM images and VM image repositories for interactive analysis** </li></ul> | X | Long-term roadmap (2025+) |
| <ul><li> Run large-scale workflows using **WDL**, including GATK, STAR/RSEM, CellRanger and thousands more </li></ul> | X | X |
| <ul><li> Access to **Jupyter Notebooks**, a notebook-based interactive analysis environment that supports code in R and python </li></ul> | X | X |
| <ul><li> Access to **Bioconductor**, an extensive suite of R packages for data analysis </li></ul> | X | Coming Soon |
| <ul><li> Access to **Galaxy**, an interactive and robust point-and-click platform for data exploration and analysis with tools and workflows </li></ul> | X | Coming Soon |
| <ul><li> Access to publicly shared workflows in **Dockstore** </li></ul> | X | X |
| <ul><li> Access to the **AnVIL API Library** that enables interaction with AnVIL analyses and workflows through the command line interface </li></ul> | X | Long-term roadmap (2025+) |
| <ul><li> Interaction with data tables via an **API client library** </li></ul> | X | X |
| <ul><li> Access to **seqr**, a suite of tools for rare disease genomics </li></ul> | X | ‡ |
| Data submission | | |
| <ul><li> Approved datasets ingested and included in AnVIL’s data corpus </li></ul> | # | X |
| Roadmap | | |
| <ul><li> Nextflow Support </li></ul> | Long-term roadmap (2025+) | Q4 2025 |
| <ul><li> Free Tier </li></ul> | Long-term roadmap (2025+) | Long-term roadmap (2025+) |
| <ul><li> Advanced data table functionality </li></ul> | Long-term roadmap (2025+) | Q4 2024 |

X Full functionality is currently available.

`✝` A reduced subset of AnVIL’s data corpus will remain available on GCP after August 2024.

‡ Plans for AnVIL users to access seqr on Azure are under consideration. Please see below for more 
Information.

\# New data submissions will occur on Azure only.

## Offerings

### What is a FedRAMP-certified security perimeter?

The AnVIL analysis environment and stored data are secured in accordance with the industry best practices, the NIST 800-53 Moderate security controls following the FedRAMP standard. Please be aware that users of AnVIL on Azure will need to cover the additional infrastructure costs associated with logging as per the FedRAMP standard, which may result in notable additional expenses in certain instances. 

Learn more on how to [host FISMA data on FedRAMP moderate Terra Azure](https://support.terra.bio/hc/en-us/articles/21329019108635-Host-FISMA-data-on-FedRAMP-moderate-Terra-Azure).

AnVIL also supports sharing of clinical research data and HIPAA compliance, when required. As needed, relevant parties will execute Business Associate Agreements and must follow Good Clinical Practice guidelines to protect patient privacy.

Learn more about [AnVIL’s Data Security, Management, and Access Procedures](/faq/data-security).

### What is AnVIL’s data corpus?

AnVIL is the primary NIH-designated repository for NHGRI-funded data, metadata, and associated documentation. NHGRI-funded investigators may submit to AnVIL to fulfill the expectations of the NIH Genomic Data Sharing Policy ([NOT-OD-14-124](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-14-124.html)) and the Final NIH Policy for Data Management and Sharing ([NOT-OD-21-013](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-21-013.html)). A number of high-value open-access datasets remain available on GCP, which are still being identified. NHGRI controlled-access data will reside in the Microsoft Azure platform. 

- Read about [AnVIL as an NIH-designated repository (NOT-HG-24-020)](https://grants.nih.gov/grants/guide/notice-files/NOT-HG-24-020.html).
- Discover datasets stored in AnVIL with the [AnVIL Data Explorer](https://explore.anvilproject.org/datasets).
- Learn [how to apply for access to NHGRI controlled-access datasets](/learn/accessing-data/requesting-data-access).

### What are Terra-owned shared central services compared to user-owned central services?

With the varying architectures of cloud platforms, the Terra infrastructure will be managed differently on GCP and on Azure. For [Terra on GCP](https://support.terra.bio/hc/en-us/sections/23504885621787), users can leverage Terra-owned shared central services - meaning the cost of Terra infrastructure is sponsored by the Data Sciences Platform at the Broad Institute. For [Terra on Azure](https://support.terra.bio/hc/en-us/sections/10090806360475), Terra instances are spun up for each user behind the interface, which shifts the infrastructure run costs to the users. This enables full control of the regionality of a Terra environment and data residence. This enables AnVIL users who wish to use data that is subject to data residency laws.

### What are the costs for using the AnVIL platform?

The AnVIL platform operates in the cloud, where users incur costs for cloud storage, data egress, and computing services. While AnVIL covers the expenses related to storing its data corpus, users are responsible for the costs associated with storing their own data as well as any user-derived data from AnVIL’s data corpus.

Whether using AnVIL on Azure or GCP, users follow a 'user-pays, pass-through' model, where AnVIL manages cloud compute resources on their behalf. It's important to clarify that while AnVIL itself does not impose any fees, users are responsible for the charges levied by cloud service providers. It’s also worth mentioning that both Google Cloud and Microsoft Azure require separate billing setups in order to access and utilize their services. Additionally, please note that AnVIL’s Azure users are accountable for cloud infrastructure expenses.

A number of resources are available to users to help understand potential costs for working on the cloud.
- [Preparing a Cloud Cost Budget Justification](/learn/investigators/budget-templates)

For more information on costs and billing on GCP, read more here: 
- [Overview: Costs and billing (GCP) from Terra Support](https://support.terra.bio/hc/en-us/articles/6123082826651-Overview-Costs-and-billing-in-Terra)
- [AnVIL on GCP Data Storage & Egress Cost Estimate Calculator](https://docs.google.com/spreadsheets/d/15jvXVymmjWp6m0FhlVXGQlOjDMNAcY1XSUC4pa4kuNM/edit#gid=883296657)
- [Create, edit, or delete budgets and budget alerts (Google Support)](https://cloud.google.com/billing/docs/how-to/budgets)

For more information on costs and billing on Azure, read more here: 
- [Overview: Costs and billing (Azure) from Terra Support](https://support.terra.bio/hc/en-us/articles/12029087819291-Overview-Costs-and-billing-Azure)
- [AnVIL on Azure Data Storage & Egress Cost Estimate Calculator](https://docs.google.com/spreadsheets/d/15jvXVymmjWp6m0FhlVXGQlOjDMNAcY1XSUC4pa4kuNM/edit#gid=1519041783)
- [Managing Cloud Costs on Azure from Terra Support](https://support.terra.bio/hc/en-us/sections/10090961589403-Managing-Cloud-Costs)

Creating accounts and connecting funding resources to either Google Cloud Platform or Microsoft Azure requires working with a cloud reseller. Researchers may also consider connecting with NIH STRIDES to leverage discounts on cloud costs.

### What does AnVIL offer for batch computing with workflows and interactive analysis?

AnVIL enables researchers to have access to various analysis tools. Batch computing options support running automated tools and workflows over many datasets, while interactive analyses allow step-wise and exploratory analyses in an interface that supports data exploration and visualization. 

Learn more about [AnVIL’s platform components](/overview#platform-components).

### What VM custom images can I use with AnVIL?

Software engineers and genomic analysts rely on docker images to simplify app deployment, make sharing easy, and ensure consistent behavior across environments. Today, AnVIL users can specify custom docker images in workflow scripts in both AnVIL on Azure and AnVIL on GCP. Although custom images can be specified in Jupyter Notebook environments in AnVIL on GCP, the equivalent functionality in AnVIL on Azure is currently deferred.

### Where can I develop workflows, or from where can I bring in workflows?

AnVIL supports running workflows written in the Workflow Description Language (WDL) via the Cromwell workflow engine and Galaxy workflows run in Galaxy on AnVIL. AnVIL on both GCP and Azure supports integration with Dockstore, a repository for published and shared workflows in WDL and Galaxy workflow formats.

AnVIL supports access to workflows in public GitHub repositories in both GCP and Azure cloud.

### Where can I run the seqr tool?

AnVIL provides access to a software platform called [seqr](https://seqr.broadinstitute.org/), which was designed for family-based analysis of rare disease exome and genome data. Although seqr has been deployed by Microsoft on Azure in a test environment, the primary instance of seqr is currently only available for use on AnVIL on GCP. If a user has data on Azure, the seqr team recommends that users move the single joint called VCF into a GCP bucket for seqr analysis (the data should be on the order of GBs). Doing so requires billing accounts on both GCP and Azure.

---
title: "Overview FAQ"
author: "AnVIL"
description: "What is AnVIL? What is an AnVIL Workspace? What is Terra and how does it relate to AnVIL?"
---

# Overview

## What is an AnVIL Workspace?

An AnVIL workspace is a stand-alone computational sandbox that provides a secure collaborative place to organize data, run and monitor analysis pipelines, and perform interactive analysis using applications such as Jupyter Notebooks. Each Workspace is associated with one GCP billing account that is charged for all compute, egress, and storage costs incurred within the Workspace.

## What is Terra and how does it relate to AnVIL?

[Terra](https://anvil.terra.bio/) is the compute engine of AnVIL. Terra is a secure and scalable platform for biomedical researchers to access data, run analysis tools, and collaborate easily with others. Terra operates on Google Cloud Platform and all costs incurred by the user are billed directly to the user, providing users control to fully manage their resources.

Terra is the analysis unit of AnVIL, where users can analyze, process, visualize, and share data. Terra currently offers access to Jupyter Notebooks with support for Python and R for interactive analysis and access to the Workflow Description Language (WDL) for batch processing of many samples using pipelines. Terra will soon provide access to R Studio and Galaxy to be used as interactive analysis tools.

Security is paramount to AnVIL. Any security concerns should be communicated to the AnVIL team ([help@lists.anvilproject.org](mailto:help@lists.anvilproject.org)).

## What is Gen3 and how does it relate to AnVIL?

Gen3 is the data management system of AnVIL. Gen3 enables exploring datasets with complex variables (phenotypes) associated with them and also allows creation of synthetic cohorts. In AnVIL, users will access Gen3 to explore data sets and create synthetic cohorts that can be sent to a Terra for further analysis.

## What is Dockstore and how does it relate to AnVIL?

Dockstore is the workflow repository of AnVIL. Dockstore hosts WDL workflows and supports additional workflow languages. Users can select workflows from Dockstore and make them accessible on their Terra account to user for their own analysis.


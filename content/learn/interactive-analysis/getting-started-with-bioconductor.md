---
title: "Getting Started with R / Bioconductor"
author: "Bioconductor"
description: "Guides helping R / Bioconductor users start RStudio or Jupyter for interactive analysis, and workflows for large-scale data processing."
---

# Getting Started with R / Bioconductor in AnVIL

This guide helps R / Bioconductor users:

-  Establish and familiarize themselves with essential Terra account and workspace concepts. 
-  Use RStudio and Jupyter Notebooks for interactive analysis.
-  Execute workflows for large-scale, including use of R / Bioconductor in the workflow, and management of workflows from within R.
   
The guide indicates how to discover R / Bioconductor workspaces, and how the R / Bioconductor community can contribute to AnVIL and cloud-based computation.

## AnVIL Basics

[Getting Started with AnVIL](/learn) -  Provides essential information for setting up a Terra account, billing and cost management, use of Terra workspaces, finding and accessing (public as well as protected) consortium-scale data, and running workflows and interactive analyses.

## R / Bioconductor with RStudio or Jupyter

[The RStudio Runtime](https://terra.bio/try-rstudio-in-terra/) - RStudio provides a familiar environment for using R / Bioconductor, with the advantage that RStudio is running on cloud-based resources that allow fast, secure, authenticated data access and easily scalable compute resources.

Access R / Bioconductor through Jupyter notebooks - Jupyter notebooks running an R 'kernel' provide a good way to step collaborators or trainees through an analysis.

### Terra / AnVIL concepts for R / Bioconductor users

#### Where Is My Computer?
The AnVIL runtime provides the physical machinery for computation (e.g., a 4 core CPU with 16 GB of memory) as well as local 'persistent disk' storage. Unlike a traditional computer, the compute and storage components are separate from one another. For instance, storage created with one runtime can be used with another runtime. A runtime and persistent disk belong to a single user, and can be used across workspaces.

#### Where Is My Data? 
Local persistent disks, DATA, and workspace buckets - A persistent disk contains data, scripts, packages, and output created by the user in the course of an analysis. Workspaces bring additional data.

Tabular summaries of workspace data, e.g., descriptions of participants in the study the workspace encapsulates, are presented under the DATA element, while larger data produced during an analysis may be associated with the workspace 'bucket'.

The [AnVIL package](https://bioconductor.org/packages/AnVIL) R / Bioconductor package provides a familiar interface for accessing these resources.

## Techniques for effective use of R / Bioconductor

- **Fast package installation** - Cloud-based R / Bioconductor provides three major advantages during package installation: a pre-configured system supporting most CRAN and Bioconductor packages; fast retrieval of packages from cloud-based repositories; and very fast installation of 'binary' packages that do not require source code compilation. Use the AnVIL::install() function to gain all three benefits.

- **Tools for assessing cost** - The [AnVILBilling package](https://bioconductor.org/packages/AnVILBilling) provides R / Bioconductor tools for exploring the cost of AnVIL-based computation. This complements other AnVIL facilities for assessing cost.

- **Using best practices for sharing reproducible AnVIL resources** - Start by encapsulating your contribution in an R package, with fully documented functions and vignettes for describing use. Manage the source code of your package in Git or other version control system. Then use [AnVILPublish](https://bioconductor.org/packages/AnVILPublish) to make your package content available as an AnVIL workspace for sharing and cloud-based computation.

## Workflows

- **Workflow Inputs, Execution, and Outputs** - The [AnVIL package](https://bioconductor.org/packages/AnVIL) provides commands that make working with workflows, especially workflow inputs and outputs, easy for R / Bioconductor users.

## Workshops

### Terra / AnVIL R / Bioconductor Popup Workshops

The following Terra / AnVIL R / Bioconductor Popup Workshops were held in 2021 from April to June.

- Week 1: [Using R / Bioconductor in AnVIL](/learn/data-analysts/using-r-bioconductor-in-anvil)  with Martin Morgan
- Week 2: [The R / Bioconductor AnVIL Package](/learn/data-analysts/the-r-bioconductor-anvil-package) with Martin Morgan and Nitesh Turaga
- Week 3: [Running a Workflow](/learn/data-analysts/running-a-workflow) with Martin Morgan and Kayla Interdonato
- Week 4: [Single-cell RNASeq with 'Orchestrating Single Cell Analysis' in R / Bioconductor](/learn/data-analysts/single-cell-rnaseq-with-orchestrating-single-cell-analysis-in-r-bioconductor) with Vince Carey
- Week 5: [Using AnVIL for Teaching R](/learn/data-analysts/using-anvil-for-teaching-r-bioconductor) with Levi Waldron
- Week 6: [Reproducible Research with AnVILPublish](/learn/data-analysts/reproducible-research-with-anvilpublish) with Martin Morgan
- Week 7: [Participant Stories](/learn/data-analysts/participant-stories)

[Introduction to the Terra AnVIL Cloud-based Genomics Platform](https://youtu.be/N83iDYE2yQM) by Sehyun Oh and Levi Waldron at Bioc2021

[Terra in the Classroom](https://docs.google.com/presentation/d/1AvEt6UIIx-G5eTe4hlfkGOYsUcSQrKx8ySlnnfg7XH8/edit?usp=sharing) documents the experience of running a small course utilizing AnVIL. Includes some set up, learned positives and negatives from February 2020.

## Workspaces

- **Orchestrating Single-Cell Analysis** - [use-strides/Bioconductor-Workshop-OSCA-3-12](https://app.terra.bio/#workspaces/use-strides/Bioconductor-Workshop-OSCA-3-12) demonstrates using the OSCA book.

- **RNA-seq using DESeq2** - [bioconductor-rpci-anvi/Bioconductor-Workflow-DESeq2](https://app.terra.bio/#workspaces/bioconductor-rpci-anvil/Bioconductor-Workflow-DESeq2) shows differential expression analysis of bulk RNA-seq using Bioconductor package DESeq2.

## R / Bioconductor resources

- **Participate in the R / Bioconductor Community** - Ask general questions about using Bioconductor packages on the [Bioconductor support forum](https://support.bioconductor.org). [Sign up](https://bioc-community.herokuapp.com/) to participate in the [Bioconductor community slack](https://community-bioc.slack.com) and join our #AnVIL channel for more in-depth conversations. Terra / AnVIL provides extensive support through the [support](https://support.terra.bio/hc/en-us) feature of the Terra website. 

- **Learn more about Bioconductor** - Visit [bioconductor.org](https://bioconductor.org) for available packages, learning materials, events, and getting involved with Bioconductor.

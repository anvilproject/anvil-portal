---
title: "Getting Started with AnVIL"
author: "AnVIL"
description: "Guides helping users navigate their way through creating an account, linking billing credentials, interacting with Workspaces, and performing analysis."
---

# Getting Started with AnVIL

## Account Setup

- [Set up a Terra account](https://support.terra.bio/hc/en-us/articles/360028235911-How-to-register-for-a-Terra-account) - To register for a [Terra](https://anvil.terra.bio/#workspaces) account, you will need a Gmail account or another email account (an institutional email, for example) associated with a Google identity.

- [Set up Terra account with non-Google email](https://support.terra.bio/hc/en-us/articles/360029186611-Setting-up-a-Google-account-with-a-non-Google-email) - If your email is not associated with a Google identity, follow these steps to create a Google account that is associated with your non-Gmail, institutional email address.

- [Optionally set up a Gen3 account](https://gen3.theanvil.io/login) Create a Gen3 account by logging in with your NIH, Google, or RAS login credentials. This allows you to use the Gen3 data explorer to create artificial cohorts over AnVIL datasets that have been indexed by Gen3.

- [Link your Gen3 and Terra accounts](https://support.terra.bio/hc/en-us/articles/360050390451) - Follow these step-by-step instructions to link your Gen3 credentials to your Terra account. This allows you to analyze Gen3 data on Terra.

- [Link your Terra and eRA Commons ID](https://support.terra.bio/hc/en-us/articles/360038086332-Linking-Terra-to-External-Servers) - To use controlled-access data on Terra, you will need to link your Terra user ID to your authorization account (such as a dbGaP account). Linking to external servers will allow Terra to automatically determine if you can access controlled datasets hosted in Terra (ex. TCGA, TOPMed, etc.) based on your approved dbGaP applications. 

## Billing

- [Link your Terra identity with Google Billing](https://support.terra.bio/hc/en-us/articles/360026182251-How-to-set-up-billing-projects-and-Google-Billing-Accounts) - The Terra platform is free to use; you can browse showcase workspaces and the Data Library as soon as you register for an account. However operations in Terra - such as running workflows, running Jupyter Notebooks, and accessing and storing data - may incur Google Cloud Platform charges. These charges are billed by GCP and paid through your Terra billing account.

- [Controlling cloud costs](https://support.terra.bio/hc/en-us/sections/360006459511-Controlling-Cloud-costs) - Understand the costs of using key cloud services (Google Cloud Storage, Google Computer Engine, and Google BigQuery). Examples are provided to help you make informed decisions around controlling costs on Terra.


## Using Terra Workspaces

- [Working with workspaces](https://support.terra.bio/hc/en-us/articles/360024743371-Working-with-workspaces) -Terra workspaces  are dedicated spaces where you and your collaborators can access and organize the same data and tools and run analyses together.

- [Cloning a workspace](https://support.terra.bio/hc/en-us/articles/360026130851-How-to-clone-a-workspace) - "Cloning" a workspace makes another copy of the workspace under your own billing project. Cloning creates a completely independent copy of the workspace in which you are the owner and sole user until you choose to "share" your "clone" with someone else.


- [Understanding workspace access levels](https://support.terra.bio/hc/en-us/articles/360025851892-Reader-writer-or-owner-Workspace-access-controls-explained) - Terra workspaces have three access levels: READER, WRITER, and OWNER. Each access level represents an expanded set of permissions.

- [Exploring curated example workspaces](https://support.terra.bio/hc/en-us/articles/360028967111-Start-with-curated-sample-workspaces-for-a-variety-of-use-cases) - One of the best ways to get started in AnVIL is to explore curated example workspaces. These are curated workspace templates that span a variety of use cases.  Standardized for completeness and ease of use, they're great as templates or introductions to help reproduce instructive results and learn established methodologies. Also see AnVIL's [featured example workspaces](/learn/getting-started/using-example-workspaces).

## Finding and Accessing Datasets
- [Discovering datasets](/data) - Datasets of interest can be discovered in [AnVIL’s dataset catalog](/data), the [Gen3 Data Explorer](https://gen3.theanvil.io/) and by reviewing data-focused workspaces available to you once you are logged into Terra.

- [Requsting dataset access](/learn/accessing-data/requesting-data-access) - AnVIL's open access datasets are accessible to all upon logging into [Terra](https://anvil.terra.bio/#workspaces)  or [Gen3](https://gen3.theanvil.io). To request access for datasets with access restrictions, see AnVIL's guides for requesting access to [Controlled Access](#accessing-controlled-access-data) and [Consortium Access](#accessing-consortium-access-data) datasets. 

- [Once your access is approved](/learn/accessing-data/requesting-data-access#once-your-access-is-granted) - the workspaces associated with your new datasets will be listed on your Terra workspaces tab.  [Clone](https://support.terra.bio/hc/en-us/articles/360026130851-How-to-clone-a-workspace) the workspace to begin working with the dataset.

## Running Analyses

- [Running GATK workflows](https://support.terra.bio/hc/en-us/articles/360029034232-Getting-started-with-GATK-workflows-in-the-cloud-FAQs) - If you're new to running GATK on a cloud-based platform, or new to Terra, this information will help get you started. From pre-processing raw sequencing data through variant calling and joint calling, showcase workspaces provide fully reproducible workflows for  critical use-cases and include extensive documentation and sample data to practice on.

- [Interactive analysis with Jupyter notebooks](https://support.terra.bio/hc/en-us/articles/360024898671-Interactive-analysis-with-Jupyter-notebooks) - Jupyter notebooks are an open-source analysis environment where you can visualize and analyze  data in real time to gain insight into study data. Import data including processed genomics, phenotype and transcriptomics data stored in the cloud and analyze with custom or pre-built libraries using R or Python.

- [Visualizing genomic data with IGV](https://support.terra.bio/hc/en-us/articles/360029654831-Viewing-IGV-tracks-of-BAM-files-in-your-workspace-data) -This article explains three ways you can use the [Integrative Genomics Viewer](https://software.broadinstitute.org/software/igv/) (IGV) to examine tracks from BAM (.bam) files in Terra.

## General

- [Overview of Terra for new users](https://support.terra.bio/hc/en-us/sections/360006866192-New-users-overview) - An overview of the Terra platform covering account and billing setup, accessing and managing data, pipelining analysis and interactive analysis.

- [Terra training materials](https://support.terra.bio/) - A library of training materials for the Terra platform.

- [Navigating the Terra user interface](https://support.terra.bio/hc/en-us/articles/360022704371-Navigating-in-Terra) - An overview of the Terra user interface covering how to manage your profile, setup billing, manage groups, access, clone and share workspaces, access tools, data and curated workspaces.

- [Data privacy and access](https://support.terra.bio/hc/en-us/articles/360026775691-Managing-data-privacy-and-access-with-Authorization-Domains) - Because research is frequently collaborative, you need to be able to keep sensitive genomic data secure, but still easy to share. Terra was designed to help you balance these competing requirement


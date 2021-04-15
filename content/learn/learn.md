---
title: Getting Started with AnVIL"
author: "AnVIL"
description: "A guided walk-through of the  AnVIL / Terra documentation with a focus on onboarding and preparing new users to run genomic analyses in the cloud."
---

# Getting Started with AnVIL

>STATUS: WIP! See the [Google doc version](https://docs.google.com/document/d/1B9nEQWm0yww51csuB7leZKLpmeNUbVoJrWlAp5NbmiY/edit
) during refinement to comment or  suggest.


  <!--- Add links! --->

The AnVIL platform is an [NHGRI](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL) supported data commons running on the Google Cloud Platform (GCP). AnVIL enables researchers to analyze high-value open and controlled access genomic [datasets](/data) with popular analysis tools in a [secure](/overview/security) cloud computing environment.

AnVIL uses [Terra](https://anvil.terra.bio/#workspaces) as its analysis platform, [Gen3](https://gen3.theanvil.io) for data search and artificial cohort creation, and [Dockstore](https://dockstore.org/) as a repository for Docker-based genomic analysis tools and workflows.

In addition to Docker-based analysis workflows,  AnVIL supports popular interactive analysis tools such as Jupyter notebooks, Bioconductor, RStudio, and [Galaxy](https://galaxyproject.org/).

By operating in the cloud, AnVIL users can scale analyses from a single computer to thousands and securely share data, workflows, and reproducible results with collaborators and colleagues.

### About AnVIL’s Documentation
AnVIL’s training materials curate, organize, and augment existing component and tool documentation, and show how to use AnVIL’s parts together to accomplish the goals of AnVIL’s different user personas.

To complement this onboarding and introductory section, the AnVIL team is in the process of developing persona-specific guides and tutorials. For example see the guides for  data analysts, [principal investigators](/learn/principal-investigators/setting-up-lab-accounts), developers, instructors, and [data contributors](/learn/consortia/data-submission).

<!--hero>  For a full list of AnVIL guides and tutorials for each persona, see [Guides and Tutorials](/learn/guides-and-tutorials). </hero-->

  <!--- Add FAIR, add interoperability with other data commons, increased accessibility to complex data center--->

## New User Onboarding

The following is a guided walk-through of the  AnVIL / Terra documentation with a focus on onboarding and preparing new users to run genomic analyses in the cloud.

This section covers:

1. Setting up and linking user accounts.
1. Obtaining access to controlled-access data.
1. An overview of Terra workspaces.
1. An overview of cloud compute costs and setting up billing.


### Account Setup

All you need is a Google account to register with Terra and browse AnVIL’s publicly accessible workspaces.

Likewise, with a Google account, you can register with Gen3 and browse publicly accessible datasets or register with Dockstore and browse tools and workflows.

To send artificial cohorts from Gen3 to Terra, you will need to link your Gen3 and Terra accounts.

To allow your dbGaP data request approvals to flow through to Terra and Gen3,  you will need to link your eRA commons ID with both platforms.


<hero> For instructions on setting up accounts in Google, Terra, Gen3, and linking them together see  [Overview of Account Setup](/learn/account-setup/overview-of-account-setup).</hero>

### Discovering and Accessing Data

AnVIL holds genomic data for hundreds of thousands of study participants. Much of this data is controlled access.

To obtain access to controlled-access data sets, you must either be a member of a data-generating consortium with a data-sharing agreement among consortium members or have been granted access to a study through the dbGapP Data Access Request process.


Once you have been granted access, and assuming you have linked your eRA commons ID with Terra and Gen3, you will be able to see your new studies in Gen3 and new data-oriented workspaces in Terra.

AnVIL’s open-access datasets such as [1000 Genomes High Coverage 2019](https://anvil.terra.bio/#workspaces/anvil-datastorage/1000G-high-coverage-2019) can be accessed in Terra or Gen3 immediately after account creation.

For a detailed listing of available datasets searchable by disease, data type, consent type, and consortia, see AnVIL’s  [Dataset Catalog](/data).

<hero> For instructions on requesting data access see [Requesting Data Access](/learn/accessing-data/requesting-data-access) and [Discovering Data](learn/accessing-data/discovering-data).</hero>

### Overview of Terra Workspaces

In Terra, workspaces are used to configure and run analyses, and share results. Terra workspaces typically hold genomic data along with subject-level phenotypic and sample processing data and are configured with analysis tools such as notebooks and Docker images. Workspaces can also hold the output generated by running an analysis with a workspace’s associated “cloud environment”.

In general, to perform  an analysis in a workspace,  you setup the data and workflows you require, and then launch a cloud environment to execute the analysis over the data and write out the results to the workspace. You may start with a blank workspace, but typically you will start by cloning a workspace containing the data or analysis you require

#### Workspace Composition


A workspace consists of:

1. A **Dashboard** - for holding markdown documentation about the workspace.
1. A **Cloud Storage Bucket** for holding data files, notebooks, and analysis output. Typically this bucket is configured as “requester pays” meaning that users downloading from the bucket pay cloud egress fees.
1. **Data Tables** -  for holding participant or sequencing metadata. For example is it common to have a set of “Participant” tables and a set of “Sample Tables”. Participant tables hold one row per participant with phenotypic data e.g. gender, age, relevant diseases etc. Sample tables with one row per sample, typically hold information about the sample sequencing process and metadata. Sample tables also commonly hold a link to the genomic data derived from  the sample.
1. **Reference Data** - for holding links to a reference genome or other reference data such as hg38.
1. **Workspace Data** - for holding additional key-value data pairs used for configuring the workspace.
1. **Cloud Environments** -  for executing the workspace’s interactive analysis or workflows. Cloud environments may consist of a single machine or cluster of machines and be configured with various amounts of RAM and persistent disk.  Cloud environments may be in a running or stopped state. Note that even in the stopped state, cloud environments may continue to incur charges, for example, for persistent disk space allocated.
1. **Permissions**  for controlling who can view, clone, update or share a workspace and who can launch cloud environments in the workspace.
1. **A Terra Billing Project** - for specifying the Google Cloud Billing Account charged for GCP cloud compute costs incurred by the workspace. When Tera Billing Projects are created, they are linked to a Google Cloud Billing Account. When a workspace is created, it is linked with a Terra Billing Project, and thereby to a Google Cloud Billing Account.

<hero> See [Introduction to Terra](/learn/introduction/intro-to-terra) for more information and links to Terra documentation and videos about workspaces.</hero>




### Workspace Types
There are many workspaces for you to choose from when thinking about cloning a workspace to start your project. There are several types:


**Data-Oriented Workspaces** - These workspaces hold data for AnVIL open or controlled access data sets or cohorts exported from Gen3. They may contain documentation in the dashboard about the study that generated the data set and data tables holding sample and subject phenotypic metadata with links to the genomic data files.

**Analysis Oriented Workspaces** - Analysis oriented workspaces showcase a specific analysis or tool such as [Hail](https://anvil.terra.bio/#workspaces/help-gatk/Hail-Notebook-Tutorials) or [Bioconductor](https://anvil.terra.bio/#workspaces/help-gatk/Bioconductor).


**Example Workspaces** - The example workspaces,also referred to as “Featured” workspaces are educational, tutorial workspaces demonstrating collections of best practices in analysis and reproducible science. For an example see [Reproducing the paper: Variant analysis of Tetralogy of Fallot](https://app.terra.bio/#workspaces/help-gatk/Reproducibility_Case_Study_Tetralogy_of_Fallot).

<hero>For more information on the different workspace types and how they can help you get started see [Start with curated sample workspaces](https://support.terra.bio/hc/en-us/articles/360028967111-Start-with-curated-sample-workspaces-for-a-variety-of-use-cases) or [Using Example Workspaces](learn/getting-started/using-example-workspaces). </hero>

### Workspace Permissions

As mentioned above workspace permissions control if you can read, modify, or launch a workspace.

When you have access to a workspace you may be an “Owner”, “Writer” or “Reader”. You may also have “Can Share’ or “Can Compute permissions depending on your role and the permissions you were granted when the workspace was shared with you. The possible workspace permissions are listed below by role.

Role | Can Read  | Can Modify | Can Compute | Can Share
-- | -- -- | -- -- | -- -- | --
**Owner** | Yes | Yes | Yes | Yes
**Writer** | Yes | Yes | Set when shared. | Set when shared.
**Reader** | Yes | No | No | Set when shared.

If you are an Owner, Writer or Reader of a workspace, the workspace will be listed in your “Workspaces” list in terra.

**Owner** - If you created a workspace you are it’s owner and can read, modify, share and execute the workspace. When sharing with Readers, you can allow them to share with other readers. When sharing with Writers, you can allow them to execute or share with other writers and readers. Workspace owners can also change the workspaces Terra Billing Project.

**Writer** - If you have “Writer” access to a workspace you can read and modify the workspace. The person who shared the workspace with you may also have allowed you to execute or share the workspace with other readers or writers by giving you “Can Compute” or “Can Share” privileges.

**Reader** - If you have “Reader” access to a workspace you can read. The person who shared the workspace with you may also have allowed you to share the workspace with other readers by giving you “Can Share” privileges.

In general, if you can share a workspace, you can give the new user the same permissions you have or less.


> Note that workspace billing charges flow through to the workspaces Terra Billing Project and Google Cloud Billing Account regardless of which “Writer” launched the workspace’s cloud environment.

> Also, note that removing someone as a member from a Terra Billing Project will not prevent them from incurring charges on any workspace using the Terra Billing Project. If a user is a Writer with Can Execute permissions on a workspace they will be able to launch the workspace and incur compute charges even if they are not a member of the workspace’s Terra Billing Project.






### Workspaces and Cloud Costs

>Typically, GGP cloud costs are incurred for workspace data storage, or an analysis is run in the workspace.

Performing the following workspace activities will incur costs on GCP that will be passed through to the workspace’s Terra Billing Project’s Google Cloud Billing Account:

1. Uploading data to the workspace bucket - the upload network transfer or ingress is free however there will be a CGP fee for storing the data in the bucket over time.

1. Launching a Cloud Environment - The charges will depend on the type of machine and number of processors selected as well as any disk or ram space used. This is also referred to as “Launching a Workspace”.


1. Storage for persistent disk associated with any paused cloud environments.


1. Storage for notebooks as these are saved in the workspac’s Cloud Storage bucket.

To download data from a workspace’s requester pays bucket, you will need to be a member of a Terra Billing Project. At the time of download you select one of your Terra Billing Projects to pay for the egress fees.

Also note, that to clone a workspace, you must also be a member of a Terra Billing Project. This allows you to specify the Terra Billing Project to be used by the clone for any GCP charges it incurs.

<hero> See [Understanding Cloud Costs](/learn/introduction/understanding-cloud-costs) for more information about cloud costs and current GCP pricing. .</hero>

### Cloud Billing Concepts

AnVIL and all of its components are free to use, however, as  Terra runs on the Google Cloud Platform (GCP), certain workspace activities, such as running an analysis,  storing analysis results, or downloading data may incur Google Cloud Platform (GCP) fees.

>Note that not all users will need to set up billing. If you are working for a lab for example  your lab manager may add you as a member to a lab  Terra Billing Project or give you write, can execute access to your own or a shared workspace.



**Google Cloud Account** - An account on the Google Cloud Platform (GCP) created with the same Google ID (email address) you use for your Terra account.

**Google Organization** - the individual, company, or institution owning the
Google Cloud Account and who will be responsible for payment.

**Google Payments Profile** - A google resource for holding payment methods
associated with the organization.

**GCP Billing Account** - A Google Organization can have one or more billing
accounts. Each billing account operates in a single currency and can be used
to separate charges paid for by different funding sources.

**Terra Billing Project** - Terra Billing Projects are linked to a single GCP Billing Account and one or more Terra workspaces. Any GCP fees incurred by the workspace  are billed to the Google Billing Account associated with the workspace’s Terra Billing Project. The user creating the Terra Billing Project is its “owner”. Owners can add other “Owners” or other “Members”. Members can use the Terra Billing Project but not share it.

**GCP Billing Account Budget**  - You can create multiple budgets for each Google Billing Account. Each budget can specify a project, budget amount, and alerts.



### Setting up Billing as an Individual

Setting up GCP billing as an individual is a good way for all users to get started with the platform as Google funds new accounts with a $300 in free cloud cost fees. A high level overview of the account setup process is given below.

To set up GCP billing as an individual,  create a Google Cloud Account and set up a payment method. Be sure to create the Google Cloud Account using the same Google ID (email address) you use for your Terra account.

Next, create a Google Billing Account and link it to Terra by adding terra.something as a *user type*.

Then, In Terra create a Terra Billing Account and use it to create or clone workspaces and pay for any compute, storage, or egress fees.

Finally, set up a GCP Billing Account Budget and appropriate alerts.

If you plan to share your Terra Billing Project or a workspace with others be sure you ( and they) have a basic understanding of cloud costs and how cloud costs flow through to the workspace‘s and not the users Terra Billing Account.


<hero> For additional information and detailed instructions for setting up billing as an individual see  [Understanding Workspaces](/learn/understanding-workspaces). </hero>



### Setting up Billing for a Lab

Setting up cloud cost billing for a lab is similar except that you will need to plan out your account setup to aid the appropriate assignment of expenses to funding sources, and to enable cloud cost reporting, budgets and alerts to the appropriate granularity.

Budgets, and alerts are set at the Terra Billing Project level so you may end up having a Terra Billing Project per lab member and per shared workspace.

You will also want to deliberate in your planning about who can share Terra Billing Accounts and Terra workspaces with “can execute” permissions. For example you may assign a lab manager who creates workspaces for users and allows them to execute but not share the workspace.



<hero> For additional information and approaches see [Setting Up Lab Billing Accounts](/learn/principal-investigators/setting-up-lab-accounts) and [Best practices for managing shared team costs](https://support.terra.bio/hc/en-us/articles/360047235151-Best-practices-for-managing-shared-team-costs) </hero>

### Getting Help

See [Getting Help](/help) for more information on how to obtain support for AnVIL’s components and tools.



 











 





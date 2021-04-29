---
title: "Setting up Cloud Billing"
author: "AnVIL"
description: "An overview of cloud billing for Terra in AnVIL."
---

# Overview of Billing Concepts

Before setting up billing it is important to have a working knowledge of the various concepts that make up cloud billing in Terra. Key concepts are listed below along with additional Terra documentation resources.

![Key Concepts](./_images/key-concepts.png)

**Google Resources** - Google is a separate entity from the Google Cloud Platform (GCP) and it is important to understand if the resources you are configuring are Google level resources or GCP level resources. Google level resources of interest here incldue  Google IDs, Google Accounts and Google Payment Profiles.

**Google Cloud Platform Resources** -  Google Cloud Platform (GCP) level resources include GCP Billing Accounts, GCP BIlling Projects, GCP Budgets and Alerts. GCP Resources also include the machines, storage buckets and drives and other cloud compute resources you use to perform analysis.


**Google Identity** - A Google ID is a Google level resource required to create GCP and Terra accounts.  A Google ID is simply an email address. This email address must be either: a non Google email address that you have associated with a Google Account or a Gmail, Google Workspace (formerly GSuite), or Google Identity email address.

**GCP Account** - A Google Cloud Platform account or Google Cloud account is an account you create to gain access to GCP resources. You create this account with the same Google ID (email address) that you plan to use to create your Terra account so that the accounts can be linked.

**Terra Account** - A Terra account is required to access Terra resources such as Terra workspaces. You create a Terra account with the same Google ID (email address) used to create your GCP Account.

**GCP Billing Account** - GCP Billing Accounts are GCP level resources you configure to pay for cloud compute costs incurred in Terra. When you create a GCP Billing Account you may attach an existing Google Payment Method or create and attach a new one. The GCP Billing Account’s Payment Method is used to pay for cloud costs passed through to GCP Billing Account. Google Billing Accounts are also used to set cloud spending budgets and alerts.

<hero>For additional information and detail on GCP billing concepts see Google’s  [Guide to Cloud Billing Resource Organization & Access Management](https://cloud.google.com/billing/docs/onboarding-checklist) </hero>

**Linking GCP and Terra** - To enable GCP spend in Terra, you must add Terra’s Google ID  _terra-billing@terra.bio_  as a “_Billing Account User_” to a GCP Billing Account.


**Terra Billing Projects** - Terra Billing Projects are Terra level resources used to link user activity in Terra to a Google Billing Account. Once a GCP Billing Account  is linked to Terra, if you created the billing account, or have been added to the project as a _Billing Account User_,  you will be able to create Terra Billing Projects and link them to the Google Billing Account. If you created the Terra Billing Project you will be its “_Owner_” and you will be able to add other Terra users as _Meembers_ or _Owners_.

>During the creation of a Terra Billing Project, Terra creates a “twin” Google Billing Project in the Google Cloud Billing console with the same name as the Terra Billing Project. This “twin” Google Billing Project is then linked to the specified Google Billing Account. You use this twin GCP Billing Project to set up budgets and alerts in GCP.


**Creating Terra  Workspaces** - In order to create or clone workspaces or download data from workspaces with requester pays buckets, a user must be a  _Member_ of a Terra Billing Project. If you create or clone a workspace you will be the new workspaces _Owner_  and with _can-execute_ and _can-share_  privileges.

**Using Terra Workspaces** - Anyone who has Writer, “can-execute” privileges on the workspace can incur spend on behalf of the workspace’s Terra Billing Project, even if they are not a member of the Terra Billing Project or affiliated with the Google Cloud Billing Account.


**GCP Billing Account Budget**  - You can create multiple budgets for each Google Billing Account. Each budget can specify a project, budget amount, and alerts.



<hero>For additional information and detail on setting budgets and alerts in GCP see Google’s  [Set Budgets and Budget Alerts](https://cloud.google.com/billing/docs/how-to/budgets) documentation. </hero>

## Additional Billing Resources
- [Understanding costs and billing in Terra](https://support.terra.bio/hc/en-us/articles/360048632271-Understanding-costs-and-billing-in-Terra) - This article outlines what operations in Terra have a GCP cost and how you will pay for GCP charges with a Terra billing project. It also explains the billing structure (GCP and Terra), how GCP calculates and bills Terra users for charges, and how Terra Billing projects act as a pass-through to pay for the GCP costs of your work in Terra.

- [How to set up and use GCP budget alerts](https://support.terra.bio/hc/en-us/articles/360057589931-How-to-set-up-and-use-GCP-budget-alerts) - Want to keep tabs on your GCP spend for storage and compute in Terra? This article outlines what budget alerts can (and cannot) do, what permissions are needed for these actions, and step-by-step instructions for setting up budget alerts for Terra Billing projects.

- [How to disable billing on a Terra project](https://support.terra.bio/hc/en-us/articles/360048293111-How-to-disable-billing-on-a-Terra-project) - Each billing project in Terra is backed by a GCP Billing account. There may be times when you need to prevent that Terra billing project from incurring any costs moving forward. This article gives instructions on how to do that by disabling the Terra billing project.

- [Best practices for managing shared team costs](https://support.terra.bio/hc/en-us/articles/360047235151-Best-practices-for-managing-shared-team-costs) - Understanding how to control costs can be especially important (though sometimes challenging) for a team working together using a shared funding source. This article explains two ways to share funding resources (shared workspaces and shared Billing projects), depending on your collaboration needs.



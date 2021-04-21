---
title: "Understanding Billing"
author: "AnVIL"
description: "An overview of how cloud billing for Terra in AnVIL."
---

# Setting Up  Billing

>STATUS: TODO

  <!--- Add  requestor pays.--->

## Billing Concepts

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


- [Understanding costs and billing in Terra](https://support.terra.bio/hc/en-us/articles/360048632271-Understanding-costs-and-billing-in-Terra) - This article outlines what operations in Terra have a GCP cost and how you will pay for GCP charges with a Terra billing project. It also explains the billing structure (GCP and Terra), how GCP calculates and bills Terra users for charges, and how Terra Billing projects act as a pass-through to pay for the GCP costs of your work in Terra.

- [How to set up and use GCP budget alerts](https://support.terra.bio/hc/en-us/articles/360057589931-How-to-set-up-and-use-GCP-budget-alerts) - Want to keep tabs on your GCP spend for storage and compute in Terra? This article outlines what budget alerts can (and cannot) do, what permissions are needed for these actions, and step-by-step instructions for setting up budget alerts for Terra Billing projects.

- [How to disable billing on a Terra project](https://support.terra.bio/hc/en-us/articles/360048293111-How-to-disable-billing-on-a-Terra-project) - Each billing project in Terra is backed by a GCP Billing account. There may be times when you need to prevent that Terra billing project from incurring any costs moving forward. This article gives instructions on how to do that by disabling the Terra billing project.

- [Best practices for managing shared team costs](https://support.terra.bio/hc/en-us/articles/360047235151-Best-practices-for-managing-shared-team-costs) - Understanding how to control costs can be especially important (though sometimes challenging) for a team working together using a shared funding source. This article expplains two ways to share funding resources (shared workspaces and shared Billing projects), depending on your collaboration needs. 

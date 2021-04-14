---
title: "Setting up Lab Accounts in AnVIL"
author: "AnVIL"
description: "An overview of best practices for account setup in AnVIL to effectively track and control cloud costs."
---

# Setting up Lab Accounts


This guide is intended to assist PIs or Lab Managers in configuring Terra 
and Google Billing accounts to enable lab members to run analysis workflows 
in Terra.

There are many ways to configure a lab to use AnVIL. This guide presents a
that emphasizes control and const transparency for PIs and lab
managers over convenience of data analysts.


## Goals of this guide
* Provide a conceptual overview of setting up a Lab Billing in AnVIL.
* Teach key billing concepts and their relationships to each other.
* Provide step-by-step instructions to help you set up your lab in a manner 
  that emphasizes cost control, facilitates cost assignment and provides and 
  transparency in accounting.
* Capture the $300 Google getting started credits.


## Billing Overview

Terra, AnVIL's analysis platform runs in the Google Cloud Platform (GCP). 

Terra is free to use, you can browse showcase workspaces as soon as you 
register for an account. Compute operations such as running 
workflows, running Jupyter Notebooks, and accessing and storing data in Terra 
may incur Google Cloud Platform charges.

These charges are billed by GCP and paid through your Google Cloud Platform payment method.


### Key Concepts

![Key Concepts](./_images/key-concepts.png)

**Google Organization** - the individual, company, or institution owning the
Google account and who will be responsible for payment.

**Google Payments Profile** - A google resource for holding payment methods
associated with the organization.

**GCP Billing Account** - A Google Organization can have one or more billing
accounts. Each billing account operates in a single currency and can be used
to separate charges paid for by different funding sources. A GCP Billing Account can be associated with one or more GCP Billing Projects.

**GCP Billing Project** - GCP Billing Projects are associated with a
single Google Billing Account. GCP compute resources are linked to a single
GCP Billing project to assign expense and control
access. Compute charges flow through the compute resource's GCP Billing
Project to its GCP Billing Account.

**GCP Billing Account Budget**  - You can create multiple budgets for each Google Billing Account. Each budget can specify a project, budget amount, and alerts.

**Terra Billing Project** - Terra Billing Projects are linked to a single GCP Payment Account and one or more Terra workspaces. When compute is launched in a workspace, the compute charges are billed to the Google Billing Account associated with the workspace’s Terra Billing Project. When Terra Billing Project is created, its “twin” Google Billing Project is created, linking Tera to Google Billing.

**Terra Workspace** - A workspace is a Terra resource that can hold data and
analysis tools. Uploading data into a workplace, storing data in a workspace over time, and running compute from within a workspace all incur GCP charges.

## Helpful Resources

1. [Guide to Cloud Billing Resource Organization & Access Management](https://cloud.google.com/billing/docs/onboarding-checklist)
   
1. [Working With Workspaces](https://support.terra.
   bio/hc/en-us/articles/360024743371-Working-with-workspaces)


## Lab Setup Process

### Roles
This guide assumes the following roles and permissions:

1. **Lab Manager** - Will be assigned as a Terra Billing Project owner and 
   will create wrokspaces for lab members. 
1. **Lab Member** - Will be prevented from creating worksppaces and will 
   instead be assigned to one or more Terra workspaces with "Can 
   Compute" access. They wil be able to launch the workspace but not able to 
   and share the workspace, but not give other collaborators "Can Compute" 
   access to the workspace. This prevents anyone besides those assigned by 
   the Lab Manager from incurring GCP costs on behalf of the lab.

### Steps

1. Identify which Google account to use, or create one. For more information 
   see [Setting up a Terra account with a non-Google email](https://support.
   terra.bio/hc/en-us/articles/360029186611-Setting-up-a-Google-account-with
   -a-non-Google-email).
1. Create a Terra account with the email address associated with the Google 
Account. https://support.google.com/accounts/answer/27441
1. Identify how many GCP Payment Accounts will need to be created - One per 
   funding source is the recommended approach in this guide.
1. Identify or create the Payment Methods to be used for each GCP Billing 
   Account. For more information see [Create and manage your payments 
   profile](https://support.google.
   com/paymentscenter/answer/9028746?ref_topic=9017383).
1. Create the GCP Billing Accounts. For more information see [Create, modify,
   or close your Cloud Billing account](https://cloud.google.com/billing/docs/how-to/manage-billing-account#create_a_new_billing_account).
1. Add Terra as a user on each GCP Billing Account.
1. Assign a Lab Manager who will be responsible for creating all workspaces.
1. Create one or more Terra Billing Projects e.g. one per funding source or 
   one per Data Analyst. Assign the Lab Manager the ability to create workspaces under each Terra Billing Project.
1. Create budgets and alerts for GCP Billing Projects created by Terra when 
   the Terra Billing Projects were created.
1. Identify Lab Members who will be given “Can Compute” access to specific 
   workspaces and create the workspaces and assign access while preventing lab members from sharing workspaces with other users who might then incur GCP charges.



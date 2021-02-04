---
title: "Requesting Data Access"
author: "AnVIL"
description: "AnVIL is a repository for open and controlled access datasets. Dataset access is controlled in adherence to NIH Policy and in line with the standards set forth in the individual consents involved in each cohort."
---

# Requesting Data Access

<hero>AnVIL is a repository for open and controlled access datasets. Dataset access is controlled in adherence to NIH Policy and in line with the standards set forth in the individual consents involved in each cohort.</hero>


## Data Access Types
AnVIL provides three types of data access:

1. Open Access  - Open access datasets are accessible to all upon logging into [Terra](https://anvil.terra.bio/#workspaces
) or [Gen3](https://gen3.theanvil.io).
1. [Controlled Access](#accessing-controlled-access-data) - Controlled Access datasets are accessible to researchers for use matching the data's [dbGaP consent codes](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4721915/). Access is granted by the dbGaP data access process described below. 
1. [Consortium Access](#accessing-consortium-access-data) - Consortium Access datasets are accessible to consortia members under the coonsortium data sharing agreement. 


## Accessing Controlled Access Data
 
 This document intends to explain the process by which external, non-consortium members can gain access to a given cohort that is housed within the AnVIL.

### Goals
1. Inform a novice user how to link their Terra Account to their eRA Commons address.
1. Inform a novice user how to navigate to dbGaP and submit a Data Access Request (DAR).
1. Explain how the AnVIL uses dbGaP telemetry files to grant access.
1. Inform a user with a valid, approved DAR how to gain access to the data. 

### Linking Your Terra Account And Your eRA Commons Address
1. Have an eRA Commons or NIH account. Go [here](https://wiki.nci.nih.gov/display/TCGA/Application+Process) for instructions to set up an eRA Commons or NIH account.
1. Establish a link in Terra to your eRA Commons/NIH Account. To link an eRA Commons to your Terra account, go to your [Profile page](https://anvil.terra.bio/#profile) in Terra and log in with your NIH credentials. _(Note: Once per month, you will need to relink these accounts to ensure that you still have proper access)_.

### Submitting A dbGaP Data Access Request

1. **Identify the phsID of the cohort you wish to access.** A helpful list of datasets can be found on our [datasets](/data) page.
1. **Request Access.** Navigate to the dbGaP page for that study and click “Request Access” near the top of the screen.
1. **Navigate to your DAR.** Follow the prompts for dbGaP Data Download to submit a Data Access Request (DAR). Include as much information as you can, as this will help the Data Access Committee evaluate your application.
1. **Wait for a response.** Each Data Access Committee hand evaluates their own DARs. Depending on the DAC, this can take some time. You will be notified via email when your application is approved or rejected.
1. **Your access is granted!** Using telemetry files, dbGaP informs Terra which users should be given access to each dataset. For more detail, see the section on Telemetry files below.

#### Telemetry Files
Once a user has been granted access by the relevant Data Access Committee (DAC), dbGaP will list their eRA Commons ID within that cohort’s telemetry file - a secure list provided to external data sources like the AnVIL.
 
 The names on the cohort’s telemetry file are synced with the relevant workspace using a Terra Authorization Domain. Using the linkage between a user’s Terra Account and their eRA Commons ID, the system automatically grants access when the user attempts to view or access that workspace.

### Once Your Access is Granted
Once your access is granted, your data will appear as one or more workspaces on your [Terra workspaces](https://anvil.terra.bio/#workspaces) page. 

> **Can't See Your Workspace?** For your workspaces to appear in Terra, make sure you have a Terra account and your Terra account is linked with your eRA Commons or NIH account as described above. 

Once you can see your workspace(s):

* Select the workspace you are interested in.

* General information about the workspace can be found on the main workspace page.

* Tables containing phenotypic data and subject/sample information are available on the workspace's Data Tab.

* If you plan to work on the cloud, you can clone the workspace to your own billing account. Click the "three vertical dots" icon in the top right, click "Clone" and follow the prompts. 

* If you want to work with, or download the files in the command line, information about the bucket path is readily accessible on the Data Tab > Files listing (as well as a bucket path on the main page).

> Note that when cloning a workspace, any authorization domains on the source workspace will follow any clones, but you will still need to share the workspace for anyone to access it.


## Accessing Consortium Access Data

Many consortia have data sharing agreements between members granting each member access to every other member's data within the consortium.

The AnVIL is offering a streamlined access process for consortium members in data-sharing consortia.
 
The consortium bringing the data in designates a contact person, and that person is added to an access list as an access control admin for the consortia's datasets. 
 
The admin can add or remove users as their needs demand, and any users added to that list will see all the workspaces for their group.
 
 For example, someone added to the CCDG access list will be able to see all the CCDG workspaces.
 
> Note that a few cohorts are excluded from the consortium-wide-access due to data sensitivity needs.

### Participating Consortia

The following consortia currently participate in AnVIL’s consortia data sharing program: 
 
 * CCDG,
 * CMG,
 * GTEx,
 * eMERGE
 
If you are a member of a participating consortium and would like access to a consortium’s data please reach out to your consortium leadership to request access.
## Requestor Pays

* All AnVIL buckets have Requester Pays enabled, meaning that you will need to provide a billing account in order to cover any costs associated with egress, storage, or compute.

* If working in gsutil, using the -u argument will be critical to provide this billing account. 

## Troubleshooting
If you are having trouble with your access to AnVIL data, please email our help desk at  [help@lists.anvilproject.org](mailto:help@lists.anvilproject.org) and someone will reach out to you as soon as we are able.


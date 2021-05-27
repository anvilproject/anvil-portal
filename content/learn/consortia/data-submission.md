---
title: "Submitting Data"
author: "AnVIL"
description: "An overview of the AnVIL data submission process."
---

# Submitting Data


After your data set has been approved by the AnVIL data ingestion committee, these are the major steps for submitting data to the AnVIL:

1. Obtain a Terra account.
1. Contact the AnVIL data ingest team and arrange a kickoff meeting.
1. Complete the AnVIL Data Submission form.
1. Prepare field according to AnVIL format specifications
1. Submit data to the Google Cloud Platform deposit space
1. Validate submitted files using Juypter Notebook

### Prepare for AnVIL Data Submission
Prepare for AnVIL data submission according to the NIH Genomic Data Sharing Policy.

- Gather dbGaP registration ID (phsID) and consent groups
- Please contact your program officer and the NHGRI Genomic Program Administrator for assistance and/or questions about dbGaP registration and/or consent groups.
- [Register for a Terra Account](/learn/account-setup/creating-a-terra-account) if you do not have one already.

## Data Submission Process

### 1 - Contact the AnVIL Data Ingest team
- Email <anvil-data@broadinstitute.org> to arrange an AnVIL kickoff meeting.
- See <https://anvilproject.org/learn> for learning content.

### 2 - Complete the AnVIL data submission form
- Gather study information including:
- Types of data
- Consent codes
- Number of samples
- Gather submitter information (who needs access to deposit workspace). In the form, either list out emails or upload a file of people who need access.

<button-link href="https://docs.google.com/forms/d/1cJ0ujFtDv6AX1ckYLl9-d3Fb_etVc7jUWlHrrxPmg-s/edit" target="_blank">Launch AnVIL Data Submission Form</button-link>


### 3 - Deposit data into AnVIL

- Prepare data for submission. See the [Data Requirements](/learn/consortia/data-requirements) section for more information data/metadata requirements.
- AnVIL Data Ingest Team will provide deposit workspace URL
- Submitters will provide genomic files, phenotype, and metadata files
- [How to move/copy data from the local cluster or Google bucket](https://support.terra.bio/hc/en-us/articles/360024056512-Moving-data-to-from-a-workspace-or-external-Google-bucket-)
- [Register service account to move data](https://github.com/broadinstitute/firecloud-tools/tree/master/scripts/register_service_account)
- Metadata files


>Note: All submitted genomic data should be based on Human reference genome assembly GRCh37 or GRCh38.

> When submitting data to the AnVIL, please ensure your study has been registered in dbGaP. You will need to populate the data elements `dbGaP_study_ID` (phsXXXXXX).

### 4 - Review AnVIL training
- For a video introduction to Terra, see [Terra Videos](/learn/videos/terra-videos).
- For an overview of the AnVIL platform and key concepts, see [Getting Started with AnVIL](/learn) and the [Workshop Archive](/learn/workshop-archive).
- Please contact the AnVIL Outreach team with support and training requests at <help@lists.anvilproject.org>

>While there are no charges for uploading and storing your data in AnVIL, in order to complete an analysis, you will need to connect a Google Billing Account to your Terra account. See [Overview of Billing Concepts](/learn/billing-setup/billing-concepts) and [Creating a Google Cloud Billing Account](/learn/billing-setup/creating-a-google-cloud-billing-account) for more information. 






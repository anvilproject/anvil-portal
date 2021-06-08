---
title: "Ingest Data"
author: "AnVIL"
description: "An overview of the AnVIL data ingestion process."
---

# Ingest Data

> Make any changes to the [AnVIL Data Submitters - Ingesting Data - Markdown](https://docs.google.com/document/d/1khl9xQhlqwwy65W7405iE4k6aKHGj7MtR4bfFvUNEoQ/edit) Google doc.

## Overview
Data submitters will contact a designated POC at the AnVIL team to shepherd the data (genomic data files and TSV load files for data tables) into the AnVIL data storage repository.

You’ll deposit genomic data files and all TSV files into AnVIL owned bucket(s) on Google Cloud. AnVIL team members and submitting parties will work together throughout the transfer process.

For actions taken prior to final process refinement, all transfers should involve the Data Processing WG and AnVIL team to ensure data integrity during the transfer process.

## 1 -

Move files to workspace bucket

### 1 - Register service account
- [Register service account to move data](https://github.com/broadinstitute/firecloud-tools/tree/master/scripts/register_service_account)

### 2 - Install gsutil locally
> *gsutil is a Python application that lets you access Cloud Storage from the command line in a terminal. It’s more efficient than using the AnVIL UI to move large numbers and/or large files. You will need to install gsutil from the terminal on your local machine.*

**[How to install gsutil](https://cloud.google.com/sdk/docs/install)**

### 3 - Copy files
Once you have installed gsutil, run the following code in the terminal to copy files to the workspace bucket.   
`gsutil cp local directory/filename gs://fc-your-workspace-bucket-id`

You can use `*` in place of filenames to copy everything in a directory. So, for example, `cp * gs://fc-12345` will copy all files in the root directory where the terminal is running to the workspace bucket `gs://fc-12345`.

**Files to copy**
- All genomic data files
- All TSV load files in the Data Model
    - `subject.tsv`
    - `sample.tsv`
    - `sequencing.tsv`
    - `discovery.tsv`
    - `family.tsv` (optional)
    - Any additional optional tables

**For additional instructions on copying files to a workspace bucket using gsutil**, see[Moving data to or from a  workspace Google bucket](https://support.terra.bio/hc/en-us/articles/360024056512-Moving-data-to-from-a-workspace-or-external-Google-bucket-).

## Validation Steps

### Quality Assurance Monitoring
The transfer of data will be monitored and logged to ensure integrity of the transfer and be included in the Ingestion certification of analysis (see below).  This includes automated confirmation that the file transfers were successful and MD5sums are intact, performed by the GCP services at the time of transfer.

### Ingestion Validation (automated)
To confirm the ingested data transferred as expected and maintained the file integrity, Google automatically checks the md5 sum of the end file against the original after each file transfer.  These tests will be documented in the Ingestion protocol/pipeline execution plan and executed once data has been ported to AnVIL.

### Ingestion CoA
This certification of analysis (CoA) documents the transfer of data. The CoA is signed off by AnVIL and data submitting party. This document will be available along with the ingested data for public consumption.

### QC and Processing (Functional Equivalence)
The AnVIL seeks to maximize the value of AnVIL-hosted data and minimize batch effects in cross-project analyses (Regier et al., 2018). Ingested genomic data will be subject to quality control and harmonization.  CCDG and TOPMed consortia have defined a functional equivalence (FE) standard for alignment and processing of whole-genome sequencing data(i.e.  WGS). , with the

AnVIL strongly encourages the submission of FE-compliant genome and exome sequencing data aligned to GRChB38. (See <https://github.com/CCDG/Pipeline-Standardization/blob/master/PipelineStandard.md>).

With exceptions (e.g., for legacy data sets), data not compliant with the FE standard may be aligned to GRChb38 and reprocessed, at the discretion of the Data Ingestion Committee.

After reprocessing, quality control metrics for genome and exome sequencing data will be collected using multiple software packages (e.g., Picard, VerifyBamID2, Samtools flagstat, bamUtil stats) organized in a single Workflow Definition Language workflow. These metrics will be evaluated for depth and breadth of coverage, base-mismatch rate, rate of properly-paired reads, and sample contamination to determine QC pass/fail status. QC metrics will also be made available in the AnVIL workspace to aid users in sample selection.

### Data Indexing
Once in the workspace buckets, object files, such as sequencing data, will be indexed with a global unique ID (GUID). This will allow for access across AnVIL tools, without requiring copies be created and transferred across environments.

These identifiers allow for tracking data across components of the AnVIL, and facilitate the ability to interoperate with other data commons due to their extensibility. Further, they enable tracking of live data being processed in workflow pipelines, and data being backed up to cold storage.

### Access Control
Access control within the AnVIL is governed by three major groups - developer access, consortium access, and external researcher access (via dbGaP). For more information, see [Data Access Controls](/learn/accessing-data/data-access-controls).

### dbGaP Submission Requirements
Studies submitted to the AnVIL will still need to be registered with dbGaP, though there will be no requirement to submit source files or individual samples through the dbGaP portal. The dbGaP consent codes will be used to determine data access. Studies with multiple consent codes will be split into individual workspaces based on cohort and consent pairings. External researchers can use dbGaP to apply for access, and a completed and approved DAR will permit dbGaP to communicate this access grant to Terra.



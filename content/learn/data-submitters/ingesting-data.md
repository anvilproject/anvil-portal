---
title: "Step 4 - Ingest Data"
author: "AnVIL"
description: "An overview of the AnVIL data ingestion process."
---

# Step 4 - Ingest Data

<hero> Once you have prepared your genomic object files and generated TSV files for each table in your data model, you will deposit the genomic data files and all TSV files into AnVIL-owned bucket(s) on Google Cloud. 
</hero>

You’ll work with a designated POC at the AnVIL team to shepherd the data (genomic data files and TSV load files) into the AnVIL data storage repository. Note that because each engagement will most likely be different, we will be further developing and refining (as needed) processes as we engage with submitters.

For actions taken prior to final process refinement, all transfers should involve the Data Processing WG and AnVIL team to ensure data integrity during the transfer process.

## 4.1 - Move Files to a Workspace Bucket

To move your files to a workspace bucket:

1.  **Register a service account** - See [Register service account to move data](https://github.com/broadinstitute/firecloud-tools/tree/master/scripts/register_service_account).

2. **Install gsutil locally**  -  gsutil is a Python application that lets you access Google Cloud Storage from the command line in a terminal. It’s more efficient than using the AnVIL UI to move large numbers and/or large files. You will need to install gsutil from the terminal on your local machine. See [How to install gsutil](https://cloud.google.com/sdk/docs/install) for instructions.

3. **Copy files** - Once you have installed gsutil, run the following code in the terminal to copy files to the workspace bucket: `gsutil cp -L local directory/filename gs://fc-your-workspace-bucket-id`     

The `-L` gsutil option  assures the integrity of the copied file and stores the md5 value in the destination workspace bucket.     


### Copying Multiple Files

You can use `*` in place of filenames to copy everything in a directory. So, for example, `cp * gs://fc-12345` will copy all files in the root directory where the terminal is running to the workspace bucket `gs://fc-12345`.

### Files to Copy
- All genomic data files
- All TSV load files in the Data Model
  - `subject.tsv`
  - `sample.tsv`
  - `sequencing.tsv`
  - `discovery.tsv`
  - `family.tsv` (optional)
  - Any additional optional tables

For additional instructions on copying files to a workspace bucket using gsutil, see [Moving data to or from a  workspace Google bucket](https://support.terra.bio/hc/en-us/articles/360024056512-Moving-data-to-from-a-workspace-or-external-Google-bucket-). **Note that you will need to add the `-L` option to the directions in the documentation.**    

## 4.2 Validation Steps (Automated)

### QC check of submission form to genomic object files

[TBD] Information here on how this check is accomplished; believe at a high level that it’s checking the number of files match the number in the submission google form

### QC check of phenotype and metadata
- The phenotype file data fields match the defined data model
- Sample IDs are consistent with phenotype and linked to a subject and consent.


### Ingestion Validation (automated)

To confirm the ingested data transferred as expected and maintain the file integrity, Google automatically checks the md5 sum of the end file against the original after each file transfer.  These tests will be executed once data has been ported to AnVIL.

### Data Indexing (genomic object files)

Once in the workspace buckets, object files, such as sequencing data, are indexed with a global unique ID (GUID). This allows for access across AnVIL tools, without requiring copies to be created and transferred across environments.

These identifiers allow for tracking data across components of AnVIL and facilitate the ability to interoperate with other data commons due to their extensibility. Further, they enable tracking of live data being processed in workflow pipelines, and data backup to cold storage.






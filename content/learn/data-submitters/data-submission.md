---
title: "Preparing for submission"
author: "AnVIL"
description: "How to organize and format data tables for ingest to the AnVIL"
---

# Preparing for submission

### How data are stored in the AnVIL
Data in the AnVIL are kept in data workspaces. Within the workspace, integrated spreadsheet-like data tables store and organize all data entities and metadata including:

- Study and program details (i.e. ascension number, project ID)
- Phenotypic and subject data (i.e. EHR, demographics, lab results)
- Genomic data and metadata (i.e. links to genomic data files, sequencing details)

**Genomic data (“sample” table)**    
![screenshot of genomic data table in Terra workspace](https://storage.googleapis.com/terra-featured-workspaces/FISS_tutorial/tutorial%20graphics/Data-table-example_Genomic-data_Screen%20shot.png)  
You can download a template `sample.tsv` here.

**Phenotypic data (“subject” table)**    
![screenshot of phenotypic data table in Terra](https://storage.googleapis.com/terra-featured-workspaces/FISS_tutorial/tutorial%20graphics/Data-table-example_Phenotypic-data_Screen%20shot.png)

To prepare data for submission, you will:

1. Organize data following the [AnVIL data requirements](https://staging.anvilproject.org/learn/data-submitters/data-requirements)
1. Generate a TSV load file for each table in your workspace


>To learn more about how to use workspace tables to store and organize data in the AnVIL, see [Managing Data with Workspace Tables](https://support.terra.bio/hc/en-us/articles/360025758392-Managing-data-with-workspace-tables-) (estimated read time 15 minutes)    
If you prefer a video, watch .


## Training/learning resources
### Reading

- To understand what entity types are and the default entity types in the standard genomic model, see [this article](https://support.terra.bio/hc/en-us/articles/360033913771-Understanding-entity-types-and-the-standard-genomic-data-model) (estimated time 10 minutes).


- See the [Data Requirements](/learn/consortia/data-requirements) section for more information about AnVIL data/metadata requirements.


- [Formatting requirements for data tables and template upload files](https://support.terra.bio/hc/en-us/articles/360059242671-Adding-data-to-a-workspace-with-a-template).

### Videos

- [Introduction to Data Tables in Terra](https://youtu.be/IeLywroCNNA) (5 minutes)
### Hands-on tutorial
For hands-on practice with a data model and data tables in Terra, please go through parts 1 and 2 of the Terra Data Tables QuickStart tutorial (estimated time 30-40 minutes).
## Required tables for all studies
All AnVIL studies must submit:
- **Data dictionary table** - Includes field names, field descriptions, field types, tables where the field is found, enumeration values (where applicable), multi-value delimiter symbol used (where applicable)
- [Basic data dictionary template](https://docs.google.com/spreadsheets/d/1KSHONPQAQ61oGXofQednTNdHsODNmBkx6zBg3GnGMGU/edit#gid=0).
  - [Data dictionary for CMG](https://docs.google.com/spreadsheets/d/1zVFyuclXJrThLELM0zGVXCEui8mIfyHLBjH_Mdx6uj8/edit#gid=1507031680) consortium data in AnVIL.
- **Subject table** - Includes required information about the subjects with the `subject_id` as the key field for that table.
- **Sample table** -  Links the `subject_ids` to the `sample_ids` where the `sample_id` is the key fields for that table.
- **Sequencing table** - Includes required information about the sequence data linked to the `sample_id` where the filename is the key field for the table.

###How to address repeated elements
Any repeating data elements (i.e. multiple values for a given data element for an individual) should be brought to the attention of the AnVIL team to ensure proper modeling and submission. For example:
- An individual in a data set has a measurement (e.g., blood pressure, lab test, BMI) taken at multiple time points.
- An individual in a data set is affected by multiple disease/phenotype/conditions included in the study (e.g., an individual in a diabetes study has both diabetes and diabetes retinopathy; both are being tracked in the study).

##Example Additional (Optional) Tables (CSV format)

- **Family table** - Includes information about a particular family with the `family_id` as the key field for the table.
  Provided data can include pedigrees or any other family-level information.
- **Discovery table** - Includes information about variants of interest that are linked to the `subject_id.`

>Any data beyond the minimal data must always be linked to either the `subject_id`, `sample_id`, `family_id`, or sequence filename - depending on what the data element describes. Where possible, try to include this additional data in the main subject, sample, or sequencing tables. Otherwise, the data can be submitted as separate tables.



---
title: "Set Up Data Model"
author: "AnVIL"
description: "This doc outlines how to select your data model, and additional required steps to arrange for ingestion"
---

# Set Up Data Model

> Make any changes to the [AnVIL Data Submitters - Preliminary steps - Markdown]( https://docs.google.com/document/d/1jzRCnDXSQ0-RRTUX9jjTaNchQXppx6Tely-MN_-aueI/edit) Google doc.


After your dataset has been approved by the AnVIL data ingestion committee, you will need to set up and submit your data model. You can choose from one of two template data models and adjust to meet your needs. You’ll coordinate with the AnVIL data ingest team to facilitate this. You’ll end this step by completing an intake form to send the Data Model (in a data dictionary spreadsheet) and all the information the AnVIL team needs to set up your data workspace on the AnVIL.


## 1 -  Getting Started

### Coordinate with the AnVIL Data Ingest team
- Email <anvil-data@broadinstitute.org> to arrange an AnVIL kickoff meeting

### Register for a Terra Account

AnVIL data are stored and organized in a “data [workspace](https://youtu.be/ONc1Wf7rEuw)” in Terra. If you do not already have an account on Terra, you will find step-by-step instructions to register at [/learn/account-setup/creating-a-terra-account](/learn/account-setup/creating-a-terra-account).

>*While there are no charges for uploading and storing your data in AnVIL, in order to complete an analysis, you will need to connect a Google Billing Account to your Terra account. See [Overview of Billing Concepts](/learn/billing-setup/billing-concepts) and [Creating a Google Cloud Billing Account](/learn/billing-setup/creating-a-google-cloud-billing-account) for more information.*


## 2 - Select/Refine Data Model
### organizing data by nodes (tables)
The Data Model describes the structure of the study data. Each node in the AnVIL Data Model (i.e. “Program” or “Subject” etc. in the graphical representation below) includes different types of data (called “properties”). Nodes are connected to each other by unique IDs.

<figure>
<img src="./_images/gen3-model.png" alt="Data model diagram."/>
<figure-caption>TODO  - figure caption for gen3 data model image</figure-caption>
</figure>

In the AnVIL data workspace, data and metadata from the Biospecimen, Clinical, and Data File nodes are in integrated spreadsheet-like tables. Every row in a table is a distinct “entity” and every column is a different property.

**Example subject table**    
A collection of basic information and phentotypic data about a subject (e.g., demographics, age, sex, or race)


**Example sample table**    
Organizes biospecimen information such as genomic data files associated with subjects in the subject table.



#### Understanding tables in the AnVIL
***To learn how to use workspace tables to store and organize data in the AnVIL***, *see [Managing Data with Workspace Tables](https://support.terra.bio/hc/en-us/articles/360025758392-Managing-data-with-workspace-tables-) (estimated read time 15 minutes).*

***If you prefer a video,*** *you can watch this [“Introduction to data tables”](https://youtu.be/IeLywroCNNA) video on YouTube.*

### Data Model Requirements
Some data properties and formatting constraints are required for AnVIL Data Models. These requirements help ensure AnVIL datasets are not only useful to the researchers who created them but enable others to analyze data collectively across studies.

**For the full list of requirements**, see <INSERT THE RIGHT LINK HERE>


### Template Data Models
Data submitted for hosting by the AnVIL should be consistent with data models in the AnVIL system when possible. To ensure this, it is recommended that you adopt or modify one of the Data Model templates below. These guidelines are based on data already in AnVIL or in the process of being ingested into AnVIL.

- [Rare Disease - CMG Data Model](https://docs.google.com/spreadsheets/d/1zVFyuclXJrThLELM0zGVXCEui8mIfyHLBjH_Mdx6uj8/edit?usp=sharing)

- [Common Disease - CCDG Data Model](https://docs.google.com/spreadsheets/d/1GxKPgtDGMQxi9kPgrk4ApaOCXdsDzMjISSrX7LLUW7I/edit#gid=1507031680)


>*If your dataset has been accepted by AnVIL and has needs not described here, please reach out to the AnVIL Team at <help@lists.anvilproject.org>. You can work directly with the AnVIL Phenotype WG and Data Processing WG to integrate into one of these existing data models.
*



## 3 - Generate Data Dictionary
All AnVIL studies must submit a **Data dictionary table** spreadsheet that defines your complete data model. The Data Dictionary includes field names, field descriptions, field types, tables where the field is found, enumeration values (where applicable), multi-value delimiter symbols used (where applicable).


### General Formatting Requirements

Metadata formatting must be compatible with indexing once in AnVIL. In particular, ***no special characters (i.e. “%” or “*”) are allowed in any field or file name.***


The AnVIL team will provide metadata recommendations to ensure metadata are in an acceptable form to be incorporated into the broader AnVIL data model.

Data Processing WG and Phenotype WG will work with submission requesters to ingest their data properly. Because each engagement will most likely be different, we will be further developing and refining (as needed) processes as we engage with submitters.


### Phenotypic Data Expectations

<INSERT SCREENSHOT OF PHENOTYPIC DATA HERE>

Currently, data stored in a phenotypic (“subject”) table will fall into one of four categories. Requirements for each category are below.

>***If your data does not fall into one of these categories**, please reach out to the AnVIL Team (help@lists.anvilproject.org).*

- **Case/Control (or Case alone)** - Information around a particular disease or phenotype of interest for a selected cohort (Example: CMG, CCDG).

- **Electronic Health Record (EHR)** -  Data derived from EHR information (Example: eMERGE).

- **Survey** - Data collected from surveying study subjects (Example: CSER).

- **Family longitudinal** -  Data collected for multiple families for multiple generations (Example: AMISH).

### Required Phenotypic Data
To ensure cross-study functionality on AnVIL, dataset categories have the following requirements.
- 1 - Required
- 2 - Required if there are trios or other relationship data in the study.

Data Elements | Case or Case/Control | EHR | Survey |Family longitudinal
-- | -- | -- | -- | --
subject_id | 1 | 1 |1 | 1
sample_id | 1 | 1 | 1 | 1
project_id | 1 | 1 | 1 | 1
dbgap_project_id | 1 | 1 | 1 | 1
data_use_limitation | 1 | 1 | 1 | 1
sex | 1 | 1 | 1 | 1
condition | 1 | - | - | -
affected_status | 1 | - | - | -
family_id | 2 | - | 2 | 1
paternal_id | 2 | - | 2 | 1
maternal_id | 2 | - | 2 | 1
proband_relationship | 2 | - | 2 | -

#### Ensuring Uniform Terminology
AnVIL includes a diverse set of studies and a wide range of collected phenotypic data. To maximize useful information for search and synthetic cohort creation, all phenotypic data:

- Must be clearly linked to a subject, and the subject must be clearly linked to other data (e.g., genome, exome, RNASeq, array, etc.).
- Must be composed (where possible) of structured values. Ideally, these values are concept codes from established ontologies including, but not limited to:
  - [NCIt](https://ncithesaurus.nci.nih.gov/ncitbrowser/) - A vocabulary for a diverse set of biological concepts (e.g., disease, phenotype, relationship, anatomy, etc.).
  - [SNOMED](https://www.snomed.org/) - A vocabulary focused on concepts related to clinical data (license required).
  - [UMLS Metathesaurus](https://www.nlm.nih.gov/research/umls/index.html) - Links concepts from multiple vocabularies and ontologies (license required, free to individuals in the USA, includes access to SNOMED).
  - [UBERON](https://www.ebi.ac.uk/ols/ontologies/uberon) - A vocabulary focused on anatomical structure.
  - [HPO](https://hpo.jax.org/app/) - An ontology focused on phenotypic abnormalities.
  - [OMIM](https://www.omim.org/) - An ontology for rare mendelian diseases.
  - [Orphanet](https://www.orpha.net/consor/cgi-bin/index.php) - An ontology for orphan drugs and rare diseases.
  - [ICD](https://icd.codes/) - An ontology for US billing codes.
  - [MeSH](https://meshb.nlm.nih.gov/search) - An ontology for biomedical and health-related information.
  - [RxNorm](https://mor.nlm.nih.gov/RxNav/) - Normalized names for clinical drugs and links to many of the drug vocabularies.

### Genomic Data Expectations
<INSERT GENOMIC DATA TABLE SCREEN SHOT HERE>

## 4 - Complete the AnVIL Data Submission Form
Once you have your data model and all information, you will be ready to complete the AnVIL Data Submission Form. The form gathers study information to create the deposit workspace. **To complete the form, you will need**
- dbGaP registration ID (phsID)
- Consent groups
- Consent codes
- Types of data (i.e., genomic, phenotypic, etc.)
- Number of samples
- Submitter information (emails of all people who need access to the deposit workspace)

### Access Restrictions

Known Data Use Limitations (DUL) need to be clearly defined by the data depositor. This is the list of requirements for gaining access and using the data. There should be protocols in place for gaining access at the time of ingest.


>Please contact your program officer and the NHGRI Genomic Program Administrator for assistance and/or questions about dbGaP registration and/or consent groups.



<button-link href="https://docs.google.com/forms/d/e/1FAIpQLSeXGjrMEJ3gCftvgcaSyd-yRGdRzHVZwcKw4xbT5FXNcyCXFA/viewform" target="_blank">Launch AnVIL Data Submission Form</button-link>

## Training/learning resources
### Reading

- [Understanding entity types and the default entity types in the standard genomic model](https://support.terra.bio/hc/en-us/articles/360033913771-Understanding-entity-types-and-the-standard-genomic-data-model) (estimated time 10 minutes).


- [Formatting requirements for data tables and template upload files](https://support.terra.bio/hc/en-us/articles/360059242671-Adding-data-to-a-workspace-with-a-template).

### Videos

- [Introduction to Data Tables in Terra](https://youtu.be/IeLywroCNNA) (5 minutes)
### Hands-on tutorial
For hands-on practice with a data model and data tables in Terra, please go through parts 1 and 2 of the Terra Data Tables QuickStart tutorial (estimated time 30-40 minutes). 


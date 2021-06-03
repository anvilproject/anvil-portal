---
title: "AnVIL Data Model Requirements"
author: "AnVIL"
description: "An overview of the required data and metadata formats for submitting data to AnVIL."
---
# Data Model Requirements

> Make any changes to the [AnVIL Data Submitters - Data Model Requirements  - Markdown](https://docs.google.com/document/d/14WcYvggZoj2iFH2tsxx1lkl07PGBhe6WaIV8Qo_T7-A/edit) Google Doc.

This section describes the data needed for AnVIL studies in order to support that datasets are not only useful to the researchers who created them but also for research where data can be analyzed collectively across studies.

These guidelines are based on data already in AnVIL or in the process of being ingested into AnVIL. If your data has been accepted by AnVIL and has needs not described here, please reach out to the AnVIL Team at <help@lists.anvilproject.org>.

## Phenotypic Data Expectations
AnVIL includes a diverse set of studies with a wide variety of phenotypic data collected.

Since the goal of AnVIL is to further empower research not only by providing a platform for analysis of a specifically curated dataset but also by allowing data to be aggregated across studies, we seek to have phenotypic data provided in a way that will allow maximum useful information for search and synthetic cohort creation.

In accordance with this, we have the following goals and expectations for phenotypic data in the AnVIL.

- All phenotypic data is provided such that it can be clearly linked to a subject, and the subject is clearly linked to other data provided (e.g., genome, exome, RNASeq, array, etc.).
- Where possible, phenotypic data is provided with structured values. Ideally, these values are concept codes from established ontologies including, but not limited to:
  - [NCIt](https://ncithesaurus.nci.nih.gov/ncitbrowser/) - A robust vocabulary for a diverse set of biological concepts (e.g., disease, phenotype, relationship, anatomy, etc.).
  - [SNOMED](https://www.snomed.org/) - A robust vocabulary focused on concepts related to clinical data (license required).
  - [UMLS Metathesaurus](https://www.nlm.nih.gov/research/umls/index.html) - A robust resource that links concepts from multiple vocabularies and ontologies (license required, free to individuals in the USA, includes access to SNOMED).
  - [UBERON](https://www.ebi.ac.uk/ols/ontologies/uberon) - A vocabulary focused on anatomical structure.
  - [HPO](https://hpo.jax.org/app/) - An ontology focused on phenotypic abnormalities.
  - [OMIM](https://www.omim.org/) - An ontology for rare mendelian diseases.
  - [Orphanet](https://www.orpha.net/consor/cgi-bin/index.php) - An ontology for orphan drugs and rare diseases.
  - [ICD](https://icd.codes/) - An ontology for US billing codes.
  - [MeSH](https://meshb.nlm.nih.gov/search) - An robust ontology for biomedical and health-related information.
  - [RxNorm](https://mor.nlm.nih.gov/RxNav/) - A resource for normalized names for clinical drugs and links its names to many of the drug vocabularies.

### Data Models
Data submitted for hosting by the AnVIL will be consistent with data models in the AnVIL system when possible. This can either be accomplished by submitting data consistent with the existing data models, or by working directly with the AnVIL Phenotype WG and Data Processing WG to integrate into an existing data model.

## Categories of phenotypic data sets
Currently, phenotypic data will fall into one of four general categories. The requirements for each category of dataset are described below. If your dataset does not fall into one of these categories, please reach out to the AnVIL Team (help@lists.anvilproject.org).

- **Case/Control (or Case alone)** - This describes a dataset where information is collected around a particular disease or phenotype of interest for a selected cohort (Example: CMG, CCDG).

- **Electronic Health Record (EHR)** -  This describes a broad dataset where the data is derived from EHR information (Example: eMERGE).

- **Survey** - This describes a dataset that consists of survey data (Example: CSER).

- **Family longitudinal** -  This describes a data set centered around collecting broad data for multiple families for multiple generations (Example: AMISH).

## Required Data
For each of the categories of data sets, there are specific requirements for data that are needed for functionality in AnVIL.

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


- 1 - Required
- 2 - Required if there are trios or other relationship data in the study.


## Required Tables for All Studies (csv, tsv format)
All studies must submit:
- **Data dictionary table** - Includes field names, field descriptions, field types, tables where the field is found, enumeration values (where applicable), multi-value delimiter symbol used (where applicable)
  - [Basic data dictionary template](https://docs.google.com/spreadsheets/d/1KSHONPQAQ61oGXofQednTNdHsODNmBkx6zBg3GnGMGU/edit#gid=0).
  - [Data dictionary for CMG](https://docs.google.com/spreadsheets/d/1zVFyuclXJrThLELM0zGVXCEui8mIfyHLBjH_Mdx6uj8/edit#gid=1507031680) consortium data in AnVIL.
- **Subject table** - Includes required information about the subjects with the `subject_id` as the key field for that table.
- **Sample table** -  Links the `subject_ids` to the `sample_ids` where the `sample_id` is the key fields for that table.
- **Sequencing table** - Includes required information about the sequence data linked to the `sample_id` where the filename is the key field for the table.

>Any repeating data elements (i.e. multiple values for a given data element for an individual) should be brought to the attention of the AnVIL team to ensure proper modeling and submission. For example:
>- An individual in a data set has a measurement (e.g., blood pressure, lab test, BMI) that is taken at multiple time points.
>- An individual in a data set is affected by multiple disease/phenotype/conditions that are included in the study (e.g., an individual in a diabetes study has both diabetes and diabetes retinopathy that are being tracked in the study).

## Example Additional Tables (CSV format)
- **Family table** - Includes information about a particular family with the `family_id` as the key field for the table.
  Provided data can include pedigrees or any other family-level information.
- **Discovery table** - Includes information about variants of interest that are linked to the `subject_id.`

>Any data provided beyond the minimal data must always be linked to either the `subject_id`, `sample_id`, `family_id`, or sequence filename depending on what the data element describes. This additional data can be included in the main Subject, Sample, or Sequencing tables where possible or provided as separate tables.

### Associated Metadata

Metadata should be in a format compatible with indexing once in AnVIL. Metadata recommendations will be provided by the AnVIL team to ensure that metadata are in an acceptable form to be incorporated into the broader AnVIL data model.

Data Processing WG and Phenotype WG will work with submission requesters in an effort to ingest their data properly. Because each engagement will most likely be different, processes will be developed (and adjusted, as necessary) as we engage with the various submitters.

### Access Restrictions

Known Data Use Limitations (DUL) need to be clearly defined by the data depositor. This is the list of requirements for gaining access and using the data. There should be protocols in place for gaining access at the time of ingest.






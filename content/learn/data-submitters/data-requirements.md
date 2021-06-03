---
title: "AnVIL Data Model Requirements"
author: "AnVIL"
description: "An overview of the required data and metadata formats for submitting data to AnVIL."
---
# Data Model Requirements


The following data requirements help ensure AnVIL datasets are not only useful to the researchers who created them but also enable others to analyze data collectively across studies.

### Data Models
Data submitted for hosting by the AnVIL should be consistent with data models in the AnVIL system when possible. If needed, you can work directly with the AnVIL Phenotype WG and Data Processing WG to integrate into an existing data model.

These guidelines are based on data already in AnVIL or in the process of being ingested into AnVIL.

>If your dataset has been accepted by AnVIL and has needs not described here, please reach out to the AnVIL Team at <help@lists.anvilproject.org>.

## Phenotypic Data Expectations
AnVIL includes a diverse set of studies and a wide range of collected phenotypic data. To enable maximum useful information for search and synthetic cohort creation, all phenotypic data:

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


### Categories of phenotypic data
Currently, phenotypic data will fall into one of four categories. Requirements for each category are below.

>**If your data does not fall into one of these categories**, please reach out to the AnVIL Team (help@lists.anvilproject.org).

- **Case/Control (or Case alone)** - Information around a particular disease or phenotype of interest for a selected cohort (Example: CMG, CCDG).

- **Electronic Health Record (EHR)** -  Data derived from EHR information (Example: eMERGE).

- **Survey** - Data collected from surveying study subjects (Example: CSER).

- **Family longitudinal** -  Data collected for multiple families for multiple generations (Example: AMISH).

## Required Data
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



### Associated Metadata

Metadata formatting should be compatible with indexing once in AnVIL. The AnVIL team will provide metadata recommendations to ensure metadata are in an acceptable form to be incorporated into the broader AnVIL data model.

Data Processing WG and Phenotype WG will work with submission requesters to ingest their data properly. Because each engagement will most likely be different, we will be further developing and refining (as needed) processes as we engage with submitters.

### Access Restrictions

Known Data Use Limitations (DUL) need to be clearly defined by the data depositor. This is the list of requirements for gaining access and using the data. There should be protocols in place for gaining access at the time of ingest.



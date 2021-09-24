---
description: "An overview the  NHLBI BioData Catalyst platform."
title: "BDC Fact Sheet"
---

# NHLBI BioData Catalyst (BDC)

<https://biodatacatalyst.nhlbi.nih.gov>

<socials>
<social-twitter-hashtag hashtag="BioDataCatalyst" showbird="true"></social-twitter-hashtag>
<social-youtube url="https://www.youtube.com/channel/UCGkmY5oNK8uFZzT8vV_9KgQ"></social-youtube>
</socials>

NHLBI BioData Catalyst is a cloud-based ecosystem providing tools, applications, and workflows in secure workspaces. The ecosystem is a dynamic resource that allows researchers to find, access, share, store, and compute on large scale datasets.

By increasing access to NHLBI datasets and innovative data analysis capabilities, BioData Catalyst accelerates efficient biomedical research that drives discovery and scientific advancement, leading to novel diagnostic tools, therapeutics and prevention strategies for heart, lung, blood, and sleep disorders.

NHLBI BioData Catalyst is open to all researchers. Join the community at <https://biodatacatalyst.nhlbi.nih.gov/contact/ecosystem>

## Funder
National Heart, Lung, and Blood Institute, Gary Gibbons (Director), Alastair Thomson (CIO), Jon Kaltman (Program Officer).

## PIs
PIs: Ahalt, Avillach, Boyles, Bradford, Cox, Davis-Dusenbery, Krishnamurthy, Grossman, Manning, Paten, Philippakis.

## Institutions
Institutions: The Broad Institute, Harvard Medical School, RTI International, Seven Bridges Genomics, University of California, Santa Cruz, University of Chicago, UNC-CH/RENCI, Vanderbilt University Medical Center.


## Data
- ~3.5 petabytes of data representing ~400K study participants


### 75 TOPMed studies 
- Includes multi-sample VCFs, CRAMs, and phenotype files. Freeze 8 data for 37 of those studies. In process of adding new studies and additional Freeze8 data. 23 parent studies
- TOPMed Combined Exchange Area for Freeze 8
  studies (~9.5 TB of data)
- 1000 Genomes Project
- BioLINCC Training Datasets
- ORCHID

### Coming soon
- Additional TOPMed Freeze 8 studies
- Pediatric Cardiac Genomics Consortium data
- Additional COVID-19 data

For more detailed information, see [About BioData Catalyst Datasets](https://biodatacatalyst.nhlbi.nih.gov/resources/data).

## Tools

BioData Catalyst is being designed to support workflows for batch data analysis, notebooks for interactive analysis, and apps/services for web apps. Users can bring their own workflows and notebooks.

### Workflows
BioData Catalyst supports workflows written in CWL and WDL. Highlights include workflows from the DCC and TOPMed alignment and variant calling.

### Notebooks
RStudio and Jupyter Notebooks are supported with examples leveraging BioData Catalyst for image visualization, machine learning, and GPU acceleration.

### Apps/Services
Access and Search Clinical and WGS annotated data via PIC-SURE User Interface and API.

## Authentication/Authorization

- eRA Commons IDs are used for controlled access data via Data Commons Framework Services (DCFC).

- Expecting integration with NIH RAS through DCFC integration for authentication and authorization.
- DCFS’ dbGaP integration is used to streamline access for those with completed dbGaP applications.

## Indexing

- Data objects are assigned permanent globally unique IDs (GUIDs) to allow for access across tools, without requiring copies be created and transferred.

- Datasets can be located through text-based and faceted/tagged search. Semantic Search under development.

## Data Modeling
Working toward data interoperability using standards from GA4GH and CD2H with FHIR and BioLink as meta models

## Cloud Credits
NHLBI currently provides $500 in cloud credits to new users of BioData Catalyst on BioData Catalyst Powered by Seven Bridges or BioData Catalyst Powered by Terra.
Users can also use AWS or GCP accounts or apply for additional credits via NHLBI BioData Catalyst Cloud Credit Program.

## Architecture
![BDC Architecture](./_images/bdc-arch.png)


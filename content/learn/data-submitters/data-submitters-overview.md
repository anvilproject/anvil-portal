---
title: “AnVIL Data Submission Guide”
author: "AnVIL"
description: "A walkthrough of the AnVIL data submission process and requirements."
---

# AnVIL Data Submission Guide

<hero>Welcome to the Data Submitters docs on AnVIL. We’re excited to have you here and helping to push the frontiers of  biomedicine. 

Our goal is to help researchers by hosting robust and large datasets and making it easier for researchers to find and analyze the data they need. By contributing datasets, you are helping us achieve this goal.

To make the data useful, especially for cross-study analysis requires standardized formatting and careful review. We are asking submitters to help us in this endeavor, by following the instructions in this guide.</hero>

## Overview

In order to submit data into AnVIL you will need to:

1. [Obtain required approvals/Register with dbGaP](/learn/data-submitters/submission-guide/data-approval-process).
1. [Set up your data model](/learn/data-submitters/submission-guide/set-up-a-data-model).
1. [Prepare your data for submission](/learn/data-submitters/submission-guide/prepare-for-submission).
1. [Ingest your data into AnVIL](/learn/data-submitters/submission-guide/ingesting-data).     
1. [QC ingested data](/learn/data-submitters/submission-guide/qc-data)     


## General Data Requirements 
Make sure your data conforms to these overall data requirements, or contact the AnVIL data team.      

### Reference Genome 
All submitted genomic data should be based on Human reference genome assembly GRCh37 or GRCh38.

### Register with appropriate NCBI resource (e.g. dbGaP, GEO)
Data in the AnVIL are stored in data workspaces. For controlled-access studies, consent codes from dbGaP are used to determine appropriate access to the data workspaces on AnVIL.    

It is important that studies into the human genomic and phenotypic associations be registered with dbGaP so you can populate the data element `dbGaP_study_ID` (phsXXXXXX) in AnVIL. Additionally, NIH registration of studies provides AnVIL with information needed to set up the workspaces so that data can be appropriately organized by study (if there are multiple, e.g., within a consortia) and by consent group(s). Study registration often occurs at Just-in-Time (JIT) for NHGRI funded studies, and thus you may have already completed this step. 

Example:  AnVIL workspace - AnVIL_CCDG_Broad_CVD_EOCAD_PartnersBiobank_HMB_WES - represents 1 study registration phs002018 and has one consent group, which is health/medical/biomedical or shortened to HMB

Below is a screenshot of the data elements incorporated on the front (documentation) page of the workspace:

<figure>
<img src="./_images/terra-workspace.png" alt="A terra workspace."/>
<figure-caption>An example of a terra workspace documentation page.</figure-caption>
</figure>

  
**For Non-NHGRI funded studies that must seek Institutional and/or AnVIL Data Ingestion Committee approval (see steps 1.2 & 1.3), you may want to register your data in dbGaP while obtaining approval to speed up the [administrative aspects]([Step 1](/learn/data-submitters/submission-guide/data-approval-process))**.   
 

Though there will be no requirement to submit source files or individual samples through the dbGaP portal, the dbGaP consent codes will be used to determine data access. Studies with multiple consent codes will be split into individual data workspaces based on cohort and consent pairings. External researchers can use dbGaP to apply for access, and a completed and approved DAR will permit dbGaP to link this access grant to Terra.

### Data sharing    
All individual-level human genomic and phenotypic data must conform to the [NIH Genomic Data Sharing Policy](https://www.genome.gov/about-nhgri/Policies-Guidance/Genomic-Data-Sharing). This includes the expectation that participants [are/were] explicitly consented for data sharing.    

### Access Control    
Access control within the AnVIL is governed by three major groups - developer access, consortium access, and external researcher access (via dbGaP). For more information, see [Data Access Controls](/learn/accessing-data/data-access-controls).



## Getting Help

Please contact the AnVIL Outreach team with support and training requests at <help@lists.anvilproject.org>.


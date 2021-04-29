---
title: "Submitting Consortium Data"
author: "AnVIL"
description: "AnVIL aims to host data sets of high value to the biomedical research community, serving basic research as well as clinical research."
---

# Submitting Consortium Data

<hero>AnVIL aims to host data sets of high value to the biomedical research community, serving basic research as well as clinical research. AnVIL is open to hosting additional data sets, including public access and restricted access data.</hero>

##Starting the Data Submission Process

To begin the process of submitting data to AnVIL and confirm eligibility:

1. Complete our [AnVIL Dataset Onboarding Application](https://docs.google.com/forms/d/e/1FAIpQLSe3NViQ8bTkXexqJ7QukcIcSwe1OLlIirScvaP7YXq4TMqa7A/viewform) for evaluation by the AnVIL Data Ingestion Committee.

2. [Contact](mailto:help@anvilproject.org) the AnVIL team with any questions you have regarding data deposition. We are happy to answer questions or help determine if the AnVIL is the right place for your data.

##Minimal Ingestion Information

###Data Models
Data submitted for hosting by the AnVIL will be consistent with data model(s) in the AnVIL system when possible. This can either be accomplished by submitting data consistent with the existing data model(s), or by working directly with the AnVIL Phenotype WG and Data Processing WG to integrate into an existing data model. 

Phenotype data should be linked to a concept identifier from a standard ontology whenever possible. This can either be by submitting data linked to the ontologies existing in the AnVIL, or by working directly with the AnVIL Phenotype WG and Data Processing WG to map the phenotype data to appropriate ontologies.

In most instances, data ingestion will be the result of a collaborative effort with the Phenotype and Data Processing WGs, and will be initiated as a response to the ingestion application. The application should specify the current data model(s) and ontologies for the data to be submitted, in order to expedite review by both WGs.

Note: These requirements are the minimal information needed to ingest a dataset for formal hosting by the AnVIL. A data depositor seeking to use a Bring-Your-Own-Data model will be able to bring data with whatever phenotypic data they wish.

###Phenotypic and Clinical Data
Phenotypic and clinical data should be in a format compatible with submission to the AnVIL. The following information is generally required for data submission:

1. A data dictionary (data model), containing the following information:
    1. Properties within the data model (Gender, Blood Pressure, etc.)
    1. Definitions for the property
    1. Property type (encoded, decimal, string, etc.)
    1. Units of measurement
    1. Allowable Values (0 means x, 1 means y, etc.)
    1. Linkages to external concept codes (where possible)
1. Phenotype data files, including the following broken down by node:
    1. the ID of the entry within that node
    1. the ID of the entry within a parent node. That is, the node under which this node is linked in the graph model. An additional column can be added if the node has multiple parents
    1. Columns for the data value for each property for that entry. Using demographics as an example, a property column may be "Gender", with each line containing a numeric value associated with the property in the data dictionary

AnVIL WGs will work with submitters to validate the format of this information, and to identify any situations in which one may supply more, or less information based on specific dataset needs.

###Associated Metadata
Metadata should be in a format compatible with indexing once in AnVIL. Metadata recommendations will be provided by the AnVIL team to ensure that metadata are in an acceptable form to be incorporated into the broader AnVIL data model.  Data Processing WG and Phenotype WG will work with submission requesters in an effort to ingest their data properly.  Because each engagement will most likely be different, processes will be developed (and adjusted, as necessary) as we engage with the various submitters. 

###Access Restrictions
Known Data Use Limitations (DUL) need to be clearly defined by the data depositor. This is the list of requirements for gaining access and using the data. There should be protocols in place for gaining access at the time of ingest.

##Ingestion Authorization
###AnVIL Data Ingestion Committee (DIC) Approval
This committee is composed of NHGRI program officers and internal AnVIL leadership team members. This group would perform initial evaluation of ingestion applications.

###Institutional Approval
During initial discussions, the Program Officer must provide a written attestation that the AnVIL team will be permitted to store, index, and access data on the AnVIL. In addition, this must provide a list of people who are designated to speak and make decisions on behalf of the institution.

Data must also be submitted in a way that is consistent with the requirements of the [NIH Genomic Data Sharing (GDS) Policy](https://www.genome.gov/about-nhgri/Policies-Guidance/Genomic-Data-Sharing).
- Institutions must submit an Institutional Certification, which specifies that data is being submitted in accordance with all applicable laws, and which specifies the limitations for sharing based on the informed consent of the research participants.
- This documentation would need to include the NHGRI Genomic Program Administrator, who currently registers the study.
- Datasets need to be registered in a central catalog (likely to remain dbGaP).

The AnVIL team will provide a template form for this.

###Ethical Review
All scientific investigations should be undertaken with the highest priority given to the ethical requirements of such inquiries. As such, the ethical collection of both the data and of the submitting parties itself will be evaluated by AnVIL PDs and DIC before a determination for inclusion in the AnVIL.

###Data Retention
During the initial discussions and vetting with the Data Ingestion Committee, the committee will coordinate with the dataset stewards to determine a reasonable timeframe for retention of data within the AnVIL, as well as any other provisions that would have to do with the long term storage, archival, and availability of the data.

##Ingestion Pipeline
###Data Transfer
Once data is in a format that meets the above requirements and have been approved by the Data Ingestion Committee, data submitters will contact a designated POC at the AnVIL team to shepherd the data into the AnVIL data storage repository.

Both AnVIL team members and submitting parties will work together throughout the transfer process. Data will be deposited to an AnVIL owned bucket(s) on Google Cloud. For actions taken prior to final process refinement, all transfers should involve the Data Processing WG and AnVIL team to ensure data integrity during the transfer process.  

###Quality Assurance Monitoring
The transfer of data will be monitored and logged to ensure integrity of the transfer and be included in the Ingestion certification of analysis (see below).  This includes automated confirmation that the file transfers were successful and MD5sums are intact, performed by the GCP services at the time of transfer.

###Ingestion Validation
This is the evaluation that the ingested data was transferred as expected. At the conclusion of each file transfer, Google automatically checks the md5 sum of the end file against the original to confirm file integrity.  These tests will be documented in the Ingestion protocol/pipeline execution plan and executed once data has been ported to AnVIL.

###Ingestion CoA
This certification of analysis (CoA) documents the transfer of data. The CoA is signed off by AnVIL and data submitting party. This document will be made available along with the ingested data for public consumption.

###QC and Processing
In order to maximize the value of the AnVIL resource, ingested genomic data will be subject to quality control and harmonization.  For WGS files, a functional equivalence (FE) standard for alignment and processing of whole genome sequencing data has been defined by the CCDG and TOPMed consortia, with the goal of minimizing batch effects in cross-project analyses (Regier et al., 2018).
  
  Submission of FE-compliant genome and exome sequencing data aligned to GRChB38 is encouraged. (See <https://github.com/CCDG/Pipeline-Standardization/blob/master/PipelineStandard.md>).

With exceptions (e.g., for legacy data sets), data not compliant with the FE standard may be aligned to GRChb38 and reprocessed, at the discretion of the Data Ingestion Committee.

After reprocessing, quality control metrics for genome and exome sequencing data will be collected using multiple software packages (e.g., Picard, VerifyBamID2, Samtools flagstat, bamUtil stats) organized in a single Workflow Definition Language workflow. These metrics will be evaluated for depth and breadth of coverage, base-mismatch rate, rate of properly-paired reads, and sample contamination to determine QC pass/fail status. QC metrics will also be made available in the AnVIL workspace to aid users in sample selection.

###Data Indexing
Once data is made available in the aforementioned buckets, object files, such as sequencing data, will be indexed to provide a global unique ID (GUID). This will allow for access across AnVIL tools, without requiring copies be created and transferred across environments.

These identifiers allow for tracking data across components of the AnVIL, and facilitate the ability to interoperate with other data commons due to their extensibility. Further, they enable tracking of live data being processed in workflow pipelines, and data being backed up to cold storage.

###dbGaP Submissions
Studies submitted to the AnVIL will still need to be registered with dbGaP, though there will be no requirement to submit source files or individual samples. Consent codes given by dbGaP will be used to determine access - with studies split into individual workspaces based on cohort and consent pairings. External researchers can use dbGaP to apply for access, and a completed and approved DAR will permit dbGaP to communicate this access grant to Terra.

###Access Control
Access control within the AnVIL is governed by three major groups - developer access, consortium access, and external researcher access (via dbGaP). For more information, see [Data Access Controls](/learn/accessing-data/data-access-controls).



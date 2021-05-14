#Ingesting Data
##Data Transfer
Once data is in a format that meets the above requirements and have been approved by the Data Ingestion Committee, data submitters will contact a designated POC at the AnVIL team to shepherd the data into the AnVIL data storage repository.

Both AnVIL team members and submitting parties will work together throughout the transfer process. Data will be deposited to an AnVIL owned bucket(s) on Google Cloud. For actions taken prior to final process refinement, all transfers should involve the Data Processing WG and AnVIL team to ensure data integrity during the transfer process.

##Quality Assurance Monitoring
The transfer of data will be monitored and logged to ensure integrity of the transfer and be included in the Ingestion certification of analysis (see below).  This includes automated confirmation that the file transfers were successful and MD5sums are intact, performed by the GCP services at the time of transfer.

##Ingestion Validation
This is the evaluation that the ingested data was transferred as expected. At the conclusion of each file transfer, Google automatically checks the md5 sum of the end file against the original to confirm file integrity.  These tests will be documented in the Ingestion protocol/pipeline execution plan and executed once data has been ported to AnVIL.

##Ingestion CoA
This certification of analysis (CoA) documents the transfer of data. The CoA is signed off by AnVIL and data submitting party. This document will be made available along with the ingested data for public consumption.

##QC and Processing
In order to maximize the value of the AnVIL resource, ingested genomic data will be subject to quality control and harmonization.  For WGS files, a functional equivalence (FE) standard for alignment and processing of whole genome sequencing data has been defined by the CCDG and TOPMed consortia, with the goal of minimizing batch effects in cross-project analyses (Regier et al., 2018).

Submission of FE-compliant genome and exome sequencing data aligned to GRChB38 is encouraged. (See <https://github.com/CCDG/Pipeline-Standardization/blob/master/PipelineStandard.md>).

With exceptions (e.g., for legacy data sets), data not compliant with the FE standard may be aligned to GRChb38 and reprocessed, at the discretion of the Data Ingestion Committee.

After reprocessing, quality control metrics for genome and exome sequencing data will be collected using multiple software packages (e.g., Picard, VerifyBamID2, Samtools flagstat, bamUtil stats) organized in a single Workflow Definition Language workflow. These metrics will be evaluated for depth and breadth of coverage, base-mismatch rate, rate of properly-paired reads, and sample contamination to determine QC pass/fail status. QC metrics will also be made available in the AnVIL workspace to aid users in sample selection.

##Data Indexing
Once data is made available in the aforementioned buckets, object files, such as sequencing data, will be indexed to provide a global unique ID (GUID). This will allow for access across AnVIL tools, without requiring copies be created and transferred across environments.

These identifiers allow for tracking data across components of the AnVIL, and facilitate the ability to interoperate with other data commons due to their extensibility. Further, they enable tracking of live data being processed in workflow pipelines, and data being backed up to cold storage.

##dbGaP Submissions
Studies submitted to the AnVIL will still need to be registered with dbGaP, though there will be no requirement to submit source files or individual samples. Consent codes given by dbGaP will be used to determine access - with studies split into individual workspaces based on cohort and consent pairings. External researchers can use dbGaP to apply for access, and a completed and approved DAR will permit dbGaP to communicate this access grant to Terra.

##Access Control
Access control within the AnVIL is governed by three major groups - developer access, consortium access, and external researcher access (via dbGaP). For more information, see [Data Access Controls](/learn/accessing-data/data-access-controls).


---
description: "Demonstration projects and more!"
title: "Sex as a Biological Variable"
---

# LINE-1 Retrotransposon Expression
### NCPI Interoperability Demonstration Project

**Researcher**: Wilson McKerrow

**Interop Contact**: Jack DiGiovanna

**Platforms** [PDC (CRDC), GDC (CRDC), and GTEx (AnVIL) data]
## Analysis Question

The Fenyo lab is studying how retrotransposons work, which is fundamentally a multi-omic question. Specifically, the insertion occurs in the genome; this insertion can change the transcriptome and resulting in altered protein expression. This research project involves testing a hypothesis that the activity of a specific retrotransposon, LINE1, is different in tumors than in normal cells. In order to test this hypothesis, the researcher requires datasets that have matching samples of DNA, RNA, and protein data. To date,  work has focused on the tumor samples in the TCGA data and proteomic data from the CPTAC datasets. However, the number of normal samples in the TCGA data set is fairly small. The GTEx dataset has many more normal samples for the same tissue types as the tumor samples in TCGA, and they would like to expand their analysis to GTEx to better understand LINE1 activity in normal tissue and compare it to the tumor data.

The genomic and proteomic workflows are wrapped in CWL and functional on the CRDC.  The results of their analysis of the TCGA data are already complete and available on the CRDC (highlighted at the prior Interop Meeting). The GTEx data is only accessible from the AnVIL platform, which currently only supports workflows wrapped in WDL. 

This interoperability project aims to find a path to connect the GTEx data on the AnVIL platform to further processing and also combination with a prior analysis on the CRDC. This “normals” use case is a frequent request from our users, so finding a solution would be extremely valuable for a large number of cancer researchers.

## Analysis Plan

1. Obtain confirmation from appropriate NIH Data Access Committees that these datasets and data uses are allowable and can be used/combined in this manner.
1. (ideally) Through a single sign on event, authenticate user and authorize appropriate access through RAS integration
1. Find proteomic cohort in PDC Data Portal
1. Export manifest describing cohort
1. Pull this data into a CRDC analysis ecosystem
1. Perform proteomics analysis within CRDC
1. Perform genomics analysis within CRDC
1. Combined analysis of 5-6
1. Find GTEx data cohort within AnVIL
1. Copy this dataset to CRDC
1. Perform GTEx analysis on CRDC
1. Combine derived results from 7 and 10 as necessary
   **Interop Requirements**: Interop between GDC and PDC within CRDC; interop between AnVIL - CRDC 


## Updates

### April 16, 2020
`video: https://youtu.be/T_24Hhzn9H8`


### June, 2021
`video: https://www.youtube.com/watch?v=iBMwWC1tH_Y`

In tis webinar, Dr. McKerrow discusses linking RNA-seq data from GTEx to his L1EM tool on the CGC to survey LINE-1 expression outside the context of cancer. His findings showed a low level of LINE-1 expression in normal epithelial tissues, but little to no expression in blood, brain, fat, or muscle tissues. This reflects the fact that LINE-1 is frequently expressed in epithelial-derived tumors, but rarely seen in those derived from blood or brain.

For more information see [Interoperating cloud platforms to survey the baseline for LINE-1 expression in non-tumor tissues](https://www.cancergenomicscloud.org/webinars/2021/6/23/webinar-june-2021)

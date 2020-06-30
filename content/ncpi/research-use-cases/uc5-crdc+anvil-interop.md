# UC5 -  NCI CRDC + NHGRI AnVIL

**Interop Contact**: Jack DiGiovanna

**Researcher**: Wilson McKerrow [PDC (CRDC), GDC (CRDC), and GTEx (AnVIL) data]

### Analysis Question

The Fenyo lab is studying how retrotransposons work, which is fundamentally a multi-omic question. Specifically, the insertion occurs in the genome; this insertion can change the transcriptome and resulting in altered protein expression. This research project involves testing a hypothesis that the activity of a specific retrotransposon, LINE1, is different in tumors than in normal cells.
 
 In order to test this hypothesis, the researcher requires datasets that have matching samples of DNA, RNA, and protein data. To date,  work has focused on the tumor samples in the TCGA data and proteomic data from the CPTAC datasets. However, the number of normal samples in the TCGA data set is fairly small. The GTEx dataset has many more normal samples for the same tissue types as the tumor samples in TCGA, and they would like to expand their analysis to GTEx to better understand LINE1 activity in normal tissue and compare it to the tumor data.

The genomic and proteomic workflows are wrapped in CWL and functional on the CRDC. The results of their analysis of the TCGA data are already complete and available on the CRDC (highlighted at the prior Interop Meeting). The GTEx data is only accessible from the AnVIL platform, which currently only supports workflows wrapped in WDL. The interoperability project aims to find a path to connect the GTEx data on the AnVIL platform to further processing and also combination with a prior analysis on the CRDC. This “normals” use case is a frequent request from our users, so finding a solution would be extremely valuable for a large number of cancer researchers.

### Analysis Plan

1. Obtain confirmation from appropriate NIH Data Access Committees that these datasets can be used/combined in this manner.
1. Find proteomic cohort in PDC Data Portal.
1. Export manifest describing cohort.
1. Pull this data into a CRDC analysis ecosystem.
1. Perform proteomics analysis within CRDC.
1. Perform genomics analysis within CRDC.
1. Combined analysis of 5-6.
1. Find GTEx data cohort within AnVIL.
1. Copy this dataset to CRDC.
1. Perform GTEx analysis on CRDC.
1. Combine derived results from 7 and 10 as necessary.

### Interop Requirements
Interop between GDC and PDC within CRDC; interop between AnVIL - CRDC

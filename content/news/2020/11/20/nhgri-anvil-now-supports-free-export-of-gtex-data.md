---
author: "AnVIL"
blurb: "We are pleased to announce that researchers are now able to download controlled access GTEx V8 to local compute infrastructure without incurring egress fees."
carousel: true
date: "2020-10-20"
description: "In support of the evolving nature of the NHGRI mission, we are pleased to announce that researchers are now able to download controlled access GTEx V8 to local compute infrastructure without incurring egress fees."
docType: "News"
featured: true
logo: ../../../_images/anvil.png
title: "NHGRI AnVIL Cloud Platform Now Supports Free Export of GTEx Data"
---

# NHGRI AnVIL Cloud Platform Now Supports Free Export of GTEx Data
##### Posted: November 20, 2020

One of the most widely-used resources for studying the relationship between genetic variation and gene expression is the [Genotype-Tissue Expression (GTEx) project][1]. Established by the NIH Common Fund in 2010, the recent [GTEx V8 dataset][2] represents the largest atlas of human gene expression and corresponding trait loci to date (dbGaP accession: [phs000424.v8.p2][3]).
 
 This dataset contains genotype data from 838 postmortem donors and 17,382 RNA-seq samples across 54 tissue sites and 2 cell lines. The [GTEx Portal][4] provides uniformly processed gene expression data, a QTL Browser, and a mechanism by which to request available biospecimens to allow researchers to study the impact of genetic variation on complex traits and diseases.

Controlled access to raw and protected data that may identify donors is provided through the [AnVIL Project][5]. Established in 2018, the NHGRI Genomic Data Science Analysis, Visualization, and Informatics Lab-space (AnVIL) provides a cloud-based environment that colocates an extensive collection of high-value datasets with commonly used bioinformatics tools in a secure computing environment.

In support of the evolving nature of the NHGRI mission, we are pleased to announce that researchers are now able to download controlled access GTEx V8 to local compute infrastructure without incurring egress fees. Researchers will still need to apply for approval from dbGaP to access these data and maintain data security on their institutional clusters, but this new capability will save researchers substantial expenses, especially for researchers that wish to integrate GTEx with their own clinical research data. Download instructions can be found at <https://anvilproject.org/learn/reference/gtex-v8-free-egress-instructions>.

We foresee that in the long term, more users will choose to perform the analysis of GTEx and other large datasets directly within AnVIL’s cloud environment.  AnVIL offers an elastic, shared computing resource, with active threat detection and monitoring, that provides an increasingly attractive alternative to redundantly downloaded data amongst siloed compute infrastructure.

AnVIL is built on a set of established components that have been used in a number of flagship scientific projects. The [Terra platform][6] provides a compute environment with secure data and analysis sharing capabilities. [Dockstore][7] provides standards based sharing of containerized tools and workflows. [R/Bioconductor][8] and [Galaxy][9] provide environments for users at different skill levels to construct and execute analyses. The [Gen3 data commons][10] framework provides data and metadata ingest, querying, and organization.
 
 Taken together, the AnVIL cloud platform allows researchers to build novel cohorts out of GTEx and other major NHGRI datasets such as [CCDG][11], [CMG][12], and [eMERGE][13] and compute on them in place with scalable and easy to use tools.

[1]: https://www.genome.gov/Funded-Programs-Projects/Genotype-Tissue-Expression-Project
[2]: https://science.sciencemag.org/content/369/6509/1318
[3]: https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000424
[4]: https://gtexportal.org
[5]: https://anvilproject.org
[6]: https://anvil.terra.bio
[7]: https://dockstore.org
[8]: https://www.bioconductor.org
[9]: https://galaxyproject.org
[10]: https://gen3.theanvil.io
[11]: https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Common-Disease-Genomics
[12]: https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Mendelian-Genomics-CMG
[13]: https://www.genome.gov/Funded-Programs-Projects/Electronic-Medical-Records-and-Genomics-Network-eMERGE

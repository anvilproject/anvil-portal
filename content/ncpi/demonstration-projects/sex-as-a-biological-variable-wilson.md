---
description: "An NCPI demonstration project assessing the effects of using a standard reference alignment compared to a sex chromosome complement alignment on estimates of X-inactivation. "
title: "Sex as a Biological Variable (Wilson)"
---

# Sex as a Biological Variable (Wilson)
### NCPI Interoperability Demonstration Project

[comment]: <> (https://github.com/NIH-NCPI/NCPI_use_case_tracker/issues/11)

**Researcher**: Melissa A. Wilson (Arizona State University)

**Interop Contact**: Brian O'Connor

**Platforms**: AnVIL, BDCat, CRDC, and GMKF

## Analysis Question

Sex differences exist across a range of human diseases, and have, to date, been understudied and largely unexplained(Khramtsova, Davis, and Stranger 2019). For example, females in industrialized populations exhibit a higher prevalence of most autoimmune diseases than do males (Ngo, Steyn, and McCombe 2014).

By contrast, females have a lower risk of developing cancer, with nearly all non-reproductive cancers showing a higher incidence in males (Dorak and Karpuzoglu 2012). Sex chromosome complement, independent of hormone levels, has been implicated in the female bias in autoimmune disease prevalence, including in systemic lupus erythematosus, rheumatoid arthritis, multiple sclerosis, and type 1 diabetes(Klein and Flanagan 2016), and likely contributes to sex differences in other immune processes, such as the newly emerging female-biased long-COVID symptoms.

Of note, Klinefelter males (who carry two copies of the X chromosome, and a Y) have higher immunoglobulin concentrations and adaptive immune cell levels compared with XY males (Koçar et al. 2000), while women with Turner syndrome (45,X0), have lower immunoglobulin concentrations and adaptive immune cell levels compared to XX females (Bianchi et al. 2012).   

Although the X and Y chromosomes were once an indistinguishable pair of autosomes, most Y-linked genes have been pseudogenized or deleted (Wilson Sayres and Makova 2012), resulting in unequal gene content between the X and Y. To balance the dosage of X-linked genes between males and females, one of the X-copies in females is largely epigenetically silenced during embryogenesis, a process termed X-inactivation (Payer and Lee 2008)). As many as 30% of the genes on the inactive X are known to escape inactivation (Tukiainen et al. 2017), or may never have been silenced. 

However, we have shown that the remaining sequence homology between the X and Y results in mismapping of reads in short-read DNA sequencing, and that correcting this by aligning to a sex chromosome complement specific reference can result in calling 10,000 more variants than when using a standard approach (Webster et al. 2019).

Further, we have shown that this evolutionary artifact also affects RNA quantification and using a standard reference genome results in fewer sex-differentially expressed genes being identified than when using a reference genome informed by the sex chormosome complement (Olney et al. 2020). However, most large genome datasets were generated with a standard reference genome alignment, reducing our power to call variants and detect sex differences in gene expression. Further, we have not explored how a sex chromosome complement reference will affect analyses of these two sequencing types (DNA and RNA) combined, when trying to call allele-specific expression to study things like X-inactivation. 


### Aims

Thus, we propose technical and biological aims:

- **Aim 1**. Assess the effects of using a standard reference alignment compared to a sex chromosome complement alignment on estimates of X-inactivation. In doing this, we will estimate the costs of realigning the DNA, RNA and calling allele specific expression in the proposed data.
- **Aim 2**. Realign interoperable datasets using a sex chromosome complement and make available to the community. 

## Analysis Plan

1. Obtain dbGaP authorization for GTEx and TCGA data (already have this)
2. Infer presence/absence of Y chromosome in current data
3. Strip CRAM files
4. Align DNA and map RNA using a reference genome informed by the sex chromosome complement for a subset of the data (focusing on TCGA cancer data because it is common to lose a sex chromosome in the process of tumorigenisis).
5. Quantify RNA, and call allele-specific expression
6. Measure allele specific expression in TCGA sample (propose to use breast cancer data and compare with breast samples from GTEx)
7. Compare genes escaping inactivation between breast cancer and healthy breast tissue
8. Annotate genes escaping inactivation
9. Generate estimates for scaling up this analysis across all NCPI datasets
10. Perform realignment and recalling across NCPI and make available to the community.



## Updates

### October 5, 2021

`video: https://youtu.be/S2DzLYsA35Y`

## Demonstration  Materials

### Demo Repository
For an overview of system interoperation methods used in this project see [NCPI October 2021 Interop Demo](https://github.com/briandoconnor/ncpi-interop-demo-oct-2021) GitHub repository. This repository is a tutorial showing how Dr. O'Connor was able to leverage the NCPI system interoperability to start the initial phases of Melissa Wilson's "Sex as a Biological Variable" demonstration project.





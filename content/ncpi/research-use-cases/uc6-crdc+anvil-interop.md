# UC6 NCI CRDC + NHGRI AnVIL
**Barbara Stranger (Northwestern University)**

**Interop Contact**: Robert L. Grossman

**Studies**: TCGA (phs000178) and GTEx (phs000424)

**Title**: A comparison of transcriptome variation between tumors derived from male and female cancer patients.

**Researchers**: Barbara Stranger (Northwestern University) and Robert L. Grossman (University of Chicago),

### Analysis Question

We will explore the patterns of transcriptome variation between tumors derived from male and female patients across a diverse set of adult cancers.
 
 Sexual dimorphism in cancer susceptibility is well-documented. Across cancers, the worldwide overall age-standardized cancer incidence rate is almost 25% higher in males than in females, and in adult malignancies, males have worse overall survival and higher mortality rate (Molife, R., P. Lorigan and S. MacNeil, Gender and survival in malignant tumours. Cancer Treat Rev, 2001. 27(4): p. 201-9; Cook, M.B., K.A. McGlynn, S.S. Devesa et al., Sex Disparities in Cancer Mortality and Survival. Cancer Epidemiol Biomarkers Prev, 2011. 20(8): p. 1629-37.
  
 The incident rate ratio (IRR) of males to females for individual cancers ranges from strongly male-biased (e.g., bladder cancer), to strongly female biased (e.g., thyroid cancer) Ferlay, J., I. Soerjomataram, R. Dikshit et al., Cancer incidence and mortality worldwide: sources, methods and major patterns in GLOBOCAN 2012. Int J Cancer, 2015. 136(5): p. E359-86) (SEER). Hypotheses to explain this sexual dimorphism include: environmental exposures, hormones, the immune system, and genetic effects, including risk factors on autosomes and sex chromosomes, sexual dimorphism of gene expression, proteome, and the metabalome. Despite varying degrees of evidence in support of these hypotheses, the relative contribution of each is unknown for most cancers. A better understanding of the biological mechanisms influencing this sexual dimorphism is desperately needed.

We hypothesize that tumors exhibit sexual dimorphism at the molecular level that underlie sex differences in higher-order clinical features. Leveraging the resources of The Cancer Genome Atlas (TCGA), we will characterize sex differences in the tumor transcriptome within and between cancers. We will leverage the multi-tissue transcriptome data of the Genotype-Tissue Expression (GTEx) Project to interpret the dimorphism discovered within and between cancers. Dimorphic genes will be annotated with respect to known cancer genes, mechanisms, pathways, pharmacogenomics genes, and therapy targets. Potentially interesting targets could be further annotated with biological, functional, and pathway information that would be used in a synergistic way to describe both similar and unique biological signatures across the cancers.

### Analysis Plan

1. Obtain dbGaP authorization for GTEx and TCGA data
1. Obtain gene-summarized RNASeq count data from the GDCC and the GTEx portals
1. Aggregate and harmonize all files within a single workspace
1. Match GTEx tissues to TCGA cancers
1. Perform sex-differential expression (sex-DE) analysis of each TCGA tumor type and each GTEx tissue using limma
1. Compare sex-DE genes across cancers and between normal and tumor tissues
1. Annotate tumor sex-DE genes
1. Perform additional analysis gene-level differences

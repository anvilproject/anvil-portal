---
draft: false
---

# Driver Projects

The NCPI is collecting specific research use cases in this section that can drive our proof of concept.

##  1 - NHLBI BioData Catalyst + Kids First DRC
<hero small>This collaboration aims to develop a more accurate pipeline to detect de novo mutations in family trios by utilizing the consistent calls and other graph-related information produced by the SBG graph tools in the PCGC pipeline.</hero>

**Platforms**: NHLBI BioData Catalyst, Kids First DRC

**Researchers**: Bruce Gelb (Mount Sinai)

**Interop Contact**: Allison Heath

### Analysis Question

The Pediatric Cardiovascular Genetics Consortium (PCGC) is committed to defining the molecular mechanisms for Congenital Heart Disease. They have developed a novel method to identify de novo mutations in clinical probands by post-processing the family genotypes posited by the GATK whole genome sequencing (WGS) pipeline. This method has a precision rate of 95% for de novo SNVs as well as short INDELs (validated by Sanger sequencing of the putative calls).

Seven Bridges Genomics, Inc. (SBG) has recently described Pan-genome Graph References for improved WGS analyses and presented the use of personalized genome graphs for more consistent variant calling in family trios (ASHG 2019).


### Interop Requirements
1. Search for data in PCGC on the Kids First DRC and export to BDCatalyst for analysis.

## 2 - NHLBI BioData Catalyst + Kids First DRC
<hero small> This will help the scientific community to better understand cardiogenesis and to better assess risk of disease. Access to this whole genome sequence data will facilitate our work.</hero>

**Platforms**: NHLBI BioData Catalyst, Kids First DRC

**Researchers**: Elizabeth Goldmuntz and Deanne Taylor (CHOP), A.J. Agopian (UTH), Ryan Urbanowicz (UPenn)

**Interop Contact**: Allison Heath

### Analysis Question

Congenital heart defects (CHDs) are important birth defects to study due to their high mortality, occurring in about 1% of all live births and 10% of still births. Many individuals born with CHDs need early medical interventions to survive. In spite of the impact CHDs have on public health, little is known about their etiology. However, CHDs have been shown to have a genetic component, evident by their recurrence risk (~5%) in siblings.
 
 In this research, we intend to study the genetic bases of congenital heart defects using a variant and gene set analysis approaches, machine learning methods, amongst other statistical and genetic analysis models to help fill in the gaps that exist in the understanding of the etiology of CHDs.
  

## 3 - NHLBI BioData Catalyst + Kids First DRC

<hero small>We would like to demonstrate this relatively simple analysis across PCGC datasets from Kids First and BDCat within a single instance of a Gen3 Workspace. More generally, we want to use Gen3 and our implementation of Jupyter/RStudio workspaces to perform this analysis while handling authentication and authorization across multiple Gen3 data commons gracefully to provide a positive user experience.</hero>
**Interop Contact**: Robert L. Grossman
 
IRB19-1033

**Studies**:: phs001138, NHLBI Bench to Bassinet PCGC Congenital Heart Defects (HMB) Whole Genome Sequencing, and phs001032 NHLBI TOPMed The Vanderbilt Atrial Fibrillation Registry (GRU-IRB) Whole Genome Sequencing
 
**Title**: A comparison of cardiac-associated genes from TOPMed Vanderbilt Atrial Fibrillation and Kids First Congenital Heart Defects Cohorts
**Researchers**: Robert Grossman (UofC), Dmitry Grigoryev (UofC), Kyle Hernandez (UofC)

### Analysis Question
 
 We will explore the patterns of variation in genes associated with relevant inherited cardiac conditions (Pua, C.J., Bhalshankar, J., Miao, K. et al. "Development of a Comprehensive Sequencing Assay for Inherited Cardiac Condition Genes." J. of Cardiovasc. Trans. Res. (2016) 9: 3. https://doi.org/10.1007/s12265-016-9673-5) between Atrial Fibrillation (AF) and juvenile congenital heart defects (CHD).
  
  Among CHD populations, improving survival rates, expanding defect complexities, and increasing surgical interventions has been linked with a higher incidence of AF (Moe, Tabitha G et al. “Atrial Fibrillation in Patients with Congenital Heart Disease.” Journal of atrial fibrillation vol. 10,1 1612. 30 Jun. 2017, doi:10.4022/jafib.1612).
   
 Elucidating the similarities and differences between these two diseases may help our understanding of mechanistic/functional impacts of mutations and lead to the identification of actionable genetic targets. We will compare and contrast standing genetic variation in atrial fibrillation and juvenile congenital heart defects, with strong emphasis on a subset of cardiac-associated genes. 
 
 This approach highlights how even a simplistic comparison of well studied variants between cohorts from different data platforms can be of great value. Potentially interesting targets could be further annotated with biological, functional, and pathway information that would be used in a synergistic way to describe both similar and unique biological signatures across the cohorts.
 


## 4 - NHGRI AnVIL + Kids First DRC + NHLBI BioData Catalyst
<hero small>This project explores leveraging datasets in other platforms as controls for analysis.</hero>

**Interop Contact**: Allison Heath

**Researchers**: Any investigator that can leverage other datasets as controls for analysis, has been mentioned by a number of Kids First X01 investigators. For example, TOPMed and/or GTEx could be good controls for Kids First studies, mentioned most recently by Ali Gharavi (Columbia), studying structural defects of kidney and urinary tract. Unaffected family members or germline from cancer cohorts in Kids First could be good controls for other studies.

### Analysis Question

Appropriate controls are needed for various case/control analysis, such as burden testing. Ideally this is a healthy population with similar ancestry, but cohorts without the phenotype/disease of interest are often reasonable substitutes.


## 5 -  NCI CRDC + NHGRI AnVIL
<hero small> This interoperability project aims to find a path to connect the GTEx data on the AnVIL platform to further processing and also combination with a prior analysis on the CRDC. This “normals” use case is a frequent request from our users, so finding a solution would be extremely valuable for a large number of cancer researchers.</hero>

**Interop Contact**: Jack DiGiovanna

**Researcher**: Wilson McKerrow [PDC (CRDC), GDC (CRDC), and GTEx (AnVIL) data]

### Analysis Question

The Fenyo lab is studying how retrotransposons work, which is fundamentally a multi-omic question. Specifically, the insertion occurs in the genome; this insertion can change the transcriptome and resulting in altered protein expression. This research project involves testing a hypothesis that the activity of a specific retrotransposon, LINE1, is different in tumors than in normal cells.
 
 In order to test this hypothesis, the researcher requires datasets that have matching samples of DNA, RNA, and protein data. To date,  work has focused on the tumor samples in the TCGA data and proteomic data from the CPTAC datasets. However, the number of normal samples in the TCGA data set is fairly small. The GTEx dataset has many more normal samples for the same tissue types as the tumor samples in TCGA, and they would like to expand their analysis to GTEx to better understand LINE1 activity in normal tissue and compare it to the tumor data.

The genomic and proteomic workflows are wrapped in CWL and functional on the CRDC. The results of their analysis of the TCGA data are already complete and available on the CRDC (highlighted at the prior Interop Meeting). The GTEx data is only accessible from the AnVIL platform, which currently only supports workflows wrapped in WDL.


### Interop Requirements
Interop between GDC and PDC within CRDC; interop between AnVIL - CRDC


## 6 NCI CRDC + NHGRI AnVIL
<hero small> Leveraging the resources of The Cancer Genome Atlas (TCGA), we will characterize sex differences in the tumor transcriptome within and between cancers. We will leverage the multi-tissue transcriptome data of the Genotype-Tissue Expression (GTEx) Project to interpret the dimorphism discovered within and between cancers. Dimorphic genes will be annotated with respect to known cancer genes, mechanisms, pathways, pharmacogenomics genes, and therapy targets. Potentially interesting targets could be further annotated with biological, functional, and pathway information that would be used in a synergistic way to describe both similar and unique biological signatures across the cancers.</hero>
**Barbara Stranger (Northwestern University)**

**Interop Contact**: Robert L. Grossman

**Studies**: TCGA (phs000178) and GTEx (phs000424)

**Title**: A comparison of transcriptome variation between tumors derived from male and female cancer patients.

**Researchers**: Barbara Stranger (Northwestern University) and Robert L. Grossman (University of Chicago),

### Analysis Question

We will explore the patterns of transcriptome variation between tumors derived from male and female patients across a diverse set of adult cancers.
 
 Sexual dimorphism in cancer susceptibility is well-documented. Across cancers, the worldwide overall age-standardized cancer incidence rate is almost 25% higher in males than in females, and in adult malignancies, males have worse overall survival and higher mortality rate (Molife, R., P. Lorigan and S. MacNeil, Gender and survival in malignant tumours. Cancer Treat Rev, 2001. 27(4): p. 201-9; Cook, M.B., K.A. McGlynn, S.S. Devesa et al., Sex Disparities in Cancer Mortality and Survival. Cancer Epidemiol Biomarkers Prev, 2011. 20(8): p. 1629-37.
  
 The incident rate ratio (IRR) of males to females for individual cancers ranges from strongly male-biased (e.g., bladder cancer), to strongly female biased (e.g., thyroid cancer) Ferlay, J., I. Soerjomataram, R. Dikshit et al., Cancer incidence and mortality worldwide: sources, methods and major patterns in GLOBOCAN 2012. Int J Cancer, 2015. 136(5): p. E359-86) (SEER). Hypotheses to explain this sexual dimorphism include: environmental exposures, hormones, the immune system, and genetic effects, including risk factors on autosomes and sex chromosomes, sexual dimorphism of gene expression, proteome, and the metabalome. Despite varying degrees of evidence in support of these hypotheses, the relative contribution of each is unknown for most cancers. A better understanding of the biological mechanisms influencing this sexual dimorphism is desperately needed.

We hypothesize that tumors exhibit sexual dimorphism at the molecular level that underlie sex differences in higher-order clinical features.

## Additional Use Cases

The list of use cases presented here is not exclusive.  If we have focused on the right interoperability problems then we expect to see many additional use cases.  We encourage additional use cases to be added over time.


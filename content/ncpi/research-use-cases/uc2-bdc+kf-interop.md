# UC2 - NHLBI BioData Catalyst + Kids First DRC
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
  
 We would like to demonstrate this relatively simple analysis across PCGC datasets from Kids First and BDCat within a single instance of a Gen3 Workspace. More generally, we want to use Gen3 and our implementation of Jupyter/RStudio workspaces to perform this analysis while handling authentication and authorization across multiple Gen3 data commons gracefully to provide a positive user experience.
 
### Analysis Plan

1. We have obtained an IRB for the TOPMed dataset
1. We have obtained dbGaP access to these studies
1. Upgrade WorkSpace Token Service to handle auth across multiple Gen3 data commons to enable an export of manifests from multiple data commons into a single Workspace.
1. Aggregate all VCF files into a single workspace on Gen3 using Gen3 Fuse
1. Subset to the regions of interest.
1. Create new cohort-level VCF (different steps for each cohort)
1. Annotate cohort-level VCFs
1. Filter cohort-level VCFs
1. Compare variant sets between cohorts
1. Do GO enrichment of gene-level differences

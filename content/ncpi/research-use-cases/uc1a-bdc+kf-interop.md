#  UC1a - NHLBI BioData Catalyst + Kids First DRC

**Platforms**: NHLBI BioData Catalyst, Kids First DRC

**Researchers**: Bruce Gelb (Mount Sinai)

**Interop Contact**: Allison Heath

### Analysis Question

The Pediatric Cardiovascular Genetics Consortium (PCGC) is committed to defining the molecular mechanisms for Congenital Heart Disease. They have developed a novel method to identify de novo mutations in clinical probands by post-processing the family genotypes posited by the GATK whole genome sequencing (WGS) pipeline. This method has a precision rate of 95% for de novo SNVs as well as short INDELs (validated by Sanger sequencing of the putative calls).

Seven Bridges Genomics, Inc. (SBG) has recently described Pan-genome Graph References for improved WGS analyses and presented the use of personalized genome graphs for more consistent variant calling in family trios (ASHG 2019).

  This collaboration aims to develop a more accurate pipeline to detect de novo mutations in family trios by utilizing the consistent calls and other graph-related information produced by the SBG graph tools in the PCGC pipeline.

### Analysis Plan

1. Obtain confirmation from appropriate NIH Data Access Committees (NHLBI & Kids First) that these datasets can be used/combined in this manner.
1. Identify subset of trios with validated de novo variants from PCGC to use as “gold standard” for new graph-based methods.
1. Refine and improve methods utilizing the validated data on Cavatica.
1. Expand to run in Cavatica and BDCatalyst across entire PCGC cohort.
1. Provide new PCGC callset to approved researchers for analysis and further community validation / potential method refinement.
1. If improvement, run across Kids First and TOPMed studies of interest to provide callsets to the community
    1. Potentially any trio-based AnVIL datasets, e.g. CMGs.

### Interop Requirements
1. Search for data in PCGC on the Kids First DRC and export to BDCatalyst for analysis.

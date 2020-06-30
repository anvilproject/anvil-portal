#  UC1b - NHLBI BioData Catalyst + Kids First DRC

**Platforms**: NHLBI BioData Catalyst, Kids First DRC

**Researchers**: Elizabeth Goldmuntz and Deanne Taylor (CHOP), A.J. Agopian (UTH), Ryan Urbanowicz (UPenn)

**Interop Contact**: Allison Heath

### Analysis Question

Congenital heart defects (CHDs) are important birth defects to study due to their high mortality, occurring in about 1% of all live births and 10% of still births. Many individuals born with CHDs need early medical interventions to survive. In spite of the impact CHDs have on public health, little is known about their etiology. However, CHDs have been shown to have a genetic component, evident by their recurrence risk (~5%) in siblings.
 
 In this research, we intend to study the genetic bases of congenital heart defects using a variant and gene set analysis approaches, machine learning methods, amongst other statistical and genetic analysis models to help fill in the gaps that exist in the understanding of the etiology of CHDs.
  
 This will help the scientific community to better understand cardiogenesis and to better assess risk of disease. Access to this whole genome sequence data will facilitate our work.

### Analysis Plan

1. Obtain confirmation from appropriate NIH Data Access Committees that these datasets can be used/combined in this manner.
1. Find and aggregate all relevant CHD data into one workspace (PCGC whole exome, PCGC whole genome, locally sequenced data).
1. Run Kids First DRC pipelines (currently in CWL on Cavatica) across data that has not already been harmonized to GRChr38.
1. Perform joint genotyping across whole exome data.
1. Perform joint genotyping across whole genome data.
1. Aggregate and harmonize phenotypic data for analysis.
    1. E.g. severity of defect.
1. Bring own custom methods for gene set analysis and machine learning for downstream analysis.
---
description: "An NCPI demonstration project studying the genetic bases of congenital heart defects using a variant and gene set analysis approaches, machine learning methods, amongst other statistical and genetic analysis models"
title: "Genetic Basis of Congenital Heart Defects (Goldmuntz)"
---

# Genetic Basis of Congenital Heart Defects (Goldmuntz)
### NCPI Interoperability Demonstration Project

## Team

**Researchers** -  Elizabeth Goldmuntz and Deanne Taylor (CHOP), A.J. Agopian (UTH), Ryan Urbanowicz (UPenn)

**Interop Contact** -  David Higgins

**Platforms** - NHLBI BioData Catalyst + Kids First DRC


## Analysis Question
Congenital heart defects (CHDs) are important birth defects to study due to their high mortality, occurring in about 1% of all live births and 10% of stillbirths. Many individuals born with CHDs need early medical interventions to survive.

In spite of the impact CHDs have on public health, little is known about their etiology. However, CHDs have been shown to have a genetic component, evident by their recurrence risk (~5%) in siblings.

In this research, we intend to study the genetic bases of congenital heart defects using a variant and gene set analysis approaches, machine learning methods, amongst other statistical and genetic analysis models to help fill in the gaps that exist in the understanding of the etiology of CHDs. This will help the scientific community to better understand cardiogenesis and to better assess the risk of disease. Access to this whole-genome sequence data will facilitate our work.

## Analysis Plan
1. Obtain confirmation from appropriate NIH Data Access Committees that these datasets and data uses are allowable and can be used/combined in this manner.
2. Find and aggregate all relevant CHD data into one workspace (PCGC whole exome, PCGC whole genome, locally sequenced data)
3. Run Kids First DRC pipelines (currently in CWL on Cavatica) across data that has not already been harmonized to GRChr38
4. Perform joint genotyping across whole-exome data
5. Perform joint genotyping across whole-genome data
6. Aggregate and harmonize phenotypic data for analysis
    1. E.g. severity of defect [Dr. Goldmuntz provided some mild cases.]
7. Bring own custom methods for gene set analysis and machine learning for downstream analsis.

## Updates


### October 30, 2020
`video: https://youtu.be/21m9daDRfes`



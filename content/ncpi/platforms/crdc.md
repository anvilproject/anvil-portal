---
description: "An overview of the Cancer Research Data Commons platform."
title: "Cancer Research Data Commons Fact Sheet"
---

# NCI Cancer Research Data Commons (CRDC)

<https://datacommons.cancer.gov/>

<socials>
<social-twitter-hashtag hashtag="NCICommons" showbird="true"></social-twitter-hashtag>
<social-twitter-handle handle="genomicscloud"></social-twitter-handle>
<social-twitter-handle handle="BroadFireCloud"></social-twitter-handle>
<social-twitter-handle handle="isb_cgc"></social-twitter-handle>
<social-youtube url="https://www.youtube.com/embed/tk1nEX2gnqk"></social-youtube>
</socials>

`video: https://youtu.be/tk1nEX2gnqk`

### Vision

Giving researchers a place where they can work together to access diverse data types for integrative analysis, furthering the goals of precision medicine and biomedical discoveries.

### Mission

Provide access to standardized and harmonized cancer data in an expandable cloud-based infrastructure, enhancing the way data are shared to empower researchers to work in real time and with more connectivity.

### Approach

To provide interoperable resources through federation, data harmonization, standards, and tools and services that can be reused across the research community and to enable enhanced data sharing.

### Funder

The CRDC is funded by NCI Moonshot.

### PIs

Anand Basu, Andrey Fedorov, Bill Longabaugh, Bob Grossman, Brandi Davis-Dusenbery, Brian O’Conner, David Pot, Melissa Haendel, Ron Kikinis, Sam Volchenboum, Chris Chute, Clare Bernard.

### Institutions

Brigham and Women’s Hospital,
Enterprise Science and Computing (ESAC),
Frederick National Labs,
General Dynamics Information Technology,
Institute for Systems Biology,
Oregon State University,
Seven Bridges,
The Broad Institute,
University of Chicago,
Johns Hopkins.

## Data

### Data Repositories

- [GDC](https://datacommons.cancer.gov/repository/genomic-data-commons)
- [PDC](https://datacommons.cancer.gov/repository/proteomic-data-commons)
- [IDC](https://datacommons.cancer.gov/repository/imaging-data-commons)
- [ICDC](https://datacommons.cancer.gov/repository/integrated-canine-data-commons)
- [CDS](https://datacommons.cancer.gov/repository/cancer-data-service)
- [CTDC](https://datacommons.cancer.gov/repository/clinical-trial-data-commons)

New genomic, proteomic, imaging, canine, and clinical trial data being added through both existing and new data nodes on a continual basis.

### Datasets

- [The Cancer Genome Atlas (TCGA)](https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga)
- [Therapeutically Applicable Research to Generate Effective Treatments (TARGET)](https://ocg.cancer.gov/programs/target)
- [Clinical Proteomic Tumor Analysis Consortium (CPTAC)](https://proteomics.cancer.gov/programs/cptac)
- [Human Cancer Model Initiative (HCMI)](https://ocg.cancer.gov/programs/HCMI)
- [Cancer Genome Characterization Initiatives (CGCI)](https://ocg.cancer.gov/programs/cgci)
- [Foundation Medicine (FM)](https://www.foundationmedicine.com/)
- [Multiple Myeloma Research Foundation (MMRF)](https://themmrf.org/)
- [Genomics Evidence Neoplasia Information Exchange (GENIE)](https://www.aacr.org/professionals/research/aacr-project-genie/)
- [International Cancer Proteogenomic Consortium (ICPC)](https://proteomics.cancer.gov/programs/international-cancer-proteogenome-consortium)
- [Children's Brain Tumor Tissue Consortium (CBTTC)](https://cbttc.org/)
- [Genetics and Epidemiology of Colorectal Cancer Consortium (GECCO)](https://www.fredhutch.org/en/research/divisions/public-health-sciences-division/research/cancer-prevention/genetics-epidemiology-colorectal-cancer-consortium-gecco.html)
- [Comparative molecular life history of spontaneous canine and human gliomas (GLIOMA01)](https://www.cell.com/cancer-cell/fulltext/S1535-6108(20)30043-X)

### More Information

<https://datacommons.cancer.gov/data#key-datasets>

## Tools

### Cloud Resources

- **[Seven Bridges](https://cgc.sbgenomics.com/public/apps)** - 400+ publicly available tools and workflows in Common Workflow Language, + Dockstore, Rstudio, Jupyter notebooks, collaborative genome browser
- **[Broad](https://firecloud.terra.bio/#library/code)** - 700+ publicly available workflows and tools in Workflow Development Language, Integrated Genome Viewer, Dockstore, Jupyter notebooks, BigQuery, ML, pipelines
- **[ISB-CGC](http://isb-cgc.org)** - Google: VMs, BigQuery, AI, ML, Pipelines, Cohorts, Image Viewers, Notebooks, Plotting, Dockstore
- Bring your own tools, integrative analysis is available.

### Repositories Resources

- **[GDC](https://gdc.cancer.gov/)**: Data Analysis Visualization Exploration ([DAVE](https://gdc.cancer.gov/analyze-data/gdc-dave-tools)) tools
- **[PDC](https://pdc.cancer.gov)**: Pepquery, Morpheus, Genome Browser, DDA & DIA common data analysis pipelines
- **Infrastructure**: Cancer Data Aggregator ([CDA](https://datacommons.cancer.gov/cancer-data-aggregator)), Center for Cancer Data Harmonization ([CCDH](https://datacommons.cancer.gov/center-cancer-data-harmonization)), Data Commons Framework ([DCF](https://datacommons.cancer.gov/data-commons-framework))

### Analytical Tools

- List of analytical tools: <https://datacommons.cancer.gov/analytical-tools>

## Authentication

- eRA Commons IDs (controlled data)
- [NCI Data Commons Framework Services](https://dcf.gen3.org/) (DCFS) by Gen3
- Individual, OIDC platform authentication

## Authorization

- NCI Data Commons Framework Services ([DCFS](https://dcf.gen3.org/)) by Gen3
- Researcher Authentication Service ([RAS](https://datascience.nih.gov/researcher-auth-service-initiative))
- eRA Commons IDs (controlled data)
- Individual, OIDC platform authentication

## Indexing

- Permanent globally unique IDs (GUIDs) for data in Google & Amazon locations
- GUIDs are cloud agnostic, promoting access and providing a mechanism for versioning data

## Authorization

- dbGaP access
- DCFS by Gen3
- Authorization enabled by Trusted Partnerships with NIH

## Data Models

- There are many data models across the CRDC, including [ICDC](https://cbiit.github.io/icdc-model-tool/), [CTDC](https://cbiit.github.io/ctn-model/), [PDC](https://pdc.cancer.gov/data-dictionary/dictionary.html), and [GDC](https://gdc.cancer.gov/developers/gdc-data-model)
- Center for Cancer Data Harmonization ([CCDH](https://datacommons.cancer.gov/center-cancer-data-harmonization)) develops overarching model and mapping
- CRDC also participates in [GA4GH](https://www.ga4gh.org/) efforts

## Architecture

### User Perspective

![CRDC Architecture](_images/crdc-user-perspective.png)

### System Perspective

![CRDC Architecture](_images/crdc-system-perspective.png)

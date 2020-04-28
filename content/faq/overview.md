---
title: "Overview FAQ"
author: "AnVIL"
description: "What is AnVIL? What is an AnVIL Workspace? What is Terra and how does it relate to AnVIL?"
---

#Overview
##What is AnVIL?
The NHGRI Genomic Data Science [The Genomic Analysis, Visualization, and Informatics Lab-space](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL), or ‘AnVIL,’ is NHGRI’s genomic data resource that leverages a cloud-based infrastructure for democratizing genomic data access, sharing and computing across large genomic, and genomic-related data sets. In addition to downloading copies of data to local computers and servers, users will have the option to work with data in a secure cloud environment, where they can also use common bioinformatics tools and packages and develop and share their own software tools.

AnVIL is part of the emerging federated genomic data commons ecosystem, which includes other cloud-based data commons established within and outside the NIH.

##What is an AnVIL Workspace?
An AnVIL workspace is a stand-alone computational sandbox that provides a secure collaborative place to organize data, run and monitor analysis pipelines, and perform interactive analysis using applications such as Jupyter Notebooks. Each Workspace is associated with one GCP billing account that is charged for all compute, egress, and storage costs incurred within the Workspace.

##What is Terra and how does it relate to AnVIL?
[Terra](https://anvil.terra.bio/) is the compute engine of AnVIL. Terra is a secure and scalable platform for biomedical researchers to access data, run analysis tools, and collaborate easily with others. Terra operates on Google Cloud Platform and all costs incurred by the user are billed directly to the user, providing users control to fully manage their resources.

Terra is the analysis unit of AnVIL, where users can analyze, process, visualize, and share data. Terra currently offers access to Jupyter Notebooks with support for Python and R for interactive analysis and access to the Workflow Description Language (WDL) for batch processing of many samples using pipelines. Terra will soon provide access to R Studio and Galaxy to be used as interactive analysis tools.

Security is paramount to AnVIL. Any security concerns should be communicated to the AnVIL team ([help@lists.anvilproject.org](mailto:help@lists.anvilproject.org)).

##What is Gen3 and how does it relate to AnVIL?
Gen3 is the data management system of AnVIL. Gen3 enables exploring datasets with complex variables (phenotypes) associated with them and also allows creation of synthetic cohorts. In AnVIL, users will access Gen3 to explore data sets and create synthetic cohorts that can be sent to a Terra for further analysis.

##What is Dockstore and how does it relate to AnVIL?
Dockstore is the workflow repository of AnVIL. Dockstore hosts WDL workflows and supports additional workflow languages. Users can select workflows from Dockstore and make them accessible on their Terra account to user for their own analysis.

##Who was funded to establish and maintain the AnVIL? What is the funding mechanism?
NHGRI supports AnVIL through [cooperative agreement awards](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL#awards) to the [Broad Institute](https://projectreporter.nih.gov/project_info_description.cfm?aid=9788512&icde=46222930&ddparam=&ddvalue=&ddsub=&cr=1&csb=default&cs=ASC&pball=) (#5U24HG010262) and [Johns Hopkins University](https://projectreporter.nih.gov/project_info_description.cfm?aid=9789931&icde=46222940&ddparam=&ddvalue=&ddsub=&cr=2&csb=default&cs=ASC&pball=) (#5U24HG010263). As a cooperative agreement, NHGRI program staff will provide substantial involvement, assistance, and guidance in project activities. Additional information about the awards and the Funding Opportunity Announcement is available [here](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL).

##Is there non-NHGRI oversight of AnVIL operations?
An [External Consultant Committee (ECC)](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL#externalconsultantcommittee), comprised of a multidisciplinary group of experts, is providing feedback to NHGRI regarding how AnVIL should address the needs of the genomics community.

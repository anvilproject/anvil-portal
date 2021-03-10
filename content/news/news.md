---
title: "Announcing _seqr_in AnVIL"
description: "With the onset of key NHGRI datasets being ingested to AnVIL such as Center for Mendelian Genomics (CMG), Clinical Sequencing Evidence-Generating Research (CSER), and Transamerican Autoimmune Research Network (TARN), the availability of seqr will enable researchers to analyze and annotate their data in the seqr platform as well as collaborate with other investigators as they choose."
---

#AnVIL Community Updates

<News></News>
body text: seqr is being launched today in production within AnVIL to provide a platform for genomic data analysis for rare diseases.  With the onset of key NHGRI datasets being ingested to AnVIL such as Center for Mendelian Genomics (CMG), Clinical Sequencing Evidence-Generating Research (CSER), and Transamerican Autoimmune Research Network (TARN), the availability of seqr will enable researchers to analyze and annotate their data in the seqr platform as well as collaborate with other investigators as they choose. 

[seqr](https://seqr.broadinstitute.org/) is an intuitive browser-based system for analyzing rare disease exome and genome data on a family basis.  It is an open source tool supported by the Translational Genomics Group at the Broad Institute that runs on Google Kubernetes Engine (GKE) and data is loaded using Google Dataproc Spark clusters.  The production instance uses postgres, which is a SQL database to store project metadata and user-generated content (e.g variant notes) and elasticsearch to store variant callsets.

Researchers will need to bring their joint call files to the AnVIL to make use of seqr.  If a joint call file is needed, researchers can make use of [GATK tooling] (https://anvilproject.org/learn/anvil-mooc/use-case-gatk).   
![landing_page_icon1](https://user-images.githubusercontent.com/70272257/110703609-fe4c0c00-81c1-11eb-81a8-fc9d9ffe3382.png)
![landing_page_icon3](https://user-images.githubusercontent.com/70272257/110703621-01df9300-81c2-11eb-80aa-13db7dc82238.png)
![landing_page_icon2](https://user-images.githubusercontent.com/70272257/110703632-03a95680-81c2-11eb-8cbc-7997e6de45a2.png)
<img width="1205" alt="Screen Shot 2021-03-10 at 4 59 27 PM" src="https://user-images.githubusercontent.com/70272257/110703659-0ad06480-81c2-11eb-9b24-743853500c27.png">


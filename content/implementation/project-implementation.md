---
title: "Project Implementation"
author: "AnVIL"
---

#Project Implementation

<hero small>The AnVIL team brings together groups that have extensive experience building open-source platforms, tools, and workflows that are widely used in the genomics community.</hero>

The project will include [Bioconductor](https://www.bioconductor.org/), [Galaxy](https://galaxyproject.org/), [Gen3](https://gen3.org/), [Terra](https://app.terra.bio/), and [Jupyter](https://jupyter.org/) to start and include extension points for adding more tools and services. The AnVIL project will leverage those tools to build a more accessible and integrated platform for the genomics researchers.

##Compute and Storage Infrastructure

<hero small>AnVIL will create a suite of modular cloud services that support storing and analyzing genomic data at scale.</hero>

Initially based on the [Google Compute Platform](https://cloud.google.com/), the AnVIL infrastructure layer will manage resource provisioning, scaling, authentication and authorization, and data access. All the services will be developed under permissive open source license and the available APIs will be built in concert with [GA4GH](https://www.ga4gh.org/) and other standards, making the AnVIL platform an extensible resource for the genomics community.

![Infra Layer](./_images/infra-layer.png)

<inscription>Infra Layer</inscription>

##Data Analysis Platforms

Layered on top of the infrastructure, the data analysis platforms layer will be seeded with of some of the most popular data analysis environments available today. This expandable set of environments will allow you to browse, analyze, and visualize data through a web browser as well as the [API and command line interface](https://github.com/anvilproject/client-apis). The environments will also be linked allowing seamless data access.

![Infra Layer](./_images/app-layer.png)

<inscription>App Layer</inscription>


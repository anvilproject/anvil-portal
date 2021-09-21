---
author: "AnVIL"
title: "Getting Started with Dockstore in AnVIL"
description: "An overview of finding genomic analysis workflows in Dockstore and exporting and running them in AnVIL."
---

# Introduction to Dockstore

`video: https://www.youtube.com/watch?v=WLpnoXySuIw`

### Overview

[Dockstore](https://dockstore.org/) is home to hundreds of workflows for diverse bioinformatics needs. All workflows on Dockstore have an easily accessible source code -- users know exactly what they are running, what input it takes, and its overall structure.

### Exporting WDL Workflows to AnVIL

Dockstore is designed to easily pass a workflow to Terra, AnVIL's compute platform. As indicated in the video above, this can be done by pressing the "AnVIL" button on any WDL workflow. (You may also click the Terra button, but this will take you to a different instance of Terra; if you are working in the AnVIL ecosystem, we recommend sticking to the AnVIL instance of Terra.)

Dockstore also hosts content written in workflow languages besides WDL, but these formats are not currently supported by Terra. Therefore, only WDL workflows display AnVIL’s "Launch with" feature.

### Creating and Sharing Custom Workflows

Can't find a workflow for your specific analysis? Make one yourself and upload it! We welcome contributions to Dockstore, and encourage new users to read our documentation on [registering workflows on Dockstore](https://docs.dockstore.org/en/develop/getting-started/dockstore-workflows.html) as it contains a full walkthrough of the process.

See our [Best Practices for Secure and FAIR Workflows](https://docs.dockstore.org/en/develop/advanced-topics/best-practices/best-practices-secure-fair-workflows.html) guide for additional information on creating sharable workflows exemplifying the [FAIR](https://www.go-fair.org/fair-principles/) (Findable, Accessible, Interoperable, Reusable) guiding principles.

### Further Support

Because Dockstore and Terra work so closely together, users with specific workflow-related questions may want to check [Terra's documentation forum](https://support.terra.bio/hc/en-us) as well as Dockstore's documentation for assistance with running workflows on the cloud.

For Dockstore-specific documentation, please see [docs.dockstore.org](https://docs.dockstore.org/en/develop/)

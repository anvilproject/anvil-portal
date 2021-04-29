---
title: "Data Transfer Into AnVIL"
author: "AnVIL Team"
description: "Guidelines to help an interested party learn how data is transmitted into  AnVIL once the decision has been made to ingest a dataset"
---

#Transferring Data Into AnVIL

<hero>This document details the data transfer protocol during the transition to Gen3 as the primary data repository for the AnVIL. This process will evolve during the transition period.</hero>

## Data Transfer Workflow

1. Program Officers meet with AnVIL Program Management to consolidate information about the dataset (current dbGAP status, number of consortium members, alignment pipeline, functional equivalence, determining reprocessing if-necessary, what are the available phenotypes, file size, file formats, file quantity, any special considerations for access, etc).

1. Workspaces, Buckets and Auth groups are created by Terra Program Management for each cohort and consent combination within the dataset. 

1. Data is Transferred to the bucket.
    1. For small datasets or technically savvy users, data can be directly imported using a tool like gsutil or via the internal Terra interface.
    1. For larger, more complex datasets, the Terra team will interface with a POC from the Pipeline Ops team who can facilitate the transfer from the data’s current location to its eventual home in a bucket.
    1. Sequencing data transferred to google buckets is indexed in Gen3, subject to provided access control mechanisms and data structure (split by cohort-consent)

1. Work with the consortium to address and interpret phenotypic questions to help them to get their data into a more platform-usable format.

1. Phenotypic data is:
    1. Uploaded to the workspace by a member of the Terra team to associate samples, files, and phenotypes together.
    1. Submitted to the graph by members of the University of Chicago team to allow for faceted search and virtual cohort creation. 

1. Access granted to program officers to set up workspace description, etc.

1. Authorization groups are populated.
    1. AnVIL_Devs are added as a secondary group.
    1. The dbGaP telemetry list is linked to the Terra whitelist.
    1. Consortium Officer granted access to add members to consortium whitelist.

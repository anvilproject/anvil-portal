---
title: "Data Security, Management, and Access Procedures FAQ"
author: "AnVIL"
description: "FAQs about data security, management, and access procedures."
---

#Data Security, Management, and Access Procedures
##Can AnVIL share controlled-access data with the broad scientific community?
Per the NIH Guide Notice [NOT-HG-19-024](https://grants.nih.gov/grants/guide/notice-files/NOT-HG-19-024.html), AnVIL is an NIH-designated data repository that is authorized to share controlled-access data derived from human samples, associated phenotypic data and metadata with the research community in a manner that is consistent with the expectations put forth by the [NIH Genomic Data Sharing (GDS) Policy](https://osp.od.nih.gov/wp-content/uploads/NIH_GDS_Policy.pdf).

The AnVIL platform and its services follow the information security guidelines and standards of the “NIST-800-53 rev 4 Moderate” and undergo third party security audits. The AnVIL’s practices are also consistent with the [NIH Security Best Practices for Controlled-Access Data](https://osp.od.nih.gov/wp-content/uploads/NIH_Best_Practices_for_Controlled-Access_Data_Subject_to_the_NIH_GDS_Policy.pdf) and the [Notice for Use of Cloud Computing Services for Storage and Analysis of Controlled-Access Data Subject to the NIH Genomic Data Sharing (GDS) Policy](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-15-086.html).

##How will AnVIL protect the privacy and integrity of the study and study’s participants?
Human genomic datasets and associated phenotypic data or other metadata are stored in AnVIL, a controlled-access NIH-designated data repository under strict security provisions. Investigators and their sponsoring institutions seeking access to data from a controlled-access study available on the AnVIL must agree to the terms of access set forth in the [Data Use Certification (DUC)](https://osp.od.nih.gov/wp-content/uploads/Model_DUC.pdf). Data Access Requests (DARs) are reviewed and approved by an [NIH Data Access Committee (DAC)](https://osp.od.nih.gov/wp-content/uploads/NIH_DACs_Chairs.pdf) for access to specific datasets for a specific research project. Once a user is approved, data can be accessed only through a secure login process.

##Who will make determinations about access to genomic datasets managed by AnVIL?
An [NIH Data Access Committee (DAC)](https://osp.od.nih.gov/wp-content/uploads/NIH_DACs_Chairs.pdf) will make determinations about access to genomic datasets managed by AnVIL. The relevant NIH DAC will refer to the requested study’s Data Use Limitations (DULs) to determine whether the request conforms to the allowable uses of the data. Members of CCDG, CMG, eMERGE, CSER, and other consortia will have “consortium access” to the data from their respective groups. Consortia data will be available as shared workspaces on Terra and access to these Workspaces is established and governed by the consortia.

More information on the role of the NIH DACs can be found [here](https://osp.od.nih.gov/ufaqs/what-is-the-role-of-nih-data-access-committees-dacs-in-considering-risks-to-individuals-their-families-and-groups-or-populations-associated-with-data-submitted-to-dbgap/).

##What policies and guidelines are AnVIL data users expected to follow?
When qualified investigators seek access to controlled-access data, they must describe how they intend to use the data through a [Data Access Request (DAR)](http://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/GetPdf.cgi?document_name=GeneralAAInstructions.pdf). They must also agree to adhere to the NIH Genomic Data Sharing Policy’s ethical principles, terms of data access, and privacy safeguards through a [Data Use Certification (DUC) Agreement](http://osp.od.nih.gov/wp-content/uploads/Model_DUC.pdf). Before access is granted, each request is reviewed by an [NIH Data Access Committee (DAC)](http://osp.od.nih.gov/scientific-sharing/policy-oversight/) for consistency with the appropriate data uses, as outlined by the data submitters, and Policy expectations.

Approved users must also agree to adhere to the [Genomic Data User Code of Conduct](https://osp.od.nih.gov/wp-content/uploads/Genomic_Data_User_Code_of_Conduct.pdf), which, among other terms, includes the agreement to make no attempt to identify or contact individual participants or groups from whom data were collected, ensure that only approved users can gain access to data files, and to provide appropriate acknowledgement in any dissemination of research findings.

##How does AnVIL control access to the data it maintains?
AnVIL employs robust access controls that can selectively grant access to one or more datasets depending on each users’ access approvals. More information on Access Controls in AnVIL can be found [here](https://docs.google.com/document/d/1VX_tV_VtqkDdBjLIFYELjQK12YcJljzGVlXSKgJYdI8/edit).

- Consortium Members - Members of the data-generating consortium are granted “Consortia access” directly by a designated official of the consortium. Guidelines for this official are being drafted by the Data Access Working Group and will be made available when they are finalized.
- dbGaP Data Access Request - Members of the wider community may request access through dbGAP. Upon receiving approval for access in dbGAP, the researcher will be able to access the data within the AnVIL.
- AnVIL Developers - AnVIL developers are given access to data housed on the AnVIL in order to help facilitate testing, debugging, and support, but not for hypothesis-driven research of any type.

##Can users upload non-AnVIL data to an AnVIL Workspace?
Yes. AnVIL allows users to bring outside data to an AnVIL Workspace to use the analysis pipelines and visualization tools, and to combine their data with AnVIL-stored data or other data for analyses. There is a cost associated with cloud storage (see [How does AnVIL handle users’ cloud service costs?](#how-does-anvil-handle-users-cloud-service-costs)). Outside data can be added to a Workspace with unrestricted (open-access) datasets or controlled-access datasets for which that user has been approved.

##Does data uploaded by a user become available to the broader community if it is in an AnVIL Workspace?
No. Data that is brought by a user to the Workspace will only be available to others with permission to access that Workspace. It will not be made available to the broader research community. Neither NHGRI nor the AnVIL grantees will manage user-uploaded, non-AnVIL data. The user is responsible for ensuring that their access to their Workspace is managed responsibly (See [‘Who controls access to users’ pre-release data uploaded into an AnVIL workspace?](#does-data-uploaded-by-a-user-become-available-to-the-broader-community-if-it-is-in-an-anvil-workspace)).

##Who controls access to user-uploaded, non-AnVIL data in an AnVIL Workspace?
When a user uploads data to a Workspace, they are responsible for ensuring authorization domains are attached to the Workspace to control the set of possible users to only those who have adequate permissions to work with those data. For instance, if a lab collects sensitive human genomic information through their research, the user who uploads the lab’s data to a Workspace must select one or more managed groups to set as authorization domains. This way, only members from the group (perhaps other lab members who may also see and use the data) have access. Authorization domains will remain with all cloned versions of the Workspace. If data are shared inappropriately or with unauthorized users through the AnVIL platform, your access to AnVIL may be suspended or terminated and AnVIL staff may contact the user’s institution.

Users creating an AnVIL Workspace are expected to ensure that data use and sharing within any Workspace to which they upload private data, or any copies of such Workspaces, are conducted in accordance with all applicable national, tribal, and state laws and regulations, as well as relevant institutional policies and procedures for handling genomic data.

##Can data be downloaded to local servers for analysis?
Yes. Users may download copies of data to local computers and servers. However, users are encouraged to work with the data on the AnVIL cloud-based and secure environment, where they can also use common bioinformatics tools and analysis packages provided by the AnVIL platform, as well as develop and share their own software tools. Payment for data egress costs is the responsibility of the data downloaders (see [How does AnVIL handle users’ cloud service costs?](#how-does-anvil-handle-users-cloud-service-costs)).

##How will the consent groups be maintained?
Consent groups in AnVIL are managed by depositing each unique consent group into its own Workspace. Doing so enables the AnVIL to grant users access to individual consent groups rather than an entire study, which may contain multiple consent groups that a user may not be approved to access. If a user is approved for multiple consent groups, they can combine multiple Workspaces (consent groups) into an aggregate Workspace to easily conduct an analysis across the consent groups.

##How will data access and use be tracked and audited?
All actions taken within AnVIL’s cloud platform are captured as part of security logging. The AnVIL grantees will periodically audit researcher activities.

##What happens in the event of a Data Management Incident (DMI)?
The standard NIH DMI practice will be followed, including coordination through the NHGRI GPA, the appropriate DAC Chair, and the NIH-wide GDS Governance staff.

Data Management Incidents should be reported to [anvil@mail.nih.gov](mailto:anvil@mail.nih.gov) and [GDS@mail.nih.gov](mailto:GDS@mail.nih.gov) as soon as they are discovered.

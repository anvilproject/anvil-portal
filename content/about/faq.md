---
draft: true
---

#FAQ

##Overview
###What is AnVIL?
The NHGRI Genomic Data Science [The Genomic Analysis, Visualization, and Informatics Lab-space](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL), or ‘AnVIL,’ is NHGRI’s genomic data resource that leverages a cloud-based infrastructure for democratizing genomic data access, sharing and computing across large genomic, and genomic-related data sets. In addition to downloading copies of data to local computers and servers, users will have the option to work with data in a secure cloud environment, where they can also use common bioinformatics tools and packages and develop and share their own software tools.

AnVIL is part of the emerging federated genomic data commons ecosystem, which includes other cloud-based data commons established within and outside the NIH.

###What is an AnVIL Workspace?
An AnVIL workspace is a stand-alone computational sandbox that provides a secure collaborative place to organize data, run and monitor analysis pipelines, and perform interactive analysis using applications such as Jupyter Notebooks. Each Workspace is associated with one GCP billing account that is charged for all compute, egress, and storage costs incurred within the Workspace.

###What is Terra and how does it relate to AnVIL?
[Terra](https://anvil.terra.bio/) is the compute engine of AnVIL. Terra is a secure and scalable platform for biomedical researchers to access data, run analysis tools, and collaborate easily with others. Terra operates on Google Cloud Platform and all costs incurred by the user are billed directly to the user, providing users control to fully manage their resources.

Terra is the analysis unit of AnVIL, where users can analyze, process, visualize, and share data. Terra currently offers access to Jupyter Notebooks with support for Python and R for interactive analysis and access to the Workflow Description Language (WDL) for batch processing of many samples using pipelines. Terra will soon provide access to R Studio and Galaxy to be used as interactive analysis tools.

Security is paramount to AnVIL. Any security concerns should be communicated to the AnVIL team ([help@lists.anvilproject.org](mailto:help@lists.anvilproject.org)).

###What is Gen3 and how does it relate to AnVIL?
Gen3 is the data management system of AnVIL. Gen3 enables exploring datasets with complex variables (phenotypes) associated with them and also allows creation of synthetic cohorts. In AnVIL, users will access Gen3 to explore data sets and create synthetic cohorts that can be sent to a Terra for further analysis.

###What is Dockstore and how does it relate to AnVIL?
Dockstore is the workflow repository of AnVIL. Dockstore hosts WDL workflows and supports additional workflow languages. Users can select workflows from Dockstore and make them accessible on their Terra account to user for their own analysis.

###Who was funded to establish and maintain the AnVIL? What is the funding mechanism?
NHGRI supports AnVIL through [cooperative agreement awards](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL#awards) to the [Broad Institute](https://projectreporter.nih.gov/project_info_description.cfm?aid=9788512&icde=46222930&ddparam=&ddvalue=&ddsub=&cr=1&csb=default&cs=ASC&pball=) (#5U24HG010262) and [Johns Hopkins University](https://projectreporter.nih.gov/project_info_description.cfm?aid=9789931&icde=46222940&ddparam=&ddvalue=&ddsub=&cr=2&csb=default&cs=ASC&pball=) (#5U24HG010263). As a cooperative agreement, NHGRI program staff will provide substantial involvement, assistance, and guidance in project activities. Additional information about the awards and the Funding Opportunity Announcement is available [here](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL).

###Is there non-NHGRI oversight of AnVIL operations?
An [External Consultant Committee (ECC)](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL#externalconsultantcommittee), comprised of a multidisciplinary group of experts, is providing feedback to NHGRI regarding how AnVIL should address the needs of the genomics community.

##Data Security, Management, and Access Procedures
###Can AnVIL share controlled-access data with the broad scientific community?
Per the NIH Guide Notice [NOT-HG-19-024](https://grants.nih.gov/grants/guide/notice-files/NOT-HG-19-024.html), AnVIL is an NIH-designated data repository that is authorized to share controlled-access data derived from human samples, associated phenotypic data and metadata with the research community in a manner that is consistent with the expectations put forth by the [NIH Genomic Data Sharing (GDS) Policy](https://osp.od.nih.gov/wp-content/uploads/NIH_GDS_Policy.pdf).

The AnVIL platform and its services follow the information security guidelines and standards of the “NIST-800-53 rev 4 Moderate” and undergo third party security audits. The AnVIL’s practices are also consistent with the [NIH Security Best Practices for Controlled-Access Data](https://osp.od.nih.gov/wp-content/uploads/NIH_Best_Practices_for_Controlled-Access_Data_Subject_to_the_NIH_GDS_Policy.pdf) and the [Notice for Use of Cloud Computing Services for Storage and Analysis of Controlled-Access Data Subject to the NIH Genomic Data Sharing (GDS) Policy](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-15-086.html).

###How will AnVIL protect the privacy and integrity of the study and study’s participants?
Human genomic datasets and associated phenotypic data or other metadata are stored in AnVIL, a controlled-access NIH-designated data repository under strict security provisions. Investigators and their sponsoring institutions seeking access to data from a controlled-access study available on the AnVIL must agree to the terms of access set forth in the [Data Use Certification (DUC)](https://osp.od.nih.gov/wp-content/uploads/Model_DUC.pdf). Data Access Requests (DARs) are reviewed and approved by an [NIH Data Access Committee (DAC)](https://osp.od.nih.gov/wp-content/uploads/NIH_DACs_Chairs.pdf) for access to specific datasets for a specific research project. Once a user is approved, data can be accessed only through a secure login process.

###Who will make determinations about access to genomic datasets managed by AnVIL?
An [NIH Data Access Committee (DAC)](https://osp.od.nih.gov/wp-content/uploads/NIH_DACs_Chairs.pdf) will make determinations about access to genomic datasets managed by AnVIL. The relevant NIH DAC will refer to the requested study’s Data Use Limitations (DULs) to determine whether the request conforms to the allowable uses of the data. Members of CCDG, CMG, eMERGE, CSER, and other consortia will have “consortium access” to the data from their respective groups. Consortia data will be available as shared workspaces on Terra and access to these Workspaces is established and governed by the consortia.

More information on the role of the NIH DACs can be found [here](https://osp.od.nih.gov/ufaqs/what-is-the-role-of-nih-data-access-committees-dacs-in-considering-risks-to-individuals-their-families-and-groups-or-populations-associated-with-data-submitted-to-dbgap/).

###What policies and guidelines are AnVIL data users expected to follow?
When qualified investigators seek access to controlled-access data, they must describe how they intend to use the data through a [Data Access Request (DAR)](http://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/GetPdf.cgi?document_name=GeneralAAInstructions.pdf). They must also agree to adhere to the NIH Genomic Data Sharing Policy’s ethical principles, terms of data access, and privacy safeguards through a [Data Use Certification (DUC) Agreement](http://osp.od.nih.gov/wp-content/uploads/Model_DUC.pdf). Before access is granted, each request is reviewed by an [NIH Data Access Committee (DAC)](http://osp.od.nih.gov/scientific-sharing/policy-oversight/) for consistency with the appropriate data uses, as outlined by the data submitters, and Policy expectations.

Approved users must also agree to adhere to the [Genomic Data User Code of Conduct](https://osp.od.nih.gov/wp-content/uploads/Genomic_Data_User_Code_of_Conduct.pdf), which, among other terms, includes the agreement to make no attempt to identify or contact individual participants or groups from whom data were collected, ensure that only approved users can gain access to data files, and to provide appropriate acknowledgement in any dissemination of research findings.

###How does AnVIL control access to the data it maintains?
AnVIL employs robust access controls that can selectively grant access to one or more datasets depending on each users’ access approvals. More information on Access Controls in AnVIL can be found [here](https://docs.google.com/document/d/1VX_tV_VtqkDdBjLIFYELjQK12YcJljzGVlXSKgJYdI8/edit).

- Consortium Members - Members of the data-generating consortium are granted “Consortia access” directly by a designated official of the consortium. Guidelines for this official are being drafted by the Data Access Working Group and will be made available when they are finalized.
- dbGaP Data Access Request - Members of the wider community may request access through dbGAP. Upon receiving approval for access in dbGAP, the researcher will be able to access the data within the AnVIL.
- AnVIL Developers - AnVIL developers are given access to data housed on the AnVIL in order to help facilitate testing, debugging, and support, but not for hypothesis-driven research of any type.

###Can users upload non-AnVIL data to an AnVIL Workspace?
Yes. AnVIL allows users to bring outside data to an AnVIL Workspace to use the analysis pipelines and visualization tools, and to combine their data with AnVIL-stored data or other data for analyses. There is a cost associated with cloud storage (see [How does AnVIL handle users’ cloud service costs?](#how-does-anvil-handle-users-cloud-service-costs)). Outside data can be added to a Workspace with unrestricted (open-access) datasets or controlled-access datasets for which that user has been approved.

###Does data uploaded by a user become available to the broader community if it is in an AnVIL Workspace?
No. Data that is brought by a user to the Workspace will only be available to others with permission to access that Workspace. It will not be made available to the broader research community. Neither NHGRI nor the AnVIL grantees will manage user-uploaded, non-AnVIL data. The user is responsible for ensuring that their access to their Workspace is managed responsibly (See [‘Who controls access to users’ pre-release data uploaded into an AnVIL workspace?](#does-data-uploaded-by-a-user-become-available-to-the-broader-community-if-it-is-in-an-anvil-workspace)).

###Who controls access to user-uploaded, non-AnVIL data in an AnVIL Workspace?
When a user uploads data to a Workspace, they are responsible for ensuring authorization domains are attached to the Workspace to control the set of possible users to only those who have adequate permissions to work with those data. For instance, if a lab collects sensitive human genomic information through their research, the user who uploads the lab’s data to a Workspace must select one or more managed groups to set as authorization domains. This way, only members from the group (perhaps other lab members who may also see and use the data) have access. Authorization domains will remain with all cloned versions of the Workspace. If data are shared inappropriately or with unauthorized users through the AnVIL platform, your access to AnVIL may be suspended or terminated and AnVIL staff may contact the user’s institution.

Users creating an AnVIL Workspace are expected to ensure that data use and sharing within any Workspace to which they upload private data, or any copies of such Workspaces, are conducted in accordance with all applicable national, tribal, and state laws and regulations, as well as relevant institutional policies and procedures for handling genomic data.

###Can data be downloaded to local servers for analysis?
Yes. Users may download copies of data to local computers and servers. However, users are encouraged to work with the data on the AnVIL cloud-based and secure environment, where they can also use common bioinformatics tools and analysis packages provided by the AnVIL platform, as well as develop and share their own software tools. Payment for data egress costs is the responsibility of the data downloaders (see [How does AnVIL handle users’ cloud service costs?](#how-does-anvil-handle-users-cloud-service-costs)).

###How will the consent groups be maintained?
Consent groups in AnVIL are managed by depositing each unique consent group into its own Workspace. Doing so enables the AnVIL to grant users access to individual consent groups rather than an entire study, which may contain multiple consent groups that a user may not be approved to access. If a user is approved for multiple consent groups, they can combine multiple Workspaces (consent groups) into an aggregate Workspace to easily conduct an analysis across the consent groups.

###How will data access and use be tracked and audited?
All actions taken within AnVIL’s cloud platform are captured as part of security logging. The AnVIL grantees will periodically audit researcher activities.

###What happens in the event of a Data Management Incident (DMI)?
The standard NIH DMI practice will be followed, including coordination through the NHGRI GPA, the appropriate DAC Chair, and the NIH-wide GDS Governance staff.

Data Management Incidents should be reported to [anvil@mail.nih.gov](mailto:anvil@mail.nih.gov) and [GDS@mail.nih.gov](mailto:GDS@mail.nih.gov) as soon as they are discovered.

##Data Submission
###How do I submit data to AnVIL for sharing with the scientific community?
Follow NHGRI’s guidance on the [NHGRI Genomic Data Sharing (GDS) Policy: Data Submission](https://www.genome.gov/about-nhgri/Policies-Guidance/Genomic-Data-Sharing/data-submission) webpage. The webpage contains a flowchart for Intramural and Extramural Investigators, and links to the necessary forms.  Indicate that data is to be deposited in AnVIL on your NHGRI Genomic Data Sharing Plan (GDSP) form.

The NIH Genomic Data Sharing Policy states that all submissions of human genomic data should be accompanied by an [Institutional Certification](https://osp.od.nih.gov/scientific-sharing/institutional-certifications/) from the responsible Institutional Official(s) of the submitting institution that clearly delineates any limitations on the research use of the data, as expressed in the informed consent documents, and that, in submitting and sharing of the data, consideration has been given to risks to individuals, their families, groups or populations.

The AnVIL team is in the process of formalizing the data submission pipeline. If you have questions about hosting your data on AnVIL please feel free to reach out to the AnVIL team ([help@lists.anvilproject.org](mailto:help@lists.anvilproject.org)) or complete our [onboarding form](https://docs.google.com/forms/d/e/1FAIpQLSe3NViQ8bTkXexqJ7QukcIcSwe1OLlIirScvaP7YXq4TMqa7A/viewform).

###Does NHGRI plan to move data from dbGaP to AnVIL?
Yes. NHGRI plans to transfer data from selected NHGRI-funded studies to the AnVIL platform. Before this happens, Institutions and the study PIs will be notified of the plan to transfer data and will have an opportunity to consult with IRBs and notify the NHGRI if there are substantive concerns.

###What do I need to do if I have data from a study that was explicitly consented for dbGaP but wish to deposit data in AnVIL?
Please discuss this situation with your IRB, the NIH program director for your study and the AnVIL staff. In most cases, the submitting institution will determine whether data may be submitted to AnVIL.

###How should I prepare my informed consent documents to allow for data submission to AnVIL in the future?
Rather than naming a particular data repository (i.e., dbGaP, AnVIL, etc.) as the data repository for your study, consider indicating that data will be deposited in an ‘NIH-designated data repository’ (see the [Informed Consent Resource, Special Considerations for Genome Research](https://www.genome.gov/about-genomics/policy-issues/Informed-Consent-for-Genomics-Research/Special-Considerations-for-Genome-Research#6) for more detailed sample language). This will provide the flexibility to submit to dbGAP, AnVIL, or any other new and relevant NIH-designated repository.

###I have received access to data in a Workspace but I am receiving the message “Cannot access data. To view or download data in this workspace, please set up a billing project. You have $300 in free credits available!” Why is billing required to access this data? What do I need to do to see the data?
Workspaces can be shared between users to share data, workflows, or results on Terra. Each workspace is associated with a Google Cloud Platform (GCP) billing account that is billed for any egress, compute, or storage incurred in the Workspace. Workspaces enable tractability of spending. If a user shares a workspace with another user, the second user has to copy or clone the workspace and associate their own GCP billing account with the cloned workspace in order to perform any egress, compute, or storage requiring tasks. For example, if a Workspace has been shared with you, you would need to clone that Workspace to your account and associate your GCP billing account with the Workspace to view or download the data in the Workspace, since that would invoke compute or egress charges, respectively.

##Resources for AnVIL Users
###Which NHGRI datasets does AnVIL host?
The current list of large-scale datasets which will be available through AnVIL are:
- GSP, including CMGs and CCDGs
- GTEx
- 1000 Genomes
- eMERGE
- CSER (coming soon)

The AnVIL Data Dashboard provides a real time view of which data sets and individual projects are available on AnVIL.

###What user training will AnVIL provide?
AnVIL will offer training materials, online Massive Open Online Courses (MOOC) modules as well as periodic workshops to engage with the AnVIL user community.

###How does AnVIL handle users’ cloud service costs?
The AnVIL utilizes the Google Cloud Platform (GCP). Cloud storage, data egress and computing services of the AnVIL are provided under a ‘user-pays, pass-through’ model. Users of the AnVIL pay for the services they consume on the GCP at the rate charged by the cloud vendor (<https://cloud.google.com/pricing/>) with no additional charges or licensing fees. Users do not pay storage fees for data hosted by AnVIL, but any derivative data created by the user will incur storage fees.

A new Terra user is eligible for the [free credits program](https://support.terra.bio/hc/en-us/articles/360027940952#Free%20Credits%20Overview). The program begins once you accept the Terms and Conditions, and will expire either after 60 days or after you have used $300 worth of credits, whichever happens first. NHGRI is also planning to provide AnVIL users with credits for cloud service charges at the discounted rate negotiated by the [NIH STRIDES](https://datascience.nih.gov/strides) initiative with GCP.

###Who can I contact with further questions?
**_AnVIL Team_**: [help@lists.anvilproject.org](mailto:help@lists.anvilproject.org)\
**_NHGRI AnVIL Contact_**: [anvil@mail.nih.gov](mailto:anvil@mail.nih.gov)

##Using  AnVIL
###I have received access to data in a Workspace but I am receiving the message “Cannot access data. To view or download data in this workspace, please set up a billing project. You have $300 in free credits available!” Why is billing required to access this data?  What do I need to do to see the data?

Workspaces can be shared between users to share data, workflows, or results on Terra. Each workspace is associated with a Google Cloud Platform (GCP) billing account that is billed for any egress, compute, or storage incurred in the Workspace. Workspaces enable tractability of spending. If a user shares a workspace with another user, the second user has to copy or clone the workspace and associate their own GCP billing account with the cloned workspace in order to perform any egress, compute, or storage requiring tasks. For example, if a Workspace has been shared with you, you would need to clone that Workspace to your account and associate your GCP billing account with the Workspace to view or download the data in the Workspace, since that would invoke compute or egress charges, respectively.

###What analysis tools can I use for data analysis on AnVIL?
- [WDL](https://software.broadinstitute.org/wdl/) - Batch processing of GATK and other workflows
- [Jupyter](https://jupyter.org/) - Interactive analysis with the python or R programming languages; the R environment includes a family of [Bioconductor](https://www.bioconductor.org/) 3.10 packages
- [R Studio](https://www.rstudio.com/) (_coming soon_) - Interactive analysis with your favorite R coding platform
- [AnVIL API library](https://github.com/anvilproject/client-apis) (_coming soon_) - Interact with AnVIL data, analysis solutions, and workflows via a command line interface.
- [Galaxy](https://galaxyproject.org/) (_coming soon_) - Access thousands of tools via an intuitive graphical user interface for processing batch analysis with Galaxy Workflows and interactive downstream visualizations.
- [Genome Browser supported by UCSC](http://genome.ucsc.edu/) (_coming soon_) - Interactive analysis of genomic visualizations.

###What data are available on AnVIL?
AnVIL provides access to a diverse array of genomic data sets that can be accessed here (<https://anvil.terra.bio/#library/datasets>). These data include both unrestricted access and restricted access datasets. Data access requests are submitted according to the guidelines provided by the data provider or consortium.

NHGRI consortium data will be hosted primarily on AnVIL. Initial releases of data from the Centers For Common Disease Genomics (CCDG), Centers for Mendelian Diseases (CMG), Electronic Medical Records and Genomics (eMERGE) Network, and Clinical Sequencing Evidence-generating Research (CSER) consortium will be hosted on AnVIL. Researchers can apply for access to these data on dbGaP (<https://dbgap.ncbi.nlm.nih.gov/>). Once granted access, users can access their data on the Terra component of AnVIL by linking their eRA identities. Data will be made available to users in shared Workspaces and later accessible from Gen3.

###Which of the NHGRI consortium data are available on AnVIL?
Initial releases and project IDs of datasets from the CCDG, CMG, eMERGE, CSER, and GTEx can be found on the AnVIL Data Dashboard.

###Where can I find documentation to “get started” on AnVIL?
There are resources available on the AnVIL Portal (<https://anvilproject.org/training/guides>) to help users get registered on AnVIL and provide some introductory usage guides.






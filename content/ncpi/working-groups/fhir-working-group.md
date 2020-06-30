

#FHIR Working Group

<hero small>The FHIR Working Group is exploring the potential of HL7 FHIR to support the exchange of clinical and phenotype data between the NCPI effort's particpating platforms.</hero> 

### Co-Chairs
- Robert Carrol (Org)
- Allison Heath (Org)

> TODO: How do we handle the time aspect of this content? It mentions 1 month max etc, but when did it start. Need some rewordig so it will not be stale in a few months.

Recently, there is increasing attention on the potential of HL7 FHIR, a standard developed primarily for clinical data interoperability. Electronic Health Record interoperability has been a serious challenge in the field for the length of its existence - fraught with challenges across the spectrum of technical and policy.
 
 Similar challenges face the research world in using FHIR: the standard has only been lightly implemented in clinical practice, though at times to great effect, and the tools researchers need to effectively use this complex data do not exist. However, the promise of interoperability of systems with large support in the community is one that’s hard to ignore in the context of clinical/phenotypic data interoperability for the NCPI efforts. 

## Initial Objectives
An initial objective of the FHIR working group (co-chaired by Robert Carroll and Allison Heath) is to have a practical approach for learning and prototyping with FHIR to gain a shared understanding of the problems it solves.
 
 Our first project is a collaborative technical “hands-on” project to allow teams to gain hands-on experience with FHIR. This will allow us to better communicate and create a roadmap for clinical data interoperability between datasets hosted by participants in NCPI. 
 
 As knowledge is gained, we anticipate needing to reevaluate the objectives of this working group. But without further ado - let’s start forging a path!

## Project Forge

###Objectives and Goals

This project will serve as a hands-on group exercise with the following objectives:

* Learn how to iteratively develop and test a FHIR model.
* Learn how to collaborate on model development.
* Learn how to map, transform, and load source data as FHIR resources into a FHIR server.
* Learn how to search for FHIR data using the search API or FHIR Data Dashboard.


Goals of this project are:
* Spark ideas for collaboration on tool development, standards, and processes.
* Develop a shared understanding of the current challenges in FHIR.
* Start discussions on what interoperable FHIR model(s) look like.
* Better inform a longer term FHIR interoperability roadmap.

Overall timeline for this project is 3 months (max) - if we’re done earlier, great!

## Project Forge Setup - 1 month
To make this experience effective, we will have a shared development environment and a well-documented initial FHIR development toolchain.
 
 The initial focus of the work will be on the teams actively participating in the NIH Cloud-based Platform Interoperability (NCPI), but will be done openly and available for the whole community. This will be based on the initial experiences by the Kids First DRC team for a quick start, but a perfectly valid outcome of this project is that different environments or development toolchains are needed in the long term.
 
 The KFDRC team will be responsible for the infrastructure and development process setup. Each of the stacks should help inform on the project setup, primarily the initial demo datasets and identifying the technical members who will actively be participating in this project. 

### Infrastructure Setup
1. Deploy a Smile CDR FHIR dev server and FHIR Data Dashboard app
    * Host in KF environment (only until end of this project)
        * NIH STRIDES AWS as a separate Virtual Private Cloud (VPC)
    * Access will be granted to developers identified from each stack via a bastion host
    * Will require SSH tunneling to access servers and endpoints
    * Will setup FHIR server (Smiles CDR) and user accounts with appropriate permissions

### Development Process Setup
1. The model development toolchain in kids-first/kf-model-fhir and the deployment scripts in kids-first/kf-api-fhir-service should be documented and ready to use by others
Once ready, these will be forked into a centralized GitHub org for everyone to use, proposing: `ncpi-fhir`
1. Identify FHIR model developers from each org that will look at the mapping sheet and author the FHIR resources that make up the model
    * Must know or learn [FHIR 101](https://github.com/ncpi-fhir/fhir-101)
    * Must know or learn how to run a Python-based CLI tool (e.g. [kf-model-fhir](https://github.com/kids-first/kf-model-fhir))
    * Must know or become familiar with [HL7 IG Publisher](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation)

### Dataset Setup 
1. Identify representative datasets that represents core use cases
    * Each stack should nominate/prioritize datasets that are “in hand” and can be used for development in the timeframe of this project by next WG
    * The FHIR WG will evaluate and prepare the datasets for working in FHIR
    * One dataset will be chosen as the initial working dataset
    * Could do more than one, but they should be executed on serially, not in parallel
    * Accessible for development research in a short timeframe

## Project Forge Execution - 2 Months (Max)
1.  Developers identified in the Project Setup will work together to create the v0.1.0 model
    * Use the FHIR model dev toolchain to author resource files
    * Create Pull Requests for others to review the resources
    * All PRs will be reviewed by other members of the WG with domain expertise
1. Define the FHIR model concepts to iterate on for the dataset
    * E.g. time/age versus dates
1. Create the v0.1.0 model release
    * After the v0.1.0 FHIR model resources have been merged into master branch
1. Deploy the v0.1.0 model to the FHIR development server
1. Load data from the demo dataset into the FHIR server as v0.1.0 FHIR resources
1. WG members review data and discuss any changes needed to the FHIR resources (model based resources or ones representing actual data)
1. Rinse and repeat steps 1-6, if we’re done in the first iteration - great!

## Communication Channels
1. WG meetings to demo progress and do high level planning, detailed planning in other forums
1. Github Issues on working group repository `ncpi-fhir/project-forge`
1. Slack channel NCPI organization

## To Be Determined Later
The primary goal of this project is to create a shared understanding of FHIR models and core capabilities. With this shared understanding, it should be easier to divide and conquer many other aspects of FHIR interoperability. But to get off on the right start, we’re defining a few things we’re tabling for now:

* Evaluation of FHIR servers
* Robust ETL in/out of FHIR 
* Deployment methods in different platforms / cloud providers
* Dataset level authentication
* PFB/FHIR integration (PFB work can still proceed in the Systems Interop WG)

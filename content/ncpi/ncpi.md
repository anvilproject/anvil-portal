---
draft: false
---

# NCPI - NIH Cloud Platform Interoperability

<hero small>The goal of the NIH Cloud Platform Interoperability effort (NCPI) is to establish guidelines and technical standards that will empower end-user analyses across the NIH's genomic analysis platforms</hero>


The Kids First Data Resource is part of a new “NIH Cloud-Based Platforms Interoperability” (NCPI) effort, which is a collaboration with NHGRI AnVIL, NHLBI BioData Catalyst, and the NCI Cancer Research Data Commons (CRDC). The goal is to enable and promote end-user analyses of human genomic and phenotypic datasets across these platforms through federation and interoperability.
 
 This new interoperability effort is being driven by additional key use cases that our research community has identified.


## Clout Platform Components

Like the Kids First Data Resource, each of these platforms are made up of

1. portals for finding and aggregating data,
1. cloud based analysis workspaces,
1. collections of analytical workflows and tools,  and
1. cloud-based data storage repositories (in either AWS or Google),

… and the goal is to establish guidelines and technical standards that will empower end-user analyses across these platforms


## Some Proposed Principles for Interoperating Cloud Based Data Platforms

1. **Interoperate with other trusted platforms**: if another trusted
platform is part of your data ecosystem or wants to create an
ecosystem with you, then interoperate with it.

2. **Follow the golden rule of data resources**: if you take someone else’s
data, let them have access to your data (assuming you are operating at
the same level of security and compliance).

3. **Support the principle of least restrictive access**: Provide another
trusted platform access to your data in the least restrictive manner
possible.
    - With rare exceptions, a data resource should provide an API so
that application in other trusted platforms can access data directly.
    - If this is not possible due to the size or sensitivity of your data, then support the ability for approved queries or analyses to be run
over your data and the results returned. Sometimes this is called
an analysis or query gateway.

1. **Agree on standards, compete on implementations**:
    - It is important to open up your ecosystem to competition, less it stagnates.
    - What this principle means is that a platform should expose its data and
resources via APIs so that other applications can be part of your ecosystem.
    - It is not necessary that the sponsor of the data resource fund other systems
or applications, but you do not want to implicitly create a monopoly by
requiring all users of your data use a particular application or platform.
    - Remember that not all researchers have the same requirements, or the same
preferences, and in general a mix of applications, systems and platforms is
better than a single one.

1. **Support patient partnered research**: Support patient partnered
  research so that individuals can provide their data and have control
  over it within your system. If you cannot do this today, add this to your
  platform roadmap.

## Working Groups
Over the last 6 months, the group established working groups to address various layers of interoperability;

These include

* (Community Governance WG)        addressing operational barriers to trans-platform data sharing,

* (Systems Interoperation WG)      testing technical standards for exchanging data across platforms,

* (Outreach WG)        coordinating training resources for transitioning researchers to the cloud,

* (FHIR WG)        and piloting FHIR standards for modeling and exchanging clinical and phenotypic data.

While the working groups are making tremendous progress on these critical first steps to achieving interoperability…., additional activities will be needed (e.g. data harmonization).  

Currently all of these platforms use different methods of logging in and managing approvals to controlled access data, and this is one of the major roadblocks to interoperability.
 
 The NIH CIT is working to create one unified Researcher Auth Service (RAS) that will streamline access to multiple NIH data resources. You saw today how many systems you have to log into even just within the Kids First environment, to integrate data access across various sources, so RAS will simplify Kids First data access procedures too.
 
This group is making good progress and they plan to deploy components of the service for systems that enable single sign on and modernized communication of dbGaP approval information this summer.







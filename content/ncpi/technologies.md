---
description: "NCPI members are exploring / developing the following technologies to in support of cloud platform interoperability."
title: "Key Technologies Driving Cloud Platform Interoperability"
---

# Interoperation Technologies

<hero>NCPI members are exploring / developing the following technologies in support of cloud platform interoperability.</hero>


## Researcher Auth Service (RAS)
Researcher Auth Service (RAS) is an effort by the NIH's Center for Information Technology (CIT) to provide a common mechanism by which researchers can establish their identity and access data they are authorized to use across the systems outlined above. The RAS Application Programming Interface (API) allows seamless access to researchers for integrated data repositories.

Using RAS a researcher accessing NIH data resources can log in with their eRA Commons credentials and they would then be able to access any integrated repository without having to log in again. Existing rules for authorization will be enforced so a user can only access data that he or she has been authorized to view.

RAS uses open standards and protocols and provides integrating systems with many standards-based options for integration. RAS is part of the NIH CIT IAM General Support System (GSS) which is a Federal Information Security Management Act (FISMA) High system. As such, RAS adheres to NIST (National Institute of Standards and Technology) 800-53 and 800-57 guidelines pertaining to configuration management, least privilege, and cryptographic key establishment & management.

For detailed documentation of the RAS  API see [Researcher Auth Service (RAS) Project Service Offerings]([https://auth.nih.gov/docs/RAS/serviceofferings.html).

## Data Repository Service (GA4GH DRS)

GA4GH DRS. The Global Alliance for Genomics and Health (GA4GH) is an international coalition formed to enable the sharing of genomic and clinical data. The GA4GH Data Repository Service (DRS) provides a generic interface to data repositories so data consumers, including workflow systems, can access data objects in a single, standard way regardless of where they are stored and how they are managed.

The primary functionality of DRS is to map a logical ID to a means for physically retrieving the data represented by the ID. There are two styles of DRS URIs, Hostname-based and Compact Identifier-based, both using the drs:// URI scheme. The API defines the characteristics of those IDs, the types of data supported, how they can be pointed to using URIs, and how clients can use these URIs to ultimately make successful DRS API requests.

For more informatoin on the most recent version of this API (1.1) see the [Data Repository Service 1.1 Documentation](https://ga4gh.github.io/data-repository-service-schemas/preview/release/drs-1.1.0/docs/).

## Fast Healthcare Interoperability Resources (FHIR)

Fast Healthcare Interoperability Resources (FHIR) is a standard describing data formats and elements (known as "resources") and an API for exchanging electronic health records (EHR). As patients move around the healthcare ecosystem, their electronic health records must be available, discoverable, and understandable across systems. Further, to support automated clinical decision support and other machine-based processing, the data must also be structured and standardized.

The FHIR standard was created by the Health Level Seven International (HL7) health-care standards organization using a modern web-based suite of API technology, including a HTTP-based RESTful protocol, HTML and Cascading Style Sheets for user interface integration, a choice of JSON, XML or RDF for data representation, and Atom for results.

One of its goals is to facilitate interoperation between legacy health care systems, to make it easy to provide health care information to health care providers and individuals on a wide variety of devices from computers to tablets to cell phones, and to allow third-party application developers to provide medical applications which can be easily integrated into existing systems.

For more information and a definition of the FHIR standard see [HL7 FHIR Release 4](https://www.hl7.org/fhir/overview.html).

## Portable Format for Bioinformatics (PFB)
The Portable Format for Bioinformatics (PFB) is an [Avro](https://avro.apache.org/docs/current/)-based file format that bundles schema, data, ontologies/controlled vocabularies, and pointers to data files in a single, serializable format that can be sent easily across systems and has the flexibility for different data models.

PFBs are used to bring search results from hosted datasets into workspace environments that users can leverage for computational analysis.

A Python library and command line interface to create, view and edit PFB files can be found here: https://github.com/uc-cdis/pypfb/#readme.

For more information on the PFB format and schema see the [pyPFB](https://github.com/uc-cdis/pypfb/tree/master/doc) documentation. 



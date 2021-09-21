---
title: "Platform and Data Security"
author: "AnVIL"
description: "An overview of the NHGRI AnVIL’s platform and data security governance model."
---

# Platform and Data Security

The NHGRI AnVIL and the data it contains are secured in accordance with the industry best practices, the [NIST 800-53 Rev 4](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r4.pdf) security controls at the Moderate baseline, and NIST 800-53 privacy controls documented in Appendix J.

Across the AnVIL, we aim to adhere to information security best practices, making use of four proven design concepts to implement defense-in-depth security:

* **Authenticate:** All components require authentication at every step, not just the perimeter
* **Authorize:** All data requires explicit authorization to access
* **Audit:** All data access is logged (to a different system), with alerts for anomalous events
* **Encrypt:** All data-in-transit and all data-at-rest is encrypted.

AnVIL systems also follow a model of continual assessment. This means the code is continually penetration tested, scanned, and tested. Additionally, systems are tested annually by independent auditors.

## Platform Services

The AnVIL is made up of a variety of software developed by different institutions including the Broad Institute’s Terra platform, the University of Chicago Center for Translational Data Science’s Gen3 platform, and the University of California Santa Cruz’s Dockstore software. These are collectively referred to as “Platform Services."

## Third Party Applications

In addition to Platform Services, third parties may write their own tools using the APIs from Terra, Gen3, or Dockstore. These tools are referred to as “3rd party applications” and may have their own authentication and authorization abilities. They exist outside the security boundaries of the Platform Services.

## Authority to Operate

Platform Services maintain an Authority to Operate from a US Federal Government Authorizing Official but that is not a requirement for inclusion in the AnVIL ecosystem. 

Instead, all Platform Services and third-party applications must be approved by the Broad Institute Office of the Chief Information Security Officer (CISO) who functions as the AnVIL Authorizing Official (AO) and who reviews the security package of each system to ensure that Anvil’s standard security baseline is met.

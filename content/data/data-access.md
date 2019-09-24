---
date: "10 June 2019"
title: "AnVIL Data Access"
author: "AnVIL"
---


# Data Access 


[[heroSmall]]
| AnVIL requires robust access controls that can selectively grant access to a number of groups with different access request requirements 


## Access Groups
**Consortium Members** - Members of the data-generating consortium are granted access directly by a designated official of the consortium.

**External Researcher Access** - Members of the wider community may request access through dbGAP. Upon receiving access in dbGAP, the researcher will be able to access the data within AnVIL. 

**AnVIL Developers** - Per the terms of the grant, AnVIL developers are given access to data housed on AnVIL in order to help facilitate testing, debugging, and support. 

## Specifications
Terra maintains access controls through a list of Authorization Groups (Auth Groups) attached to each workspace. If a workspace has an auth group attached, it can only be interacted with by users inside the group. Auth groups can also contain other groups, allowing a simple nesting structure to make additions and removals simple. How each group above gets their names onto an auth group varies per user list. 

In general, a top level auth group is created for the workspace with the data, and each of the user lists is added as a secondary group - populated according to the parameters for those users.

1. **Consortium Members** - As a dataset is onboarded, a point of contact is identified to serve as the point of contact for consortium access. This person is granted administrative rights over an auth group. Consortium members are added and removed from this list periodically to match the consortium’s membership records and maintain the integrity of the list.

1. **External Researcher Access** - dbGAP deposits a copy of their whitelist to a secure ftp site. This list is read by Terra and synced to an internal auth group. It is maintained entirely and solely by dbGAP beyond the initial linking to a new workspace.

1. **AnVIL Developers** - A list of current developers is maintained by the Project Management team. Users on this list are added/removed periodically to maintain the integrity of the list





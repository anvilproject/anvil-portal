---
title: "Data Access Controls"
author: "AnVIL"
description: "AnVIL access controls can selectively grant access to groups with different access requirements."
---

# Data Access Controls

<hero>AnVIL access controls can selectively grant access to groups with different access requirements.</hero>

Terra uses authorization groups (auth groups) to control access to workspaces. If a workspace has an auth group attached, the workspace can only be interacted with by users belonging to the auth group.

Auth groups can also contain other “secondary” auth groups, allowing auth group nesting to make additions and removals easier.

To control access to workspaces containing data, a top-level auth group is created for the workspace and user lists are added to secondary auth groups within the top-level auth group.

## Enabling Data Access


### Consortium Member Access

Members of the data-generating consortium are granted access directly in Terra by a designated official of the consortium. Guidelines for this official are outlined in the [Consortium Guidelines for AnVIL Data Access](/learn/data-submitters/resources/consortium-data-access-guidelines) resource.

###  External Researcher Access
Members of the wider community may [request access through dbGAP](/learn/accessing-data/requesting-data-access#accessing-controlled-access-data). Upon receiving approval in dbGAP, the researcher will be able to access the requested data within AnVIL once they have [linked their Terra account and eRA Commons address](/learn/accessing-data/requesting-data-access#linking-your-terra-account-and-your-era-commons-address).

To synchronize dbGaP approvals with Terra, dbGaP periodically deposits a copy of their access list to a secure FTP site. This access list is then read by Terra and synchronized to the appropriate workspace auth groups. In this manner, workspace auth group membership for external researchers is maintained solely by dbGaP.


## Data Access Monitoring and Logging

Both Terra and Gen3 operate in a FISMA-Moderate environment and comply with all requirements set forth in NIST-800-53. This includes robust logging of access to data, periodic audits, and monitoring for abnormal use patterns.

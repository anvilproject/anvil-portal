---
title: "Data Submission FAQ"
author: "AnVIL"
description: "FAQs about data submission."
---

#Data Submission
##How do I submit data to AnVIL for sharing with the scientific community?
If you have questions about submitting your data to AnVIL please contact the AnVIL team (<help@lists.anvilproject.org>) or complete our onboarding [form](https://docs.google.com/forms/d/e/1FAIpQLSe3NViQ8bTkXexqJ7QukcIcSwe1OLlIirScvaP7YXq4TMqa7A/viewform).


The NIH Genomic Data Sharing Policy states that all submissions of human genomic data should be accompanied by an [Institutional Certification](https://osp.od.nih.gov/scientific-sharing/institutional-certifications/) from the responsible Institutional Official(s) of the submitting institution that clearly delineates any limitations on the research use of the data, as expressed in the informed consent documents, and that, in submitting and sharing of the data, consideration has been given to risks to individuals, their families, groups or populations.

The AnVIL team is in the process of formalizing the data submission pipeline. If you have questions about hosting your data on AnVIL please feel free to reach out to the AnVIL team ([help@lists.anvilproject.org](mailto:help@lists.anvilproject.org)) or complete our [onboarding form](https://docs.google.com/forms/d/e/1FAIpQLSe3NViQ8bTkXexqJ7QukcIcSwe1OLlIirScvaP7YXq4TMqa7A/viewform).

##Does NHGRI plan to move data from dbGaP to AnVIL?
Yes. NHGRI plans to transfer data from selected NHGRI-funded studies to the AnVIL platform. Before this happens, Institutions and the study PIs will be notified of the plan to transfer data and will have an opportunity to consult with IRBs and notify the NHGRI if there are substantive concerns.

##What do I need to do if I have data from a study that was explicitly consented for dbGaP but wish to deposit data in AnVIL?
Please discuss this situation with your IRB, the NIH program director for your study and the AnVIL staff. In most cases, the submitting institution will determine whether data may be submitted to AnVIL.

##How should I prepare my informed consent documents to allow for data submission to AnVIL in the future?
Rather than naming a particular data repository (i.e., dbGaP, AnVIL, etc.) as the data repository for your study, consider indicating that data will be deposited in an ‘NIH-designated data repository’ (see the [Informed Consent Resource, Special Considerations for Genome Research](https://www.genome.gov/about-genomics/policy-issues/Informed-Consent-for-Genomics-Research/Special-Considerations-for-Genome-Research#6) for more detailed sample language). This will provide the flexibility to submit to dbGAP, AnVIL, or any other new and relevant NIH-designated repository.

##I have received access to data in a Workspace but I am receiving the message “Cannot access data. To view or download data in this workspace, please set up a billing project. You have $300 in free credits available!” Why is billing required to access this data? What do I need to do to see the data?
Workspaces can be shared between users to share data, workflows, or results on Terra. Each workspace is associated with a Google Cloud Platform (GCP) billing account that is billed for any egress, compute, or storage incurred in the Workspace. Workspaces enable tractability of spending. If a user shares a workspace with another user, the second user has to copy or clone the workspace and associate their own GCP billing account with the cloned workspace in order to perform any egress, compute, or storage requiring tasks. For example, if a Workspace has been shared with you, you would need to clone that Workspace to your account and associate your GCP billing account with the Workspace to view or download the data in the Workspace, since that would invoke compute or egress charges, respectively.

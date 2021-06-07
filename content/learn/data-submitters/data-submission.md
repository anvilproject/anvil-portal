---
title: "Prepare for submission"
author: "AnVIL"
description: "How to organize and format data tables for ingest to the AnVIL"
---

# Prepare for submission

To prepare data for submission, you will generate a spreadsheet file in TSV format for each table in the data workspace (node in the Data Dictionary). Each individual entity (subject, sample, etc.) in the table has its own row. Each column is a distinct type of data.


## Generate TSV Load files

Your spreadsheet can include an almost unlimited number of rows (individual entities) and columns (entity properties). For a video walkthrough of generating a TSV file from a template, see [this video](INSERT YOUTUBE LINK HERE 06-07-2021).

### Unallowed characters
All fields in the spreadsheet may only include numbers, letters, “:”, “-” and “_”.

#### First column header formatting
The first column header field identifies the node in the Data Model. First column headers  ***must have the the following format*** (typed exactly as shown - including all punctuation):
- **Subject table** - `entity:subject_id`
- **Sample table** - `entity:sample_id`
- **Sequencing table** - `entity:sequencing_id`
- **Family table** - 1entity:family_id`

**Example: Subject Table**


<figure>
<img src="./_images/subject-spreadsheet.png" alt="Subject spreadsheet image."/>
<figure-caption>TODO  - figure caption for subject spreadsheet image.</figure-caption>
</figure>

### Associating data in different tables

Any data beyond the minimal data must always be linked to either the `subject_id`, `sample_id`, `family_id`, or sequence filename - depending on what the data element describes. Where possible, try to include this additional data in the main subject, sample, or sequencing tables. Otherwise, the data can be submitted as separate tables. These tables must include a column with the associated `_id`..


### Addressing repeated elements
Please bring any repeating data elements (i.e. multiple values for a given data element for an individual) to the attention of the AnVIL team to ensure proper modeling and submission. For example:
- An individual in a data set has a measurement (e.g., blood pressure, lab test, BMI) taken at multiple time points.
- An individual in a data set is affected by multiple disease/phenotype/conditions included in the study (e.g., an individual in a diabetes study has both diabetes and diabetes retinopathy; both are being tracked in the study).

## Save as "tab-delimited text" or "tab-separated values"
Your editor may give you a warning, but we assure you, it's fine! Also, Terra will completely ignore the name you give the file. It's the root entity in the first column header that determines the table name in the workspace.

### TSV versus TXT file extensions
Depending on what spreadsheet editor you use, when you save in the proper format your spreadsheet may have either a ".tsv" or a ".txt" extension. Terra will accept either one.


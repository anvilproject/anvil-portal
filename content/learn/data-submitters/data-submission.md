---
title: "Prepare for submission"
author: "AnVIL"
description: "How to organize and format data tables for ingest to the AnVIL"
---

# Prepare for Submission

To prepare data for submission, you will generate a spreadsheet file (TSV/TXT/CSV format) for each table in the data workspace (node in the Data Dictionary).  Each individual entity (subject, sample, etc.) in the table has its own row. Each column is a distinct type of data.


## Generate Table Load Files (TSV, CSV or TXT format)

Your spreadsheet can include an almost unlimited number of rows (individual entities) and columns (entity properties). A video walkthrough of generating a TSV file from a template is available below:

`video: https://youtu.be/7YyWptsdC-w`


### Unallowed Characters
Your data spreadsheet may only contain numbers, letters, “:”, “-” and “_”. **No special characters (&, $, %, #, etc.) are allowed in any fields of the TSV file**.

### Required Formatting
First column header
The first column header field in the load file is the identifier key that identifies the node in the Data Model. ***First column headers must have the the following format*** (typed exactly as shown - note the `:` and `_` punctuation):
- **Subject table** - `entity:subject_id`
- **Sample table** - `entity:sample_id`
- **Sequencing table** - `entity:sequencing_id`
- **Family table** - `entity:family_id`





<figure>
<img src="./_images/subject-spreadsheet.png" alt="Subject spreadsheet image."/>
<figure-caption>Example: Subject Table in a spreadsheet editor.</figure-caption>
</figure>


### Associating Data in Different Tables

**Hint** - Where possible, try to include this additional data in the `subject`, `sample`, or `sequencing` tables. If that’s not an option, the data can be submitted as separate tables. Any data beyond the minimal data must always be linked to either the `subject_id`, `sample_id`, `family_id`, or sequence filename - depending on what the data element describes (i.e. additional tables must include a column with the associated `_id` - for example, to link an additional table to a subject, make sure to include a `subject_id` column).


### Addressing Repeated Elements
Please bring any repeating data elements (i.e. multiple values for a given data element for an individual) to the attention of the AnVIL team to ensure proper modeling and submission.

Examples:
- An individual in a data set has a measurement (e.g., blood pressure, lab test, BMI) taken at multiple time points.
- An individual in a data set is affected by multiple disease/phenotype/conditions included in the study (e.g., an individual in a diabetes study has both diabetes and diabetes retinopathy; both are being tracked in the study).

### Save as "Tab-Delimited Text" or "Tab-Separated Values"
Your editor may give you a warning about losing data in this format, but we assure you, it's fine! Also, Terra will completely ignore the name you give the file. It's the root entity in the first column header (the part in front of the `_id`) that determines the table name in the workspace.

### TSV versus TXT File Extensions
Depending on what spreadsheet editor you use, when you save in the proper format your spreadsheet may have either a ".tsv" or a ".txt" extension. Terra will accept either one.


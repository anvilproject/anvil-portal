---
title: "Step 3 - Prepare for submission"
author: "AnVIL"
description: "How to organize and format data tables for ingest to the AnVIL"
---

# Step 3 - Prepare for Submission

To prepare data for submission, you will generate a spreadsheet file (TSV/TXT/CSV format) for each table in the data model.  Each individual entity (subject, sample, etc.) in the table has its own row. Each column is a distinct type of data.

### Tables in an AnVIL Data Workspace

To learn how workspace tables help and organize data in the AnVIL, see [Managing Data with Workspace Tables](https://support.terra.bio/hc/en-us/articles/360025758392-Managing-data-with-workspace-tables-) (estimated read time 15 minutes).

If you prefer a video, you can watch this [“Introduction to data tables”](https://youtu.be/IeLywroCNNA) video on YouTube (5:25 min).


## 3.1 - Generate Table Load Files (TSV, CSV or TXT format)

Your spreadsheet can include an almost unlimited number of rows (individual entities) and columns (entity properties). A video walkthrough of generating a Load File (TSV format)  from a template is available below:

`video: https://youtu.be/7YyWptsdC-w`


### Unallowed Characters
Your spreadsheet may only contain numbers, letters, “:”, “-” and “_”. **No special characters (&, $, %, #, etc.) are allowed in any fields of the Load file**.

### Required Formatting

The first column in the load file is the identifier key (ID field). The first column header corresponds to the node in the data model.

>First column headers must have the the following format typed exactly as shown - note the `:` and `_` punctuation:


- **Subject table** - `entity:subject_id`
- **Sample table** - `entity:sample_id`
- **Sequencing table** - `entity:sequencing_id`
- **Family table** - `entity:family_id`





<figure>
<img src="./_images/subject-spreadsheet.png" alt="Subject spreadsheet image."/>
<figure-caption>Example: Subject Table in a spreadsheet editor.</figure-caption>
</figure>


### Associating Data in Different Tables

**Hint** - Where possible, try to include data in the `subject`, `sample`, or `sequencing` tables. If that’s not an option, the data can be submitted as separate tables. Any data beyond these minimal required tables must always be linked to either the `subject_id`, `sample_id`, `family_id`, or `sequencing_id` - depending on what the data element describes .For example, to link data in an additional table to a subject, make sure to include a `subject_id` column.


### Addressing Repeated Elements
Please bring any repeating data elements (i.e. multiple values for a given data element for an individual) to the attention of the AnVIL team to ensure proper modeling and submission.

Examples:
- An individual in a data set has a measurement (e.g., blood pressure, lab test, BMI) taken at multiple time points.
- An individual in a data set is affected by multiple disease/phenotype/conditions included in the study (e.g., an individual in a diabetes study has both diabetes and diabetes retinopathy; both are being tracked in the study).

## 3.2. - Save as "Tab-Delimited Text" or "Tab-Separated Values"
Your editor may give you a warning about losing data in this format, but we assure you, it's fine! Also, Terra will completely ignore the name you give the file. It's the root entity in the first column header (the part in front of the `_id`) that determines the table name in the workspace.

### TSV versus TXT File Extensions
Depending on what spreadsheet editor you use, when you save in the proper format your spreadsheet may have either a ".tsv" or a ".txt" extension. Terra will accept either one.


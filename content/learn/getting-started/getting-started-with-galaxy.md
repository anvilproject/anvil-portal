---
author: "AnVIL"
title: " Alpha Version of Galaxy Running in AnVIL/Terra"
description: "An overview and tutorial of how to use Galaxy on AnVIL."
---

# Alpha Version of Galaxy Running in AnVIL/Terra

We are pleased to announce that Galaxy (<https://galaxyproject.org>) is now available within AnVIL! 

## Overview of Galaxy in the Cloud

`video: https://www.youtube.com/watch?v=-Q4SjLEd99s`

## Launching Galaxy in AnVIL

To access Galaxy use the new “Create a Cloud Environment for Galaxy” feature under Notebooks.

![Create a cloud environment for Galaxy](../_images/getting-started/galaxy-cloud-environment-create.png)



This will take you to the AnVIL branded version of Galaxy!

![AnVIL branded Galaxy](../_images/getting-started/galaxy-anvil-branded-galaxy.png)

From the AnVIL branded version of Galaxy, users can browse files in their AnVIL/Terra Workspace and perform a variety of genomics research.

![Browsing files in the AnVIL/Terra Workspace](../_images/getting-started/galaxy-browsing-files.png)

![bcftools](../_images/getting-started/galaxy-bcf-tools.png)

## Step-by-Step Tutorial
The step-by-step tutorial below demonstrates how to compute quality metrics of unaligned reads, align the reads to a reference genome using bowtie2, plot a coverage histogram, call variants using FreeBayes, and then summarize the variant calls using bcftools.

### I. Launching Galaxy

1. To access it, visit the AnVIL portal (<https://anvilproject.org>) and click on “Launch Terra”.\
![Step 1](../_images/getting-started/galaxy-step-1.png)
1. This will take you to the Terra sign in page, which allows you to sign in using your Google credentials.\
![Step 2](../_images/getting-started/galaxy-step-2.png)
1. If this is the first time you are using AnVIL, you should first link your AnVIL account to the NHGRI AnVIL Data Commons Framework Services from your AnVIL profile page (<https://anvil.terra.bio/#profile>). This is done using the bottom link on the right hand side and signing in using your ERA commons identity.\
![Step 3](../_images/getting-started/galaxy-step-3.png)
1. After signing in, you should see that your account is now linked. You will need to renew your link every 30 days.\
![Step 4](../_images/getting-started/galaxy-step-4.png)
1. Once your accounts are linked, return to the workspace list available at <https://anvil.terra.bio/#workspaces>.\
![Step 5](../_images/getting-started/galaxy-step-5.png)
1. Galaxy must be launched from a workspace. This can either be an existing workspace that has data already loaded, or could be from a new workspace. For this example, we will create a new workspace using the “Create New Workspace” dialog. Note you will also need to set up and select a Billing project to be associated with the Workspace.\
![Step 6](../_images/getting-started/galaxy-step-6.png)
1. For this example, we will load (simulated) microbial sequencing data available here:  <a href="./_files/asm.tgz" download>asm.tgz</a>. After downloading the asm.tgz file, expand the archive and upload the data to the Terra workspace by dragging and dropping the files from your local computer (or using the + button) into the Files pane in the Data tab.\
![Step 7](../_images/getting-started/galaxy-step-7.png)
![Step 7 - loaded](../_images/getting-started/galaxy-step-7a.png)
1. Next click on the “Notebooks” tab to find the “Create a Cloud Environment for Galaxy” button.\
![Step 8](../_images/getting-started/galaxy-step-8.png)
1. Clicking on the “Create a Cloud Environment for Galaxy’ button brings up the “Cloud environment” launch panel.\
![Step 9](../_images/getting-started/galaxy-cloud-environment-create.png)
1. Clicking next then shows the “Create” panel.\
![Step 10](../_images/getting-started/galaxy-step-10.png)
1. After clicking “Create” you will see a new icon at the top showing “Galaxy Provisioning”. It will take approximately 10 minutes for Galaxy to be fully provisioned and initialized.\
![Step 11](../_images/getting-started/galaxy-step-11.png)
1. After provisioning, you will be notified that you can now launch Galaxy.\
![Step 12](../_images/getting-started/galaxy-step-12.png)

### II. Welcome to Galaxy in AnVIL

13. Clicking “Launch Galaxy” will take you to the Galaxy welcome screen.\
![Step 13](../_images/getting-started/galaxy-anvil-branded-galaxy.png)
1. Click on the data upload tool to load your data into Galaxy.\
![Step 14](../_images/getting-started/galaxy-step-14.png)
1. This will display the data browser.\
![Step 15](../_images/getting-started/galaxy-step-15.png)
1. Then click “Choose remote files” to access your AnVIL/Terra Workspace.\
![Step 16](../_images/getting-started/galaxy-step-16.png)
1. Browse inside your workspace to “Other Data”.\
![Step 17](../_images/getting-started/galaxy-step-17.png)
1. And then “Files/”.\
![Step 18](../_images/getting-started/galaxy-step-18.png)
1. Here you will see all of the data you loaded into your AnVIL Workspace.\
![Step 19](../_images/getting-started/galaxy-browsing-files.png)
1. Select all of the files to load into Galaxy.\
![Step 20](../_images/getting-started/galaxy-step-20.png)
1. Clicking “Ok” will finalize the selection.\
![Step 21](../_images/getting-started/galaxy-step-21.png)
1. After clicking “Start” the data will be transferred into Galaxy.\
![Step 22](../_images/getting-started/galaxy-step-22.png)
1. You can then “Close” the data picker to see the main Galaxy interface.\
![Step 23](../_images/getting-started/galaxy-step-23.png)

### III. Running Tools in Galaxy

24. On the left hand tool panel, expand the “FASTQ Quality Control” menu and click on “FastQC”. This will automatically pick the most recent item in your history (frag180.1.fq).\
![Step 24](../_images/getting-started/galaxy-step-24.png)
1. Clicking “Execute’ at the bottom of this panel will run the tool.\
![Step 25](../_images/getting-started/galaxy-step-25.png)
1. As the Job is running, the task will be added to the history panel on the right.\
![Step 26](../_images/getting-started/galaxy-step-26.png)
1. Once the job is complete you will see the job turn green.\
![Step 27](../_images/getting-started/galaxy-step-27.png)
1. Click the “Eye” view data tool to show the results.\
![Step 28](../_images/getting-started/galaxy-step-28.png)
1. This shows the reads have overall good quality, with a decrease trend over the read length (as expected).\
![Step 29](../_images/getting-started/galaxy-step-29.png)
1. Next align the reads with Bowtie2. Make sure to select paired-end reads, fastq #1 should be “frag180.1.fq” and fastq #2 should be “frag180.2.fq”.\
![Step 30](../_images/getting-started/galaxy-step-30.png)
1. Then pick “ref.fa” as your reference genome.\
![Step 31](../_images/getting-started/galaxy-step-31.png)
1. Clicking “Execute” will show Bowtie2 launching.\
![Step 32](../_images/getting-started/galaxy-step-32.png)
1. Next use the plotCoverage tool to display the coverage histogram. Note the results from Bowtie2 will automatically be selected since that is the only compatible file format.\
![Step 33](../_images/getting-started/galaxy-step-33.png)
1. Click “Execute” to show plotCoverage running.\
![Step 34](../_images/getting-started/galaxy-step-34.png)
1. Once complete, click the view data icon for the plotCoverage image (step 9) to show the coverage distribution.\
![Step 35](../_images/getting-started/galaxy-step-35.png)
1. Next run freeBayes to call SNVs and indels in the sample. Make sure to select “History” as the source of the reference genome.\
![Step 36](../_images/getting-started/galaxy-step-36.png)
1. Once freeBayes is complete, you can click on the view data icon to display the VCF file containing the variants.\
![Step 37](../_images/getting-started/galaxy-step-37.png)
1. The last step is to summarize the variant calls using “bcftools stats”.\
![Step 38](../_images/getting-started/galaxy-step-38.png)
1. Once this is complete, you can view the summary of the VCF file. You should see that there are 1908 SNVs in the sample.\
![Step 39](../_images/getting-started/galaxy-step-39.png)

### IV. Shutting Down

40. When you are done with Galaxy, you will need to stop your running instance of Galaxy to stop the charges. Return to the AnVIL workspace where you launched Galaxy.\
![Step 40](../_images/getting-started/galaxy-step-40.png)
1. Click “Galaxy Running” to display the administrative panel.\
![Step 41](../_images/getting-started/galaxy-step-41.png)
1. Click “Delete” to stop and delete your Galaxy instance. Note this will delete all data and results files from your Galaxy session.\
![Step 42](../_images/getting-started/galaxy-step-42.png)
1. After your running version of Galaxy is done, the “Galaxy Running” icon will disappear.\
![Step 43](../_images/getting-started/galaxy-step-43.png)

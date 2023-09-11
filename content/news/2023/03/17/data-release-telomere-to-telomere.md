---
author: "AnVIL"
date: "2023-03-17"
description: "We’re writing to inform you of a data management incident which led to a temporary unavailability of a limited number of files hosted in the AnVIL_HPRC workspace from March 30, 2023 to May 9, 2023."
featured: true
title: "Data Release - Telomere-to-Telomere (T2T) project"
---

# Data Release - Telomere-to-Telomere (T2T) project

##### Posted: March 17, 2023

The Telomere-to-Telomere (T2T) consortium is an open, community-based effort to de novo assemble the first complete reference human genome from the CHM13 hydatidiform mole. Using a combination of PacBio HiFi sequencing and Oxford Nanopore ultra long reads, the CHM13v1.1 reference genome was completed and released in 2022 as described in "The complete sequence of a human genome" ([Nurk et al, Science, 2022](https://www.science.org/doi/10.1126/science.abj6987)). This assembly is the most accurate assembly ever produced, with an estimated sequence accuracy exceeding QV70 and 0 unresolved bases. The genome includes almost 200 Mbp of novel sequence compared to GRCh38, corrects many structural errors in the GRCh38 reference genome, and unlocks the most complex regions of the genome to clinical and functional study for the first time.

Recently, the T2T consortium finished the first complete assembly of a human Y chromosome, from the Genome in a Bottle (GIAB) HG002/NA24385 sample. This chrY assembly adds over 30 Mbp of novel sequence relative to the GRCh38 chrY, and its addition completes the CHM13v2.0 (hs1) reference genome. The full details of the assembly are described in "The complete sequence of a human Y chromosome" ([Rhie et al, bioRxiv, 2022](https://www.biorxiv.org/content/10.1101/2022.12.01.518724v1))

### Available Data
Here we use the T2T-CHM13v2.0 reference genome to investigate how it improves short-read variant calling for individual samples and across populations. The workspace of this data release can be found at https://anvil.terra.bio/#workspaces/anvil-datastorage/AnVIL_T2T_CHRY. This workspace includes all 3,202 samples from the recently extended 1000 Genomes Project (1KGP) collection and 279 open-access samples from the Simons Genome Diversity Project (SGDP) collection that we analyze using the GATK HaplotypeCaller for SNVs and indels on the NHGRI AnVIL Cloud Platform (1,599 and 175 XY samples respectively). To facilitate comparison between references, we perform alignment and variant calling for the SGDP samples using both the T2T-CHM13v2.0 and GRCh38 references. Data for both references are included in the [workspace](https://anvil.terra.bio/#workspaces/anvil-datastorage/AnVIL_T2T_CHRY) in separate tables. For the 1KGP samples, only alignments and variant calls on T2T-CHM13v2.0 are provided in this workspace.

We demonstrate that the T2T-Y reference improves read mapping and variant calling across all samples in a number of major ways:

* Adds almost 600 thousand base pairs of sequence that can be effectively used for variant calling with short reads
* Corrects putative collapsed duplications on GRCh38-Y, reducing spurious variant calls within these regions
* Improves short-read alignment across populations for a number of statistics, including reads mapped and per-base mismatch rate

### Available Workflows
The WDL-based workflows for aligning the samples and analyzing the variants are available at https://github.com/schatzlab/t2t-chm13-chry.
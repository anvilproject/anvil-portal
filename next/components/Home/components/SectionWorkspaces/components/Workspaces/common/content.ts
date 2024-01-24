import { SectionCard } from "../../../../../common/entities";

export const ACTION_LABEL = {
  UNSPECIFIED: "",
};

export const CARDS: SectionCard[] = [
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://anvil.terra.bio/#workspaces/help-gatk/Somatic-CNVs-GATK4",
      },
    ],
    media: {
      alt: "GATK",
      height: 40,
      src: "/consortia/workspaces/gatk.png",
    },
    text: "A somatic copy number variation workflow, representing the Variant Discovery portion of the Somatic CNV Discovery pipeline.",
    title: "GATK - Best practices for somatic CNV discovery",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://anvil.terra.bio/#workspaces/help-gatk/Germline-SNPs-Indels-GATK4-hg38",
      },
    ],
    media: {
      alt: "GATK",
      height: 40,
      src: "/consortia/workspaces/gatk.png",
    },
    text: "A fully reproducible example of Processing For Variant Discovery, HaplotypeCallerGVCF, and Joint Discovery workflows.",
    title: "GATK - Best Practices for Germline SNPs & Indels",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://anvil.terra.bio/#workspaces/help-gatk/Hail-Notebook-Tutorials",
      },
    ],
    media: {
      alt: "Hail GWAS",
      height: 40,
      src: "/consortia/workspaces/hail.png",
    },
    text: "A basic tutorial for using Hail, a python-based package for working with genomic data.",
    title: "Hail GWAS PIPELINE",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://anvil.terra.bio/#workspaces/help-gatk/InferCNV_SCP_scRNA-seq",
      },
    ],
    media: {
      alt: "infer CNV",
      height: 40,
      src: "/consortia/workspaces/inferCNV.png",
    },
    text: "Compare RNA from tumor samples with corresponding “normal” samples to identify evidence for copy number variations in tumors.",
    title: "inferCNV Tumor Single-Cell RNA-Seq Analysis Pipeline",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://anvil.terra.bio/#workspaces/featured-workspaces-hca/HCA_Optimus_Pipeline",
      },
    ],
    media: {
      alt: "Optimus Pipeline",
      height: 40,
      src: "/consortia/workspaces/optimusPipeline.png",
    },
    text: "The Optimus pipeline processes 3-prime single-cell transcriptome data from the 10X Genomics v2 (and v3) assay.",
    title: "Optimus Pipeline",
  },
];

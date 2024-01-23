import { PORTAL_URL } from "../../../../../../../site-config/anvil-portal/dev/config";
import { SectionCard } from "../../../../../common/entities";

const CONSORTIA_ROUTE = "data/consortia";

export const ACTION_LABEL = {
  UNSPECIFIED: "",
};

export const CARDS: SectionCard[] = [
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/ALS-Compute`,
      },
    ],
    text: "",
    title: "ALS-Compute",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CARD`,
      },
    ],
    text: "",
    title: "CARD",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CCDG`,
      },
    ],
    text: "Centers for Common Disease Genomics",
    title: "CCDG",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CMG`,
      },
    ],
    text: "Centers for Mendelian Genetics",
    title: "CMG",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CMH`,
      },
    ],
    text: "",
    title: "CMH",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/Convergent%20Neuroscience`,
      },
    ],
    text: "Convergent Neuro Consortium",
    title: "Convergent Neuroscience",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CSER`,
      },
    ],
    text: "Clinical Sequencing Evidence-Generating Research Consortium",
    title: "CSER",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/eMERGE`,
      },
    ],
    text: "Electronic and MEdical Records and Genomics Project",
    title: "eMERGE",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/GREGoR`,
      },
    ],
    text: "",
    title: "GREGoR",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/GTEx`,
      },
    ],
    text: "The Genotype-Tissue Expression Project",
    title: "GTEx",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/HPRC`,
      },
    ],
    text: "Human Pangenome Reference Consortium",
    title: "HPRC",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/PAGE`,
      },
    ],
    text: "Population Architecture Using Genomics and Epidemiology",
    title: "PAGE",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/T2T`,
      },
    ],
    text: "Telomere-to-Telomere",
    title: "T2T",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/WGSPD1`,
      },
    ],
    text: "",
    title: "WGSPD1",
  },
  {
    links: [
      {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/1000G`,
      },
    ],
    text: "The 1000 Genomes Project",
    title: "1000G",
  },
];

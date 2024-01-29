import { PORTAL_URL } from "../../../../../../../../../site-config/anvil-portal/dev/config";
import { SectionCardWithLink } from "../../../../../../../common/entities";

const CONSORTIA_ROUTE = "data/consortia";

export const ACTION_LABEL = {
  UNSPECIFIED: "",
};

export const CARDS: SectionCardWithLink[] = [
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/ALS-Compute`,
    },
    text: "",
    title: "ALS-Compute",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CARD`,
    },
    text: "",
    title: "CARD",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CCDG`,
    },
    text: "Centers for Common Disease Genomics",
    title: "CCDG",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CMG`,
    },
    text: "Centers for Mendelian Genetics",
    title: "CMG",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CMH`,
    },
    text: "",
    title: "CMH",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/Convergent%20Neuroscience`,
    },
    text: "Convergent Neuro Consortium",
    title: "Convergent Neuroscience",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/CSER`,
    },
    text: "Clinical Sequencing Evidence-Generating Research Consortium",
    title: "CSER",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/eMERGE`,
    },
    text: "Electronic and MEdical Records and Genomics Project",
    title: "eMERGE",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/GREGoR`,
    },
    text: "",
    title: "GREGoR",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/GTEx`,
    },
    text: "The Genotype-Tissue Expression Project",
    title: "GTEx",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/HPRC`,
    },
    text: "Human Pangenome Reference Consortium",
    title: "HPRC",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/PAGE`,
    },
    text: "Population Architecture Using Genomics and Epidemiology",
    title: "PAGE",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/T2T`,
    },
    text: "Telomere-to-Telomere",
    title: "T2T",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/WGSPD1`,
    },
    text: "",
    title: "WGSPD1",
  },
  {
    link: {
      label: ACTION_LABEL.UNSPECIFIED,
      url: `${PORTAL_URL}/${CONSORTIA_ROUTE}/1000G`,
    },
    text: "The 1000 Genomes Project",
    title: "1000G",
  },
];

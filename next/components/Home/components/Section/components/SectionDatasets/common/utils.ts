import { SectionCardWithLink } from "../../../../../common/entities";

const ACTION_LABEL = {
  UNSPECIFIED: "",
};
const CONSORTIA_ROUTE = "data/consortia";

/**
 * Returns the dataset cards for the datasets section.
 * @param portalURL - Portal URL.
 * @returns dataset cards.
 */
export function buildDatasetCards(portalURL: string): SectionCardWithLink[] {
  return [
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/ALS-Compute`,
      },
      text: "",
      title: "ALS-Compute",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/CARD`,
      },
      text: "",
      title: "CARD",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/CCDG`,
      },
      text: "Centers for Common Disease Genomics",
      title: "CCDG",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/CMG`,
      },
      text: "Centers for Mendelian Genetics",
      title: "CMG",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/CMH`,
      },
      text: "",
      title: "CMH",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/Convergent%20Neuroscience`,
      },
      text: "Convergent Neuro Consortium",
      title: "Convergent Neuroscience",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/CSER`,
      },
      text: "Clinical Sequencing Evidence-Generating Research Consortium",
      title: "CSER",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/eMERGE`,
      },
      text: "Electronic and MEdical Records and Genomics Project",
      title: "eMERGE",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/GREGoR`,
      },
      text: "",
      title: "GREGoR",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/GTEx`,
      },
      text: "The Genotype-Tissue Expression Project",
      title: "GTEx",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/HPRC`,
      },
      text: "Human Pangenome Reference Consortium",
      title: "HPRC",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/PAGE`,
      },
      text: "Population Architecture Using Genomics and Epidemiology",
      title: "PAGE",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/T2T`,
      },
      text: "Telomere-to-Telomere",
      title: "T2T",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/WGSPD1`,
      },
      text: "",
      title: "WGSPD1",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${portalURL}/${CONSORTIA_ROUTE}/1000G`,
      },
      text: "The 1000 Genomes Project",
      title: "1000G",
    },
  ];
}

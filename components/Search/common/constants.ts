import { Tab } from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";

export enum SEARCH_CATEGORY {
  ANVIL_SITE = "anvil-only",
  BIOCONDUCTOR = "bioconductor-only",
  DOCKSTORE = "dockstore-only",
  GALAXY = "galaxy-only",
  TERRA = "terra-only",
}

export const TABS: Tab[] = [
  { label: "All", value: null },
  { label: "AnVIL Site", value: SEARCH_CATEGORY.ANVIL_SITE },
  { label: "Terra", value: SEARCH_CATEGORY.TERRA },
  { label: "Dockstore", value: SEARCH_CATEGORY.DOCKSTORE },
  { label: "Bioconductor", value: SEARCH_CATEGORY.BIOCONDUCTOR },
  { label: "Galaxy", value: SEARCH_CATEGORY.GALAXY },
];

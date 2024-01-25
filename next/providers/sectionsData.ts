import { createContext, useContext, useMemo } from "react";
import { SectionCard } from "../components/Home/common/entities";

const DEFAULT_SECTIONS_DATA: SectionsData = {
  analysisPortalCards: [],
  carouselCards: [],
  cloudCards: [],
  datasetCards: [],
  workspaceCards: [],
};

export interface SectionsData {
  analysisPortalCards: SectionCard[];
  carouselCards: SectionCard[];
  cloudCards: Omit<SectionCard, "links">[];
  datasetCards: SectionCard[];
  workspaceCards: SectionCard[];
}

export const SectionsDataContext = createContext<SectionsData>(
  DEFAULT_SECTIONS_DATA
);

export const SectionsDataProvider = SectionsDataContext.Provider;

export const useSectionsData = (): SectionsData => {
  const sectionsData = useContext(SectionsDataContext);
  return useMemo(() => sectionsData, [sectionsData]);
};

import { createContext, useContext, useMemo } from "react";
import {
  SectionCard,
  SectionCardWithLink,
} from "../components/Home/common/entities";
import { PublicationCard } from "../components/Home/components/Section/components/SectionPublications/common/entities";
import { UpdateCard } from "../components/Home/components/Section/components/SectionUpdates/common/entities";

const DEFAULT_SECTIONS_DATA: SectionsData = {
  analysisPortalCards: [],
  carouselCards: [],
  cloudCards: [],
  datasetCards: [],
  eventCards: [],
  newsCards: [],
  publicationCards: [],
  toolsAndWorkflowsCards: [],
  workspaceCards: [],
};

export interface SectionsData {
  analysisPortalCards: SectionCard[];
  carouselCards: SectionCard[];
  cloudCards: Omit<SectionCard, "links">[];
  datasetCards: SectionCardWithLink[];
  eventCards: UpdateCard[];
  newsCards: UpdateCard[];
  publicationCards: PublicationCard[];
  toolsAndWorkflowsCards: SectionCardWithLink[];
  workspaceCards: SectionCardWithLink[];
}

export const SectionsDataContext = createContext<SectionsData>(
  DEFAULT_SECTIONS_DATA
);

export const SectionsDataProvider = SectionsDataContext.Provider;

export const useSectionsData = (): SectionsData => {
  const sectionsData = useContext(SectionsDataContext);
  return useMemo(() => sectionsData, [sectionsData]);
};

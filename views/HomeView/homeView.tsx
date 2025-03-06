import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { SectionAnalysisPortals } from "../../components/Home/components/Section/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionCloudEnvironment } from "../../components/Home/components/Section/components/SectionCloudEnvironment/sectionCloudEnvironment";
import { SectionDatasets } from "../../components/Home/components/Section/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../../components/Home/components/Section/components/SectionHero/sectionHero";
import { SectionExplore } from "../../components/Home/components/Section/components/SectionExplore/sectionExplore";
import { SectionPublications } from "../../components/Home/components/Section/components/SectionPublications/sectionPublications";
import { SectionUpdates } from "../../components/Home/components/Section/components/SectionUpdates/sectionUpdates";
import { SectionWorkspaces } from "../../components/Home/components/Section/components/SectionWorkspaces/sectionWorkspaces";
import { SectionDivider } from "../../components/Home/components/Section/section.styles";
import { SiteConfig } from "../../site-config/common/entities";

export const HomeView = (): JSX.Element => {
  const { config } = useConfig();
  const portalURL = (config as SiteConfig).portalURL;
  return (
    <>
      <SectionHero />
      <SectionAnalysisPortals />
      <SectionDivider flexItem />
      <SectionExplore />
      <SectionDatasets portalURL={portalURL} />
      <SectionDivider flexItem />
      <SectionWorkspaces />
      <SectionCloudEnvironment />
      <SectionUpdates />
      <SectionDivider flexItem />
      <SectionPublications />
      <SectionDivider flexItem />
    </>
  );
};

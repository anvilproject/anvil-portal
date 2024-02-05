import { SectionAnalysisPortals } from "../../components/Home/components/Section/components/SectionAnalysisPortals/sectionAnalysisPortals";
import { SectionCloudEnvironment } from "../../components/Home/components/Section/components/SectionCloudEnvironment/sectionCloudEnvironment";
import { SectionDatasets } from "../../components/Home/components/Section/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../../components/Home/components/Section/components/SectionHero/sectionHero";
import { SectionPublications } from "../../components/Home/components/Section/components/SectionPublications/sectionPublications";
import { SectionUpdates } from "../../components/Home/components/Section/components/SectionUpdates/sectionUpdates";
import { SectionWorkspaces } from "../../components/Home/components/Section/components/SectionWorkspaces/sectionWorkspaces";
import { SectionX } from "../../components/Home/components/Section/components/SectionX/sectionX";
import { SectionDivider } from "../../components/Home/components/Section/section.styles";
import { useConfig } from "../../hooks/useConfig";

export const HomeView = (): JSX.Element => {
  const { config } = useConfig();
  const portalURL = config.portalURL;
  return (
    <>
      <SectionHero portalURL={portalURL} />
      <SectionAnalysisPortals />
      <SectionDatasets portalURL={portalURL} />
      <SectionDivider flexItem />
      <SectionWorkspaces portalURL={portalURL} />
      <SectionCloudEnvironment />
      <SectionUpdates portalURL={portalURL} />
      <SectionDivider flexItem />
      <SectionPublications portalURL={portalURL} />
      <SectionDivider flexItem />
      <SectionX />
    </>
  );
};

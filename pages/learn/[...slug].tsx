import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { StyledMain } from "../../components/Layout/components/Main/main.styles";
import { processOverviewFrontmatter } from "../../components/Layout/components/Section/components/SectionContent/components/SectionOverview/utils";
import { StaticProps } from "../../content/entities";
import { generateSectionPathWithFrontmatter } from "../../content/utils";
import { generateStaticPaths } from "../../docs/common/generateStaticPaths";
import { generateStaticProps } from "../../docs/common/generateStaticProps";
import { ContentOverviewView } from "../../views/ContentOverviewView/contentOverviewView";
import { processFrontmatter } from "../../components/Learn/utils";

const SECTION = "learn";

const Page = (props: StaticProps): JSX.Element => {
  return <ContentOverviewView {...props} />;
};

export const getStaticProps: GetStaticProps = async (
  props: GetStaticPropsContext
) => {
  const frontmatters = generateSectionPathWithFrontmatter(SECTION);
  const staticProps = await generateStaticProps(
    props,
    SECTION,
    (frontmatter) =>
      processFrontmatter(
        processOverviewFrontmatter(SECTION, frontmatter, frontmatters)
      ),
    undefined
  );
  if (!staticProps) return { notFound: true };
  return staticProps;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: generateStaticPaths(SECTION),
  };
};

export default Page;

Page.Main = StyledMain;

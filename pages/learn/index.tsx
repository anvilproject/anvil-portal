import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticProps } from "next";
import { StaticProps } from "../../content/entities";
import { generateStaticProps } from "../../docs/common/generateStaticProps";
import { ContentView } from "../../views/ContentView/contentView";

const SLUG = ["learn"];

const Page = (props: StaticProps): JSX.Element => {
  return <ContentView {...props} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const staticProps = await generateStaticProps({ params: { slug: SLUG } });
  if (!staticProps) return { notFound: true };
  return staticProps;
};

Page.Main = Main;

export default Page;

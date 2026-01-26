import { GetStaticProps } from "next";
import { JSX } from "react";
import { StaticProps } from "../../content/entities";
import { generateStaticProps } from "../../docs/common/generateStaticProps";
import { LearnView } from "../../views/LearnView/learnView";
import { StyledMain } from "../../components/Layout/components/Main/main.styles";

const SLUG = ["learn"];

const Page = (props: StaticProps): JSX.Element => {
  return <LearnView {...props} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const staticProps = await generateStaticProps({ params: { slug: SLUG } });
  if (!staticProps) return { notFound: true };
  return staticProps;
};

Page.Main = StyledMain;

export default Page;

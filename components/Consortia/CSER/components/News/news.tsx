import { Card } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { JSX } from "react";
import { News as NewsView } from "./news.styles";

export const News = (): JSX.Element => {
  return (
    <NewsView>
      <Card
        cardUrl="/consortia/cser/news/2022/acmg2022"
        secondaryText="22 March, 2022"
        text="Far into the research process, CSER has much to share at the ACMG 2022 meeting over Mar 22-26 2022!"
        title="CSER at ACMG 2022"
      />
      <Card
        cardUrl="/consortia/cser/news/2021/ashg2021"
        secondaryText="18 October, 2021"
        text="Come check out a number of high-impact CSER work at the ASHG 2021 Annual Meeting!"
        title="CSER at ASHG 2021"
      />
      <Card
        cardUrl="/consortia/cser/news/2021/acmg2021"
        secondaryText="12 April, 2021"
        text="CSER is leading a number of posters and presentations at ACMG 2021. Come check us out!"
        title="CSER at ACMG 2021"
      />
      <Card
        cardUrl="/consortia/cser/news/2020/cser-emerge-collaborative-project"
        secondaryText="26 October, 2020"
        text="CSER researchers are excited to share that a collaborative project between CSER and eMERGE exploring genomic variant classification concordance is out now!"
        title="Out Now! CSER & eMERGE Variant Bakeoff 2.0"
      />
      <Card
        cardUrl="/consortia/cser/news/2020/ashg2020"
        secondaryText="26 October, 2020"
        text="CSER at the ASHG 2020 Virtual Meeting!"
        title="CSER at ASHG 2020"
      />
      <Card
        cardUrl="/consortia/cser/news/2019/ashg2019"
        secondaryText="14 October, 2019"
        text="Posters galore at ASHG 2019!"
        title="CSER at ASHG 2019"
      />
      <Card
        cardUrl="/consortia/cser/news/2019/acmg2019"
        secondaryText="01 April, 2019"
        text="Coming to ACMG 2019: CSER!"
        title="CSER at ACMG 2019"
      />
      <Card
        cardUrl="/consortia/cser/news/2018/ashg2018"
        secondaryText="15 October, 2018"
        text="Come check out CSER efforts at ASHG 2018!"
        title="CSER at ASHG 2018"
      />
      <Card
        cardUrl="/consortia/cser/news/2018/cser1-experiences-with-secondary-findings"
        secondaryText="05 October, 2018"
        text="An extensive look into CSER1's experiences with secondary findings reveals how SFs impact unrecognized family history, causes little distress on patients, and induce modest 1-year downstream costs."
        title="CSER1 Experiences with Secondary Findings"
      />
      <Card
        cardUrl="/consortia/cser/news/2018/cser-marker-paper"
        secondaryText="06 September, 2018"
        text="Out now, the CSER Marker Paper, describing the work of CSER in addressing evidence gaps in delivering genomics in non-academic settings and diverse populations."
        title="CSER Marker Paper"
      />
      <Card
        cardUrl="/consortia/cser/news/2018/acmg2018"
        secondaryText="04 April, 2018"
        text="Learn more about CSER Phase 1 and CSER Phase 2 at ACMG 2018!"
        title="CSER at ACMG 2018"
      />
      <Card
        cardUrl="/consortia/cser/news/2017/ashg2017"
        secondaryText="16 October, 2017"
        text="Come check out CSER research at the American Society of Human Genetics 2017 Annual Meeting!"
        title="CSER at ASHG 2017"
      />
      <Card
        cardUrl="/consortia/cser/news/2017/cser-sites-announced"
        secondaryText="08 August, 2017"
        text="Six sites and one coordinating center are funded as part of CSER. Focusing on diverse populations, sites seek to generate evidence supporting use of genomic sequencing in medical care."
        title="Clinical Sequencing Evidence-Generating Research (CSER) sites announced!"
      />
    </NewsView>
  );
};

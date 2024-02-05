import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Section, SectionLayout, SectionTitle } from "../../section.styles";
import { Timeline } from "./sectionX.styles";

export const SectionX = (): JSX.Element => {
  return (
    <Section>
      <SectionLayout>
        <SectionTitle>Join the Conversation</SectionTitle>
        <Timeline>
          <a
            className="twitter-timeline"
            href="https://twitter.com/useAnVIL"
            rel="noopener"
            target={ANCHOR_TARGET.BLANK}
          >
            Tweets by useAnVIL
          </a>
        </Timeline>
      </SectionLayout>
    </Section>
  );
};

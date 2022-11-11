/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section mailing list component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import { MailingListCloudStaticQuery } from "../../../hooks/mailing-list-cloud-query";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import SectionContentPosition from "../section/section-content-position/section-content-position";

// Styles
import { sectionHero } from "./section-mailing-list.module.css";

const SectionMailingList: FC = (): JSX.Element => {
  const frontmatter = MailingListCloudStaticQuery();
  const hero = frontmatter.sectionSubHeader;

  return (
    <Section>
      {/* Section Content - LHS. */}
      <SectionContent position={SectionContentPosition.DEFAULT_LEFT}>
        {/* Heading */}
        <>Mailing List</>
        {/* Hero */}
        {hero ? (
          <div className={sectionHero}>
            <h4>{hero}</h4>
          </div>
        ) : null}
        {/* Content */}
        {null}
        {/* CTAs */}
        <ButtonCta
          attributeHREF="https://lists.anvilproject.org/lists/anvil-mailing-list.lists.anvilproject.org/"
          buttonSize={ButtonSize.LARGE}
          buttonTheme={ButtonTheme.SECONDARY}
        >
          Signup
        </ButtonCta>
      </SectionContent>
    </Section>
  );
};

export default SectionMailingList;

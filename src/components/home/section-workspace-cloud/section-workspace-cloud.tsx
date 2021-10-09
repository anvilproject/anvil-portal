/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL section workspace cloud component.
 */

// Core dependencies
import React, { FC } from "react";

// App dependencies
import ButtonSize from "../../button/button-size";
import ButtonTheme from "../../button/button-theme";
import ButtonCta from "../../button-cta/button-cta";
import { ICard } from "../../card/card";
import { WorkspaceCloudStaticQuery } from "../../../hooks/workspace-cloud-query";
import Section from "../section/section";
import SectionContent from "../section/section-content/section-content";
import WorkspaceCard from "../workspace-card/workspace-card";

// Styles
import { sectionCards } from "./section-workspace-cloud.module.css";

const SectionWorkspaceCloud: FC = (): JSX.Element => {
  const workspaceCards: ICard[] = WorkspaceCloudStaticQuery();
  return (
    <Section>
      <SectionContent>
        {/* Heading */}
        <>Create, share and reuse reproducible analysis workspaces</>
        {/* Content */}
        <div className={sectionCards}>
          {workspaceCards.map((workspaceCard) => (
            <WorkspaceCard
              key={workspaceCard.title}
              workspaceCard={workspaceCard}
            />
          ))}
        </div>
        {/* CTAs */}
        <>
          <ButtonCta
            attributeHREF="/"
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.SECONDARY}
          >
            Explore Example Workspaces
          </ButtonCta>
        </>
      </SectionContent>
    </Section>
  );
};

export default SectionWorkspaceCloud;

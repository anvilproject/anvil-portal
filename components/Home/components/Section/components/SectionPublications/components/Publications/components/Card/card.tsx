import { ButtonTextPrimary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { useState } from "react";
import { VISIBILITY_MODE_LABEL } from "../../../../../../../../common/constants";
import { VISIBILITY_MODE } from "../../../../../../../../common/entities";
import { updateVisibilityMode } from "../../../../../../../../common/utils";
import { PublicationCard } from "../../../../common/entities";
import { Card as GridCard, CardContent, CardSection } from "./card.styles";

const MAX_AUTHORS = 5;

export interface Card {
  card: PublicationCard;
}

export const Card = ({ card }: Card): JSX.Element => {
  const [mode, setMode] = useState<VISIBILITY_MODE>(VISIBILITY_MODE.COLLAPSED);
  const isExpanded = mode === VISIBILITY_MODE.EXPANDED;
  const { cardLink, citation, title } = card;

  // Toggles visibility mode.
  const onVisibilityMode = (event: MouseEvent): void => {
    setMode(updateVisibilityMode);
    event.preventDefault();
  };

  return (
    <GridCard component={RoundedPaper}>
      <MCardActionArea href={cardLink} target={ANCHOR_TARGET.BLANK}>
        <CardSection>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardSecondaryText>
              {getCitation(citation, isExpanded)}
            </CardSecondaryText>
          </CardContent>
          <ButtonTextPrimary onClick={onVisibilityMode}>
            {VISIBILITY_MODE_LABEL[mode]}
          </ButtonTextPrimary>
        </CardSection>
      </MCardActionArea>
    </GridCard>
  );
};

/**
 * Returns the citation as a string.
 * @param citation - Citation.
 * @param isExpanded - Visibility mode.
 * @returns citation as a string.
 */
function getCitation(
  citation: PublicationCard["citation"],
  isExpanded: boolean
): string {
  const { doi, journal, year } = citation;
  const authors = joinAuthors(citation.authors, isExpanded);
  return `${authors}${isExpanded ? "." : ","}${
    isExpanded ? "" : " et al."
  } (${year}). ${journal}. ${doi}.`;
}

/**
 * Returns the authors as a string.
 * @param authors - Authors.
 * @param isExpanded - Visibility mode.
 * @returns authors as a string.
 */
function joinAuthors(authors: string[], isExpanded: boolean): string {
  const fewAuthors = authors.slice(0, MAX_AUTHORS);
  return isExpanded ? authors.join(", ") : fewAuthors.join(", ");
}

import { ButtonTextPrimary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { JSX, useState } from "react";
import { VISIBILITY_MODE_LABEL } from "../../../../../../../../common/constants";
import { VISIBILITY_MODE } from "../../../../../../../../common/entities";
import { updateVisibilityMode } from "../../../../../../../../common/utils";
import { CardContent, CardSection, Card as GridCard } from "./card.styles";
import { MAX_AUTHORS } from "./constants";
import type { CardProps } from "./types";
import { getCitation } from "./utils";

export const Card = ({ card }: CardProps): JSX.Element => {
  const [mode, setMode] = useState<VISIBILITY_MODE>(VISIBILITY_MODE.COLLAPSED);
  const isExpanded = mode === VISIBILITY_MODE.EXPANDED;
  const { cardLink, citation, title } = card;
  const isTruncatable = citation.authors.length > MAX_AUTHORS;
  const isTruncated = isTruncatable && !isExpanded;

  // Toggles visibility mode.
  const onVisibilityMode = (event: MouseEvent): void => {
    setMode(updateVisibilityMode);
    event.preventDefault();
  };

  return (
    <GridCard component={RoundedPaper}>
      <MCardActionArea
        href={cardLink}
        rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
        target={ANCHOR_TARGET.BLANK}
      >
        <CardSection>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardSecondaryText>
              {getCitation(citation, isTruncated)}
            </CardSecondaryText>
          </CardContent>
          {isTruncatable && (
            <ButtonTextPrimary onClick={onVisibilityMode}>
              {VISIBILITY_MODE_LABEL[mode]}
            </ButtonTextPrimary>
          )}
        </CardSection>
      </MCardActionArea>
    </GridCard>
  );
};

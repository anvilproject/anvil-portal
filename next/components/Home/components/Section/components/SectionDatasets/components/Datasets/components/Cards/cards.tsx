import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { Fragment } from "react";
import { ForwardArrowIcon } from "../../../../../../../../../common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { SectionCard } from "../../../../../../../../common/entities";
import { CardCTA } from "../../../../../../../Card/card.styles";
import { Card, CardContent, CardSection } from "./cards.styles";

interface CardsProps {
  cards: SectionCard[];
}

export const Cards = ({ cards }: CardsProps): JSX.Element => {
  return (
    <Fragment>
      {cards.map(({ links, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <MCardActionArea onClick={(): void => onCardAction(links)}>
            <CardSection>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                {text && <CardSecondaryText>{text}</CardSecondaryText>}
              </CardContent>
              <CardCTA>
                <ForwardArrowIcon color="primary" fontSize="small" />
              </CardCTA>
            </CardSection>
          </MCardActionArea>
        </Card>
      ))}
    </Fragment>
  );
};

/**
 * Opens the given url in the same tab.
 * @param links - Card links.
 */
function onCardAction(links: SectionCard["links"]): void {
  // Take the first available link.
  const { target = ANCHOR_TARGET.SELF, url } = links[0];
  if (url) {
    window.open(url, target);
  }
}

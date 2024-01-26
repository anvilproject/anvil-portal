import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { SectionCard } from "../../../../../../common/entities";
import { Card, CardContent, CardSection, Grid } from "./updates.styles";

interface UpdatesProps {
  cards: SectionCard[];
}

export const Updates = ({ cards }: UpdatesProps): JSX.Element => {
  return (
    <Grid>
      {cards.map(({ links, secondaryText, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <MCardActionArea onClick={(): void => onCardAction(links)}>
            <CardSection>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
                <CardSecondaryText>{secondaryText}</CardSecondaryText>
              </CardContent>
            </CardSection>
          </MCardActionArea>
        </Card>
      ))}
    </Grid>
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

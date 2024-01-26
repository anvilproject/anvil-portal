import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { ForwardArrowIcon } from "../../../../../../../common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { SectionCard } from "../../../../../../common/entities";
import {
  CardContent,
  CardCTA,
  CardSection,
  GridCard as Card,
} from "../../../../../Card/card.styles";
import { CardMedia } from "../../../../../Card/components/CardMedia/cardMedia";
import { CardHeader, CardTitle, Grid } from "./workspaces.styles";

export const Workspaces = (): JSX.Element => {
  const { workspaceCards: cards } = useSectionsData();
  return (
    <Grid>
      {cards.map(({ links, media, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <MCardActionArea onClick={(): void => onCardAction(links)}>
            <CardSection>
              <CardHeader>
                {media && <CardMedia media={media} />}
                <CardCTA>
                  <ForwardArrowIcon color="primary" fontSize="small" />
                </CardCTA>
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                {text && <CardSecondaryText>{text}</CardSecondaryText>}
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
  const { target = ANCHOR_TARGET.BLANK, url } = links[0];
  if (url) {
    window.open(url, target);
  }
}

import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { ForwardArrowIcon } from "../../../../../../../common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
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
      {cards.map(({ link, media, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <MCardActionArea
            href={link.url}
            target={link.target || ANCHOR_TARGET.BLANK}
          >
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
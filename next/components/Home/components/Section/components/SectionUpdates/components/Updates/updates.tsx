import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { CardActionArea as MCardActionArea } from "@mui/material";
import { UpdateCard } from "../../common/entities";
import { Card, CardContent, CardSection, Grid } from "./updates.styles";

interface UpdatesProps {
  cards: UpdateCard[];
}

export const Updates = ({ cards }: UpdatesProps): JSX.Element => {
  return (
    <Grid>
      {cards.map(({ link, secondaryText, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <MCardActionArea
            href={link.url}
            target={link.target || ANCHOR_TARGET.SELF}
          >
            <CardSection>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
                {secondaryText && (
                  <CardSecondaryText>{secondaryText}</CardSecondaryText>
                )}
              </CardContent>
            </CardSection>
          </MCardActionArea>
        </Card>
      ))}
    </Grid>
  );
};

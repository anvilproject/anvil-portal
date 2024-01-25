import { CardAction } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardAction/cardAction";
import { CardActions } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardActions/cardActions.styles";
import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { Fragment } from "react";
import { SectionCard } from "../../../../../../../../common/entities";
import { CardMedia } from "../../../../../../../Card/components/CardMedia/cardMedia";
import { Card, CardContent, CardSection, CardTitle } from "./cards.styles";

export interface CardsProps {
  cards: SectionCard[];
}

export const Cards = ({ cards }: CardsProps): JSX.Element => {
  return (
    <Fragment>
      {cards.map(({ links, media, text, title }, i) => (
        <Card key={i} component={RoundedPaper}>
          <CardSection>
            {media && <CardMedia media={media} />}
            <CardContent>
              <CardTitle>{title}</CardTitle>
              <CardSecondaryText>{text}</CardSecondaryText>
            </CardContent>
            <CardActions>
              {links.map(({ label, target, url }) => (
                <CardAction
                  key={url}
                  label={label as string}
                  target={target}
                  url={url}
                />
              ))}
            </CardActions>
          </CardSection>
        </Card>
      ))}
    </Fragment>
  );
};

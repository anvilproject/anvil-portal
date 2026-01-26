import { CardAction } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardAction/cardAction";
import { CardActions } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardActions/cardActions.styles";
import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Fragment, JSX } from "react";
import { SectionCard } from "../../../../../../../../common/entities";
import {
  CardContent,
  CardSection,
  CardTitle,
} from "../../../../../../../Card/card.styles";
import { CardMedia } from "../../../../../../../Card/components/CardMedia/cardMedia";
import { Card } from "./cards.styles";

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

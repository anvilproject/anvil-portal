import { CardAction } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardAction/cardAction";
import { CardActions } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardActions/cardActions.styles";
import { CardMedia } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardMedia/cardMedia";
import { CardSecondaryText } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { RoundedCard } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/RoundedCard/roundedCard";
import { Fragment } from "react";
import { SectionCard } from "../../../../../../common/entities";
import { CardContent, CardSection, CardTitle } from "./cards.styles";

export interface CardsProps {
  cards: SectionCard[];
}

export const Cards = ({ cards }: CardsProps): JSX.Element => {
  return (
    <Fragment>
      {cards.map(({ links, media, text, title }, i) => (
        <RoundedCard key={i}>
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
        </RoundedCard>
      ))}
    </Fragment>
  );
};

import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { Fragment } from "react";
import { SectionCard } from "../../../../../../../../common/entities";
import { getCardPosition } from "../../common/utils";
import {
  Card,
  CardActions,
  CardPositioner,
  CardSection,
  CardText,
  CardTitle,
} from "./cards.styles";

export interface CardsProps {
  activeIndex: number;
  cards: SectionCard[];
}

export const Cards = ({ activeIndex, cards }: CardsProps): JSX.Element => {
  const lastIndex = cards.length - 1;
  return (
    <Fragment>
      {cards.map(({ links, text, title }, c) => {
        return (
          <CardPositioner
            key={c}
            cardPosition={getCardPosition(c, activeIndex, lastIndex)}
          >
            <Card component={RoundedPaper}>
              <CardSection>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
                <CardActions>
                  {links.map((link, l) => (
                    <Link key={l} {...link} />
                  ))}
                </CardActions>
              </CardSection>
            </Card>
          </CardPositioner>
        );
      })}
    </Fragment>
  );
};

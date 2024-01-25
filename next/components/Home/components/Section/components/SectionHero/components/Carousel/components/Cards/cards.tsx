import { RoundedPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Dispatch, SetStateAction } from "react";
import { SectionCard } from "../../../../../../../../common/entities";
import { CARDS } from "../../common/constants";
import { CarouselAction, CAROUSEL_ACTION } from "../../common/entities";
import { getCardPosition } from "../../common/utils";
import { Arrow } from "../Arrow/arrow";
import {
  Card,
  CardActions,
  CardPositioner,
  Cards as CarouselCards,
  CardSection,
  CardText,
  CardTitle,
} from "./cards.styles";

export interface CardsProps {
  activeCard: number;
  cards: SectionCard[];
  setCarouselAction: Dispatch<SetStateAction<CarouselAction>>;
}

export const Cards = ({
  activeCard,
  cards,
  setCarouselAction,
}: CardsProps): JSX.Element => {
  const lastCardIndex = cards.length - 1;
  return (
    <CarouselCards id={CARDS}>
      {cards.map(({ links, text, title }, c) => {
        return (
          <CardPositioner
            activeCard={activeCard}
            cardIndex={c}
            cardPosition={getCardPosition(c, activeCard, lastCardIndex)}
            key={c}
          >
            {c === activeCard && (
              <Arrow
                carouselAction={CAROUSEL_ACTION.SWIPE_BACKWARD}
                onClick={(): void =>
                  setCarouselAction(CAROUSEL_ACTION.SWIPE_BACKWARD)
                }
              />
            )}
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
            {c === activeCard && (
              <Arrow
                carouselAction={CAROUSEL_ACTION.SWIPE_FORWARD}
                onClick={(): void =>
                  setCarouselAction(CAROUSEL_ACTION.SWIPE_FORWARD)
                }
              />
            )}
          </CardPositioner>
        );
      })}
    </CarouselCards>
  );
};

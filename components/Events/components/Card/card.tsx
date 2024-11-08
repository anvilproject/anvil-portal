import { CardText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { CardActionArea, Card as MCard } from "@mui/material";
import Router from "next/router";
import { useCallback } from "react";
import { FrontmatterEvent } from "../../../../content/entities";
import { CardContent, CardSection } from "./card.styles";
import { getEventOverline, getEventTitle } from "./common/utils";
import { CardDate } from "./components/CardDate/cardDate";
import { CardOverline } from "./components/CardOverline/cardOverline";

interface CardProps {
  event: FrontmatterEvent;
}

export const Card = ({ event }: CardProps): JSX.Element => {
  const { date, description, url } = event;

  /**
   * Redirects to the event article.
   * @param route - Route.
   */
  const onClick = useCallback(async (route: string | null): Promise<void> => {
    if (!route) return;
    await Router.push(route);
  }, []);

  return (
    <MCard component={FluidPaper}>
      <CardActionArea onClick={(): Promise<void> => onClick(url)}>
        <CardSection>
          <CardDate date={date} />
          <CardContent>
            <CardOverline values={getEventOverline(event)} />
            <CardTitle>{getEventTitle(event)}</CardTitle>
            <CardText>{description}</CardText>
          </CardContent>
        </CardSection>
      </CardActionArea>
    </MCard>
  );
};

import { CardContent } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { CardText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Card as MCard, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { FrontmatterEvent } from "../../content/entities";
import { CardSection, EventsView } from "./events.styles";

interface EventsProps {
  events: FrontmatterEvent[];
}

export const Events = ({ events }: EventsProps): JSX.Element => {
  const { push } = useRouter();

  /**
   * Redirects to the event article.
   * @param route - Route.
   */
  const onClick = (route: string | null): void => {
    if (!route) return;
    push(route);
  };

  return (
    <EventsView>
      {events.map(({ description, title, url }, i) => (
        <MCard key={i} component={FluidPaper}>
          <CardActionArea onClick={(): void => onClick(url)}>
            <CardSection>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
              </CardContent>
            </CardSection>
          </CardActionArea>
        </MCard>
      ))}
    </EventsView>
  );
};

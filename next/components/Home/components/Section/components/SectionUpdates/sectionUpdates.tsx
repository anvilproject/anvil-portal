import { ButtonSecondary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { ToggleButton } from "@clevercanary/data-explorer-ui/lib/components/common/ToggleButtonGroup/toggleButtonGroup";
import { useState } from "react";
import { useSectionsData } from "../../../../../../providers/sectionsData";
import { PORTAL_URL } from "../../../../../../site-config/anvil-portal/dev/config";
import {
  Section,
  SectionLayout,
  SectionSubtitle,
  SectionTitle,
} from "../../section.styles";
import { UpdateCard } from "./common/entities";
import { Updates } from "./components/Updates/updates";
import {
  Headline,
  SectionActions,
  ToggleButtonGroup,
} from "./sectionUpdates.styles";

const MAX_UPDATE_CARDS = 3;

export enum UPDATE_VIEW {
  EVENTS = "EVENTS",
  NEWS = "NEWS",
}

export const SectionUpdates = (): JSX.Element => {
  const { eventCards, newsCards } = useSectionsData();
  const [view, setView] = useState<UPDATE_VIEW>(UPDATE_VIEW.NEWS);
  const cards =
    view === UPDATE_VIEW.NEWS
      ? newsCards.slice(0, MAX_UPDATE_CARDS)
      : eventCards
          .filter(filterUpcomingEvent)
          .reverse()
          .slice(0, MAX_UPDATE_CARDS);
  const updateName = view.toLowerCase();

  // Callback fired when toggle button value changes.
  const onChangeView = (view: UPDATE_VIEW): void => {
    setView(view);
  };

  return (
    <Section>
      <SectionLayout>
        <Headline>
          <SectionTitle>Updates, training events, and workshops</SectionTitle>
          <SectionSubtitle>
            Find out about AnVIL tool and platform updates, training
            opportunities, and conferences.
          </SectionSubtitle>
          <ToggleButtonGroup toggleButtons={getToggleButtons(onChangeView)} />
        </Headline>
        <Updates cards={cards} />
        <SectionActions>
          <ButtonSecondary href={`${PORTAL_URL}/${updateName}`}>
            Show All {updateName}
          </ButtonSecondary>
        </SectionActions>
      </SectionLayout>
    </Section>
  );
};

/**
 * Returns the toggle buttons.
 * @param onChangeView - Callback fired when toggle button value changes.
 * @returns toggle buttons.
 */
function getToggleButtons(
  onChangeView: (view: UPDATE_VIEW) => void
): ToggleButton[] {
  return [
    {
      label: "News",
      onToggle: () => onChangeView(UPDATE_VIEW.NEWS),
      value: UPDATE_VIEW.NEWS,
    },
    {
      label: "Events",
      onToggle: () => onChangeView(UPDATE_VIEW.EVENTS),
      value: UPDATE_VIEW.EVENTS,
    },
  ];
}

/**
 * Returns true if the card has a future date.
 * @param card - Cards
 * @returns true if the card has a future date.
 */
function filterUpcomingEvent(card: UpdateCard): boolean {
  if (!card.date) return false;
  return new Date(card.date) >= new Date();
}

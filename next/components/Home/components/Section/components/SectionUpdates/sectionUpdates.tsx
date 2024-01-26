import { ToggleButton } from "@clevercanary/data-explorer-ui/lib/components/common/ToggleButtonGroup/toggleButtonGroup";
import { useState } from "react";
import { useSectionsData } from "../../../../../../providers/sectionsData";
import { Section, SectionSubtitle, SectionTitle } from "../../section.styles";
import { Updates } from "./components/Updates/updates";
import {
  Headline,
  SectionLayout,
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
      : eventCards.slice(0, MAX_UPDATE_CARDS); // TODO confirm events should be first three by date.

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
      label: UPDATE_VIEW.NEWS,
      onToggle: () => onChangeView(UPDATE_VIEW.NEWS),
      value: UPDATE_VIEW.NEWS,
    },
    {
      label: UPDATE_VIEW.EVENTS,
      onToggle: () => onChangeView(UPDATE_VIEW.EVENTS),
      value: UPDATE_VIEW.EVENTS,
    },
  ];
}

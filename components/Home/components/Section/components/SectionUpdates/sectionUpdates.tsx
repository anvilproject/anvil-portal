import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { ToggleButton } from "@databiosphere/findable-ui/lib/components/common/ToggleButtonGroup/toggleButtonGroup";
import { JSX, useState } from "react";
import { useSectionsData } from "../../../../../../providers/sectionsData";
import {
  Section,
  SectionLayout,
  SectionSubtitle,
  SectionTitle,
} from "../../section.styles";
import { Updates } from "./components/Updates/updates";
import { UPDATE_VIEW } from "./constants";
import {
  Headline,
  SectionActions,
  ToggleButtonGroup,
} from "./sectionUpdates.styles";
import { getDisplayCards } from "./utils";

export const SectionUpdates = (): JSX.Element => {
  const { eventCards, newsCards } = useSectionsData();
  const [view, setView] = useState<UPDATE_VIEW>(UPDATE_VIEW.NEWS);
  const cards = getDisplayCards(view, newsCards, eventCards);
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
          <ButtonSecondary href={`/${updateName}`}>
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

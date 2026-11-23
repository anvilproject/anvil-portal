import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { render, type RenderResult, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { SectionDatasets } from "../components/Home/components/Section/components/SectionDatasets/sectionDatasets";
import { SectionHero } from "../components/Home/components/Section/components/SectionHero/sectionHero";
import { mergeAppTheme } from "../theme/theme";

const OUTLINED = "MuiButton-outlined";
const SECONDARY = "MuiButton-colorSecondary";
const THEME = mergeAppTheme();

/**
 * Returns the button element that contains the given label.
 * @param label - Button label.
 * @returns The button element.
 */
function getButton(label: string): HTMLElement {
  const button = screen.getByText(label).closest(".MuiButton-root");
  if (!(button instanceof HTMLElement)) {
    throw new Error(`No button labelled ${label}`);
  }
  return button;
}

/**
 * Renders the given element inside the app's MUI and Emotion themes, which the home page styles read breakpoints from.
 * @param ui - Element to render.
 * @returns The render result.
 */
function renderWithTheme(ui: ReactElement): RenderResult {
  return render(
    <ThemeProvider theme={THEME}>
      <EmotionThemeProvider theme={THEME}>{ui}</EmotionThemeProvider>
    </ThemeProvider>
  );
}

// findable-ui 63 styles only outlined secondary buttons, so a contained secondary button renders unstyled
describe("home page secondary buttons", () => {
  it("renders the hero's Launch Terra button as outlined secondary", () => {
    renderWithTheme(<SectionHero />);
    expect(getButton("Launch Terra")).toHaveClass(OUTLINED, SECONDARY);
  });

  it("renders the datasets section's buttons as outlined secondary", () => {
    renderWithTheme(<SectionDatasets />);
    expect(getButton("Consortia Roadmap")).toHaveClass(OUTLINED, SECONDARY);
    expect(getButton("Contribute Data")).toHaveClass(OUTLINED, SECONDARY);
  });
});

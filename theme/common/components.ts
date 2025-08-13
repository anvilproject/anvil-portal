import { Components, Theme } from "@mui/material";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

/**
 * MuiBreadcrumbs Component
 * @param theme - Theme.
 * @returns MuiBreadcrumbs component theme styles.
 */
export const MuiBreadcrumbs: Components["MuiBreadcrumbs"] = {
  styleOverrides: {
    root: {
      marginBottom: 8,
    },
  },
};

/**
 * MuiCssBaseline Component
 * @param theme - Theme.
 * @returns MuiCssBaseline component theme styles.
 */
export const MuiCssBaseline = (theme: Theme): Components["MuiCssBaseline"] => {
  return {
    styleOverrides: {
      body: {
        font: FONT.BODY_LARGE_400_2_LINES,
      },
      h1: {
        ...theme.typography[TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE],
        margin: "0 0 8px",
      },
      h2: {
        ...theme.typography[TYPOGRAPHY_PROPS.VARIANT.HEADING],
        margin: "32px 0 16px",
      },
      h3: {
        ...theme.typography[TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL],
        margin: "32px 0 16px",
      },
      h4: {
        font: FONT.BODY_LARGE_500,
        margin: "24px 0 16px",
      },
      img: {
        margin: "16px 0",
        maxWidth: "100%",
      },
      li: {
        margin: "8px 0",
        p: {
          marginBottom: 8,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:last-child": {
          marginBottom: 0,
        },
      },
      ol: {
        margin: 0,
        paddingLeft: 24,
      },
      p: {
        font: FONT.BODY_LARGE_400_2_LINES,
        marginBottom: 16,
      },
      ul: {
        margin: 0,
        paddingLeft: 24,
      },
      "ul + p": {
        marginTop: 16,
      },
    },
  };
};

import { Components, Theme } from "@mui/material";
import {
  TEXT_BODY_400_2_LINES,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";

/**
 * MuiCssBaseline Component
 * @param theme - Theme.
 * @returns MuiCssBaseline component theme styles.
 */
export const MuiCssBaseline = (theme: Theme): Components["MuiCssBaseline"] => {
  return {
    styleOverrides: {
      h1: {
        ...theme.typography[TEXT_HEADING_LARGE],
        margin: "0 0 8px",
      },
      h2: {
        ...theme.typography[TEXT_HEADING],
        margin: "32px 0 16px",
      },
      h3: {
        ...theme.typography[TEXT_HEADING_SMALL],
        margin: "32px 0 16px",
      },
      p: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
        marginBottom: 16,
      },
      ul: {
        margin: 0,
        paddingLeft: 24,
      },
      li: {
        margin: "8px 0",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:last-child": {
          marginBottom: 0,
        },
      },
    },
  };
};

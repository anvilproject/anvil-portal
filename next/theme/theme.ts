import { createTheme, Theme } from "@mui/material";
import * as C from "./common/components";

/**
 * Returns AnVIL theme with customization.
 * @returns theme with custom theme overrides.
 */
export function mergeAppTheme(theme: Theme): Theme {
  return createTheme(theme, {
    components: {
      MuiBreadcrumbs: C.MuiBreadcrumbs,
      MuiCssBaseline: C.MuiCssBaseline(theme),
    },
  });
}

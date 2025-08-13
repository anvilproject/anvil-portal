import { createTheme, Theme, ThemeOptions } from "@mui/material";
import * as C from "./common/components";
import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { deepmerge } from "@mui/utils";

/**
 * Returns AnVIL theme with customization.
 * @param options - Theme options
 * @returns theme with custom theme overrides.
 */
export function mergeAppTheme(options?: ThemeOptions): Theme {
  const appTheme = createAppTheme(options);

  return createTheme(
    deepmerge(appTheme, {
      components: {
        MuiBreadcrumbs: C.MuiBreadcrumbs,
        MuiCssBaseline: C.MuiCssBaseline(appTheme),
      },
    })
  );
}

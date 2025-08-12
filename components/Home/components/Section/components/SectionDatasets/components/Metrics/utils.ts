import { ThemeProps } from "@databiosphere/findable-ui/lib/theme/types";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";

/**
 * Returns typography style for the given variant.
 * @param variant - Typography variant key from the theme configuration.
 * @returns Typography styles.
 */
export function typographyToCSS(
  variant: keyof ThemeProps["theme"]["typography"]
) {
  return (props: ThemeProps): SerializedStyles => {
    return css(props.theme.typography[variant]);
  };
}

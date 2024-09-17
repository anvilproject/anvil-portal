import { ThemeProps } from "@databiosphere/findable-ui/lib/theme/theme";
import { BREAKPOINT_TABLET_LARGE } from "../../../components/Home/common/constants";

export const mediaTabletLargeUp = ({ theme }: ThemeProps): string =>
  theme.breakpoints.up(BREAKPOINT_TABLET_LARGE);

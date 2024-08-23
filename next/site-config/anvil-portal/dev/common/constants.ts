import { Breakpoints } from "@mui/system/createTheme/createBreakpoints";

// Header breakpoint values.
export const BREAKPOINTS: Partial<Breakpoints> = {
  values: {
    lg: 1440,
    md: 1280,
    sm: 1024,
    xs: 0,
  } as Breakpoints["values"], // TODO(cc) add "xl" breakpoint.
};

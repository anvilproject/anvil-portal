import { ThemeOptions } from "@mui/material";
import { Header } from "../components/header/common/entities";

export interface SiteConfig {
  layout: {
    header: Header;
  };
  theme?: ThemeOptions;
}

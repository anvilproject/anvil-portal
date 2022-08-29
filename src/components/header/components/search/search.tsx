import { Button, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "../../../common/custom-icon/components/search-icon/search-icon";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";

export default function Search(): JSX.Element {
  const desktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP
  );
  return (
    <>
      {desktop ? (
        <Button startIcon={<SearchIcon />} variant="nav">
          Search
        </Button>
      ) : (
        <IconButton color="ink">
          <SearchIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
}

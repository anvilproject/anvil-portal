import { Button } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { BUTTON_PROPS } from "./constants";

export const Actions = (): JSX.Element => {
  return (
    <Button component={Link} {...BUTTON_PROPS} href="/learn/get-started">
      Get Started
    </Button>
  );
};

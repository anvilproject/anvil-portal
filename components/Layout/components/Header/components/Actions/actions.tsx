import { Button } from "@mui/material";
import Link from "next/link";
import { BUTTON_PROPS } from "./constants";

export const Actions = (): JSX.Element => {
  return (
    <Button component={Link} {...BUTTON_PROPS} href="/learn/getting-started">
      Get Started
    </Button>
  );
};

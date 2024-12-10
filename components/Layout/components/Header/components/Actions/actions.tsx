import { Button } from "@mui/material";
import Link from "next/link";
import { BUTTON_PROPS } from "./constants";
import { ROUTES } from "../../../../../../routes/constants";

export const Actions = (): JSX.Element => {
  return (
    <Button component={Link} {...BUTTON_PROPS} href={ROUTES.LEARN}>
      Get Started
    </Button>
  );
};

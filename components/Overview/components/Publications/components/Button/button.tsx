import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Button as PrimaryButton } from "./button.styles";

export const Button = (): JSX.Element => {
  return (
    <PrimaryButton
      color="primary"
      href="https://github.com/anvilproject/anvil-portal/issues/new/?template=add-a-publication.md"
      rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
      target={ANCHOR_TARGET.BLANK}
      variant="contained"
    >
      Add Your Publication
    </PrimaryButton>
  );
};

import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Button as PrimaryButton } from "./button.styles";

export const Button = (): JSX.Element => {
  return (
    <PrimaryButton
      color="primary"
      href="https://github.com/anvilproject/anvil-portal/issues/new/?template=add-a-publication.md"
      target={ANCHOR_TARGET.BLANK}
      variant="contained"
    >
      Add Your Publication
    </PrimaryButton>
  );
};

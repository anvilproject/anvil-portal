import { OpenInNewIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/OpenInNewIcon/openInNewIcon";
import { ElementType } from "react";
import { Label } from "./labelIconMenuItem.styles";

export interface LabelIconMenuItemProps {
  Icon?: ElementType;
  iconFontSize?: string;
  label: string;
}

export const LabelIconMenuItem = ({
  Icon = OpenInNewIcon,
  iconFontSize = "xsmall",
  label,
}: LabelIconMenuItemProps): JSX.Element => {
  return (
    <Label>
      <div>{label}</div>
      <Icon color="inkLight" fontSize={iconFontSize} />
    </Label>
  );
};

import React, { ElementType } from "react";
import { OpenInNewIcon } from "./components/open-in-new/open-in-new-icon/open-in-new-icon";
import { Label } from "./label-icon-menu-item.styles";

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

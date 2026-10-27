import type { ComponentProps } from "react";

export interface VideoProps extends ComponentProps<"iframe"> {
  title: string;
}

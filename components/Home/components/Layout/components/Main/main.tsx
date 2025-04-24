import { ReactNode } from "react";
import { MainWithOffset } from "./main.styles";
import { useLayoutDimensions } from "@databiosphere/findable-ui/lib/providers/layoutDimensions/hook";

export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Main = ({ children, className }: MainProps): JSX.Element => {
  const { dimensions } = useLayoutDimensions();
  return (
    <MainWithOffset className={className} offset={dimensions.header.height}>
      {children}
    </MainWithOffset>
  );
};

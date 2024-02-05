import { useLayoutState } from "@clevercanary/data-explorer-ui/lib/hooks/useLayoutState";
import { ReactNode } from "react";
import { MainWithOffset } from "./main.styles";

export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Main = ({ children, className }: MainProps): JSX.Element => {
  const { layoutState } = useLayoutState();
  const { headerHeight } = layoutState;
  return (
    <MainWithOffset className={className} offset={headerHeight}>
      {children}
    </MainWithOffset>
  );
};

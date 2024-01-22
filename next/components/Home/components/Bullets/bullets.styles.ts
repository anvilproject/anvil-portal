import {
  primaryMain,
  smokeMain,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

interface Props {
  isActive: boolean;
}

export const Bullets = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const Bullet = styled(ButtonBase, {
  shouldForwardProp: (props) => props !== "isActive",
})<Props>`
  background-color: ${smokeMain};
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  height: 6px;
  width: 6px;

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${primaryMain(props)};
    `}
`;

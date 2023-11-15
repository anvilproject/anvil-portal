import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const NavLinkMenu = styled(Menu)`
  .MuiPaper-menu {
    margin: 4px 0;
    min-width: 144px;
    border-color: ${({ theme }) => theme.palette.smoke.main};
  }

  && .MuiMenuItem-root {
    margin: 0;
  }

  .MuiListItemText-root {
    display: grid;
    gap: 4px;

    .MuiListItemText-secondary {
      color: ${({ theme }) => theme.palette.ink.light};
      max-width: 290px;
      white-space: normal;
    }
  }
`;

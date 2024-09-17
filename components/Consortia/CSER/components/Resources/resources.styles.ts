import styled from "@emotion/styled";
import { MaterialsList } from "../MaterialsList/materialsList";

export const Resources = styled(MaterialsList)`
  & .MuiAccordionDetails-root {
    p {
      margin: 8px 0;
    }

    *:last-child {
      margin-bottom: 0;
    }
  }
`;

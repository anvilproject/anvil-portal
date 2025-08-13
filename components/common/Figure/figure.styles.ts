import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import styled from "@emotion/styled";

export const Figure = styled.figure`
  margin: 16px 0;

  img {
    margin: 0 auto;
  }

  figcaption {
    font: ${FONT.BODY_400};
    margin-top: 8px;
    text-align: center;
  }
`;

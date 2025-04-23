import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const StyledSection = styled.section`
  background-color: ${PALETTE.COMMON_WHITE};
  flex: 1;
  width: 100%;
`;

export const SectionLayout = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1024px;
  padding: 64px 16px;
`;

import styled from "@emotion/styled";
import { white } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";

export const StyledSection = styled.section`
  background-color: ${white};
  flex: 1;
  width: 100%;
`;

export const SectionLayout = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1024px;
  padding: 64px 16px;
`;

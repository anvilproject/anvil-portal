import styled from "@emotion/styled";
import { Headline } from "../../components/Layout/components/Section/components/SectionHero/sectionHero.styles";
import { mediaTabletDown } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";

export const StyledHeadline = styled(Headline)`
  display: grid;
  gap: 24px;
  max-width: 608px;
  padding: 80px 0;
  text-align: center;

  ${mediaTabletDown} {
    padding: 80px 16px;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  ${mediaTabletDown} {
    grid-template-columns: 1fr;
  }
`;

import styled from "@emotion/styled";

export const InlineFrame = styled.iframe`
  aspect-ratio: 16 / 9;
  border: none;
  display: block;
  margin: 32px 0;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

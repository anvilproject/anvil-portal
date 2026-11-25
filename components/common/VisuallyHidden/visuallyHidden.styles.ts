import styled from "@emotion/styled";

/**
 * Text hidden on screen but read by screen readers, as MUI's `visuallyHidden`.
 */
export const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

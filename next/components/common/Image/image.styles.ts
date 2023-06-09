import { textBody400 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const ImageWithCaption = styled.div`
  margin: 16px 0;

  img {
    margin: 0 auto;
  }
`;

export const Caption = styled.div`
  ${textBody400};
  margin-top: 8px;
  text-align: center;
`;

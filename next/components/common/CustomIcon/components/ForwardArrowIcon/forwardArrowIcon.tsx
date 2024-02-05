import { CustomSVGIconProps } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/entities";
import { SvgIcon } from "@mui/material";

export const ForwardArrowIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M12.1313 9.74959H3.75C3.5375 9.74959 3.35937 9.67772 3.21562 9.53397C3.07187 9.39022 3 9.21209 3 8.99959C3 8.78709 3.07187 8.60897 3.21562 8.46522C3.35937 8.32147 3.5375 8.24959 3.75 8.24959H12.1313L8.45625 4.57459C8.30625 4.42459 8.23438 4.24959 8.24063 4.04959C8.24688 3.84959 8.325 3.67459 8.475 3.52459C8.625 3.38709 8.8 3.31522 9 3.30897C9.2 3.30272 9.375 3.37459 9.525 3.52459L14.475 8.47459C14.55 8.54959 14.6031 8.63084 14.6344 8.71834C14.6656 8.80584 14.6812 8.89959 14.6812 8.99959C14.6812 9.09959 14.6656 9.19334 14.6344 9.28084C14.6031 9.36834 14.55 9.44959 14.475 9.52459L9.525 14.4746C9.3875 14.6121 9.21562 14.6808 9.00937 14.6808C8.80312 14.6808 8.625 14.6121 8.475 14.4746C8.325 14.3246 8.25 14.1465 8.25 13.9402C8.25 13.734 8.325 13.5558 8.475 13.4058L12.1313 9.74959Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

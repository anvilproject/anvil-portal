import { SvgIcon, SvgIconProps } from "@mui/material";

export const DatabaseIcon = ({
  fontSize = "large",
  viewBox = "0 0 48 48",
  ...props
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M38 13V16C38 18.7625 31.7312 21 24 21C16.2687 21 10 18.7625 10 16V13C10 10.2375 16.2687 8 24 8C31.7312 8 38 10.2375 38 13ZM34.575 21.4187C35.875 20.9562 37.0687 20.3625 38 19.6313V26C38 28.7625 31.7312 31 24 31C16.2687 31 10 28.7625 10 26V19.6313C10.9312 20.3688 12.125 20.9562 13.425 21.4187C16.2312 22.4187 19.9687 23 24 23C28.0312 23 31.7687 22.4187 34.575 21.4187ZM10 29.6313C10.9312 30.3688 12.125 30.9563 13.425 31.4188C16.2312 32.4188 19.9687 33 24 33C28.0312 33 31.7687 32.4188 34.575 31.4188C35.875 30.9563 37.0687 30.3625 38 29.6313V35C38 37.7625 31.7312 40 24 40C16.2687 40 10 37.7625 10 35V29.6313Z"
        fill="#517890"
      />
    </SvgIcon>
  );
};
import React from "react";
import StaticImage from "../../../common/static-image/static-image";
import { Logo } from "../../common/entities";

interface Props {
  logo: Logo;
}

export default function HeaderLogo({ logo }: Props): JSX.Element {
  const { alt, height, link, src, width } = logo;
  return (
    <a href={link} target="_self">
      <StaticImage alt={alt} height={height} src={src} width={width} />
    </a>
  );
}

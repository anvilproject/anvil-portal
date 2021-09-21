/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header social component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// Styles
import * as compStyles from "./header-social.module.css";

export interface ISocial {
  imageSrc: string;
  name: string;
  url: string;
}

interface HeaderSocialProps {
  ncpi: boolean;
  social: ISocial;
}

function HeaderSocial(props: HeaderSocialProps): JSX.Element {
  const { ncpi, social } = props;
  const { imageSrc, name, url } = social;

  return (
    <a // eslint-disable-line react/jsx-no-target-blank
      className={classNames(compStyles.headerSocial, {
        [compStyles.ncpi]: ncpi,
      })}
      href={url}
      rel="noopener"
      target="_blank"
    >
      <img alt={name} src={imageSrc} />
    </a>
  );
}

export default HeaderSocial;

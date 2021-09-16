/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header logo component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React from "react";

// Images
import logoNCPI from "../../../../images/cloud-ncpi.svg";
import logoAnvil from "../../../../images/logo.png";

// Styles
import * as compStyles from "./header-logo.module.css";

interface HeaderLogoProps {
  ncpi: boolean;
}

function HeaderLogo(props: HeaderLogoProps): JSX.Element {
  const { ncpi } = props;
  const classNamesLogo = classNames(compStyles.logo, {
    [compStyles.ncpi]: ncpi,
  });
  const imgAlt = ncpi ? "NCPI" : "AnVIL";
  const imgSrc = ncpi ? logoNCPI : logoAnvil;
  const linkTo = ncpi ? "/ncpi" : "/";

  return (
    <Link to={linkTo} className={classNamesLogo}>
      <img alt={imgAlt} src={imgSrc} />
    </Link>
  );
}

export default React.memo(HeaderLogo);

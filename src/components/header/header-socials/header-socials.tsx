/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header socials component.
 */

// Core dependencies
import React from "react";

// App dependencies
import HeaderSocial, { ISocial } from "../header-social/header-social";

// Styles
import compStyles from "./header-socials.module.css";

const classNames = require("classnames");

interface HeaderSocialsProps {
  ncpi: boolean;
  sideBar: boolean;
  socials: ISocial[];
}

function HeaderSocials(props: HeaderSocialsProps): JSX.Element {
  const { ncpi, sideBar, socials } = props;
  const classNamesSocials = classNames(compStyles.headerSocials, {
    [compStyles.headerSideBarSocials]: sideBar,
  });

  return (
    <div className={classNamesSocials}>
      {socials.map((social) => (
        <HeaderSocial key={social.name} ncpi={ncpi} social={social} />
      ))}
    </div>
  );
}

export default HeaderSocials;

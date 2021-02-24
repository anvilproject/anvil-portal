/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header logo component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Images
import logoNCPI from "../../../../images/cloud-ncpi.svg";
import logoAnvil from "../../../../images/logo.png";

// Styles
import compStyles from "./header-logo.module.css";

const classNames = require("classnames");

function HeaderLogo(props) {

    const {ncpi, searchBarOpen} = props;
    const classNamesLogo = classNames(compStyles.logo, {[compStyles.ncpi]: ncpi}, {[compStyles.searchBarOpen]: searchBarOpen});
    const imgAlt = ncpi ? "NCPI" : "AnVIL";
    const imgSrc = ncpi ? logoNCPI : logoAnvil;
    const linkTo = ncpi ? "/ncpi" : "/";

    return (
        <Link to={linkTo} className={classNamesLogo}>
            <img alt={imgAlt} src={imgSrc}/>
        </Link>
    );
}

export default React.memo(HeaderLogo);

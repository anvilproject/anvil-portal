/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - breadcrumb component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// App dependencies
import Icon from "../icon/icon";

// Styles
import compStyles from "./breadcrumb.module.css";

function Breadcrumb(props) {

    const {name, path} = props;
    const breadcrumb = name ? name : "Back";

    return (
        <Link className={compStyles.breadcrumb} to={path}>
            <Icon breadcrumb fontSize={20} showIcon>arrow_back</Icon>
            <span className={compStyles.breadcrumbLabel}>{breadcrumb}</span>
        </Link>
    );
}

export default Breadcrumb;

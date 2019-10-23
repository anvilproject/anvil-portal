/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news scoop component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Styles
import compStyles from "./scoop.module.css";

class Scoop extends React.Component {

    render() {
        const {scoop} = this.props,
            {fields, frontmatter} = scoop,
            {slug} = fields,
            {date, description, title} = frontmatter;
        return (
            <div className={compStyles.scoop} to={slug}>
                <h3><Link to={slug}>{title}</Link></h3>
                <h5>{date}</h5>
                {title ? <p>{description}</p> : null}
            </div>
        );
    }
}

export default (props) => {

    return (
        <Scoop {...props}/>
    )
}

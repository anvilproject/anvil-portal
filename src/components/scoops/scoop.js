/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - scoop component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Styles
import contentStyles from "../article/articleBody.module.css";
import compStyles from "./scoop.module.css";

let classNames = require("classnames");

class Scoop extends React.Component {

    getScoops = () => {

        const {featuredOnly, scoops} = this.props;

        if ( !featuredOnly ) {

            // Returns all
            return scoops;
        }

        // Return only the featured scoops
        return scoops.filter(scoop => scoop.frontmatter.featured === true);
    };

    render() {
        const {compName, scoops} = this.props;

        const Headline = (props) => {

            const {scoop} = props,
                {fields, frontmatter} = scoop,
                {date, description, title} = frontmatter,
                {slug} = fields;

            return (
                <div className={classNames(compStyles.scoop, compStyles[compName], contentStyles.content)} to={slug}>
                    <h3><Link to={slug}>{title}</Link></h3>
                    <h5>{date}</h5>
                    {description ? <p>{description}</p> : null}
                </div>
            )
        };

        return (
            scoops ? this.getScoops().map((scoop, i) =>
                <Headline scoop={scoop} key={i}/>) : null
        );
    }
}

export default (props) => {

    const {compName, featuredOnly, scoops} = props;

    return (
        <Scoop compName={compName} featuredOnly={featuredOnly} scoops={scoops}/>
    )
}

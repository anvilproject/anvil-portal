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
import contentStyles from "../markdown/markdown.module.css";
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
        const {className, scoops, type} = this.props;

        const Headline = (props) => {

            const {scoop} = props,
                {fields, frontmatter} = scoop,
                {date, description, title} = frontmatter,
                {slug} = fields;

            return (
                <div className={classNames(compStyles.scoop, className, contentStyles.content)} to={slug}>
                    <h3><Link to={slug}>{title}</Link></h3>
                    <h5>{date}</h5>
                    {description ? <p>{description}</p> : null}
                </div>
            )
        };

        return (
            scoops.length ? this.getScoops().map((scoop, i) =>
                <Headline scoop={scoop} key={i}/>) : <p className={compStyles.scoopless}>Currently, there are no {type}.</p>
        );
    }
}

export default (props) => {

    const {className, featuredOnly, scoops, type} = props;

    return (
        <Scoop className={className} featuredOnly={featuredOnly} scoops={scoops} type={type}/>
    )
}

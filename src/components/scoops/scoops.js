/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news scoops component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Scoop from "./scoop";

class Scoops extends React.Component {

    render() {
        const {className, featuredOnly, scoops, type} = this.props;
        return (
            <Scoop className={className} featuredOnly={featuredOnly} scoops={scoops} type={type}/>
        );
    }
}

export default Scoops;

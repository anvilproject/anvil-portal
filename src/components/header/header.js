/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// Images
import logo from "../../../images/logoAnVIL.png";

// Styles
import compStyles from "./header.module.css";
import fontStyles from "../../styles/fontstyles.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class Header extends React.Component {

    render() {
        const {theme} = this.props;
        return (
            <div className={classNames(compStyles.header, {[compStyles.peach]: theme === "peach"})}>
                <div className={globalStyles.container}>
                    <div>
                        <img src={logo} alt="anVIL"/>
                        <span className={classNames(fontStyles.theAnVIL, compStyles.logoText)}>The AnVIL</span>
                    </div>
                    <ul>
                        <li><Link to="/" activeClassName={compStyles.active}>Mustard</Link></li>
                        <li><Link to="/bright" activeClassName={compStyles.active}>Bright</Link></li>
                        <li><Link to="/peach" activeClassName={compStyles.active}>Peach</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default (props) => {
    return (
        <Header {...props}/>
    )
}

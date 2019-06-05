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
import globalStyles from "../../styles/global.module.css";

class Header extends React.Component {

    render() {
        return (
            <div className={compStyles.header}>
                <div className={globalStyles.container}>
                    <div>
                        <img src={logo} alt="anVIL"/>
                    </div>
                    <ul>
                        <li><Link to="/" activeClassName={compStyles.active}>Paragraphs</Link></li>
                        <li><Link to="/alegreyaSans" activeClassName={compStyles.active}>Alegreya</Link></li>
                        <li><Link to="/barlow" activeClassName={compStyles.active}>Barlow</Link></li>
                        <li><Link to="/lato" activeClassName={compStyles.active}>Lato</Link></li>
                        <li><Link to="/mandali" activeClassName={compStyles.active}>Mandali</Link></li>
                        <li><Link to="/notoSansHK" activeClassName={compStyles.active}>Noto HK</Link></li>
                        <li><Link to="/openSans" activeClassName={compStyles.active}>Open Sans</Link></li>
                        <li><Link to="/raleway" activeClassName={compStyles.active}>Raleway</Link></li>
                        <li><Link to="/roboto" activeClassName={compStyles.active}>Roboto</Link></li>
                        <li><Link to="/headings" activeClassName={compStyles.active}>Headings</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default () => {
    return (
        <Header/>
    )
}

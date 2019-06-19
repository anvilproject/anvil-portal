/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL footer component.
 */

// Core dependencies
import React from "react";

// Images
import gitHub from "../../../images/gitHub.png";
import gitHubLight from "../../../images/gitHub-white.png";

// Styles
import compStyles from "./footer.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

class Footer extends React.Component {

    render() {
        const {homePage} = this.props,
            gitHubMark = homePage ? gitHub : gitHubLight;
        return (
            <div className={classNames(compStyles.footer, {[compStyles.bgDark]: !homePage})}>
                <div className={globalStyles.container}>
                    <div className={compStyles.socials}>
                        <a href="https://gitter.im/anvil-project/Lobby" target="_blank" rel="noopener noreferrer"><i
                            className="material-icons-outlined">forum</i></a>
                        <a href="https://github.com/anvilproject" target="_blank" rel="noopener noreferrer"><img
                            src={gitHubMark} alt="gitHub"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default (props) => {
    return (
        <Footer {...props}/>
    )
}

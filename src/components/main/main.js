/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL main [content] component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Nav from "../nav/nav";

// Styles
import compStyles from "./main.module.css";
import globalStyles from "../../styles/global.module.css";

class Main extends React.Component {

    render() {
        const {children, docPath, hideNav} = this.props;
        return (
            <div className={globalStyles.main}>
                <div className={globalStyles.container}>
                    <div className={compStyles.mainBody}>
                        {hideNav ? null : <Nav docPath={docPath}/>}
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;

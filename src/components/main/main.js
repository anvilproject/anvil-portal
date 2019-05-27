/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL main [content] component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./main.module.css";
import globalStyles from "../../styles/global.module.css";

class Main extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <div className={compStyles.main}>
                <div className={globalStyles.container}>
                    <div className={compStyles.sectionBody}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;

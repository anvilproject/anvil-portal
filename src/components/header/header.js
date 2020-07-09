/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import {HeaderStaticQuery} from "../../hooks/header-query";

// Images
import logo from "../../../images/logo.png";

// Styles
import compStyles from "./header.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showNav: false};
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu = () => {
        this.setState({showNav: !this.state.showNav});
        this.props.onMenuOpen(this.state.showNav);
    };

    render() {
        const {links} = this.props;
        return (
            <div className={compStyles.header}>
                <div className={globalStyles.container}>
                    <Link to="/" className={compStyles.logo}>
                        <img src={logo} alt="anVIL"/>
                    </Link>
                    <ClickHandler
                        className={classNames({[compStyles.hidden]: this.state.showNav}, "material-icons-round")}
                        clickAction={this.toggleMenu}
                        tag={"i"}
                        label="Show menu">menu</ClickHandler>
                    <ClickHandler
                        className={classNames({[compStyles.hidden]: !this.state.showNav}, "material-icons-round")}
                        clickAction={this.toggleMenu}
                        tag={"i"}
                        label="Hide menu">close</ClickHandler>
                    <ul className={classNames({[compStyles.nav]: this.state.showNav})}>
                        {links.map((l, i) => <li key={i}>
                            <Link activeClassName={compStyles.active} partiallyActive={true} to={l.path}>{l.name}</Link>
                        </li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default (props) => {
    return (
        <Header links={HeaderStaticQuery()} {...props}/>
    );
}

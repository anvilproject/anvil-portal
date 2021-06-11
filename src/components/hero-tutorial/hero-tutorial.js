/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - hero tutorial component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Breadcrumb from "../breadcrumb/breadcrumb";
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";

// Styles
import compStyles from "./hero-tutorial.module.css";

function HeroTutorial(props) {

    const {navigations} = props,
        {tutorialBackName, tutorialBackPath} = navigations || {};
    const {title, tutorialHero} = useContext(ContextFrontmatter);

    return (
        <>
            {tutorialBackPath ? <Breadcrumb name={tutorialBackName} path={tutorialBackPath}/> : null}
            <h1>{title}</h1>
            <p className={compStyles.heroSubTitle}>{tutorialHero}</p>
        </>
    );
}

export default HeroTutorial;

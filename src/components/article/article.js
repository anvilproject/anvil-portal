/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article component.
 */

// Core dependencies
import React, {useEffect, useRef, useState} from "react";

// App dependencies
import Headline from "../headline/headline";
import Nav from "../nav/nav";
import Outline from "../outline/outline";
import Spy from "../spy/spy";
import * as StylesService from "../../utils/styles.service";

// Styles
import compStyles from "./article.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

function Article(props) {

    const {bannerHeight, children, docPath, navigations, noSpy, showOutline, styles} = props,
        {navItems} = navigations || {},
        {alignment} = styles || {};
    const refArticle = useRef(null);
    const [activeOutline, setActiveOutline] = useState("");
    const [articleOffsetTop, setArticleOffsetTop] = useState(0);
    const left = StylesService.isPageAlignmentLeft(alignment);
    const useOutline = showOutline;
    const useSpy = showOutline && !noSpy;

    useEffect(() => {

        setArticleOffsetTop(refArticle.current.offsetTop);
    }, []);

    return (
        <>
        <Headline navigations={navigations}/>
        <section className={compStyles.article} ref={refArticle}>
            <div className={classNames(globalStyles.container, compStyles.container)}>
                {left ? null :
                    <Nav articleOffsetTop={articleOffsetTop}
                         bannerHeight={bannerHeight}
                         docPath={docPath}
                         navItems={navItems}/>}
                <div className={classNames(compStyles.contentPositioner, {[compStyles.left]: left})}>
                    <div className={compStyles.contentContainer}>
                        {useSpy ? <Spy articleOffsetTop={articleOffsetTop} setActiveOutline={setActiveOutline}>{children}</Spy> : children}
                        {useOutline ? <Outline activeOutline={activeOutline}
                                               articleOffsetTop={articleOffsetTop}
                                               bannerHeight={bannerHeight}
                                               docPath={docPath}/> : null}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Article;
